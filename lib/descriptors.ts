export type Descriptor = {
  type: string;
  value: string;
  label: string;
  order?: number;
};

/**
 * Payment modes for various form steps
 * Used in:
 * - EvaluationStep: depotPaymentMode, enquetePaymentMode, etatLieuxPaymentMode, bornagePaymentMode, evaluationPaymentMode
 * - DecisionStep: decisionPaymentMode
 * - DisputesStep: litigePaymentMode
 */
export const PAYMENT_MODES: Descriptor[] = [
  { type: "payment_mode", value: "especes", label: "Espèces" },
  { type: "payment_mode", value: "cheque", label: "Chèque" },
  { type: "payment_mode", value: "virement", label: "Virement" },
  { type: "payment_mode", value: "mobile-money", label: "Mobile Money" },
  { type: "payment_mode", value: "money-banking", label: "Money Banking" },
  { type: "payment_mode", value: "autre", label: "Autre (Préciser...)" },
];

/**
 * Evaluation options for depot step
 * Used in:
 * - EvaluationStep: depotEvaluation (depot step only)
 */
export const EVALUATION_OPTIONS: Descriptor[] = [
  { type: "evaluation", value: "excellent", label: "Excellent" },
  { type: "evaluation", value: "tres-bien", label: "Très bien" },
  { type: "evaluation", value: "bien", label: "Bien" },
  { type: "evaluation", value: "assez-bien", label: "Assez bien" },
  { type: "evaluation", value: "passable", label: "Passable" },
  { type: "evaluation", value: "mediocre", label: "Médiocre" },
];

/**
 * Opposition nature types for disputes step
 * Used in:
 * - DisputesStep: oppositionNature (when hadOpposition is true)
 */
export const OPPOSITION_NATURES: Descriptor[] = [
  { type: "opposition_nature", value: "usurpation", label: "Usurpation" },
  { type: "opposition_nature", value: "emprise", label: "Emprise" },
  {
    type: "opposition_nature",
    value: "conflit-anteriorite",
    label: "Conflit antériorité",
  },
  { type: "opposition_nature", value: "autre", label: "Autre (préciser)" },
];

/**
 * Litigation cause types for disputes step
 * Used in:
 * - DisputesStep: litigeCause (when hadOpposition is true)
 */
export const LITIGE_CAUSES: Descriptor[] = [
  { type: "litige_cause", value: "defaillance-si", label: "Défaillance SI" },
  {
    type: "litige_cause",
    value: "manipulation-interne",
    label: "Manipulation interne",
  },
  {
    type: "litige_cause",
    value: "affichage-non-effectif",
    label: "Affichage non effectif",
  },
  {
    type: "litige_cause",
    value: "delais-trop-courts",
    label: "Délais trop courts",
  },
  { type: "litige_cause", value: "autre", label: "Autre (préciser)" },
];

/**
 * Litigation outcome types for disputes step
 * Used in:
 * - DisputesStep: litigeOutcome (when hadOpposition is true)
 */
export const LITIGE_OUTCOMES: Descriptor[] = [
  { type: "litige_outcome", value: "acceptation", label: "Acceptation" },
  { type: "litige_outcome", value: "rejet", label: "Rejet" },
  {
    type: "litige_outcome",
    value: "sous-investigation",
    label: "Sous investigation",
  },
  {
    type: "litige_outcome",
    value: "transmission-conservation",
    label: "Transmission Conservation",
  },
  { type: "litige_outcome", value: "autre", label: "Autre (préciser)" },
];

/**
 * User type options for profile step
 * Used in:
 * - UserProfileStep: userType
 * - SurveySummary: getUserTypeLabel() helper function
 */
export const USER_TYPES: Descriptor[] = [
  { type: "user_type", value: "usager", label: "Usager" },
  { type: "user_type", value: "partenaire", label: "Partenaire" },
  { type: "user_type", value: "intermediaire", label: "Intermédiaire" },
];

/**
 * Legal entity types for profile step
 * Used in:
 * - UserProfileStep: legalEntity
 */
export const LEGAL_ENTITIES: Descriptor[] = [
  { type: "legal_entity", value: "physique", label: "Personne physique" },
  { type: "legal_entity", value: "morale", label: "Personne morale" },
];

/**
 * Process stages for stage selection and survey flow
 * Used in:
 * - StageSelectionPage: stageReached dropdown
 * - SurveyPage: getStageLabel() helper function for display
 * - SurveySummary: stageReached field for step visibility logic
 */
export const STAGES: Descriptor[] = [
  { type: "stage", value: "depot", label: "Dépôt de dossier", order: 1 },
  { type: "stage", value: "enquete", label: "Enquête foncière", order: 2 },
  { type: "stage", value: "etat-lieux", label: "État des lieux", order: 3 },
  { type: "stage", value: "affichage", label: "Avis d'affichage", order: 4 },
  { type: "stage", value: "bornage", label: "PV et plan de bornage", order: 5 },
  { type: "stage", value: "evaluation", label: "Rapport d'évaluation", order: 6 },
  { type: "stage", value: "decision", label: "Décision et transmission", order: 7 },
];

/**
 * Information channels for affichage step
 * Used in:
 * - EvaluationStep: affichageInformationChannel (affichage step only, when affichageWasInformed is true)
 */
export const AFFICHAGE_INFORMATION_CHANNELS: Descriptor[] = [
  {
    type: "affichage_channel",
    value: "affichage-physique",
    label: "Affichage physique",
  },
  { type: "affichage_channel", value: "site-anuttc", label: "Site ANUTTC" },
  { type: "affichage_channel", value: "autre", label: "Autre" },
];

/**
 * Country options for nationality field
 * Used in:
 * - UserProfileStep: nationality autocomplete field
 */
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

/**
 * Helper function to get user type label from value
 * Used in: SurveySummary component for displaying user type
 */
export const getUserTypeLabel = (value: string): string => {
  return USER_TYPES.find((t) => t.value === value)?.label || value;
};

/**
 * Helper function to get legal entity label from value
 * Currently not used but available for future use
 */
export const getLegalEntityLabel = (value: string): string => {
  return LEGAL_ENTITIES.find((e) => e.value === value)?.label || value;
};

/**
 * Helper function to get stage label from value
 * Used in: SurveyPage for displaying selected stage
 */
export const getStageLabel = (value: string): string => {
  return STAGES.find((s) => s.value === value)?.label || value;
};
