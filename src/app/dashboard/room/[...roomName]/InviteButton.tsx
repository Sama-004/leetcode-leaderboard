"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

interface Room {
  id: string;
  name: string;
  code: string;
  lastUpdated: string;
}

interface InviteButtonProps {
  room: Room;
}

export default function InviteButton({ room }: InviteButtonProps) {
  const { toast } = useToast();
  const generateInviteLink = useCallback(
    (roomCode: string) => {
      const baseUrl = window.location.origin;
      return `${baseUrl}/invite/${room?.code}`;
    },
    [room]
  );

  const copyInviteLink = useCallback(
    (roomCode: string) => {
      if (room) {
        const link = generateInviteLink(room.code);
        navigator.clipboard.writeText(link);
      }
      toast({
        title: "Success",
        description: "Invite link copied to clipboard",
        variant: "default",
      });
    },
    [generateInviteLink, toast, room]
  );

  return (
    <Button
      className="bg-blue-500 hover:bg-blue-600 mt-2"
      onClick={() => copyInviteLink(room.code)}
      disabled={!room.code}>
      Copy Invite Link
    </Button>
  );
}
