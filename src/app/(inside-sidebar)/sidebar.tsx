'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Home, PlusCircle, LogOut, Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';

const navItems = [
  { icon: Home, label: 'Rooms', href: '/rooms' },
  { icon: PlusCircle, label: 'Create/Join Room', href: '/rooms/new' },
];

function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex-1">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-light">
            Menu
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-zinc-100 hover:text-zinc-100 hover:bg-zinc-800 ${pathname === item.href ? 'bg-zinc-700 text-white' : ''}`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-4 mb-4">
          <NavAvatar />
          <div>
            <p className="text-sm font-medium">
              <NavUsername />
            </p>
            <p className="text-xs">
              <NavEmail />
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full text-zinc-100 bg-zinc-800 hover:bg-zinc-700 hover:text-zinc-100"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default function Sidenav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden border-r border-zinc-700">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-zinc-700">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTitle className="sr-only">Menu bar for mobile</SheetTitle>
        <SheetTrigger asChild className="bg-zinc-900 border-zinc-700">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-zinc-900">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}

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

export function NavEmail() {
  const { data: session } = useSession();
  return <>{session?.user.email && <p>{session.user.email}</p>}</>;
}
