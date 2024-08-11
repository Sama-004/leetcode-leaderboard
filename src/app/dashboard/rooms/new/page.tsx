"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

//TODO: add metadata somewhere else

export default function Page() {
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => {
    if (event.key === "Enter") {
      action();
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room code",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/rooms/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode }),
      });
      if (!response.ok) {
        throw new Error("failed to join room");
      }
      const data = await response.json();
      router.push(`/room/${data.name}`);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room name",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/room", { roomName });
      router.push(`/room/${response.data.name}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="join" className="w-[90%] max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-black text-white">
          <TabsTrigger value="join">Join Room</TabsTrigger>
          <TabsTrigger value="create">Create Room</TabsTrigger>
        </TabsList>
        <TabsContent value="join">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Join Room</CardTitle>
              <CardDescription>{`Enter the room code here.`}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Input
                  id="code"
                  placeholder="Enter Room Code"
                  className="bg-gray-700 text-white"
                  onKeyDown={(e) => handleKeyDown(e, handleJoinRoom)}
                  onChange={(e) => {
                    setRoomCode(e.target.value);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-500 hover:bg-gray-500"
                onClick={() => console.log("Room Code:", roomCode)}>
                Join Room
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Create New Room</CardTitle>
              <CardDescription>
                {`Create a new room for you and your friends.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Input
                  id="name"
                  placeholder="Enter Room Name"
                  className="bg-gray-700 text-white"
                  onKeyDown={(e) => handleKeyDown(e, handleCreateRoom)}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                />
                <Label className="text-xs select-none">{`Note: Room name can't be changed later`}</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-red-600 hover:bg-gray-500"
                onClick={handleCreateRoom}
                disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Room"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
