"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    const redirectVerify = searchParams.get("redirectVerify");
    console.log(redirectVerify);
    if (redirectVerify === "true") {
      setShowToast(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (showToast) {
      toast({
        title: "Verification successful",
        description: "Your account has been successfully verified.",
        className: "bg-green-500 border-none",
      });
      router.replace("/dashboard");
    }
  }, [showToast, router, toast]);

  return (
    <div>
      <Button onClick={() => signOut()} className="bg-white text-black">
        Sign Out
      </Button>
      <br />
      <h2>Dashboard page</h2>
      {session?.user?.image && (
        <Avatar>
          <AvatarImage src={session.user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
