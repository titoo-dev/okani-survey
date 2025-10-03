import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UserProfileData = {
  dossierNumber: string;
  city: string;
  procedureType: string;
  startYear: string;
  age: string;
  gender: string;
  legalEntity: string;
  email: string;
};

type UserProfileStepProps = {
  formData: UserProfileData;
  updateFormData: (updates: Partial<UserProfileData>) => void;
};

export function UserProfileStep({ formData, updateFormData }: UserProfileStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Profil de l'usager</h2>
        <p className="text-gray-600 mb-6">
          Informations de base pour mieux comprendre votre expérience
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dossierNumber">Numéro de dossier (optionnel)</Label>
        <Input
          id="dossierNumber"
          placeholder="Ex: 2024-LBV-001234"
          value={formData.dossierNumber}
          onChange={(e) => updateFormData({ dossierNumber: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">Pour contextualiser vos réponses (anonymat garanti)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Ville de la procédure*</Label>
          <Select value={formData.city} onValueChange={(value) => updateFormData({ city: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="libreville">Libreville</SelectItem>
              <SelectItem value="lambarene">Lambaréné</SelectItem>
              <SelectItem value="mouila">Mouila</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="procedureType">Type de procédure*</Label>
          <Select value={formData.procedureType} onValueChange={(value) => updateFormData({ procedureType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attribution">Attribution foncière</SelectItem>
              <SelectItem value="regularisation">Régularisation foncière</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startYear">Année de début*</Label>
          <Input
            id="startYear"
            type="number"
            placeholder="Ex: 2023"
            value={formData.startYear}
            onChange={(e) => updateFormData({ startYear: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Âge*</Label>
          <Input
            id="age"
            type="number"
            placeholder="Ex: 35"
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sexe*</Label>
        <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="homme" id="homme" />
            <Label htmlFor="homme" className="font-normal cursor-pointer">Homme</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="femme" id="femme" />
            <Label htmlFor="femme" className="font-normal cursor-pointer">Femme</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="autre" id="autre" />
            <Label htmlFor="autre" className="font-normal cursor-pointer">Autre</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Personnalité juridique*</Label>
        <RadioGroup value={formData.legalEntity} onValueChange={(value) => updateFormData({ legalEntity: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="physique" id="physique" />
            <Label htmlFor="physique" className="font-normal cursor-pointer">Personne physique</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="morale" id="morale" />
            <Label htmlFor="morale" className="font-normal cursor-pointer">Personne morale</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email*</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre.email@exemple.com"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">Pour vous envoyer une copie de vos réponses</p>
      </div>
    </div>
  );
}

export function validateUserProfileStep(
  formData: Pick<UserProfileData, "city" | "procedureType" | "startYear" | "age" | "gender" | "legalEntity" | "email">
): boolean {
  return !!(
    formData.city &&
    formData.procedureType &&
    formData.startYear &&
    formData.age &&
    formData.gender &&
    formData.legalEntity &&
    formData.email
  );
}

