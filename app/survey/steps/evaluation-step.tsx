import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

type EvaluationData = {
  satisfaction1: number[];
  delays1: string;
  courtesy1: number[];
  difficulties1: string;
  suggestions1: string;
};

type EvaluationStepProps = {
  formData: EvaluationData;
  updateFormData: (updates: Partial<EvaluationData>) => void;
  stepTitle: string;
  stepDescription: string;
};

export function EvaluationStep({ formData, updateFormData, stepTitle, stepDescription }: EvaluationStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">{stepTitle}</h2>
        <p className="text-gray-600 mb-6">{stepDescription}</p>
      </div>

      <div className="space-y-4">
        <Label>Niveau de satisfaction global*</Label>
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
        <Label htmlFor="delays1">Délais de traitement*</Label>
        <Select value={formData.delays1} onValueChange={(value) => updateFormData({ delays1: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Évaluez les délais" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rapide">Moins de 1 mois</SelectItem>
            <SelectItem value="acceptable">1 à 3 mois</SelectItem>
            <SelectItem value="long">3 à 6 mois</SelectItem>
            <SelectItem value="tres-long">Plus de 6 mois</SelectItem>
            <SelectItem value="encours">Toujours en cours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Courtoisie et qualité du service*</Label>
        <div className="space-y-2">
          <Slider
            value={formData.courtesy1}
            onValueChange={(value) => updateFormData({ courtesy1: value })}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Très mauvais</span>
            <span className="font-semibold text-foreground">{formData.courtesy1[0]}/5</span>
            <span>Excellent</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulties1">Principales difficultés rencontrées</Label>
        <Textarea
          id="difficulties1"
          placeholder="Décrivez les obstacles ou problèmes..."
          value={formData.difficulties1}
          onChange={(e) => updateFormData({ difficulties1: e.target.value })}
          rows={4}
        />
        <p className="text-sm text-muted-foreground">Optionnel</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="suggestions1">Suggestions d'amélioration</Label>
        <Textarea
          id="suggestions1"
          placeholder="Comment améliorer cette étape ? (max. 50 mots)"
          value={formData.suggestions1}
          onChange={(e) => updateFormData({ suggestions1: e.target.value })}
          rows={3}
          maxLength={250}
        />
        <p className="text-sm text-muted-foreground">Optionnel - Maximum 50 mots</p>
      </div>
    </div>
  );
}

export function validateEvaluationStep(
  formData: Pick<EvaluationData, "satisfaction1" | "delays1" | "courtesy1">
): boolean {
  return !!(formData.satisfaction1[0] && formData.delays1 && formData.courtesy1[0]);
}

