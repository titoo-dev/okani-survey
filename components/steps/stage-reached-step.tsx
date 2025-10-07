import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StageReachedData = {
  stageReached: string;
};

type StageReachedStepProps = {
  formData: StageReachedData;
  updateFormData: (updates: Partial<StageReachedData>) => void;
};

export function StageReachedStep({
  formData,
  updateFormData,
}: StageReachedStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Étape atteinte</h2>
        <p className="text-gray-600 mb-6">
          Identification de votre situation dans le processus
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stageReached">
          Jusqu'à quelle étape votre procédure est-elle arrivée ?*
        </Label>
        <Select
          value={formData.stageReached}
          onValueChange={(value) => updateFormData({ stageReached: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une étape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="depot">Dépôt de dossier</SelectItem>
            <SelectItem value="enquete">Enquête foncière</SelectItem>
            <SelectItem value="affichage">Avis d'affichage</SelectItem>
            <SelectItem value="bornage">PV et plan de bornage</SelectItem>
            <SelectItem value="evaluation">Rapport d'évaluation</SelectItem>
            <SelectItem value="decision">Décision</SelectItem>
            <SelectItem value="encours">En cours</SelectItem>
            <SelectItem value="litigieux">Litigieux</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Cette information nous aidera à personnaliser les questions
        </p>
      </div>
    </div>
  );
}

export function validateStageReachedStep(
  formData: Pick<StageReachedData, "stageReached">,
): boolean {
  return !!formData.stageReached;
}
