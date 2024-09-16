'use client';

import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/spinner';

export function UsernameInput() {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setIsLoading(true);
      const response = await axios.post('/api/verify', {
        username,
        userId: session.user.id,
      });

      if (response.status === 200) {
        setIsLoading(false);
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
          className: 'bg-green-500 border-none',
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
    } finally {
      setIsLoading(false);
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
    <form onSubmit={submitUsername} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter your LeetCode username"
        value={username}
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full text-black"
      />
      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-300 text-black relative py-2"
        disabled={isLoading}
      >
        {!isLoading ? (
          <>
            <span className="absolute left-1/2 transform -translate-x-1/2">
              Verify Username
            </span>
            <LogIn className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Button>
    </form>
  );
}
