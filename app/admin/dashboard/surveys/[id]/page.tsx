import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSurveyById } from "@/app/actions/dashboard";
import { SurveyDetailClient } from "./_components/survey-detail-client";

export const dynamic = "force-dynamic";

type Params = Promise<{
  id: string;
}>;

export default async function SurveyDetailPage({
  params,
}: {
  params: Params;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth/signin");
  }

  const { id } = await params;
  const survey = await getSurveyById(id);

  if (!survey) {
    return notFound();
  }

  return <SurveyDetailClient survey={survey} />;
}
