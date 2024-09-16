'use client';

import { useCallback, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import useSWR from 'swr';
import LeaveRoom from './LeaveRoom';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { copyInviteLink } from '@/components/copyInviteLink';

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
  image: string | null;
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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [lastReadTimeStamp, setLastReadTimeStamp] = useState('0');

  const { data: notifications = initialNotifications, error } = useSWR<
    Notification[]
  >(`/api/room/${roomId}/notifications`, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    refreshWhenHidden: true,
  });

  const colorMap: { [key: string]: string } = {
    green: 'text-[hsl(180,74%,42%)]',
    yellow: 'text-[hsl(43,100%,50%)]',
    red: 'text-[hsl(0,91%,59%)]',
    join: 'text-green-500',
    blue: 'text-blue-500',
    leave: 'text-red-500',
  };

  useEffect(() => {
    setLastReadTimeStamp(localStorage.getItem(`lastRead_${roomId}`) || '0');
  }, [roomId]);

  const updateUnreadCount = useCallback(
    (notifs: Notification[]) => {
      return notifs.filter(
        (n) => new Date(n.createdAt) > new Date(lastReadTimeStamp),
      ).length;
    },
    [lastReadTimeStamp],
  );

  const unreadNotifications = updateUnreadCount(notifications);

  const markNotificationsAsRead = useCallback(() => {
    const now = new Date().toISOString();
    localStorage.setItem(`lastRead_${roomId}`, now);
    setLastReadTimeStamp(now);
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
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{room.name}</h1>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
            onClick={() => copyInviteLink(room.code, toast)}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Invite
          </Button>
          <LeaveRoom roomId={roomId} />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
          <TabsTrigger
            value="leaderboard"
            className="text-zinc-500 data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
          >
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="text-zinc-500 data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
            onClick={markNotificationsAsRead}
          >
            Notifications
            {unreadNotifications > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {unreadNotifications}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="comparison"
            className="text-zinc-500 data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
          >
            Comparison (Coming Soon)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-zinc-300">User</TableHead>
                <TableHead className="text-zinc-300">Easy</TableHead>
                <TableHead className="text-zinc-300">Medium</TableHead>
                <TableHead className="text-zinc-300">Hard</TableHead>
                <TableHead className="text-zinc-300">Rating</TableHead>
                <TableHead className="text-zinc-300">Ranking</TableHead>
                <TableHead className="text-zinc-300">Contests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {room.participants.map((participant) => (
                <TableRow key={participant.user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={participant.user.image || ''} />
                      </Avatar>
                      <span>
                        {participant.user.leetCodeUsername || 'Unknown'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {participant.stats?.easyQuestionsSolved || 0}
                  </TableCell>
                  <TableCell>
                    {participant.stats?.mediumQuestionsSolved || 0}
                  </TableCell>
                  <TableCell>
                    {participant.stats?.hardQuestionsSolved || 0}
                  </TableCell>
                  <TableCell>{participant.stats?.contestRating || 0}</TableCell>
                  <TableCell>
                    {participant.stats?.globalRanking || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {participant.stats?.attendedContests || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="bg-zinc-800 p-4 rounded-lg">
                <p className={colorMap[notification.color]}>
                  {notification.message}
                </p>
                <p className="text-zinc-400 text-sm mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="comparison" className="mt-4">
          <div className="bg-zinc-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">
              Comparison feature coming soon!
            </h3>
            <p className="text-zinc-400">
              We are working on adding a comparison feature to the leaderboard.
              This will allow you to compare your progress with your friends.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
