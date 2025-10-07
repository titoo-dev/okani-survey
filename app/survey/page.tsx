import type { Metadata } from "next";
import { getAllDescriptors } from "@/app/actions/stage-selection";
import { SurveyClient } from "./_components/survey-client";

export const metadata: Metadata = {
  title: "Enquête de satisfaction | ANUTTC",
  description:
    "Partagez votre expérience avec les services fonciers de l'ANUTTC",
};

export default async function SurveyPage() {
  // Fetch all descriptors from database
  const { data: descriptors } = await getAllDescriptors();

  return <SurveyClient descriptors={descriptors || {}} />;
}
