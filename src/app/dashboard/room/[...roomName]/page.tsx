"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  email: string;
  leetCodeUsername: string | null;
}

interface UserStats {
  easyQuestionsSolved: number;
  mediumQuestionsSolved: number;
  hardQuestionsSolved: number;
  contestRating: number;
  globalRanking: number;
  attendedContests: number;
}

interface RoomParticipant {
  user: User;
  stats: UserStats | null;
}

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

interface Room {
  id: string;
  name: string;
  code: string;
  creator: User;
  participants: RoomParticipant[];
  lastUpdated: string;
}

export default function Page() {
  const [room, setRoom] = useState<Room | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const { toast } = useToast();
  const params = useParams();
  const roomName = Array.isArray(params.roomName)
    ? params.roomName[0]
    : params.roomName;

  const markNotificationsAsRead = () => {
    localStorage.setItem(`lastRead_${roomName}`, new Date().toISOString());
    setUnreadNotifications(0);
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get<Room>(`/api/room/${roomName}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Failed to fetch room details", error);
        toast({
          title: "Error",
          description: "Failed to fetch room details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get<Notification[]>(
          `/api/room/${roomName}/notifications`
        );
        const newNotifications = response.data;
        setNotifications(newNotifications);

        const lastReadTimestamp =
          localStorage.getItem(`lastRead_${roomName}`) || "0";
        const unreadCount = newNotifications.filter(
          (n) => new Date(n.createdAt) > new Date(lastReadTimestamp)
        ).length;
        setUnreadNotifications(unreadCount);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    if (roomName) {
      fetchRoomDetails();
      fetchNotifications();
    }
    const intervalId = setInterval(fetchNotifications, 30000); // check for notifications every 30 seconds
    return () => clearInterval(intervalId);
  }, [roomName, toast]);

  if (isLoading) {
    // TODO: Add skeleton or loader
    return <div>Loading...</div>;
  }

  if (!room) {
    // TODO: Better error message
    return <div>Room not found</div>;
  }

  console.log("Participants data:", room.participants);

  return (
    <div className="container mx-auto p-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">{room.name}</h1>
      <p className="text-sm sm:text-base">Room Code: {room.code}</p>
      <p className="text-sm sm:text-base">
        Created by: {room.creator.leetCodeUsername}
      </p>
      <Tabs defaultValue="ranking" className="mt-6">
        <TabsList className="bg-black text-white">
          <TabsTrigger value="ranking">Leaderboard</TabsTrigger>
          <TabsTrigger value="notifications" onClick={markNotificationsAsRead}>
            Notifications
            {unreadNotifications > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {unreadNotifications}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ranking">
          <h2 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
            Participants
          </h2>
          <DataTable data={room.participants} />
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="border-b pb-2">
                      <p>
                        <a
                          href={`https://leetcode.com/u/${
                            notification.message.split(" ")[0]
                          }`}>
                          {notification.message}
                        </a>
                      </p>
                      <small className="text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notifications to show.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
