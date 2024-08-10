"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

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

export function NavUsername() {
  const { data: session } = useSession();
  return (
    <>
      {session?.user.leetCodeUsername && <p>{session.user.leetCodeUsername}</p>}
    </>
  );
}

export function NavSignOutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
      Sign Out
    </DropdownMenuItem>
  );
}
