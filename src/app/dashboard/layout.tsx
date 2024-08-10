import Nav from "@/components/Nav";
import type { Metadata } from "next";

// TODO: Remove this and add this logic in the page components
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <div className="flex-1 ml-20 mt-20 sm:ml-60 lg:ml-60">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
