import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
const CACHE_TTL = 60 * 60; // 1 hour in seconds

export async function getCachedData(key: string): Promise<any | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCachedData(key: string, data: any): Promise<void> {
  await redis.setex(key, CACHE_TTL, JSON.stringify(data));
}

export async function invalidateCache(key: string): Promise<void> {
  await redis.del(key);
}

// import cron from "node-cron";
// import prisma from "../db/db";
// import { fetchUserStats } from "./path/to/fetchUserStats";
// import { setCachedData, invalidateCache } from "./cacheService";

// async function updateAllUsersStats() {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         username: true,
//         userStats: {
//           select: {
//             lastUpdated: true,
//           },
//         },
//       },
//     });

//     for (const user of users) {
//       const lastUpdated = user.userStats?.lastUpdated;
//       const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

//       if (!lastUpdated || lastUpdated < oneHourAgo) {
//         await fetchUserStats(user.username, user.id);

//         // Invalidate the cache for any rooms this user is in
//         const userRooms = await prisma.participant.findMany({
//           where: { userId: user.id },
//           select: { roomId: true },
//         });

//         for (const { roomId } of userRooms) {
//           await invalidateCache(roomId);
//         }
//       }
//     }

//     console.log(
//       "Finished updating user stats and invalidating relevant caches"
//     );
//   } catch (error) {
//     console.error("Error updating user stats:", error);
//   }
// }

// // Schedule the task to run every hour
// cron.schedule("0 * * * *", () => {
//   console.log("Running user stats update");
//   updateAllUsersStats();
// });

// console.log("User stats update scheduler started");

// export async function GET(
//   req: Request,
//   { params }: { params: { roomId: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const roomId = params.roomId;
//     console.log("Room Id:", roomId);

//     const cachedRoom = await getCachedData(roomId);
//     if (cachedRoom) {
//       console.log("Returning cached data for room:", roomId);
//       return NextResponse.json(cachedRoom, { status: 200 });
//     }

//     // ... rest of your existing code to fetch and structure room data ...

//     await setCachedData(roomId, restructuredRoom);
//     return NextResponse.json(restructuredRoom, { status: 200 });
//   } catch (err) {
//     console.error("Error fetching room details:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
