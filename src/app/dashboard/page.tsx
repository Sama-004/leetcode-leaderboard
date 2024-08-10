"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

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
      <h2>Dashboard Page</h2>
      <div>
        <s>Add sidebar in layout.tsx</s>
      </div>
      <div>The contents will be Create room/Join Room (Use shadcn tabs)</div>
      <div>
        Joined Rooms then what happens when you click on a room that is room/:id
        or room/:name which would be unique
      </div>
    </div>
  );
}
