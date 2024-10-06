'use client';

import { GoogleLogo } from '@/components/continue-with-google';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-100">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">
            Sign in to continue to LeetCode Leaderboard
          </p>
        </div>

        <Button
          className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <GoogleLogo />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
