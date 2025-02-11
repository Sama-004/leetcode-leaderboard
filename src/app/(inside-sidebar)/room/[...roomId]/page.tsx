import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import RoomPageClient from './room-id-client';
import { redirect } from 'next/navigation';
import { getRoomDetailsAction } from '../../../../../actions/room-details-action';
import { getNotificationsAction } from '../../../../../actions/room-notifications-action';
import { cache } from 'react';

const getCachedRoomDetailsAction = cache(getRoomDetailsAction);

export async function generateMetadata({
  params,
}: {
  params: { roomId: string };
}): Promise<Metadata> {
  try {
    const room = await getCachedRoomDetailsAction(params.roomId[0]);
    return {
      title: room && room.name ? `${room.name}` : 'Room',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Room',
    };
  }
}

type Props = {
  params: { roomId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
  const room = await getCachedRoomDetailsAction(params.roomId[0]);

  if (room.error) {
    return <div>Room not found</div>;
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  const notifications = await getNotificationsAction(params.roomId[0]);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <RoomPageClient
      room={room}
      roomId={params.roomId}
      initialNotifications={notifications}
    />
  );
}
