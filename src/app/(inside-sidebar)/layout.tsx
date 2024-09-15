import type { Metadata } from 'next';
import Sidenav from './sidebar';

// TODO: Remove this and add this logic in the page components
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidenav />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-6">
        {children}
      </main>
    </div>
  );
}
