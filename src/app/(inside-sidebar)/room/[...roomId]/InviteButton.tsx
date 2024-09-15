'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCallback } from 'react';
import { Link } from 'lucide-react';

interface InviteButtonProps {
  roomCode: string;
}

export default function InviteButton({ roomCode }: InviteButtonProps) {
  const { toast } = useToast();
  const generateInviteLink = useCallback(
    (roomCode: string) => {
      const baseUrl = window.location.origin;
      return `${baseUrl}/invite/${roomCode}`;
    },
    [roomCode],
  );

  const copyInviteLink = useCallback(
    (roomCode: string) => {
      if (roomCode) {
        const link = generateInviteLink(roomCode);
        navigator.clipboard.writeText(link);
      }
      toast({
        description: 'Invite Link Copied to Clipboard',
        className: 'bg-green-500 border-none',
      });
    },
    [generateInviteLink, toast, roomCode],
  );

  return (
    <Button
      className="bg-blue-500 hover:bg-blue-600 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => copyInviteLink(roomCode)}
      disabled={!roomCode}
    >
      <Link className="inline-block w-4 h-4 mr-2" />
      Copy Invite
    </Button>
  );
}
