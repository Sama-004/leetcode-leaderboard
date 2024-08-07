"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <div>
      <button onClick={() => signIn()}>Signin</button>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
      {/* TODO: Fix getting error when trying to signin after signout*/}
      {status === "authenticated" ? (
        // redirect to verification page
        redirect("/verify")
      ) : (
        <div>Does not work</div>
      )}
    </div>
  );
}
