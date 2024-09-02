import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  NavAvatar,
  NavSignOutButton,
  NavUsername,
  SignoutButton,
} from './client-nav';
import { TestTubeIcon } from 'lucide-react';
import { GithubIcon } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { LayoutGridIcon } from 'lucide-react';

export default function Nav() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 flex h-full w-14 flex-col border-r border-[#ecebff] bg-zinc-900 sm:w-60 hover:bg-black">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href="/rooms"
            className="flex items-center gap-2"
            prefetch={false}
          >
            <TestTubeIcon className="h-6 w-6 text-white sm:text-lg md:text-sm" />
            <span className="text-lg font-medium text-white sm:block">
              Test
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col items-start gap-2 px-2 py-4 sm:px-4">
          <Link
            href="/rooms"
            className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-muted-foreground transition-colors hover:text-foreground sm:gap-4 hover:bg-gray-600"
            prefetch={false}
          >
            {/* TODO: Prefetch true when rooms logic is added */}
            <LayoutGridIcon className="h-10 w-10 text-white m:h-6 md:w-6 sm:text-lg md:text-sm" />
            <span className="hidden text-white sm:block">Rooms</span>
          </Link>
          <Link
            href="/rooms/new"
            className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-muted-foreground transition-colors hover:text-foreground sm:gap-4 hover:bg-gray-600"
            prefetch={false}
          >
            <PlusIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            <span className="hidden text-white sm:block">Join/Create Room</span>
          </Link>
          <Link
            href="#"
            className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-muted-foreground transition-colors hover:text-foreground sm:gap-4 hover:bg-gray-600"
            prefetch={false}
          >
            <SignoutButton />
          </Link>
        </nav>
      </aside>
      <header className="fixed top-0 left-14 right-0 sm:left-60 flex h-16 items-center justify-between bg-zinc-900 px-4 md:px-6 border-gray-800 border-b">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-medium text-white"></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/sama-004"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <GithubIcon className="h-6 w-6 text-white" />
            <span className="sr-only">GitHub</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* Leetcode avatar */}
              <NavAvatar />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-900 border-black"
            >
              <DropdownMenuItem className="pointer-events-none bg-zinc-900 text-white hover:bg-gray-600">
                {/* Leetcode username */}
                <NavUsername />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <NavSignOutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
