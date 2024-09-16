import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import RoomPageClient from './room-id-client';
import { redirect } from 'next/navigation';

async function getRoomDetails(roomId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      throw new Error('No session or access token available');
    }
    const headersList = headers();
    const cookies = headersList.get('cookie');
    const config = {
      headers: {
        Cookie: cookies,
      },
    };
    const response = await axios.get(
      `${process.env.BASE_URL}/api/room/${roomId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch room details', error);
    return null;
  }
}
async function getNotifications(roomId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error('No session or user available');
    }
    const headersList = headers();
    const cookies = headersList.get('cookie');
    const config = {
      headers: {
        Cookie: cookies,
      },
    };
    const response = await axios.get(
      `${process.env.BASE_URL}/api/room/${roomId}/notifications`,
      config,
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications', error);
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: { roomId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const room = await getRoomDetails(params.roomId);
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
  const room = await getRoomDetails(params.roomId);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  const notifications = await getNotifications(params.roomId);
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
