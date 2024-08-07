"use client";

import { Textarea } from "@/components/ui/textarea";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { KeyboardEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function Verify() {
  const [username, setUsername] = useState<string>("");
  const { toast } = useToast();

  const submitUsername = async () => {
    try {
      console.log(username);
      const response = await axios.post("/api/verify", { username });
      console.log(response.data);
    } catch (err) {
      console.error("Error sending username to the backend", err);
    }
    //TODO: Add loader
  };
  const hadnleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitUsername();
    }
    if (event.key === " ") {
      toast({
        variant: "destructive",
        title: "Username cannot contain spaces",
      });
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center p-20">
      <div className="flex flex-col md:flex-row gap-2 w-full max-w-md">
        <Textarea
          className="text-black w-full md:w-80 resize-none h-15 md:h-10"
          placeholder="Enter your leetcode username here."
          onKeyDown={hadnleKeyDown}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          onClick={submitUsername}
          className="bg-yellow-500 hover:bg-yellow-300 text-black mt-2 md:mt-0">
          Send message
        </Button>
      </div>
      <h1 className="text-2xl font-semibold mb-10 mt-10">
        Add vim as skill before verifying. The steps to do so are given below
      </h1>
      <div className="flex flex-col md:flex-row mt-5">
        <Image
          src="/ver1.png"
          width={500}
          height={500}
          alt="Steps to add vim as skill - Part 1"
          className="mr-5"
        />
        <Image
          src="/ver2.png"
          width={500}
          height={500}
          alt="Steps to add vim as skill - Part 2"
        />
      </div>
      <Image
        src="/ver3.png"
        width={1000}
        height={100}
        alt="Steps to add vim as skill - Part 3"
      />
      <Image
        src="/ver4.png"
        width={1000}
        height={100}
        alt="Steps to add vim as skill - Part 4"
      />
    </div>
  );
}
