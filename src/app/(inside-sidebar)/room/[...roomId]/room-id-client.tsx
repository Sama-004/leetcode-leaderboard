'use client';

import { useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeaveRoom from './LeaveRoom';
import InviteButton from './InviteButton';
import useSWR from 'swr';
import { toast } from '@/components/ui/use-toast';

interface Notification {
  id: string;
  message: string;
  createdAt: string;
  color: string;
}

interface Room {
  id: string;
  name: string;
  code: string;
  creator: User;
  participants: RoomParticipant[];
  lastUpdated: string;
}

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

interface ClientComponentProps {
  room: Room;
  initialNotifications: Notification[];
  roomId: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RoomPageClient({
  room,
  roomId,
  initialNotifications,
}: ClientComponentProps) {
  const { data: notifications = initialNotifications, error } = useSWR<
    Notification[]
  >(
    `/api/room/${roomId}/notifications`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
      refreshWhenHidden: true,
    }, // Refresh every 30 seconds
  );

  const colorMap: { [key: string]: string } = {
    green: 'text-[hsl(180,74%,42%)]',
    yellow: 'text-[hsl(43,100%,50%)]',
    red: 'text-[hsl(0,91%,59%)]',
    join: 'text-green-500',
    blue: 'text-blue-500',
    leave: 'text-red-500',
  };

  const updateUnreadCount = useCallback(
    (notifs: Notification[]) => {
      const lastReadTimestamp =
        localStorage.getItem(`lastRead_${roomId}`) || '0';
      return notifs.filter(
        (n) => new Date(n.createdAt) > new Date(lastReadTimestamp),
      ).length;
    },
    [roomId],
  );

  const unreadNotifications = updateUnreadCount(notifications);

  const markNotificationsAsRead = useCallback(() => {
    const now = new Date().toISOString();
    localStorage.setItem(`lastRead_${roomId}`, now);
  }, [roomId]);

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch notifications', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch notifications. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error]);

  return (
    <div className="container mx-auto p-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">{room.name}</h1>
      <p className="text-sm sm:text-base">Room Code: {room.code}</p>
      <InviteButton roomCode={room.code} />
      <LeaveRoom roomId={roomId} />
      <p className="text-sm sm:text-base">TODO: Add created at time and date</p>
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
                        <span className={colorMap[notification.color]}>
                          {`${notification.message}`}
                        </span>
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
