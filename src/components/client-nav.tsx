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
    <DropdownMenuItem
      onClick={() => signOut()}
      className="text-red-600 bg-zinc-900 hover:bg-gray-600">
      <span>Sign Out</span>
      <LogOutIcon className="ml-1 h-5 w-5 sm:h-6 sm:w-6 inline" />
    </DropdownMenuItem>
  );
}

export function SignoutButton() {
  return (
    <>
      <LogOutIcon
        className="h-5 w-5 text-white sm:h-6 sm:w-6"
        onClick={() => signOut()}
      />
      <span className="hidden text-red-600 sm:block" onClick={() => signOut()}>
        Sign Out
      </span>
    </>
  );
}

function LogOutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dc2626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
