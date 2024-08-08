import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import HomePage from "@/components/homepage";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    redirect("/verify");
  }

  return (
    <div>
      <HomePage />
    </div>
  );
}
