"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function Page({ params }: { params: { invitecode: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  console.log("Code is:", params.invitecode);

  useEffect(() => {
    joinRoom();
  }, []);

  const joinRoom = async () => {
    try {
      console.log("Invite code being sent:", params.invitecode);
      const response = await axios.get(`/api/room/invite/${params.invitecode}`);
      toast({
        title: "Success",
        description: "Room joined successfully",
        variant: "default",
      });
      console.log("room joined successfully", response);
      // router.push("/room");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to join room. Please try again.",
        variant: "destructive",
      });
      // router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Joining room...</p>
    </div>
  );
}
