import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testing",
  description: "Testing",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="sm:ml-60 p-4">{children}</main>
      {/* {children} */}
    </div>
  );
}
