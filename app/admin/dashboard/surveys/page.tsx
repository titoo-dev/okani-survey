import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSurveysPaginated } from "@/app/actions/dashboard";
import { SurveysClient } from "./_components/surveys-client";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  city?: string;
  stage?: string;
  page?: string;
}>;

export default async function SurveysPage({
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
  const page = params.page ? Number.parseInt(params.page) : 1;
  
  const filters = {
    city: params.city,
    stage: params.stage,
    page,
    limit: 10,
  };

  const data = await getSurveysPaginated(filters);

  return <SurveysClient initialData={data} initialFilters={filters} />;
}

