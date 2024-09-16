'use client';

import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function GetStarted({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      size="lg"
      className="bg-blue-600 hover:bg-blue-700 text-white"
      onClick={() => signIn()}
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}
