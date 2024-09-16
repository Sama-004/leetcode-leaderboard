// @ts-nocheck
import { NextResponse } from 'next/server';
import prisma from '../../../../../db/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { GenerateRoomCode } from '../../../../../lib/roomCode';

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { roomName } = await req.json();

    console.log('Recieved roomName:', roomName);

    if (!roomName || typeof roomName !== 'string' || roomName.length < 3) {
      return NextResponse.json({ error: 'Invalid room name' }, { status: 400 });
    }

    const roomCode: string = await GenerateRoomCode();

    const newRoom = await prisma.$transaction(async (prisma) => {
      const newRoom = await prisma.room.create({
        data: {
          name: roomName,
          code: roomCode,
          creator: {
            connect: { id: session.user.id },
          },
          participants: {
            create: {
              user: {
                connect: { id: session.user.id },
              },
            },
          },
        },
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
        },
      });
      await prisma.notification.create({
        data: {
          roomId: newRoom.id,
          message: `${
            session.user.leetCodeUsername || 'A new user'
          } created the room ${roomName}`,
          color: 'blue',
        },
      });
      return newRoom;
    });

    return NextResponse.json(newRoom, { status: 200 });
  } catch (err) {
    console.error('Error creating room', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
