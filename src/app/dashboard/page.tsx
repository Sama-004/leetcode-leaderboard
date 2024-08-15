"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

function DashboardContent() {
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
      <h2>
        <s>Dashboard Page</s>
      </h2>
      <div>
        <s>Add sidebar in layout.tsx</s>
      </div>
      <div>
        <s>The contents will be Create room/Join Room (Use shadcn tabs)</s>
      </div>
      <div>
        <s>Joined rooms page</s>
      </div>
      <div>Room name page route from id</div>
      <div>
        <s>Show the data of users in a room</s>
      </div>
      <div>Fetch data every 1 hour with cronjobs</div>
      <div>
        Show message of already verified profile if trying to verify the same
      </div>
      <div className="bg-red-600">Leave a joined room</div>
      <div className="bg-red-600">What happens when owner leaves a room?</div>
      <div>Do something with badges. data.matcheduser.contestBadge.name</div>
      <div>Graphs</div>
      <div>
        Fix the thing new user cannot verify their id without signing out
        because for the first time the session id is not the same as db id of
        the user(possible fix could be just fetching the data from the db after
        a new user is signed up and then the process would be a lot easier)
      </div>
      <div>No redirect on successful login</div>
      <div>
        Route Groups for dashboard route
        <a
          className="bg-blue-500"
          href="https://nextjs.org/docs/app/building-your-application/routing/route-groups">
          {` https://nextjs.org/docs/app/building-your-application/routing/route-groups`}
        </a>
      </div>
      <div>Invite link to join rooms</div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
