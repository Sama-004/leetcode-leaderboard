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

export async function generateMetadata(
  { params },
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

export default async function Page() {
  return <ClientComponent />;
}
