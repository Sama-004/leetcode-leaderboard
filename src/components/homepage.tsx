'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';

export default function HomePage() {
  const { data: session, status } = useSession();
  return (
    <div>
      <div className="flex gap-5">
        <Button onClick={() => signIn()} className="bg-white text-black">
          Signin
        </Button>
        <Button onClick={() => signOut()} className="bg-white text-black">
          signOut
        </Button>
      </div>
      {status === 'authenticated' ? (
        <div>Logged in</div>
      ) : (
        <div>Does not work</div>
      )}
    </div>
  );
}
