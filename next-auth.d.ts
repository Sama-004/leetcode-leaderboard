import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null; //TODO: Maybe this needs a change or maybe not
      leetCodeUsername?: string | null;
      isVerified?: boolean | false;
    };
    accessToken?: string;
  }
}
