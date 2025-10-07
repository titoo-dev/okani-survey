"use client";

import { FileText, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type StageSelectionState,
  validateStageSelection,
} from "@/app/actions/stage-selection";

type Descriptor = {
  id: string;
  type: string;
  value: string;
  label: string;
};

type StageSelectionFormProps = {
  stages: Descriptor[];
};

export function StageSelectionForm({ stages }: StageSelectionFormProps) {
  const [hasFiledAtAnuttc, setHasFiledAtAnuttc] = useState<boolean | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [stageReached, setStageReached] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [state, formAction] = useActionState<StageSelectionState, FormData>(
    validateStageSelection,
    { success: false },
  );

  useEffect(() => {
    if (state.success && state.data) {
      // Store in sessionStorage
      sessionStorage.setItem("stageReached", state.data.stageReached);
      sessionStorage.setItem("userEmail", state.data.email);
      // Navigate to survey page
      startTransition(() => {
        router.push("/survey");
      });
    } else if (!state.success && state.alreadySubmitted) {
      // Redirect to already submitted page
      startTransition(() => {
        router.push("/stage-selection/already-submitted");
      });
    } else if (!state.success && state.errors && state.errors.length > 0) {
      setValidationErrors(state.errors);
      setShowErrorDialog(true);
    }
  }, [state, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasFiledAtAnuttc === false) {
      toast.error(
        "Ce sondage est réservé aux usagers ayant introduit un dossier à l'ANUTTC.",
      );
      return;
    }

    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  const isFormValid = hasFiledAtAnuttc === true && email && stageReached;

  return (
    <>
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
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
            <p className="text-muted-foreground">
              Identification de votre situation
            </p>
          </div>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Informations préliminaires</CardTitle>
          <CardDescription>
            Quelques questions pour vérifier votre éligibilité et personnaliser
            l'enquête
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="hidden"
              name="hasFiledAtAnuttc"
              value={hasFiledAtAnuttc?.toString() || ""}
            />

            <div className="space-y-2">
              <Label>Avez-vous introduit un dossier à l'ANUTTC ?*</Label>
              <RadioGroup
                value={
                  hasFiledAtAnuttc === null ? "" : String(hasFiledAtAnuttc)
                }
                onValueChange={(value) => setHasFiledAtAnuttc(value === "true")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="filed-yes" />
                  <Label
                    htmlFor="filed-yes"
                    className="font-normal cursor-pointer"
                  >
                    Oui
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="filed-no" />
                  <Label
                    htmlFor="filed-no"
                    className="font-normal cursor-pointer"
                  >
                    Non
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {hasFiledAtAnuttc === true && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Pour vous envoyer une copie de vos réponses
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stageReached">
                    À quelle étape du dossier êtes-vous ?*
                  </Label>
                  <Select
                    name="stageReached"
                    value={stageReached}
                    onValueChange={setStageReached}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choisissez une étape" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">
                        Pourquoi ces informations ?
                      </p>
                      <p className="mb-2">
                        En connaissant votre étape, nous pourrons vous poser des
                        questions pertinentes uniquement sur les phases que vous
                        avez effectivement traversées.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isPending}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Validation...
                      </>
                    ) : (
                      <>
                        Continuer vers l'enquête
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {hasFiledAtAnuttc === false && (
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Merci pour votre intérêt. Ce sondage est réservé aux usagers
                  ayant introduit un dossier à l'ANUTTC.
                </p>
                <Button asChild variant="outline">
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card className="bg-muted/30 shadow-none">
          <CardContent>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Support technique WhatsApp
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <a
                    href="https://wa.me/24176000000"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +241 76 00 00 00
                  </a>
                  <a
                    href="https://wa.me/24166000000"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +241 66 00 00 00
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Données invalides</AlertDialogTitle>
            <AlertDialogDescription>
              Veuillez corriger les erreurs suivantes avant de continuer:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              Compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

