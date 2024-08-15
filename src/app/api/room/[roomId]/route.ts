import { NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "../../../../../db/db";

const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; //1 hour

interface CacheItem {
  data: any;
  timestamp: number;
}

// function getCachedData(key: string): any | null {
//   const item = cache.get(key) as CacheItem | undefined;
//   if (item && Date.now() - item.timestamp < CACHE_TTL) {
//     return item.data;
//   }
//   return null;
// }

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roomId = params.roomId;
    console.log("Room Id:", roomId);

    // const cachedRoom = getCachedData(roomId);
    // if (cachedRoom) {
    //   console.log("Returning cached data for room:", roomId);
    //   return NextResponse.json(cachedRoom, { status: 200 });
    // }

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
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }
    const isParticipant = room.participants.some(
      (p) => p.user.id === session.user.id
    );
    if (!isParticipant) {
      return NextResponse.json(
        { error: "Not a member of this room" },
        { status: 403 }
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
    // setCachedData(roomId, restructuredRoom); // keep into cache if not in cache
    return NextResponse.json(restructuredRoom, { status: 200 });
  } catch (err) {
    console.error("Error fetching room details:", err);
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
