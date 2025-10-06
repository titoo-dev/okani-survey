import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StarRating } from "@/components/ui/star-rating";

type GovernanceData = {
  hasUnofficialPayment: string;
  hasFavoritism: string;
  trustTransparency: number[];
};

type GovernanceStepProps = {
  formData: GovernanceData;
  updateFormData: (updates: Partial<GovernanceData>) => void;
};

export function GovernanceStep({ formData, updateFormData }: GovernanceStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Gouvernance et probité</h2>
        <p className="text-gray-600 mb-6">
          Questions sur la transparence et l'intégrité du processus
        </p>
      </div>

      <div className="space-y-2">
        <Label>Avez-vous été sollicité pour un paiement non officiel ?*</Label>
        <RadioGroup value={formData.hasUnofficialPayment} onValueChange={(value) => updateFormData({ hasUnofficialPayment: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="unofficial-yes" />
            <Label htmlFor="unofficial-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="unofficial-no" />
            <Label htmlFor="unofficial-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Avez-vous constaté un favoritisme ou conflit d'intérêts ?*</Label>
        <RadioGroup value={formData.hasFavoritism} onValueChange={(value) => updateFormData({ hasFavoritism: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="favoritism-yes" />
            <Label htmlFor="favoritism-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="favoritism-no" />
            <Label htmlFor="favoritism-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Faites-vous confiance à la transparence du processus ?*</Label>
        <StarRating
          value={formData.trustTransparency[0] || 0}
          onChange={(value) => updateFormData({ trustTransparency: [value] })}
          max={5}
          min={2}
          size="lg"
        />
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Confidentialité</p>
            <p>
              Vos réponses sont anonymes et seront utilisées uniquement pour améliorer le service foncier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function validateGovernanceStep(
  formData: Pick<GovernanceData, "hasUnofficialPayment" | "hasFavoritism" | "trustTransparency">
): boolean {
  const trustValue = formData.trustTransparency?.[0];
  return !!(
    formData.hasUnofficialPayment &&
    formData.hasFavoritism &&
    trustValue !== undefined &&
    trustValue >= 2 &&
    trustValue <= 4
  );
}

