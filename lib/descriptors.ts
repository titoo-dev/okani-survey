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
 * Cities in Gabon for location fields
 * Used in:
 * - UserProfileStep: depositCity, regularizationCity, residenceCity
 */
export const CITIES: Descriptor[] = [
  { type: "city", value: "libreville", label: "Libreville", order: 1 },
  { type: "city", value: "akanda", label: "Akanda", order: 2 },
  { type: "city", value: "cocobeach", label: "Cocobeach", order: 3 },
  { type: "city", value: "kango", label: "Kango", order: 4 },
  { type: "city", value: "ntoum", label: "Ntoum", order: 5 },
  { type: "city", value: "owendo", label: "Owendo", order: 6 },
  { type: "city", value: "franceville", label: "Franceville", order: 7 },
  { type: "city", value: "masuku", label: "Masuku", order: 8 },
  { type: "city", value: "akieni", label: "Akiéni", order: 9 },
  { type: "city", value: "bakoumba", label: "Bakoumba", order: 10 },
  { type: "city", value: "bongoville", label: "Bongoville", order: 11 },
  { type: "city", value: "boumango", label: "Boumango", order: 12 },
  { type: "city", value: "lekoni", label: "Lékoni", order: 13 },
  { type: "city", value: "moanda", label: "Moanda", order: 14 },
  { type: "city", value: "mounana", label: "Mounana", order: 15 },
  { type: "city", value: "okondja", label: "Okondja", order: 16 },
  { type: "city", value: "lambarene", label: "Lambaréné", order: 17 },
  { type: "city", value: "ndjole", label: "Ndjolé", order: 18 },
  { type: "city", value: "mouila", label: "Mouila", order: 19 },
  { type: "city", value: "fougamou", label: "Fougamou", order: 20 },
  { type: "city", value: "lebamba", label: "Lébamba", order: 21 },
  { type: "city", value: "mbigou", label: "Mbigou", order: 22 },
  { type: "city", value: "mimongo", label: "Mimongo", order: 23 },
  { type: "city", value: "ndende", label: "Ndendé", order: 24 },
  { type: "city", value: "tchibanga", label: "Tchibanga", order: 25 },
  { type: "city", value: "mayumba", label: "Mayumba", order: 26 },
  { type: "city", value: "moabi", label: "Moabi", order: 27 },
  { type: "city", value: "ndindi", label: "Ndindi", order: 28 },
  { type: "city", value: "makokou", label: "Makokou", order: 29 },
  { type: "city", value: "booue", label: "Booué", order: 30 },
  { type: "city", value: "mekambo", label: "Mékambo", order: 31 },
  { type: "city", value: "ovan", label: "Ovan", order: 32 },
  { type: "city", value: "koulamoutou", label: "Koulamoutou", order: 33 },
  { type: "city", value: "lastoursville", label: "Lastoursville", order: 34 },
  { type: "city", value: "pana", label: "Pana", order: 35 },
  { type: "city", value: "port-gentil", label: "Port-Gentil", order: 36 },
  { type: "city", value: "gamba", label: "Gamba", order: 37 },
  { type: "city", value: "omboue", label: "Omboué", order: 38 },
  { type: "city", value: "oyem", label: "Oyem", order: 39 },
  { type: "city", value: "bitam", label: "Bitam", order: 40 },
  { type: "city", value: "medouneu", label: "Médouneu", order: 41 },
  { type: "city", value: "minvoul", label: "Minvoul", order: 42 },
  { type: "city", value: "mitzic", label: "Mitzic", order: 43 },
  { type: "city", value: "autres", label: "Autres", order: 44 },
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
