import type { Metadata } from "next";
import { CheckCircle2, Mail, Home, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Enquête soumise avec succès | ANUTTC",
  description: "Votre enquête de satisfaction a été soumise avec succès",
};

export default function SurveySuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center py-12 px-4">
      <div className="container max-w-2xl">
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                Enquête soumise avec succès !
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Merci pour votre participation précieuse
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      Confirmation par email
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Un résumé complet de vos réponses a été envoyé à votre
                      adresse email. Vérifiez votre boîte de réception (et vos
                      spams si nécessaire).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      Contribution importante
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Vos retours aideront la DGCBF à améliorer les services
                      fonciers de l'ANUTTC pour tous les citoyens gabonais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4">
                <p className="text-xs sm:text-sm text-foreground">
                  <span className="font-semibold">Note importante :</span> Vos
                  réponses sont strictement confidentielles et seront utilisées
                  uniquement dans le cadre de cette étude menée par OKANI pour
                  le compte de la DGCBF.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="w-full sm:flex-1" size="lg">
                <Link href="/" className="flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>

            <div className="text-center text-xs sm:text-sm text-muted-foreground pt-4 border-t">
              <p>
                Pour toute question, contactez-nous via WhatsApp au{" "}
                <a
                  href="https://wa.me/24165164085"
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +241 65 16 40 85
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

