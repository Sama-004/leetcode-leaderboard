import { ArrowRight } from 'lucide-react';
import { UsernameInput } from './username-input';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify',
  description: 'Verify your LeetCode account to get access to the leaderboards',
};

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
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Verify Your Leetcode Account
        </h1>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">
            How to verify your account
          </h2>
          <UsernameInput />
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
