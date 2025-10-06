import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";

type GlobalEvaluationData = {
  totalDelay: string;
  transmissionDate: string;
  totalCost: string;
  globalSatisfaction: number[];
  generalSuggestions: string;
};

type GlobalEvaluationStepProps = {
  formData: GlobalEvaluationData;
  updateFormData: (updates: Partial<GlobalEvaluationData>) => void;
};

export function GlobalEvaluationStep({ formData, updateFormData }: GlobalEvaluationStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Évaluation globale</h2>
        <p className="text-gray-600 mb-6">
          Impressions générales sur l'ensemble du processus
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="transmissionDate">Date de transmission à la Conservation foncière (optionnel)</Label>
        <Input
          id="transmissionDate"
          type="date"
          value={formData.transmissionDate}
          onChange={(e) => updateFormData({ transmissionDate: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Date à laquelle votre dossier a été transmis à la Conservation foncière
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="totalCost">Coût total payé (en FCFA)*</Label>
        <Input
          id="totalCost"
          type="number"
          placeholder="Montant total en FCFA"
          value={formData.totalCost}
          onChange={(e) => updateFormData({ totalCost: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Somme de tous les frais payés durant le processus
        </p>
      </div>

      <div className="space-y-2">
        <Label>Satisfaction générale*</Label>
        <StarRating
          value={formData.globalSatisfaction[0] || 0}
          onChange={(value) => updateFormData({ globalSatisfaction: [value] })}
          max={10}
          size="lg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="generalSuggestions">Suggestions d'amélioration</Label>
        <Textarea
          id="generalSuggestions"
          placeholder="Partagez vos recommandations pour améliorer le service foncier..."
          value={formData.generalSuggestions}
          onChange={(e) => updateFormData({ generalSuggestions: e.target.value })}
          rows={6}
          maxLength={1000}
        />
        <p className="text-sm text-muted-foreground">Optionnel - Maximum 1000 caractères</p>
      </div>

      <div className="bg-primary/10 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm">
            <p className="font-semibold text-foreground mb-1">Merci pour votre participation</p>
            <p className="text-muted-foreground">
              Vos retours sont précieux et contribueront à l'amélioration continue des services fonciers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function validateGlobalEvaluationStep(
  formData: Pick<GlobalEvaluationData, "totalDelay" | "transmissionDate" | "totalCost" | "globalSatisfaction">
): boolean {
  return !!(
    formData.totalCost &&
    formData.globalSatisfaction?.[0]
  );
}
