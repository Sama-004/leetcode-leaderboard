import { NextResponse } from 'next/server';
import { authOptions } from '../../../../../lib/auth';
import { getServerSession } from 'next-auth';
import prisma from '../../../../../db/db';

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    console.log(params);
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const roomId = params.roomId;

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
            image: true,
            leetCodeUsername: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                leetCodeUsername: true,
                image: true,
                stats: true,
              },
            },
          },
        },
      },
    });
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    const isParticipant = room.participants.some(
      (p: { user: { id: string } }) => p.user.id === session.user.id,
    );
    if (!isParticipant && room.creator.id !== session.user.id) {
      return NextResponse.json(
        { error: 'Not a member of this room' },
        { status: 403 },
      );
    }
    const restructuredRoom = {
      ...room,
      participants: room.participants.map((p) => ({
        user: {
          id: p.user.id,
          email: p.user.email,
          leetCodeUsername: p.user.leetCodeUsername,
          image: p.user.image,
        },
        stats: p.user.stats,
      })),
    };
    return NextResponse.json(restructuredRoom, { status: 200 });
  } catch (err) {
    console.error('Error fetching room details:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
