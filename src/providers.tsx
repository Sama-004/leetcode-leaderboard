'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { SessionProvider } from 'next-auth/react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST as string,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  });
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PostHogProvider client={posthog}>{children}</PostHogProvider>
    </SessionProvider>
  );
}
