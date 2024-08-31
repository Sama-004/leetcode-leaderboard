import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth';
import prisma from '../../../../../../db/db';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { roomId: string } },
) {
  const roomId = params.roomId;
  console.log('Room Id for leave:', roomId);
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId as string },
      include: { participants: true },
    });
    if (!room) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 });
    }
    const userId = session.user.id;
    await prisma.roomParticipant.deleteMany({
      where: {
        userId: userId,
        roomId: room.id,
      },
    });

    await prisma.notification.create({
      data: {
        roomId: room.id,
        message: `${session.user.leetCodeUsername} has left the room.`,
      },
    });

    if (room.participants.length === 1) {
      await prisma.room.delete({
        where: { id: room.id },
      });
    }

    return NextResponse.json(
      { message: 'Successfully left the room' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error leaving room:', err);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
