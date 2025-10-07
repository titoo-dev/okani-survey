import type { Metadata } from "next";
import { XCircle, Mail, Home, Phone } from "lucide-react";
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
  title: "Enquête déjà soumise | ANUTTC",
  description: "Cette adresse email a déjà soumis une enquête",
};

export default function AlreadySubmittedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center py-12 px-4">
      <div className="container max-w-2xl">
        <Card className="shadow-2xl border-2 border-orange-200">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-orange-600" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-orange-600">
                Enquête déjà soumise
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Cette adresse email a déjà été utilisée
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-lg p-4 sm:p-6 space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      Participation déjà enregistrée
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Notre système indique que cette adresse email a déjà été
                      utilisée pour soumettre une enquête. Chaque participant ne
                      peut soumettre qu'une seule enquête.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 rounded-r-lg p-4">
                <p className="text-xs sm:text-sm text-foreground">
                  <span className="font-semibold">Note importante :</span> Si
                  vous pensez qu'il s'agit d'une erreur ou si vous avez besoin de
                  modifier vos réponses, veuillez contacter notre équipe support
                  via WhatsApp.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      Support technique WhatsApp
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Notre équipe est disponible pour vous aider
                    </p>
                    <div className="flex flex-col gap-2 pt-1">
                      <a
                        href="https://wa.me/24176000000"
                        className="text-primary hover:underline font-medium text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +241 76 00 00 00
                      </a>
                      <a
                        href="https://wa.me/24166000000"
                        className="text-primary hover:underline font-medium text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +241 66 00 00 00
                      </a>
                    </div>
                  </div>
                </div>
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
                Merci d'avoir participé à cette enquête menée par OKANI pour le
                compte de la DGCBF.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

