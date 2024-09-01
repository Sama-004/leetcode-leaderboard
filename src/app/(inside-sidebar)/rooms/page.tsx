'use client';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
// import type { Metadata } from "next";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// TODO: send metadata logic to server side
// export const metadata: Metadata = {
//   title: "Rooms",
//   description: "List of joined rooms",
// };

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

export default function Page() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get<Room[]>('/api/room/joined');
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch rooms. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Joined Rooms</h1>
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Joined Rooms</h1>
      {rooms.length === 0 ? (
        <p>{`You haven't joined any rooms yet.`}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room.id} className="bg-black text-white">
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Room Code: {room.code}</p>
                {/* Label owner for rooms created by me */}
                <p>Creator: {room.creator.leetCodeUsername}</p>
                <p>Participants: {room.participants.length}</p>
                <Link href={`/room/${room.id}`} passHref>
                  <Button className="mt-2 bg-green-500 hover:bg-green-600">
                    Enter Room
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
