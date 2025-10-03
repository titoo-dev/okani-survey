import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

type GlobalEvaluationData = {
  satisfaction1: number[];
  recommendation: string;
  reason: string;
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
          Vos impressions générales sur le service foncier
        </p>
      </div>

      <div className="space-y-4">
        <Label>Satisfaction globale de votre expérience*</Label>
        <div className="space-y-2">
          <Slider
            value={formData.satisfaction1}
            onValueChange={(value) => updateFormData({ satisfaction1: value })}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Très insatisfait</span>
            <span className="font-semibold text-foreground">{formData.satisfaction1[0]}/5</span>
            <span>Très satisfait</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Recommanderiez-vous l'ANUTTC ?*</Label>
        <RadioGroup value={formData.recommendation} onValueChange={(value) => updateFormData({ recommendation: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="rec-oui" />
            <Label htmlFor="rec-oui" className="font-normal cursor-pointer">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="rec-non" />
            <Label htmlFor="rec-non" className="font-normal cursor-pointer">Non</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="peut-etre" id="rec-maybe" />
            <Label htmlFor="rec-maybe" className="font-normal cursor-pointer">Peut-être</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Pourquoi ?</Label>
        <Textarea
          id="reason"
          placeholder="Expliquez votre choix..."
          value={formData.reason}
          onChange={(e) => updateFormData({ reason: e.target.value })}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="generalSuggestions">Suggestions générales</Label>
        <Textarea
          id="generalSuggestions"
          placeholder="Vos recommandations pour améliorer le service foncier (max. 100 mots)"
          value={formData.generalSuggestions}
          onChange={(e) => updateFormData({ generalSuggestions: e.target.value })}
          rows={5}
          maxLength={500}
        />
        <p className="text-sm text-muted-foreground">Optionnel - Maximum 100 mots</p>
      </div>
    </div>
  );
}

export function validateGlobalEvaluationStep(
  formData: Pick<GlobalEvaluationData, "satisfaction1" | "recommendation">
): boolean {
  return !!(formData.satisfaction1[0] && formData.recommendation);
}

