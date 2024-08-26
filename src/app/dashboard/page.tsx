"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DashboardContent() {
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
      <div>Room name page route from id</div>
      <div>Fix redirect on join from join/create route</div>
      <div>
        change the arrow for rating and ranking change (make it more
        interactive)
      </div>
      <p>Add colors for the difficulty of problem sovled</p>
      <p>Make rating change green</p>
      <div>
        Table is not updating need to reload to update. Should be changed ig
        (idk how)
      </div>
      <div>Room name on title of the page (metadata)</div>
      <div>
        Change date to today and yesterday in notification tab or use date
        headings (like whatsapp)
      </div>
      <div>Use the timestamp returned by api for solved messages</div>
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
    </div>
  );
}
