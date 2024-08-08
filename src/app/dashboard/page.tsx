"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <Button onClick={() => signOut()} className="bg-white text-black">
        Sign Out
      </Button>
      <br />
      <h2>Dashboard page</h2>
    </div>
  );
}
