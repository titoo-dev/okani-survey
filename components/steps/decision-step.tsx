import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StarRating } from "@/components/ui/star-rating";
import { PAYMENT_MODES } from "@/lib/descriptors";

type DecisionData = {
  decisionDelay: string;
  decisionPaymentMode: string;
  decisionOtherPaymentMode: string;
  decisionHasReceipt: boolean | undefined;
  wasTransmitted: boolean | undefined;
  hasActeCession: boolean | undefined;
  hasTitrePropriete: boolean | undefined;
  decisionSatisfaction: number[];
};

type DecisionStepProps = {
  formData: DecisionData;
  updateFormData: (updates: Partial<DecisionData>) => void;
};

export function DecisionStep({ formData, updateFormData }: DecisionStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="decisionDelay">Délais de signature et transmission du dossier à la Conservation foncière (en jours)*</Label>
        <Input
          id="decisionDelay"
          type="number"
          placeholder="Nombre de jours"
          value={formData.decisionDelay}
          onChange={(e) => updateFormData({ decisionDelay: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement (prix de cession + droits d'enregistrement)*</Label>
        <Select value={formData.decisionPaymentMode} onValueChange={(value) => updateFormData({ decisionPaymentMode: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un mode de paiement" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_MODES.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.decisionPaymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="decisionOtherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="decisionOtherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.decisionOtherPaymentMode}
            onChange={(e) => updateFormData({ decisionOtherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
        <RadioGroup value={formData.decisionHasReceipt?.toString()} onValueChange={(value) => updateFormData({ decisionHasReceipt: value === "true" })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="decision-receipt-yes" />
            <Label htmlFor="decision-receipt-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="decision-receipt-no" />
            <Label htmlFor="decision-receipt-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Dossier effectivement transmis à la Conservation foncière ?*</Label>
        <RadioGroup value={formData.wasTransmitted?.toString()} onValueChange={(value) => updateFormData({ wasTransmitted: value === "true" })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="transmitted-yes" />
            <Label htmlFor="transmitted-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="transmitted-no" />
            <Label htmlFor="transmitted-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Avez-vous reçu votre acte de cession/concession établi par l'ANUTTC ?*</Label>
        <RadioGroup value={formData.hasActeCession?.toString()} onValueChange={(value) => updateFormData({ hasActeCession: value === "true" })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="acte-yes" />
            <Label htmlFor="acte-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="acte-no" />
            <Label htmlFor="acte-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Avez-vous effectivement reçu le titre de propriété remis par l'ANUTTC après établissement par la Conservation foncière ?*</Label>
        <RadioGroup value={formData.hasTitrePropriete?.toString()} onValueChange={(value) => updateFormData({ hasTitrePropriete: value === "true" })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="titre-yes" />
            <Label htmlFor="titre-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="titre-no" />
            <Label htmlFor="titre-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Satisfaction sur cette étape (acte + transmission + remise du titre)*</Label>
        <StarRating
          value={formData.decisionSatisfaction[0] || 0}
          onChange={(value) => updateFormData({ decisionSatisfaction: [value] })}
          max={10}
          size="lg"
        />
      </div>
    </div>
  );
}

export function validateDecisionStep(
  formData: Pick<DecisionData, "decisionDelay" | "decisionPaymentMode" | "decisionOtherPaymentMode" | "decisionHasReceipt" | "wasTransmitted" | "hasActeCession" | "hasTitrePropriete" | "decisionSatisfaction">
): boolean {
  const baseValidation = !!(
    formData.decisionDelay &&
    formData.decisionPaymentMode &&
    formData.decisionHasReceipt !== undefined &&
    formData.wasTransmitted !== undefined &&
    formData.hasActeCession !== undefined &&
    formData.hasTitrePropriete !== undefined &&
    formData.decisionSatisfaction?.[0]
  );

  if (formData.decisionPaymentMode === "autre") {
    return baseValidation && !!formData.decisionOtherPaymentMode;
  }

  return baseValidation;
}

