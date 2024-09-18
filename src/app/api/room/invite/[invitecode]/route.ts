import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth';
import { NextResponse } from 'next/server';
import prisma, { PrismaTransactionalClient } from '../../../../../../db/db';

export async function GET(
  req: Request,
  { params }: { params: { invitecode: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized', success: false },
      { status: 401 },
    );
  }

  const { invitecode } = params;
  console.log('Received roomCode:', invitecode);

  try {
    const room = await prisma.room.findUnique({
      where: {
        code: invitecode,
      },
      include: { participants: true },
    });

    if (!room) {
      return NextResponse.json(
        { message: 'Room not found', success: false },
        { status: 404 },
      );
    }

    const isAlreadyParticipant = room.participants.some(
      (p: any) => p.userId === session.user.id,
    );

    if (isAlreadyParticipant) {
      return NextResponse.json(
        {
          message: 'Already a member of the room',
          roomId: room.id,
          success: true,
        },
        { status: 200 },
      );
    }

    const updatedRoom = await prisma.$transaction(
      async (prisma: PrismaTransactionalClient) => {
        const updatedRoom = await prisma.room.update({
          where: { id: room.id },
          data: {
            participants: {
              create: {
                userId: session.user.id,
              },
            },
          },
          include: {
            participants: {
              include: {
                user: true,
              },
            },
          },
        });

        await prisma.notification.create({
          data: {
            roomId: room.id,
            message: `${
              session.user.leetCodeUsername || 'A new user'
            } joined the room`,
            color: 'join',
          },
        });

        return updatedRoom;
      },
    );

    return NextResponse.json(
      { message: 'Room joined successfully', roomId: room.id, success: true },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error joining the room', err);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 },
    );
  }
}
