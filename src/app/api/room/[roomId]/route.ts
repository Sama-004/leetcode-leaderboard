import { NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "../../../../../db/db";

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

    const room = await prisma.room.findUnique({
      where: { id: roomId },
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
    return NextResponse.json(room, { status: 200 });
  } catch (err) {
    console.error("Error fetching room details:", err);
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
