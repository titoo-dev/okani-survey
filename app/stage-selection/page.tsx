"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import { cities } from "@/lib/cities";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

export default function StageSelectionPage() {
  const [hasFiledAtAnuttc, setHasFiledAtAnuttc] = useState<string>("");
  const [email, setEmail] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [parcelLocation, setParcelLocation] = useState("");
  const [initiationCity, setInitiationCity] = useState("");
  const [residenceCity, setResidenceCity] = useState("");
  const [stageReached, setStageReached] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (hasFiledAtAnuttc === "non") {
      alert("Merci pour votre intérêt. Ce sondage est réservé aux usagers ayant introduit un dossier à l'ANUTTC.");
      router.push("/");
      return;
    }
    
    if (stageReached && email && filingDate && parcelLocation) {
      sessionStorage.setItem("stageReached", stageReached);
      sessionStorage.setItem("introEmail", email);
      sessionStorage.setItem("filingDate", filingDate);
      sessionStorage.setItem("parcelLocation", parcelLocation);
      sessionStorage.setItem("initiationCity", initiationCity);
      sessionStorage.setItem("residenceCity", residenceCity);
      router.push("/survey");
    }
  };

  const isFormValid = hasFiledAtAnuttc === "oui" && email && filingDate && parcelLocation && stageReached;

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
            <CardTitle>Informations préliminaires</CardTitle>
            <CardDescription>
              Quelques questions pour vérifier votre éligibilité et personnaliser l'enquête
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Avez-vous introduit un dossier à l'ANUTTC ?*</Label>
              <RadioGroup value={hasFiledAtAnuttc} onValueChange={setHasFiledAtAnuttc}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="filed-yes" />
                  <Label htmlFor="filed-yes" className="font-normal cursor-pointer">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="filed-no" />
                  <Label htmlFor="filed-no" className="font-normal cursor-pointer">Non</Label>
                </div>
              </RadioGroup>
            </div>

            {hasFiledAtAnuttc === "oui" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Pour vous envoyer une copie de vos réponses</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filingDate">Date de saisie*</Label>
                  <Input
                    id="filingDate"
                    type="date"
                    value={filingDate}
                    onChange={(e) => setFilingDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parcelLocation">Ville de dépôt du dossier*</Label>
                  <AutocompleteInput
                    id="parcelLocation"
                    value={parcelLocation}
                    onChange={setParcelLocation}
                    suggestions={cities}
                    placeholder="Saisissez ou sélectionnez une ville"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initiationCity">Ville de régularisation foncière (si différente)</Label>
                  <AutocompleteInput
                    id="initiationCity"
                    value={initiationCity}
                    onChange={setInitiationCity}
                    suggestions={cities}
                    placeholder="Optionnel - Saisissez ou sélectionnez une ville"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="residenceCity">Ville de résidence de l'usager</Label>
                  <AutocompleteInput
                    id="residenceCity"
                    value={residenceCity}
                    onChange={setResidenceCity}
                    suggestions={cities}
                    placeholder="Optionnel - Saisissez ou sélectionnez une ville"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stageReached">À quelle étape du dossier êtes-vous ?*</Label>
                  <Select value={stageReached} onValueChange={setStageReached}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choisissez une étape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="depot">Dépôt de dossier</SelectItem>
                      <SelectItem value="enquete">Enquête foncière</SelectItem>
                      <SelectItem value="etat-lieux">État des lieux</SelectItem>
                      <SelectItem value="affichage">Avis d'affichage</SelectItem>
                      <SelectItem value="bornage">PV et plan de bornage</SelectItem>
                      <SelectItem value="evaluation">Rapport d'évaluation</SelectItem>
                      <SelectItem value="decision">Décision et transmission</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Pourquoi ces informations ?</p>
                      <p className="mb-2">
                        En connaissant votre étape, nous pourrons vous poser des questions pertinentes uniquement 
                        sur les phases que vous avez effectivement traversées.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleContinue}
                    disabled={!isFormValid}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer vers l'enquête
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Button>
                </div>
              </>
            )}

            {hasFiledAtAnuttc === "non" && (
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Merci pour votre intérêt. Ce sondage est réservé aux usagers ayant introduit un dossier à l'ANUTTC.
                </p>
                <Button asChild variant="outline">
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="bg-muted/30 shadow-none">
            <CardContent>
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

