import { NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "../../../../../db/db";

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { roomCode } = await req.json();

  if (!roomCode || typeof roomCode !== "string") {
    return NextResponse.json({ error: "Invalid room code" }, { status: 400 });
  }
  try {
    const room = await prisma.room.findUnique({
      where: {
        code: roomCode,
      },
      include: { participants: true },
    });
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const isAlreadyParticipant = room.participants.some(
      //   TODO: give correct types
      (p: any) => p.userId === session.user.id
    );
    if (isAlreadyParticipant) {
      return NextResponse.json(
        //   Need to return name here i guess
        { message: "Already a member of the room", roomId: room.id },
        { status: 409 }
      );
    }

    const updatedRoom = await prisma.room.update({
      where: { id: room.id },
      data: {
        participants: {
          create: {
            userId: session.user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (err) {
    console.error("Error occured while joining room", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}