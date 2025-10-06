import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StarRating } from "@/components/ui/star-rating";

type EvaluationData = {
  depotEvaluation: string;
  depotPaymentMode: string;
  depotOtherPaymentMode: string;
  depotAmountPaid: string;
  depotHasReceipt: string;
  depotHasAcknowledgment: string;
  enqueteDelayPerceived: string;
  enquetePaymentMode: string;
  enqueteOtherPaymentMode: string;
  enqueteHasReceipt: string;
  enqueteSatisfaction: number[];
  etatLieuxDelayPerceived: string;
  etatLieuxPaymentMode: string;
  etatLieuxOtherPaymentMode: string;
  etatLieuxHasReceipt: string;
  etatLieuxSatisfaction: number[];
  affichageInTime: string;
  affichageWasInformed: string;
  affichageInformationChannel: string;
  affichageSufficientDelay: string;
  affichageHasOpposition: string;
  affichageFees: string;
  affichageHasReceipt: string;
  affichageSatisfaction: number[];
  bornageDelayPerceived: string;
  bornagePaymentMode: string;
  bornageOtherPaymentMode: string;
  bornageHasReceipt: string;
  bornageSatisfaction: number[];
  evaluationPriceUnderstanding: string;
  evaluationPaymentMode: string;
  evaluationOtherPaymentMode: string;
  evaluationHasReceipt: string;
  evaluationSatisfaction: number[];
};

type EvaluationStepProps = {
  formData: EvaluationData;
  updateFormData: (updates: Partial<EvaluationData>) => void;
  stepTitle: string;
  stepKey: string;
};

const evaluationOptions = [
  { value: "excellent", label: "Excellent" },
  { value: "tres-bien", label: "Très bien" },
  { value: "bien", label: "Bien" },
  { value: "assez-bien", label: "Assez bien" },
  { value: "passable", label: "Passable" },
  { value: "mediocre", label: "Médiocre" },
];

const paymentModes = [
  { value: "especes", label: "Espèces" },
  { value: "cheque", label: "Chèque" },
  { value: "virement", label: "Virement" },
  { value: "mobile-money", label: "Mobile Money" },
  { value: "money-banking", label: "Money Banking" },
  { value: "autre", label: "Autre (Préciser...)" },
];

