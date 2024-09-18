import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { NextResponse } from 'next/server';
import prisma from '../../../../../db/db';
import { dynamic } from './route.config';

export { dynamic };

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const joinedRooms = await prisma.room.findMany({
      where: {
        participants: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
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
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return NextResponse.json(joinedRooms, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
