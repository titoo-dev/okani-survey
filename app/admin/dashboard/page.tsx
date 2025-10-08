import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getDashboardStats } from "@/app/actions/dashboard";
import { DashboardClient } from "./_components/dashboard-client";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  city?: string;
  stage?: string;
}>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth/signin");
  }

  const params = await searchParams;
  const filters = {
    city: params.city,
    stage: params.stage,
  };

  const data = await getDashboardStats(filters);

  return <DashboardClient initialData={data} initialFilters={filters} />;
}