export function EvaluationStep({ formData, updateFormData, stepTitle, stepKey }: EvaluationStepProps) {
  const renderDepotStep = () => (
    <>
      <div className="space-y-2">
        <Label>Comment évaluez-vous l'accueil à l'ANUTTC ?*</Label>
        <Select value={formData.depotEvaluation} onValueChange={(value) => updateFormData({ depotEvaluation: value })}>
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

      <div className="space-y-2">
        <Label>Avez-vous reçu un accusé de réception ?*</Label>
        <RadioGroup value={formData.depotHasAcknowledgment} onValueChange={(value) => updateFormData({ depotHasAcknowledgment: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="ack-yes" />
            <Label htmlFor="ack-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="ack-no" />
            <Label htmlFor="ack-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement des frais de dépôt*</Label>
        <Select value={formData.depotPaymentMode} onValueChange={(value) => updateFormData({ depotPaymentMode: value })}>
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

      {formData.depotPaymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="depotOtherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="depotOtherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.depotOtherPaymentMode}
            onChange={(e) => updateFormData({ depotOtherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="depotAmountPaid">Montant payé*</Label>
        <Input
          id="depotAmountPaid"
          type="number"
          placeholder="Montant en FCFA"
          value={formData.depotAmountPaid}
          onChange={(e) => updateFormData({ depotAmountPaid: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Avez-vous reçu une quittance ?*</Label>
        <RadioGroup value={formData.depotHasReceipt} onValueChange={(value) => updateFormData({ depotHasReceipt: value })}>
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
  );

  const renderEnqueteStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="enqueteDelayPerceived">Délais de réalisation perçus (en jours)*</Label>
        <Input
          id="enqueteDelayPerceived"
          type="number"
          placeholder="Nombre de jours"
          value={formData.enqueteDelayPerceived}
          onChange={(e) => updateFormData({ enqueteDelayPerceived: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement*</Label>
        <Select value={formData.enquetePaymentMode} onValueChange={(value) => updateFormData({ enquetePaymentMode: value })}>
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

      {formData.enquetePaymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="enqueteOtherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="enqueteOtherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.enqueteOtherPaymentMode}
            onChange={(e) => updateFormData({ enqueteOtherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
        <RadioGroup value={formData.enqueteHasReceipt} onValueChange={(value) => updateFormData({ enqueteHasReceipt: value })}>
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

      <div className="space-y-2">
        <Label>Satisfaction enquête foncière*</Label>
        <StarRating
          value={formData.enqueteSatisfaction[0] || 0}
          onChange={(value) => updateFormData({ enqueteSatisfaction: [value] })}
          max={5}
          size="lg"
        />
      </div>
    </>
  );

  const renderEtatLieuxStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="etatLieuxDelayPerceived">Délais perçus (en jours)*</Label>
        <Input
          id="etatLieuxDelayPerceived"
          type="number"
          placeholder="Nombre de jours"
          value={formData.etatLieuxDelayPerceived}
          onChange={(e) => updateFormData({ etatLieuxDelayPerceived: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement*</Label>
        <Select value={formData.etatLieuxPaymentMode} onValueChange={(value) => updateFormData({ etatLieuxPaymentMode: value })}>
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

      {formData.etatLieuxPaymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="etatLieuxOtherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="etatLieuxOtherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.etatLieuxOtherPaymentMode}
            onChange={(e) => updateFormData({ etatLieuxOtherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
        <RadioGroup value={formData.etatLieuxHasReceipt} onValueChange={(value) => updateFormData({ etatLieuxHasReceipt: value })}>
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

      <div className="space-y-2">
        <Label>Satisfaction état des lieux*</Label>
        <StarRating
          value={formData.etatLieuxSatisfaction[0] || 0}
          onChange={(value) => updateFormData({ etatLieuxSatisfaction: [value] })}
          max={5}
          size="lg"
        />
      </div>
    </>
  );

  const renderAffichageStep = () => (
    <>
      <div className="space-y-2">
        <Label>Affichage effectué dans les délais ?*</Label>
        <RadioGroup value={formData.affichageInTime} onValueChange={(value) => updateFormData({ affichageInTime: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="affichage-time-yes" />
            <Label htmlFor="affichage-time-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="affichage-time-no" />
            <Label htmlFor="affichage-time-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Avez-vous été informé de l'affichage ?*</Label>
        <RadioGroup value={formData.affichageWasInformed} onValueChange={(value) => updateFormData({ affichageWasInformed: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="informed-yes" />
            <Label htmlFor="informed-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="informed-no" />
            <Label htmlFor="informed-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Canal d'information{formData.affichageWasInformed === "oui" && "*"}</Label>
        <RadioGroup 
          value={formData.affichageInformationChannel} 
          onValueChange={(value) => updateFormData({ affichageInformationChannel: value })}
          disabled={formData.affichageWasInformed !== "oui"}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="affichage-physique" id="channel-physical" disabled={formData.affichageWasInformed !== "oui"} />
            <Label htmlFor="channel-physical" className="font-normal cursor-pointer">Affichage physique</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="site-anuttc" id="channel-site" disabled={formData.affichageWasInformed !== "oui"} />
            <Label htmlFor="channel-site" className="font-normal cursor-pointer">Site ANUTTC</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="autre" id="channel-autre" disabled={formData.affichageWasInformed !== "oui"} />
            <Label htmlFor="channel-autre" className="font-normal cursor-pointer">Autre</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Délai suffisant pour opposition ?*</Label>
        <RadioGroup value={formData.affichageSufficientDelay} onValueChange={(value) => updateFormData({ affichageSufficientDelay: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="delay-sufficient-yes" />
            <Label htmlFor="delay-sufficient-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="delay-sufficient-no" />
            <Label htmlFor="delay-sufficient-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Opposition introduite ?*</Label>
        <RadioGroup value={formData.affichageHasOpposition} onValueChange={(value) => updateFormData({ affichageHasOpposition: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="opposition-yes" />
            <Label htmlFor="opposition-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="opposition-no" />
            <Label htmlFor="opposition-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="affichageFees">Frais payés pour affichage*</Label>
        <Input
          id="affichageFees"
          type="number"
          placeholder="Montant en FCFA"
          value={formData.affichageFees}
          onChange={(e) => updateFormData({ affichageFees: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
        <RadioGroup value={formData.affichageHasReceipt} onValueChange={(value) => updateFormData({ affichageHasReceipt: value })}>
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

      <div className="space-y-2">
        <Label>Satisfaction gestion de l'affichage*</Label>
        <StarRating
          value={formData.affichageSatisfaction[0] || 0}
          onChange={(value) => updateFormData({ affichageSatisfaction: [value] })}
          max={5}
          size="lg"
        />
      </div>
    </>
  );

  const renderBornageStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="bornageDelayPerceived">Délais perçus (en jours)*</Label>
        <Input
          id="bornageDelayPerceived"
          type="number"
          placeholder="Nombre de jours"
          value={formData.bornageDelayPerceived}
          onChange={(e) => updateFormData({ bornageDelayPerceived: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement*</Label>
        <Select value={formData.bornagePaymentMode} onValueChange={(value) => updateFormData({ bornagePaymentMode: value })}>
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

      {formData.bornagePaymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="bornageOtherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="bornageOtherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.bornageOtherPaymentMode}
            onChange={(e) => updateFormData({ bornageOtherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
        <RadioGroup value={formData.bornageHasReceipt} onValueChange={(value) => updateFormData({ bornageHasReceipt: value })}>
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

      <div className="space-y-2">
        <Label>Satisfaction bornage*</Label>
        <StarRating
          value={formData.bornageSatisfaction[0] || 0}
          onChange={(value) => updateFormData({ bornageSatisfaction: [value] })}
          max={5}
          size="lg"
        />
      </div>
    </>
  );

  const renderEvaluationStepContent = () => (
    <>
      <div className="space-y-2">
        <Label>Compréhension du calcul du prix*</Label>
        <RadioGroup value={formData.evaluationPriceUnderstanding} onValueChange={(value) => updateFormData({ evaluationPriceUnderstanding: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="price-yes" />
            <Label htmlFor="price-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="price-no" />
            <Label htmlFor="price-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement*</Label>
        <Select value={formData.evaluationPaymentMode} onValueChange={(value) => updateFormData({ evaluationPaymentMode: value })}>
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

      {formData.evaluationPaymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="evaluationOtherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="evaluationOtherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.evaluationOtherPaymentMode}
            onChange={(e) => updateFormData({ evaluationOtherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
        <RadioGroup value={formData.evaluationHasReceipt} onValueChange={(value) => updateFormData({ evaluationHasReceipt: value })}>
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

      <div className="space-y-2">
        <Label>Satisfaction évaluation*</Label>
        <StarRating
          value={formData.evaluationSatisfaction[0] || 0}
          onChange={(value) => updateFormData({ evaluationSatisfaction: [value] })}
          max={5}
          size="lg"
        />
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      {stepKey === "depot" && renderDepotStep()}
      {stepKey === "enquete" && renderEnqueteStep()}
      {stepKey === "etat-lieux" && renderEtatLieuxStep()}
      {stepKey === "affichage" && renderAffichageStep()}
      {stepKey === "bornage" && renderBornageStep()}
      {stepKey === "evaluation" && renderEvaluationStepContent()}
    </div>
  );
}

export function validateEvaluationStep(
  formData: Partial<EvaluationData>,
  stepKey: string
): boolean {
  if (stepKey === "depot") {
    return !!(
      formData.depotEvaluation &&
      formData.depotHasAcknowledgment &&
      formData.depotPaymentMode &&
      formData.depotAmountPaid &&
      formData.depotHasReceipt &&
      (formData.depotPaymentMode !== "autre" || formData.depotOtherPaymentMode)
    );
  }

  if (stepKey === "enquete") {
    return !!(
      formData.enqueteDelayPerceived &&
      formData.enquetePaymentMode &&
      formData.enqueteHasReceipt &&
      formData.enqueteSatisfaction?.[0] &&
      (formData.enquetePaymentMode !== "autre" || formData.enqueteOtherPaymentMode)
    );
  }

  if (stepKey === "etat-lieux") {
    return !!(
      formData.etatLieuxDelayPerceived &&
      formData.etatLieuxPaymentMode &&
      formData.etatLieuxHasReceipt &&
      formData.etatLieuxSatisfaction?.[0] &&
      (formData.etatLieuxPaymentMode !== "autre" || formData.etatLieuxOtherPaymentMode)
    );
  }

  if (stepKey === "bornage") {
    return !!(
      formData.bornageDelayPerceived &&
      formData.bornagePaymentMode &&
      formData.bornageHasReceipt &&
      formData.bornageSatisfaction?.[0] &&
      (formData.bornagePaymentMode !== "autre" || formData.bornageOtherPaymentMode)
    );
  }

  if (stepKey === "affichage") {
    const baseValidation = !!(
      formData.affichageInTime &&
      formData.affichageWasInformed &&
      formData.affichageSufficientDelay &&
      formData.affichageHasOpposition &&
      formData.affichageFees &&
      formData.affichageHasReceipt &&
      formData.affichageSatisfaction?.[0]
    );
    
    if (formData.affichageWasInformed === "oui") {
      return baseValidation && !!formData.affichageInformationChannel;
    }
    
    return baseValidation;
  }

  if (stepKey === "evaluation") {
    return !!(
      formData.evaluationPriceUnderstanding &&
      formData.evaluationPaymentMode &&
      formData.evaluationHasReceipt &&
      formData.evaluationSatisfaction?.[0] &&
      (formData.evaluationPaymentMode !== "autre" || formData.evaluationOtherPaymentMode)
    );
  }

  return false;
}
