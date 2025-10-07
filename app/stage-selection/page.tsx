import type { Metadata } from "next";
import { getDescriptors } from "@/app/actions/stage-selection";
import { StageSelectionForm } from "./_components/stage-selection-form";

export const metadata: Metadata = {
  title: "Sélection de l'étape | Enquête ANUTTC",
  description:
    "Identification de votre situation dans le processus foncier ANUTTC",
};

export default async function StageSelectionPage() {
  // Fetch stages from database
  const { data: stages } = await getDescriptors("stage");

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <StageSelectionForm stages={stages || []} />
      </div>
    </main>
  );
}
