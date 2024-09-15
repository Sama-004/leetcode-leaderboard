'use client';
import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { ArrowRight, LogIn } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const steps = [
  'Go to your LeetCode profile and click on Edit profile',
  'On the basic info tab, at the bottom of the page add vim as skill and click on save',
  'Now vim should now be visible on your profile under skills',
  'Now you are ready to verify your account',
];

function VerificationStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg shadow bg-zinc-800">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold bg-white text-black">
        {number}
      </div>
      <div className="flex-grow">
        <p className="font-medium">{text}</p>
      </div>
      {number < steps.length && (
        <ArrowRight className="flex-shrink-0 text-gray-400" />
      )}
    </div>
  );
}

export default function Verify() {
  const [username, setUsername] = useState<string>('');
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const router = useRouter();

  const submitUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to verify your account',
      });
      return;
    }

    try {
      const response = await axios.post('/api/verify', {
        username,
        userId: session.user.id,
      });

      if (response.status === 200) {
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
          title: 'Verification Successful',
          description: 'Your account has been verified.',
          className: 'bg-green-500',
        });
        router.push('/rooms');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 409:
            toast({
              variant: 'destructive',
              title: 'Username Conflict',
              description: 'This username is already verified by someone else.',
            });
            break;
          case 404:
            toast({
              variant: 'destructive',
              title: 'User Not Found',
              description: 'The provided username was not found on LeetCode.',
            });
            break;
          case 400:
            toast({
              variant: 'destructive',
              title: 'Verification Failed',
              description:
                'Vim skill not found. Please add it to your LeetCode profile and try again.',
            });
            break;
          default:
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'An unexpected error occurred. Please try again.',
            });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitUsername(event as any);
    }
    if (event.key === ' ') {
      event.preventDefault();
      toast({
        variant: 'destructive',
        title: 'Invalid Input',
        description: 'Username cannot contain spaces',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Verify Your Leetcode Account
        </h1>
        <form onSubmit={submitUsername} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your LeetCode username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-black"
          />
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-300 text-black relative py-2"
          >
            <span className="absolute left-1/2 transform -translate-x-1/2">
              Verify Username
            </span>
            <LogIn className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          </Button>
        </form>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">
            How to verify your account
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <VerificationStep key={index} number={index + 1} text={step} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
