"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <div>
      <button onClick={() => signIn()}>Signin</button>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
      {status === "authenticated" ? <div>Works</div> : <div>Does not work</div>}
    </div>
  );
}
