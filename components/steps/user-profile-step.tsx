import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import { cities } from "@/lib/cities";

type UserProfileData = {
  dossierId: string;
  depositCity: string;
  regularizationCity: string;
  residenceCity: string;
  userType: string;
  legalEntity: string;
  nationality: string;
};

type UserProfileStepProps = {
  formData: UserProfileData;
  updateFormData: (updates: Partial<UserProfileData>) => void;
};

const countries = [
  "Gabon",
  "Cameroun",
  "Congo-Brazzaville",
  "Congo (RDC)",
  "Guinée Équatoriale",
  "Tchad",
  "Centrafrique",
  "Sénégal",
  "Côte d'Ivoire",
  "Bénin",
  "Burkina Faso",
  "Mali",
  "Niger",
  "Togo",
  "France",
  "États-Unis",
  "Chine",
  "Autre"
];

const citiesWithOther = [...cities, "Autres"];

export function UserProfileStep({ formData, updateFormData }: UserProfileStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="dossierId">Numéro unique du dossier (QR Code scanné)*</Label>
        <Input
          id="dossierId"
          value={formData.dossierId || ""}
          onChange={(e) => updateFormData({ dossierId: e.target.value })}
          placeholder="Scannez ou saisissez le numéro du dossier"
        />
        <p className="text-xs text-muted-foreground">Traçabilité</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="depositCity">Ville de dépôt du dossier*</Label>
        <AutocompleteInput
          id="depositCity"
          value={formData.depositCity}
          onChange={(value) => updateFormData({ depositCity: value })}
          suggestions={citiesWithOther}
          placeholder="Sélectionnez ou tapez une ville"
        />
        <p className="text-xs text-muted-foreground">Localisation dépôt</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="regularizationCity">Ville de régularisation foncière (si différente)*</Label>
        <AutocompleteInput
          id="regularizationCity"
          value={formData.regularizationCity}
          onChange={(value) => updateFormData({ regularizationCity: value })}
          suggestions={citiesWithOther}
          placeholder="Sélectionnez ou tapez une ville"
        />
        <p className="text-xs text-muted-foreground">Cohérence territoriale</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="residenceCity">Ville de résidence de l'usager*</Label>
        <AutocompleteInput
          id="residenceCity"
          value={formData.residenceCity}
          onChange={(value) => updateFormData({ residenceCity: value })}
          suggestions={citiesWithOther}
          placeholder="Sélectionnez ou tapez une ville"
        />
        <p className="text-xs text-muted-foreground">Profil usager</p>
      </div>

      <div className="space-y-2">
        <Label>Type d'usager*</Label>
        <RadioGroup value={formData.userType} onValueChange={(value) => updateFormData({ userType: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="usager" id="usager" />
            <Label htmlFor="usager" className="font-normal cursor-pointer">Usager</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="partenaire" id="partenaire" />
            <Label htmlFor="partenaire" className="font-normal cursor-pointer">Partenaire</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediaire" id="intermediaire" />
            <Label htmlFor="intermediaire" className="font-normal cursor-pointer">Intermédiaire</Label>
          </div>
        </RadioGroup>
        <p className="text-xs text-muted-foreground">Catégorie</p>
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
        <p className="text-xs text-muted-foreground">Profil juridique</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality">Nationalité*</Label>
        <Select value={formData.nationality} onValueChange={(value) => updateFormData({ nationality: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre nationalité" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Profil socio-juridique</p>
      </div>
    </div>
  );
}

export function validateUserProfileStep(
  formData: Partial<UserProfileData>
): boolean {
  return !!(
    formData.dossierId &&
    formData.depositCity &&
    formData.regularizationCity &&
    formData.residenceCity &&
    formData.userType &&
    formData.nationality &&
    formData.legalEntity
  );
}

