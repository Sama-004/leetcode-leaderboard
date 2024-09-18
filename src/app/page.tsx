import type { Metadata } from 'next';
import { Bell, Trophy, Users } from 'lucide-react';
import { technologies } from '@/components/technologies';
import { TechnologyLogo } from '@/components/technology-logo';
import Link from 'next/link';
import StaronGithub from '@/components/star_on_github';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ContinueWithGoogle from '@/components/continue-with-google';

export const metadata: Metadata = {
  title: 'LeetCode Friends Leaderboard',
  description:
    'Leetcode friends leaderboard. Track and compare LeetCode progress with your friends',
};

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    redirect('/verify');
  }
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">LeetCode Friends Leaderboard</h1>
        <StaronGithub />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Track LeetCode Progress with Friends
        </h2>
        <p className="text-xl mb-8 text-zinc-300 max-w-2xl mx-auto">
          Join Lc Friends Leaderboard to compare your LeetCode stats, create
          private rooms, and stay updated on your friends coding achievements.
          Motivate each other to improve and climb the rankings together!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Get Started button */}
          <div className="flex justify-center">
            <ContinueWithGoogle />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-800 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">What We Do?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Trophy className="h-12 w-12 text-yellow-400" />}
              title="LeetCode Stats Tracking"
              description="View and compare solved problems, contest ratings, and global rankings with your friends"
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-green-400" />}
              title="Private Rooms"
              description="Create or join exclusive rooms to track progress with specific groups of friends or colleagues."
            />
            <FeatureCard
              icon={<Bell className="h-12 w-12 text-blue-400" />}
              title="Notifications"
              description="Know what others are doing"
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h3 className="text-3xl font-bold mb-6">Built With</h3>
        <div className="flex justify-center items-center space-x-8">
          {technologies.map((tech) => (
            <TechnologyLogo key={tech.name} name={tech.name} logo={tech.logo} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-400">
          <Link href="https://github.com/sama-004">github.com/sama-004</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-700 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-zinc-300">{description}</p>
    </div>
  );
}
