import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UserProfileData = {
  userType: string;
  nationality: string;
  legalEntity: string;
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

export function UserProfileStep({ formData, updateFormData }: UserProfileStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Type d'usager ?*</Label>
        <RadioGroup value={formData.userType} onValueChange={(value) => updateFormData({ userType: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="usager" id="usager" />
            <Label htmlFor="usager" className="font-normal cursor-pointer">Usager</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="partenaire-anonyme" id="partenaire" />
            <Label htmlFor="partenaire" className="font-normal cursor-pointer">Partenaire anonyme</Label>
          </div>
        </RadioGroup>
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
      </div>

      <div className="space-y-2">
        <Label>Personnalité juridique ?*</Label>
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
    </div>
  );
}

export function validateUserProfileStep(
  formData: Pick<UserProfileData, "userType" | "nationality" | "legalEntity">
): boolean {
  return !!(
    formData.userType &&
    formData.nationality &&
    formData.legalEntity
  );
}

