import prisma from "../db/db";

export async function GenerateRoomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code;
  let isUnique = false;
  while (!isUnique) {
    code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const existingCode = await prisma.room.findUnique({
      where: { code },
    });
    if (!existingCode) {
      isUnique = true;
      console.log("Generated room code:", code);
    }
  }
  return code as string;
}
