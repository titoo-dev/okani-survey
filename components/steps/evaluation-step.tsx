import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type EvaluationData = {
  hasCompletedStep: string;
  evaluation: string;
  paymentMode: string;
  paymentDate: string;
  paymentRecipient: string;
  hasReceipt: string;
  otherPaymentMode: string;
};

type EvaluationStepProps = {
  formData: EvaluationData;
  updateFormData: (updates: Partial<EvaluationData>) => void;
  stepTitle: string;
  stepKey: string;
};

const getStepQuestion = (stepKey: string) => {
  const questions: Record<string, string> = {
    depot: "Avez-vous procédé au règlement de votre dépôt de dossier à l'ANUTTC ?",
    enquete: "Avez-vous fait l'enquête foncière ?",
    "etat-lieux": "Avez-vous fait l'état des lieux ?",
    affichage: "L'avis d'affichage est-il effectif ?",
    bornage: "Le Procès-verbal et le plan de bornage ont-ils été réalisés ?",
    evaluation: "Le rapport d'évaluation a-t-il été fait ?",
  };
  return questions[stepKey] || "Avez-vous complété cette étape ?";
};

const evaluationOptions = [
  { value: "excellent", label: "Excellent" },
  { value: "tres-bien", label: "Très bien" },
  { value: "bien", label: "Bien" },
  { value: "assez-bien", label: "Assez bien" },
  { value: "passable", label: "Passable" },
  { value: "mediocre", label: "Médiocre" },
];

export function EvaluationStep({ formData, updateFormData, stepTitle, stepKey }: EvaluationStepProps) {
  const stepQuestion = getStepQuestion(stepKey);

  return (
    <div className="space-y-6">
      {stepKey === "enquete" && (
        <div className="space-y-2">
          <Label>Évaluation possible*</Label>
          <Select value={formData.evaluation} onValueChange={(value) => updateFormData({ evaluation: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une évaluation" />
            </SelectTrigger>
            <SelectContent>
              {evaluationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {stepKey === "depot" && (
        <div className="space-y-2">
          <Label>Comment évaluez-vous l'accueil à l'ANUTTC ?*</Label>
          <Select value={formData.evaluation} onValueChange={(value) => updateFormData({ evaluation: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une évaluation" />
            </SelectTrigger>
            <SelectContent>
              {evaluationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>{stepQuestion}*</Label>
        <RadioGroup value={formData.hasCompletedStep} onValueChange={(value) => updateFormData({ hasCompletedStep: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="completed-yes" />
            <Label htmlFor="completed-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="completed-no" />
            <Label htmlFor="completed-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.hasCompletedStep === "oui" && (
        <>
          <div className="space-y-2">
            <Label>Quel était le mode de paiement ?*</Label>
            <Select value={formData.paymentMode} onValueChange={(value) => updateFormData({ paymentMode: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un mode de paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="especes">Espèces</SelectItem>
                <SelectItem value="cheque">Chèque</SelectItem>
                <SelectItem value="virement">Virement</SelectItem>
                <SelectItem value="money-banking">Money Banking</SelectItem>
                <SelectItem value="autre">Autres (Préciser...)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.paymentMode === "autre" && (
            <div className="space-y-2">
              <Label htmlFor="otherPaymentMode">Précisez le mode de paiement*</Label>
              <Input
                id="otherPaymentMode"
                placeholder="Ex: Mobile money"
                value={formData.otherPaymentMode}
                onChange={(e) => updateFormData({ otherPaymentMode: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Date ?*</Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => updateFormData({ paymentDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>À qui avez-vous réglé ce paiement ?*</Label>
            <RadioGroup value={formData.paymentRecipient} onValueChange={(value) => updateFormData({ paymentRecipient: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agent-anuttc" id="agent-anuttc" />
                <Label htmlFor="agent-anuttc" className="font-normal cursor-pointer">Agent de l'ANUTTC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agent-tresor" id="agent-tresor" />
                <Label htmlFor="agent-tresor" className="font-normal cursor-pointer">Agent du Trésor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="autre" id="recipient-autre" />
                <Label htmlFor="recipient-autre" className="font-normal cursor-pointer">Autre (intermédiaire...)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Avez-vous reçu un récépissé ou une quittance ?*</Label>
            <RadioGroup value={formData.hasReceipt} onValueChange={(value) => updateFormData({ hasReceipt: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oui" id="receipt-yes" />
                <Label htmlFor="receipt-yes" className="font-normal cursor-pointer">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non" id="receipt-no" />
                <Label htmlFor="receipt-no" className="font-normal cursor-pointer">Non</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
}

export function validateEvaluationStep(
  formData: Pick<EvaluationData, "hasCompletedStep" | "paymentMode" | "paymentDate" | "paymentRecipient" | "hasReceipt" | "otherPaymentMode">
): boolean {
  if (!formData.hasCompletedStep) return false;
  
  if (formData.hasCompletedStep === "non") return true;
  
  const baseValidation = !!(
    formData.paymentMode &&
    formData.paymentDate &&
    formData.paymentRecipient &&
    formData.hasReceipt
  );
  
  if (formData.paymentMode === "autre") {
    return baseValidation && !!formData.otherPaymentMode;
  }
  
  return baseValidation;
}

