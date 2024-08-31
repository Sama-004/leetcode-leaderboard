'use client';

import { Textarea } from '@/components/ui/textarea';
import { getSession, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { KeyboardEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import VerificationGuide from '@/components/verificationGuide';
import { useRouter } from 'next/navigation';

export default function Verify() {
  const [username, setUsername] = useState<string>('');
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const router = useRouter();

  const submitUsername = async () => {
    //TODO: Add loader
    if (!session?.user?.id) {
      toast({
        variant: 'destructive',
        title: 'You must be logged in to verify your account',
      });
      return;
    }

    try {
      console.log('Username going from frontend:', username);
      const response = await axios.post('/api/verify', {
        username,
        userId: session.user.id,
      });
      console.log('Response from backend:', response.data);
      if (
        response.data.message === 'Profile is already verified by someone else'
      ) {
        toast({
          variant: 'destructive',
          title: 'Username already being used by someone else',
          description: 'Username already verified by someone else',
        });
      }
      if (response.data.message === 'User verified successfully') {
        if (session && session.user) {
          await update({
            ...session,
            user: {
              ...session.user,
              leetCodeUsername: response.data.user.leetCodeUsername,
              isVerified: true,
              image: response.data.user.image,
            },
          });
        }

        toast({
          title: 'Verification successful',
          description: `${response.data.message}`,
          className: 'bg-green-500',
        });
        router.push('/dashboard?redirectVerify=true');
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: response.data.message,
        });
      }
    } catch (err) {
      console.error('Error sending username to the backend', err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'An error occurred while verifying your account. Please try again.',
        // TODO: Need to change this message ig
      });
    }
    //TODO: Add loader
  };
  const hadnleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitUsername();
    }
    if (event.key === ' ') {
      event.preventDefault();
      toast({
        variant: 'destructive',
        title: 'Username cannot contain spaces',
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-10">
        <button onClick={() => signOut()}>Sign out</button>
        <div className="flex flex-col md:flex-row gap-2 w-full max-w-md">
          <Textarea
            className="text-black w-full md:w-80 resize-none h-15 md:h-10"
            placeholder="Enter your leetcode username here."
            onKeyDown={hadnleKeyDown}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            onClick={submitUsername}
            className="bg-yellow-500 hover:bg-yellow-300 text-black mt-2 md:mt-0"
          >
            Verify
          </Button>
        </div>
        <h1 className="text-2xl font-semibold mt-10">
          Add vim as skill before verifying. The steps to do so are given below
        </h1>
      </div>
      <div>
        {/* TODO: Send username here and show in one of the cards as links */}
        <VerificationGuide />
      </div>
    </div>
  );
}
