import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StarRating } from "@/components/ui/star-rating";

type EvaluationData = {
  hasCompletedStep: string;
  evaluation: string;
  paymentMode: string;
  paymentDate: string;
  paymentRecipient: string;
  hasReceipt: string;
  otherPaymentMode: string;
  amountPaid: string;
  hasAcknowledgment: string;
  delayPerceived: string;
  satisfaction: number[];
  priceUnderstanding: string;
  affichageInTime: string;
  wasInformed: string;
  informationChannel: string;
  sufficientDelay: string;
  hasOpposition: string;
  affichageFees: string;
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

      <div className="space-y-2">
        <Label>Avez-vous reçu un accusé de réception ?*</Label>
        <RadioGroup value={formData.hasAcknowledgment} onValueChange={(value) => updateFormData({ hasAcknowledgment: value })}>
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
        <Select value={formData.paymentMode} onValueChange={(value) => updateFormData({ paymentMode: value })}>
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

      {formData.paymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="otherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="otherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.otherPaymentMode}
            onChange={(e) => updateFormData({ otherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="amountPaid">Montant payé*</Label>
        <Input
          id="amountPaid"
          type="number"
          placeholder="Montant en FCFA"
          value={formData.amountPaid}
          onChange={(e) => updateFormData({ amountPaid: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Avez-vous reçu une quittance ?*</Label>
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
  );

  const renderEnqueteStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="delayPerceived">Délais de réalisation perçus (en jours)*</Label>
        <Input
          id="delayPerceived"
          type="number"
          placeholder="Nombre de jours"
          value={formData.delayPerceived}
          onChange={(e) => updateFormData({ delayPerceived: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement*</Label>
        <Select value={formData.paymentMode} onValueChange={(value) => updateFormData({ paymentMode: value })}>
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

      {formData.paymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="otherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="otherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.otherPaymentMode}
            onChange={(e) => updateFormData({ otherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
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

      <div className="space-y-2">
        <Label>Satisfaction enquête foncière*</Label>
        <StarRating
          value={formData.satisfaction[0] || 0}
          onChange={(value) => updateFormData({ satisfaction: [value] })}
          max={5}
          size="lg"
        />
      </div>
    </>
  );

  const renderEtatLieuxStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="delayPerceived">Délais perçus (en jours)*</Label>
        <Input
          id="delayPerceived"
          type="number"
          placeholder="Nombre de jours"
          value={formData.delayPerceived}
          onChange={(e) => updateFormData({ delayPerceived: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement*</Label>
        <Select value={formData.paymentMode} onValueChange={(value) => updateFormData({ paymentMode: value })}>
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

      {formData.paymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="otherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="otherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.otherPaymentMode}
            onChange={(e) => updateFormData({ otherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
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

      <div className="space-y-2">
        <Label>Satisfaction état des lieux*</Label>
        <StarRating
          value={formData.satisfaction[0] || 0}
          onChange={(value) => updateFormData({ satisfaction: [value] })}
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
        <RadioGroup value={formData.wasInformed} onValueChange={(value) => updateFormData({ wasInformed: value })}>
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

      {formData.wasInformed === "oui" && (
        <div className="space-y-2">
          <Label>Canal d'information*</Label>
          <RadioGroup value={formData.informationChannel} onValueChange={(value) => updateFormData({ informationChannel: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="affichage-physique" id="channel-physical" />
              <Label htmlFor="channel-physical" className="font-normal cursor-pointer">Affichage physique</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="site-anuttc" id="channel-site" />
              <Label htmlFor="channel-site" className="font-normal cursor-pointer">Site ANUTTC</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="autre" id="channel-autre" />
              <Label htmlFor="channel-autre" className="font-normal cursor-pointer">Autre</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <div className="space-y-2">
        <Label>Délai suffisant pour opposition ?*</Label>
        <RadioGroup value={formData.sufficientDelay} onValueChange={(value) => updateFormData({ sufficientDelay: value })}>
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
        <RadioGroup value={formData.hasOpposition} onValueChange={(value) => updateFormData({ hasOpposition: value })}>
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

      <div className="space-y-2">
        <Label>Satisfaction gestion de l'affichage*</Label>
        <StarRating
          value={formData.satisfaction[0] || 0}
          onChange={(value) => updateFormData({ satisfaction: [value] })}
          max={5}
          size="lg"
        />
      </div>
    </>
  );

  const renderBornageStep = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="delayPerceived">Délais perçus (en jours)*</Label>
        <Input
          id="delayPerceived"
          type="number"
          placeholder="Nombre de jours"
          value={formData.delayPerceived}
          onChange={(e) => updateFormData({ delayPerceived: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement*</Label>
        <Select value={formData.paymentMode} onValueChange={(value) => updateFormData({ paymentMode: value })}>
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

      {formData.paymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="otherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="otherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.otherPaymentMode}
            onChange={(e) => updateFormData({ otherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
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

      <div className="space-y-2">
        <Label>Satisfaction bornage*</Label>
        <StarRating
          value={formData.satisfaction[0] || 0}
          onChange={(value) => updateFormData({ satisfaction: [value] })}
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
        <RadioGroup value={formData.priceUnderstanding} onValueChange={(value) => updateFormData({ priceUnderstanding: value })}>
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
        <Select value={formData.paymentMode} onValueChange={(value) => updateFormData({ paymentMode: value })}>
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

      {formData.paymentMode === "autre" && (
        <div className="space-y-2">
          <Label htmlFor="otherPaymentMode">Précisez le mode de paiement*</Label>
          <Input
            id="otherPaymentMode"
            placeholder="Ex: Autre moyen"
            value={formData.otherPaymentMode}
            onChange={(e) => updateFormData({ otherPaymentMode: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Quittance reçue ?*</Label>
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

      <div className="space-y-2">
        <Label>Satisfaction évaluation*</Label>
        <StarRating
          value={formData.satisfaction[0] || 0}
          onChange={(value) => updateFormData({ satisfaction: [value] })}
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
      formData.evaluation &&
      formData.hasAcknowledgment &&
      formData.paymentMode &&
      formData.amountPaid &&
      formData.hasReceipt &&
      (formData.paymentMode !== "autre" || formData.otherPaymentMode)
    );
  }

  if (stepKey === "enquete" || stepKey === "etat-lieux" || stepKey === "bornage") {
    return !!(
      formData.delayPerceived &&
      formData.paymentMode &&
      formData.hasReceipt &&
      formData.satisfaction?.[0] &&
      (formData.paymentMode !== "autre" || formData.otherPaymentMode)
    );
  }

  if (stepKey === "affichage") {
    const baseValidation = !!(
      formData.affichageInTime &&
      formData.wasInformed &&
      formData.sufficientDelay &&
      formData.hasOpposition &&
      formData.affichageFees &&
      formData.hasReceipt &&
      formData.satisfaction?.[0]
    );
    
    if (formData.wasInformed === "oui") {
      return baseValidation && !!formData.informationChannel;
    }
    
    return baseValidation;
  }

  if (stepKey === "evaluation") {
    return !!(
      formData.priceUnderstanding &&
      formData.paymentMode &&
      formData.hasReceipt &&
      formData.satisfaction?.[0] &&
      (formData.paymentMode !== "autre" || formData.otherPaymentMode)
    );
  }

  return false;
}
