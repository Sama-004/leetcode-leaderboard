'use server';

import prisma from '../db/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

export async function getRoomDetailsAction(roomId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { error: 'Unauthorized' };
  }

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
    return { error: 'Room not found' };
  }

  // Check if user is authorized to access this room
  const isParticipant = room.participants.some(
    (p) => p.user.id === session.user.id,
  );
  if (!isParticipant && room.creator.id !== session.user.id) {
    return { error: 'Not a member of this room' };
  }

  // Restructure the room data
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

  return restructuredRoom;
}
