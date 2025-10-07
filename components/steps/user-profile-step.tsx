import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CITIES, COUNTRIES, LEGAL_ENTITIES, USER_TYPES } from "@/lib/descriptors";

type UserProfileData = {
  depositCity: string;
  regularizationCity: string;
  residenceCity: string;
  userType: string;
  legalEntity: string;
  nationality: string;
};

type Descriptor = {
  id: string;
  type: string;
  value: string;
  label: string;
};

type DescriptorGroups = Record<string, Descriptor[]>;

type UserProfileStepProps = {
  formData: UserProfileData;
  updateFormData: (updates: Partial<UserProfileData>) => void;
  descriptors?: DescriptorGroups;
};

export function UserProfileStep({
  formData,
  updateFormData,
  descriptors = {},
}: UserProfileStepProps) {
  // Use descriptors from props or fallback to static imports
  const userTypes = descriptors.user_type || USER_TYPES;
  const legalEntities = descriptors.legal_entity || LEGAL_ENTITIES;
  const countries = descriptors.country || COUNTRIES;
  const cities = descriptors.city || CITIES;
  
  const countriesList = countries.map((country) => country.label);
  const citiesList = cities.map((city) => city.label);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="depositCity">Ville de dépôt du dossier*</Label>
        <AutocompleteInput
          id="depositCity"
          value={formData.depositCity}
          onChange={(value) => updateFormData({ depositCity: value })}
          suggestions={citiesList}
          placeholder="Sélectionnez ou tapez une ville"
        />
        <p className="text-xs text-muted-foreground">Localisation dépôt</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="regularizationCity">
          Ville de régularisation foncière (si différente)*
        </Label>
        <AutocompleteInput
          id="regularizationCity"
          value={formData.regularizationCity}
          onChange={(value) => updateFormData({ regularizationCity: value })}
          suggestions={citiesList}
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
          suggestions={citiesList}
          placeholder="Sélectionnez ou tapez une ville"
        />
        <p className="text-xs text-muted-foreground">Profil usager</p>
      </div>

      <div className="space-y-2">
        <Label>Type d'usager*</Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value) => updateFormData({ userType: value })}
        >
          {userTypes.map((userType) => (
            <div key={userType.value} className="flex items-center space-x-2">
              <RadioGroupItem value={userType.value} id={userType.value} />
              <Label
                htmlFor={userType.value}
                className="font-normal cursor-pointer"
              >
                {userType.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <p className="text-xs text-muted-foreground">Catégorie</p>
      </div>

      <div className="space-y-2">
        <Label>Personnalité juridique*</Label>
        <RadioGroup
          value={formData.legalEntity}
          onValueChange={(value) => updateFormData({ legalEntity: value })}
        >
          {legalEntities.map((entity) => (
            <div key={entity.value} className="flex items-center space-x-2">
              <RadioGroupItem value={entity.value} id={entity.value} />
              <Label
                htmlFor={entity.value}
                className="font-normal cursor-pointer"
              >
                {entity.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <p className="text-xs text-muted-foreground">Profil juridique</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality">Nationalité*</Label>
        <AutocompleteInput
          id="nationality"
          value={formData.nationality}
          onChange={(value) => updateFormData({ nationality: value })}
          suggestions={countriesList}
          placeholder="Sélectionnez ou tapez votre nationalité"
        />
        <p className="text-xs text-muted-foreground">Profil socio-juridique</p>
      </div>
    </div>
  );
}

export function validateUserProfileStep(
  formData: Partial<UserProfileData>,
): boolean {
  return !!(
    formData.depositCity &&
    formData.regularizationCity &&
    formData.residenceCity &&
    formData.userType &&
    formData.nationality &&
    formData.legalEntity
  );
}
