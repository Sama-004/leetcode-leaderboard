"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function Page({ params }: { params: { invitecode: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  console.log("Code is:", params.invitecode);

  useEffect(() => {
    joinRoom();
  }, []);

  const joinRoom = async () => {
    try {
      console.log("Invite code being sent:", params.invitecode);
      const response = await axios.get(`/api/room/invite/${params.invitecode}`);
      const data=response.data
      if (response) {
        setLoading(false);
      }
        if(data.success){
        toast({
          title: "Success",
          description: "Room joined successfully",
          variant: "default",
          className: "bg-green-500",
        });
      router.push("/dashboard/rooms");
      }else{
      toast({
        title: "Error",
        description: "Failed to join room. Please try again.",
        variant: "destructive",
        className: "bg-red-600",
      });
      router.push("/dashboard/rooms");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      {loading ? (
        <>
          <p>Joining Room</p>
          <LoadingSpinner className="m-2 h-10 w-10" />
        </>
      ) : (
        <>
          <p>Redirecting</p>
          <LoadingSpinner className="m-2 h-10 w-10" />
        </>
      )}
      <div></div>
    </div>
  );
}
