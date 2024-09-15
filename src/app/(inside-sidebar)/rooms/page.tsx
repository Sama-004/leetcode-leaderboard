'use client';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Users } from 'lucide-react';
import useSWR from 'swr';
import InviteButton from '../room/[...roomId]/InviteButton';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Joined Rooms</h1>
      {rooms?.length === 0 ? (
        <p>{`You haven't joined any rooms yet.`}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms?.map((room) => (
            <Card key={room.id} className="bg-black text-white">
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Created By: {room.creator.leetCodeUsername}</p>
                <p>
                  Participants: {room.participants.length}
                  <Users className="inline-block ml-2 w-4 h-4" />
                </p>
                <div className="flex space-x-2">
                  <Link href={`/room/${room.id}`} passHref>
                    <Button className="mt-2 bg-green-500 hover:bg-green-600">
                      Enter Room
                    </Button>
                  </Link>
                  <InviteButton roomCode={room.code} />
                </div>
              </CardContent>
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
      <h1 className="text-2xl font-bold mb-4">
        Your Joined Rooms
        {isValidating ? (
          <LoadingSpinner className="inline-block ml-2 w-4 h-4" />
        ) : (
          <></>
        )}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="bg-black text-white">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-8 w-1/3 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
