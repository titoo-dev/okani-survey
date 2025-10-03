"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

export default function StageSelectionPage() {
  const [stageReached, setStageReached] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (stageReached) {
      sessionStorage.setItem("stageReached", stageReached);
      router.push("/survey");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Étape atteinte</h1>
              <p className="text-muted-foreground">Identification de votre situation</p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Jusqu'à quelle étape êtes-vous arrivé ?</CardTitle>
            <CardDescription>
              Cette information nous aidera à personnaliser les questions de l'enquête selon votre expérience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="stageReached">Sélectionnez votre étape actuelle*</Label>
              <Select value={stageReached} onValueChange={setStageReached}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choisissez une étape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="depot">Dépôt de dossier</SelectItem>
                  <SelectItem value="enquete">Enquête foncière</SelectItem>
                  <SelectItem value="affichage">Avis d'affichage</SelectItem>
                  <SelectItem value="bornage">PV et plan de bornage</SelectItem>
                  <SelectItem value="evaluation">Rapport d'évaluation</SelectItem>
                  <SelectItem value="decision">Décision</SelectItem>
                  <SelectItem value="encours">En cours</SelectItem>
                  <SelectItem value="litigieux">Litigieux</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">Pourquoi cette information ?</p>
                  <p className="mb-2">
                    En connaissant votre étape, nous pourrons vous poser des questions pertinentes uniquement 
                    sur les phases que vous avez effectivement traversées.
                  </p>
                  <p className="text-xs">
                    💡 L'enquête affichera : votre profil + l'étape que vous sélectionnez + toutes les étapes suivantes + l'évaluation globale.
                    Les étapes précédentes seront automatiquement ignorées.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleContinue}
                disabled={!stageReached}
                size="lg"
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer vers l'enquête
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="bg-muted/30 shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Besoin d'aide ?</p>
                  <p className="mt-1">
                    Si vous rencontrez des difficultés, contactez-nous à{" "}
                    <a href="mailto:support@okanisurvey.com" className="text-primary hover:underline">
                      support@okanisurvey.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

