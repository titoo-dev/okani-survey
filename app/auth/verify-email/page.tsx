import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-2">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                Vérifiez votre email
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Enquête de Satisfaction ANUTTC
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pb-8 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-4">
              <div className="space-y-3 text-center">
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  Nous avons envoyé un lien de vérification à votre adresse email.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Veuillez consulter votre boîte de réception (et vos spams si nécessaire) et cliquer sur le lien pour vérifier votre compte.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4">
              <p className="text-xs sm:text-sm text-foreground">
                <span className="font-semibold">Note :</span> Le lien de vérification est valable pendant 24 heures. Si vous ne recevez pas l'email, vérifiez votre dossier spam.
              </p>
            </div>

            <div className="text-center text-xs sm:text-sm text-muted-foreground pt-4 border-t">
              <p>
                Besoin d'aide ? Contactez-nous via WhatsApp au{" "}
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

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 OKANI Survey - DGCBF. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

