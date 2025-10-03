"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

type SectionStatus = "completed" | "current" | "upcoming";

interface Section {
  id: number;
  title: string;
  description: string;
  status: SectionStatus;
  estimatedTime: string;
}

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    stageReached: "",
    dossierNumber: "",
    city: "",
    procedureType: "",
    startYear: "",
    age: "",
    gender: "",
    nationality: "Gabonaise",
    legalEntity: "",
    email: "",
    satisfaction1: [3],
    delays1: "",
    courtesy1: [4],
    difficulties1: "",
    suggestions1: "",
  });

  const sections: Section[] = [
    { id: 0, title: "Étape atteinte", description: "Identification de votre situation", status: currentStep === 0 ? "current" : currentStep > 0 ? "completed" : "upcoming", estimatedTime: "30 sec" },
    { id: 1, title: "Profil de l'usager", description: "Informations de base", status: currentStep === 1 ? "current" : currentStep > 1 ? "completed" : "upcoming", estimatedTime: "1 min" },
    { id: 2, title: "Dépôt de dossier", description: "Évaluation étape 1", status: currentStep === 2 ? "current" : currentStep > 2 ? "completed" : "upcoming", estimatedTime: "2 min" },
    { id: 3, title: "Enquête foncière", description: "Évaluation étape 2", status: currentStep === 3 ? "current" : currentStep > 3 ? "completed" : "upcoming", estimatedTime: "2 min" },
    { id: 4, title: "Avis d'affichage", description: "Évaluation étape 3", status: currentStep === 4 ? "current" : currentStep > 4 ? "completed" : "upcoming", estimatedTime: "2 min" },
    { id: 5, title: "PV et plan de bornage", description: "Évaluation étape 4", status: currentStep === 5 ? "current" : currentStep > 5 ? "completed" : "upcoming", estimatedTime: "2 min" },
    { id: 6, title: "Rapport d'évaluation", description: "Évaluation étape 5", status: currentStep === 6 ? "current" : currentStep > 6 ? "completed" : "upcoming", estimatedTime: "2 min" },
    { id: 7, title: "Décision finale", description: "Évaluation étape 6", status: currentStep === 7 ? "current" : currentStep > 7 ? "completed" : "upcoming", estimatedTime: "2 min" },
    { id: 8, title: "Évaluation globale", description: "Impressions générales", status: currentStep === 8 ? "current" : currentStep > 8 ? "completed" : "upcoming", estimatedTime: "1 min" },
  ];

  const totalSteps = sections.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="stageReached">Jusqu'à quelle étape votre procédure est-elle arrivée ?*</Label>
              <Select value={formData.stageReached} onValueChange={(value) => setFormData({ ...formData, stageReached: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une étape" />
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
              <p className="text-sm text-muted-foreground">Cette information nous aidera à personnaliser les questions</p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dossierNumber">Numéro de dossier (optionnel)</Label>
              <Input
                id="dossierNumber"
                placeholder="Ex: 2024-LBV-001234"
                value={formData.dossierNumber}
                onChange={(e) => setFormData({ ...formData, dossierNumber: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Pour contextualiser vos réponses (anonymat garanti)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville de la procédure*</Label>
                <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="libreville">Libreville</SelectItem>
                    <SelectItem value="lambarene">Lambaréné</SelectItem>
                    <SelectItem value="mouila">Mouila</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="procedureType">Type de procédure*</Label>
                <Select value={formData.procedureType} onValueChange={(value) => setFormData({ ...formData, procedureType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attribution">Attribution foncière</SelectItem>
                    <SelectItem value="regularisation">Régularisation foncière</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startYear">Année de début*</Label>
                <Input
                  id="startYear"
                  type="number"
                  placeholder="Ex: 2023"
                  value={formData.startYear}
                  onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Âge*</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Ex: 35"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sexe*</Label>
              <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="homme" id="homme" />
                  <Label htmlFor="homme" className="font-normal cursor-pointer">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="femme" id="femme" />
                  <Label htmlFor="femme" className="font-normal cursor-pointer">Femme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="autre" id="autre" />
                  <Label htmlFor="autre" className="font-normal cursor-pointer">Autre</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Personnalité juridique*</Label>
              <RadioGroup value={formData.legalEntity} onValueChange={(value) => setFormData({ ...formData, legalEntity: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="physique" id="physique" />
                  <Label htmlFor="physique" className="font-normal cursor-pointer">Personne physique</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morale" id="morale" />
                  <Label htmlFor="morale" className="font-normal cursor-pointer">Personne morale</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Pour vous envoyer une copie de vos réponses</p>
            </div>
          </div>
        );

      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label>Niveau de satisfaction global*</Label>
              <div className="space-y-2">
                <Slider
                  value={formData.satisfaction1}
                  onValueChange={(value) => setFormData({ ...formData, satisfaction1: value })}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Très insatisfait</span>
                  <span className="font-semibold text-foreground">{formData.satisfaction1[0]}/5</span>
                  <span>Très satisfait</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delays1">Délais de traitement*</Label>
              <Select value={formData.delays1} onValueChange={(value) => setFormData({ ...formData, delays1: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Évaluez les délais" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rapide">Moins de 1 mois</SelectItem>
                  <SelectItem value="acceptable">1 à 3 mois</SelectItem>
                  <SelectItem value="long">3 à 6 mois</SelectItem>
                  <SelectItem value="tres-long">Plus de 6 mois</SelectItem>
                  <SelectItem value="encours">Toujours en cours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Courtoisie et qualité du service*</Label>
              <div className="space-y-2">
                <Slider
                  value={formData.courtesy1}
                  onValueChange={(value) => setFormData({ ...formData, courtesy1: value })}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Très mauvais</span>
                  <span className="font-semibold text-foreground">{formData.courtesy1[0]}/5</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulties1">Principales difficultés rencontrées</Label>
              <Textarea
                id="difficulties1"
                placeholder="Décrivez les obstacles ou problèmes..."
                value={formData.difficulties1}
                onChange={(e) => setFormData({ ...formData, difficulties1: e.target.value })}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">Optionnel</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="suggestions1">Suggestions d'amélioration</Label>
              <Textarea
                id="suggestions1"
                placeholder="Comment améliorer cette étape ? (max. 50 mots)"
                value={formData.suggestions1}
                onChange={(e) => setFormData({ ...formData, suggestions1: e.target.value })}
                rows={3}
                maxLength={250}
              />
              <p className="text-sm text-muted-foreground">Optionnel - Maximum 50 mots</p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label>Satisfaction globale de votre expérience*</Label>
              <div className="space-y-2">
                <Slider
                  value={formData.satisfaction1}
                  onValueChange={(value) => setFormData({ ...formData, satisfaction1: value })}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Très insatisfait</span>
                  <span className="font-semibold text-foreground">{formData.satisfaction1[0]}/5</span>
                  <span>Très satisfait</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Recommanderiez-vous l'ANUTTC ?*</Label>
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="rec-oui" />
                  <Label htmlFor="rec-oui" className="font-normal cursor-pointer">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="rec-non" />
                  <Label htmlFor="rec-non" className="font-normal cursor-pointer">Non</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="peut-etre" id="rec-maybe" />
                  <Label htmlFor="rec-maybe" className="font-normal cursor-pointer">Peut-être</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Pourquoi ?</Label>
              <Textarea
                id="reason"
                placeholder="Expliquez votre choix..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="generalSuggestions">Suggestions générales</Label>
              <Textarea
                id="generalSuggestions"
                placeholder="Vos recommandations pour améliorer le service foncier (max. 100 mots)"
                rows={5}
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground">Optionnel - Maximum 100 mots</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-8 space-y-6">
              <Card className="border-2 shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Progression</CardTitle>
                  <CardDescription>
                    Étape {currentStep + 1} sur {totalSteps}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.round(progressPercentage)}% complété
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Sections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        section.status === "current"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : section.status === "completed"
                            ? "bg-secondary/20 text-foreground hover:bg-secondary/30"
                            : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          section.status === "completed"
                            ? "bg-secondary text-secondary-foreground"
                            : section.status === "current"
                              ? "bg-primary-foreground text-primary"
                              : "bg-muted text-muted-foreground"
                        }`}>
                          {section.status === "completed" ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            section.id + 1
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{section.title}</p>
                          <p className="text-xs opacity-80 truncate">{section.description}</p>
                        </div>
                        <span className="text-xs opacity-60">{section.estimatedTime}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-accent/10 border-accent shadow-none">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-semibold text-accent-foreground">Information</p>
                      <p className="text-muted-foreground mt-1">Les champs marqués d'un astérisque (*) sont obligatoires.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <Card className="border-2 shadow-none">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{sections[currentStep].title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {sections[currentStep].description}
                    </CardDescription>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {sections[currentStep].estimatedTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Précédent
                </Button>

                {currentStep === totalSteps - 1 ? (
                  <Button onClick={handleSubmit} size="lg" className="shadow-lg">
                    Soumettre l'enquête
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </Button>
                ) : (
                  <Button onClick={handleNext} size="lg" className="shadow-lg">
                    Suivant
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card className="mt-6 bg-muted/30 shadow-none">
              <CardContent>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Besoin d'aide ?</p>
                    <p className="mt-1">Si vous rencontrez des difficultés, contactez-nous à <a href="mailto:support@okanisurvey.com" className="text-primary hover:underline">support@okanisurvey.com</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

