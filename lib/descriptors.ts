export type Descriptor = {
  type: string;
  value: string;
  label: string;
};

export const PAYMENT_MODES: Descriptor[] = [
  { type: "payment_mode", value: "especes", label: "Espèces" },
  { type: "payment_mode", value: "cheque", label: "Chèque" },
  { type: "payment_mode", value: "virement", label: "Virement" },
  { type: "payment_mode", value: "mobile-money", label: "Mobile Money" },
  { type: "payment_mode", value: "money-banking", label: "Money Banking" },
  { type: "payment_mode", value: "autre", label: "Autre (Préciser...)" },
];

export const EVALUATION_OPTIONS: Descriptor[] = [
  { type: "evaluation", value: "excellent", label: "Excellent" },
  { type: "evaluation", value: "tres-bien", label: "Très bien" },
  { type: "evaluation", value: "bien", label: "Bien" },
  { type: "evaluation", value: "assez-bien", label: "Assez bien" },
  { type: "evaluation", value: "passable", label: "Passable" },
  { type: "evaluation", value: "mediocre", label: "Médiocre" },
];

export const OPPOSITION_NATURES: Descriptor[] = [
  { type: "opposition_nature", value: "usurpation", label: "Usurpation" },
  { type: "opposition_nature", value: "emprise", label: "Emprise" },
  { type: "opposition_nature", value: "conflit-anteriorite", label: "Conflit antériorité" },
  { type: "opposition_nature", value: "autre", label: "Autre (préciser)" },
];

export const LITIGE_CAUSES: Descriptor[] = [
  { type: "litige_cause", value: "defaillance-si", label: "Défaillance SI" },
  { type: "litige_cause", value: "manipulation-interne", label: "Manipulation interne" },
  { type: "litige_cause", value: "affichage-non-effectif", label: "Affichage non effectif" },
  { type: "litige_cause", value: "delais-trop-courts", label: "Délais trop courts" },
  { type: "litige_cause", value: "autre", label: "Autre (préciser)" },
];

export const LITIGE_OUTCOMES: Descriptor[] = [
  { type: "litige_outcome", value: "acceptation", label: "Acceptation" },
  { type: "litige_outcome", value: "rejet", label: "Rejet" },
  { type: "litige_outcome", value: "sous-investigation", label: "Sous investigation" },
  { type: "litige_outcome", value: "transmission-conservation", label: "Transmission Conservation" },
  { type: "litige_outcome", value: "autre", label: "Autre (préciser)" },
];

export const USER_TYPES: Descriptor[] = [
  { type: "user_type", value: "usager", label: "Usager" },
  { type: "user_type", value: "partenaire", label: "Partenaire" },
  { type: "user_type", value: "intermediaire", label: "Intermédiaire" },
];

export const LEGAL_ENTITIES: Descriptor[] = [
  { type: "legal_entity", value: "physique", label: "Personne physique" },
  { type: "legal_entity", value: "morale", label: "Personne morale" },
];

export const STAGES: Descriptor[] = [
  { type: "stage", value: "depot", label: "Dépôt de dossier" },
  { type: "stage", value: "enquete", label: "Enquête foncière" },
  { type: "stage", value: "etat-lieux", label: "État des lieux" },
  { type: "stage", value: "affichage", label: "Avis d'affichage" },
  { type: "stage", value: "bornage", label: "PV et plan de bornage" },
  { type: "stage", value: "evaluation", label: "Rapport d'évaluation" },
  { type: "stage", value: "decision", label: "Décision et transmission" },
];

export const AFFICHAGE_INFORMATION_CHANNELS: Descriptor[] = [
  { type: "affichage_channel", value: "affichage-physique", label: "Affichage physique" },
  { type: "affichage_channel", value: "site-anuttc", label: "Site ANUTTC" },
  { type: "affichage_channel", value: "autre", label: "Autre" },
];

export const COUNTRIES: Descriptor[] = [
  { type: "country", value: "gabon", label: "Gabon" },
  { type: "country", value: "cameroun", label: "Cameroun" },
  { type: "country", value: "congo-brazzaville", label: "Congo-Brazzaville" },
  { type: "country", value: "congo-rdc", label: "Congo (RDC)" },
  { type: "country", value: "guinee-equatoriale", label: "Guinée Équatoriale" },
  { type: "country", value: "tchad", label: "Tchad" },
  { type: "country", value: "centrafrique", label: "Centrafrique" },
  { type: "country", value: "senegal", label: "Sénégal" },
  { type: "country", value: "cote-ivoire", label: "Côte d'Ivoire" },
  { type: "country", value: "benin", label: "Bénin" },
  { type: "country", value: "burkina-faso", label: "Burkina Faso" },
  { type: "country", value: "mali", label: "Mali" },
  { type: "country", value: "niger", label: "Niger" },
  { type: "country", value: "togo", label: "Togo" },
  { type: "country", value: "france", label: "France" },
  { type: "country", value: "etats-unis", label: "États-Unis" },
  { type: "country", value: "chine", label: "Chine" },
  { type: "country", value: "autre", label: "Autre" },
];

export const getUserTypeLabel = (value: string): string => {
  return USER_TYPES.find(t => t.value === value)?.label || value;
};

export const getLegalEntityLabel = (value: string): string => {
  return LEGAL_ENTITIES.find(e => e.value === value)?.label || value;
};

export const getStageLabel = (value: string): string => {
  return STAGES.find(s => s.value === value)?.label || value;
};

