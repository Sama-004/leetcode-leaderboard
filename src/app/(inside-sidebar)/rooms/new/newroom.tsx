'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    action: () => void,
  ) => {
    if (event.key === 'Enter') {
      action();
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a room code',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/room/join', { roomCode });
      if (response.status === 200) {
        toast({
          description: 'Joined room successfully',
          variant: 'default',
          className: 'bg-zinc-800 border-zinc-700 text-zinc-100',
        });
        router.push(`/room/${response.data.id}`);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to join room. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
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
          onClick={handleJoinRoom}
          disabled={isLoading}
        >
          {isLoading ? 'Joining...' : 'Join Room'}
        </Button>
      </CardFooter>
    </>
  );
}

export function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    action: () => void,
  ) => {
    if (event.key === 'Enter') {
      action();
    }
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a room name',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/room/create', { roomName });
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Created Room successfully',
          variant: 'default',
          className: 'bg-zinc-800 border-zinc-700 text-zinc-100',
        });
        router.push(`/room/${response.data.id}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create room. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
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
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Room'}
        </Button>
      </CardFooter>
    </>
  );
}
