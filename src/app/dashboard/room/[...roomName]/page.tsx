import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import axios from "axios";
import ClientComponent from "./ClientComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";

async function getRoomDetails(roomName: string) {
  try {
    const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
      throw new Error("No session or access token available");
    }
    const headersList = headers();
    const cookies = headersList.get('cookie');
    const config = {
      headers: {
      Cookie: cookies,
      },
    };
    const response = await axios.get(
      `http://localhost:3000/api/room/${roomName}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch room details", error);
    return null;
  }
}
async function getNotifications(roomName: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error("No session or user available");
    }
    const headersList = headers();
    const cookies = headersList.get('cookie');
    const config = {
      headers: {
        Cookie: cookies,
      },
    };
    const response = await axios.get(
      `http://localhost:3000/api/room/${roomName}/notifications`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch notifications", error);
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: { roomName: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const room = await getRoomDetails(params.roomName);
    return {
      title: room && room.name ? `${room.name}` : "Room",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Room",
    };
  }
}

type Props = {
  params: { roomName: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export default async function Page({ params }: Props) {
  const room=await getRoomDetails(params.roomName);
  const notifications=await getNotifications(params.roomName);
  if(!room){
    return <div>Room not found</div>
  }

  return <ClientComponent room={room} roomName={params.roomName} initialNotifications={notifications}/>;
}
