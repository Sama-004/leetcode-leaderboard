"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";

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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const params = useParams();
  const roomName = Array.isArray(params.roomName)
    ? params.roomName[0]
    : params.roomName;

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

    if (roomName) {
      fetchRoomDetails();
    }
  }, [roomName, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  console.log("Participants data:", room.participants);

  return (
    <div className="container mx-auto p-4 sm:text-xl">
      <h1 className="text-2xl font-bold mb-4">{room.name}</h1>
      <p>Room Code: {room.code}</p>
      <p>Created by: {room.creator.leetCodeUsername}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Participants</h2>
      <DataTable data={room.participants} />
    </div>
  );
}
