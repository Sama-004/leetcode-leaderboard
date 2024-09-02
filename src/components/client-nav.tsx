'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { LogOutIcon } from 'lucide-react';

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
      className="text-red-600 bg-zinc-900 hover:bg-gray-600"
    >
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
