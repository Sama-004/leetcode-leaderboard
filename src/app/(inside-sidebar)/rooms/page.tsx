'use client';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Users, Copy, ArrowRight } from 'lucide-react';
import useSWR from 'swr';
import { copyInviteLink } from '../../../components/copyInviteLink';

interface Room {
  id: string;
  name: string;
  code: string;
  creator: {
    id: string;
    email: string;
    leetCodeUsername: string | null;
  };
  participants: {
    user: {
      id: string;
      email: string;
      leetCodeUsername: string | null;
    };
  }[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { toast } = useToast();
  const {
    data: rooms,
    error,
    isLoading,
    isValidating,
  } = useSWR<Room[]>('/api/room/joined', fetcher, { revalidateOnFocus: true });

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch rooms. Please try again.',
      variant: 'destructive',
    });
  }

  if (isLoading) {
    return <RoomCardSkeleton isValidating={isValidating} />;
  }

  return (
    <div className="container mx-auto p-4 text-zinc-100">
      <h1 className="text-3xl font-bold mb-6 text-zinc-100">
        Your Joined Rooms
      </h1>
      {rooms?.length === 0 ? (
        <p>{`You haven't joined any rooms yet.`}</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {rooms?.map((room) => (
            <Card key={room.id} className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-zinc-100">{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-400 mb-2">
                  Created by: {room.creator.leetCodeUsername}
                </p>
                <Badge
                  variant="secondary"
                  className="bg-zinc-700 text-zinc-300"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {room.participants.length} participants
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  size="sm"
                  onClick={() => copyInviteLink(room.code, toast)}
                  className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-100"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Invite
                </Button>
                <Link href={`/room/${room.id}`} passHref>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-zinc-100 hover:bg-blue-500"
                  >
                    Enter Room
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function RoomCardSkeleton({ isValidating }: { isValidating: boolean }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Your Joined Rooms
        {isValidating && (
          <LoadingSpinner className="inline-block ml-2 w-4 h-4" />
        )}
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-2" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
