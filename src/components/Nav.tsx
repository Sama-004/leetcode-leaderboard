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

//TODO: Change type
function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

//TODO: Change type
function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

//TODO: Change type
function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

//TODO: Change type
function TestTubeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );
}
