"use client";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export function NavAvatar() {
  const { data: session } = useSession();
  return (
    <>
      {session?.user?.image && (
        <Avatar className="h-9 w-9">
          <AvatarImage src={session.user.image} alt="leetcode-avatar" />
          <AvatarFallback>{session.user.leetCodeUsername}</AvatarFallback>
        </Avatar>
      )}
    </>
  );
}

export function NavSignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="bg-red-600 text-black hover:bg-white">
      Sign Out
    </Button>
  );
}
