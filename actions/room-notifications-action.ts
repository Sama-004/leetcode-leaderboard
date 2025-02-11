'use server';

import prisma from '../db/db';

export async function getNotificationsAction(roomId: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { notifications: { orderBy: { createdAt: 'desc' } } },
    });

    if (!room) {
      return { error: 'Room not found' };
    }

    return room.notifications;
  } catch (error) {
    console.error('Error fetching notifications', error);
    return { error: 'Failed to fetch notifications' };
  }
}
