import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";

type DisputesData = {
  hadOpposition: boolean | undefined;
  oppositionDate: string;
  oppositionNature: string;
  oppositionNatureOther: string;
  litigeDelay: string;
  paidLitigeFees: boolean | undefined;
  litigePaymentMode: string;
  litigePaymentAmount: string;
  litigeHasReceipt: boolean | undefined;
  wasInformedProcedure: boolean | undefined;
  sentFormalLetter: boolean | undefined;
  letterReference: string;
  litigeCause: string;
  litigeCauseOther: string;
  litigeSatisfaction: number[];
  litigeOutcome: string;
  litigeOutcomeOther: string;
  litigeComments: string;
};

type DisputesStepProps = {
  formData: DisputesData;
  updateFormData: (updates: Partial<DisputesData>) => void;
};

const oppositionNatures = [
  { value: "usurpation", label: "Usurpation" },
  { value: "emprise", label: "Emprise" },
  { value: "conflit-anteriorite", label: "Conflit antériorité" },
  { value: "autre", label: "Autre (préciser)" },
];

const paymentModes = [
  { value: "especes", label: "Espèces" },
  { value: "cheque", label: "Chèque" },
  { value: "virement", label: "Virement" },
  { value: "mobile-money", label: "Mobile Money" },
  { value: "autre", label: "Autre" },
];

const litigeCauses = [
  { value: "defaillance-si", label: "Défaillance SI" },
  { value: "manipulation-interne", label: "Manipulation interne" },
  { value: "affichage-non-effectif", label: "Affichage non effectif" },
  { value: "delais-trop-courts", label: "Délais trop courts" },
  { value: "autre", label: "Autre (préciser)" },
];

const outcomes = [
  { value: "acceptation", label: "Acceptation" },
  { value: "rejet", label: "Rejet" },
  { value: "sous-investigation", label: "Sous investigation" },
  { value: "transmission-conservation", label: "Transmission Conservation" },
  { value: "autre", label: "Autre (préciser)" },
];

