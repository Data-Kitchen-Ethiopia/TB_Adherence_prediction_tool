export interface PatientFeaturesPayload {
  age: number;
  gender: string;
  hiv_status: string;
  smear_result: string;
  treatment_category: string;
  distance_to_clinic_km: number;
  alcohol_use: string;
}

export interface ConfidenceScores {
  cured_probability: number;
  default_probability: number;
  early_default_probability_given_default?: number | null;
}

export interface RiskPredictionResponse {
  risk_tier_code: number; // 0 = Low, 1 = Medium, 2 = High
  risk_tier_name: string;
  overall_default_probability: number;
  estimated_interruption_window: string;
  recommended_clinical_action: string;
  confidence_scores: ConfidenceScores;
}