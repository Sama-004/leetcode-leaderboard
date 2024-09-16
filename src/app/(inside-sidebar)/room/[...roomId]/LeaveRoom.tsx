'use client';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface LeaveRoomProps {
  roomId: string;
}

export default function LeaveRoom({ roomId }: LeaveRoomProps) {
  const [isLeavingRoom, setIsLeavingRoom] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleLeaveRoom = async () => {
    setIsLeavingRoom(true);
    try {
      console.log('Id sent from frontend to leave room', roomId);
      const response = await axios.post(`/api/room/${roomId}/leave`);
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'You have left the room.',
          variant: 'destructive',
          className: 'bg-zinc-800 border-zinc-700 text-zinc-100',
        });
        router.push('/rooms');
      }
    } catch (error) {
      console.error('Failed to leave room', error);
      toast({
        title: 'Error',
        description: 'Failed to leave room. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLeavingRoom(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="bg-red-600 text-zinc-100 hover:bg-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {isLeavingRoom ? 'Leaving...' : 'Leave Room'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="bg-black text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove you from
            the room.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleLeaveRoom}
            disabled={isLeavingRoom}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
