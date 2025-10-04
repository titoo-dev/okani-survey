import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

type DecisionData = {
  decisionDelay: string;
  decisionPaymentMode: string;
  decisionOtherPaymentMode: string;
  decisionHasReceipt: string;
  wasTransmitted: string;
  hasActeCession: string;
  hasTitrePropriete: string;
  decisionSatisfaction: number[];
};

type DecisionStepProps = {
  formData: DecisionData;
  updateFormData: (updates: Partial<DecisionData>) => void;
};

const paymentModes = [
  { value: "especes", label: "Espèces" },
  { value: "cheque", label: "Chèque" },
  { value: "virement", label: "Virement" },
  { value: "mobile-money", label: "Mobile Money" },
  { value: "money-banking", label: "Money Banking" },
  { value: "autre", label: "Autre (Préciser...)" },
];

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
            {paymentModes.map((mode) => (
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
        <RadioGroup value={formData.decisionHasReceipt} onValueChange={(value) => updateFormData({ decisionHasReceipt: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="decision-receipt-yes" />
            <Label htmlFor="decision-receipt-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="decision-receipt-no" />
            <Label htmlFor="decision-receipt-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Dossier effectivement transmis à la Conservation foncière ?*</Label>
        <RadioGroup value={formData.wasTransmitted} onValueChange={(value) => updateFormData({ wasTransmitted: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="transmitted-yes" />
            <Label htmlFor="transmitted-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="transmitted-no" />
            <Label htmlFor="transmitted-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Avez-vous reçu votre acte de cession/concession établi par l'ANUTTC ?*</Label>
        <RadioGroup value={formData.hasActeCession} onValueChange={(value) => updateFormData({ hasActeCession: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="acte-yes" />
            <Label htmlFor="acte-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="acte-no" />
            <Label htmlFor="acte-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Avez-vous effectivement reçu le titre de propriété remis par l'ANUTTC après établissement par la Conservation foncière ?*</Label>
        <RadioGroup value={formData.hasTitrePropriete} onValueChange={(value) => updateFormData({ hasTitrePropriete: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="titre-yes" />
            <Label htmlFor="titre-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="titre-no" />
            <Label htmlFor="titre-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Satisfaction sur cette étape (acte + transmission + remise du titre)*</Label>
        <div className="space-y-2">
          <Slider
            value={formData.decisionSatisfaction}
            onValueChange={(value) => updateFormData({ decisionSatisfaction: value })}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Très insatisfait</span>
            <span className="font-semibold text-foreground">{formData.decisionSatisfaction[0]}/10</span>
            <span>Très satisfait</span>
          </div>
        </div>
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
    formData.decisionHasReceipt &&
    formData.wasTransmitted &&
    formData.hasActeCession &&
    formData.hasTitrePropriete &&
    formData.decisionSatisfaction?.[0]
  );

  if (formData.decisionPaymentMode === "autre") {
    return baseValidation && !!formData.decisionOtherPaymentMode;
  }

  return baseValidation;
}