export function DisputesStep({ formData, updateFormData }: DisputesStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Avez-vous fait l'objet d'une opposition lors de l'avis d'affichage ?*</Label>
        <RadioGroup value={formData.hadOpposition?.toString()} onValueChange={(value) => updateFormData({ hadOpposition: value === "true" })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="had-opposition-yes" />
            <Label htmlFor="had-opposition-yes" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="had-opposition-no" />
            <Label htmlFor="had-opposition-no" className="font-normal cursor-pointer">Non</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.hadOpposition === true && (
        <>
          <div className="space-y-2">
            <Label htmlFor="oppositionDate">À quelle date l'opposition a-t-elle été enregistrée ?*</Label>
            <Input
              id="oppositionDate"
              type="date"
              value={formData.oppositionDate}
              onChange={(e) => updateFormData({ oppositionDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Quelle est la nature de l'opposition ?*</Label>
            <Select 
              value={formData.oppositionNature} 
              onValueChange={(value) => updateFormData({ oppositionNature: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la nature" />
              </SelectTrigger>
              <SelectContent>
                {oppositionNatures.map((nature) => (
                  <SelectItem key={nature.value} value={nature.value}>
                    {nature.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.oppositionNature === "autre" && (
            <div className="space-y-2">
              <Label htmlFor="oppositionNatureOther">Précisez la nature de l'opposition*</Label>
              <Input
                id="oppositionNatureOther"
                placeholder="Ex: Autre motif"
                value={formData.oppositionNatureOther}
                onChange={(e) => updateFormData({ oppositionNatureOther: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="litigeDelay">Délais de traitement du litige (dépôt → décision) en jours*</Label>
            <Input
              id="litigeDelay"
              type="number"
              placeholder="Nombre de jours"
              value={formData.litigeDelay}
              onChange={(e) => updateFormData({ litigeDelay: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Avez-vous payé des frais liés à l'opposition/contentieux ?*</Label>
            <RadioGroup 
              value={formData.paidLitigeFees?.toString()} 
              onValueChange={(value) => updateFormData({ paidLitigeFees: value === "true" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="paid-fees-yes" />
                <Label htmlFor="paid-fees-yes" className="font-normal cursor-pointer">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="paid-fees-no" />
                <Label htmlFor="paid-fees-no" className="font-normal cursor-pointer">Non</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.paidLitigeFees === true && (
            <>
              <div className="space-y-2">
                <Label>Mode de paiement*</Label>
                <Select 
                  value={formData.litigePaymentMode} 
                  onValueChange={(value) => updateFormData({ litigePaymentMode: value })}
                >
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

              <div className="space-y-2">
                <Label htmlFor="litigePaymentAmount">Montant*</Label>
                <Input
                  id="litigePaymentAmount"
                  type="number"
                  placeholder="Montant en FCFA"
                  value={formData.litigePaymentAmount}
                  onChange={(e) => updateFormData({ litigePaymentAmount: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Avez-vous reçu une quittance pour ces frais ?*</Label>
                <RadioGroup 
                  value={formData.litigeHasReceipt?.toString()} 
                  onValueChange={(value) => updateFormData({ litigeHasReceipt: value === "true" })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="litige-receipt-yes" />
                    <Label htmlFor="litige-receipt-yes" className="font-normal cursor-pointer">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="litige-receipt-no" />
                    <Label htmlFor="litige-receipt-no" className="font-normal cursor-pointer">Non</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Avez-vous été informé de la procédure et des voies de recours ?*</Label>
            <RadioGroup 
              value={formData.wasInformedProcedure?.toString()} 
              onValueChange={(value) => updateFormData({ wasInformedProcedure: value === "true" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="informed-procedure-yes" />
                <Label htmlFor="informed-procedure-yes" className="font-normal cursor-pointer">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="informed-procedure-no" />
                <Label htmlFor="informed-procedure-no" className="font-normal cursor-pointer">Non</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Avez-vous adressé un courrier formel (ex. opposition au DG ANUTTC) ?*</Label>
            <RadioGroup 
              value={formData.sentFormalLetter?.toString()} 
              onValueChange={(value) => updateFormData({ sentFormalLetter: value === "true" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="letter-yes" />
                <Label htmlFor="letter-yes" className="font-normal cursor-pointer">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="letter-no" />
                <Label htmlFor="letter-no" className="font-normal cursor-pointer">Non</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.sentFormalLetter === true && (
            <div className="space-y-2">
              <Label htmlFor="letterReference">Joindre la référence (n°/date)*</Label>
              <Input
                id="letterReference"
                placeholder="Ex: N°123/2024 du 01/01/2024"
                value={formData.letterReference}
                onChange={(e) => updateFormData({ letterReference: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Cause perçue du litige*</Label>
            <Select 
              value={formData.litigeCause} 
              onValueChange={(value) => updateFormData({ litigeCause: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la cause" />
              </SelectTrigger>
              <SelectContent>
                {litigeCauses.map((cause) => (
                  <SelectItem key={cause.value} value={cause.value}>
                    {cause.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.litigeCause === "autre" && (
            <div className="space-y-2">
              <Label htmlFor="litigeCauseOther">Précisez la cause*</Label>
              <Input
                id="litigeCauseOther"
                placeholder="Ex: Autre raison"
                value={formData.litigeCauseOther}
                onChange={(e) => updateFormData({ litigeCauseOther: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Satisfaction sur la gestion du litige*</Label>
            <StarRating
              value={formData.litigeSatisfaction[0] || 0}
              onChange={(value) => updateFormData({ litigeSatisfaction: [value] })}
              max={5}
              size="lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Issue du litige*</Label>
            <Select 
              value={formData.litigeOutcome} 
              onValueChange={(value) => updateFormData({ litigeOutcome: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez l'issue" />
              </SelectTrigger>
              <SelectContent>
                {outcomes.map((outcome) => (
                  <SelectItem key={outcome.value} value={outcome.value}>
                    {outcome.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.litigeOutcome === "autre" && (
            <div className="space-y-2">
              <Label htmlFor="litigeOutcomeOther">Précisez l'issue*</Label>
              <Input
                id="litigeOutcomeOther"
                placeholder="Ex: Autre issue"
                value={formData.litigeOutcomeOther}
                onChange={(e) => updateFormData({ litigeOutcomeOther: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="litigeComments">Commentaire libre (faits saillants, preuves, témoins)</Label>
            <Textarea
              id="litigeComments"
              placeholder="Décrivez les faits importants, preuves ou témoins..."
              value={formData.litigeComments}
              onChange={(e) => updateFormData({ litigeComments: e.target.value })}
              rows={5}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function validateDisputesStep(
  formData: Partial<DisputesData>
): boolean {
  if (formData.hadOpposition === undefined) return false;
  
  if (formData.hadOpposition === false) return true;
  
  const baseValidation = !!(
    formData.oppositionDate &&
    formData.oppositionNature &&
    formData.litigeDelay &&
    formData.paidLitigeFees !== undefined &&
    formData.wasInformedProcedure !== undefined &&
    formData.sentFormalLetter !== undefined &&
    formData.litigeCause &&
    formData.litigeSatisfaction?.[0] &&
    formData.litigeOutcome
  );
  
  if (!baseValidation) return false;
  
  if (formData.oppositionNature === "autre" && !formData.oppositionNatureOther) return false;
  if (formData.litigeCause === "autre" && !formData.litigeCauseOther) return false;
  if (formData.litigeOutcome === "autre" && !formData.litigeOutcomeOther) return false;
  if (formData.sentFormalLetter === true && !formData.letterReference) return false;
  
  if (formData.paidLitigeFees === true) {
    return !!(
      formData.litigePaymentMode &&
      formData.litigePaymentAmount &&
      formData.litigeHasReceipt !== undefined
    );
  }
  
  return true;
}

