import prisma from "../../../../../../db/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  const roomId = params.roomId;

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { notifications: { orderBy: { createdAt: "desc" } } },
      // include: {
      //   notifications: {
      //     select: {
      //       id: true,
      //       message: true,
      //       createdAt: true,
      //       color: true,
      //     },
      //     orderBy: { createdAt: "desc" },
      //   },
      // },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room.notifications, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
