import os
import joblib
import pandas as pd
from app.schemas import RiskPredictionOutput, ConfidenceScores

class ModelService:
    def __init__(self, models_dir: str = "../models"):
        self.models_dir = models_dir
        self.preprocessor = None
        self.model_a = None
        self.model_b = None
        self.is_loaded = False
        self.load_models()

    def load_models(self):
        try:
            prep_path = os.path.join(self.models_dir, "tb_preprocessor.joblib")
            model_a_path = os.path.join(self.models_dir, "tb_model_a_cured_vs_defaulter.joblib")
            model_b_path = os.path.join(self.models_dir, "tb_model_b_early_vs_late.joblib")

            self.preprocessor = joblib.load(prep_path)
            self.model_a = joblib.load(model_a_path)
            self.model_b = joblib.load(model_b_path)
            self.is_loaded = True
            print("✅ Model artifacts successfully loaded into memory.")
        except Exception as e:
            print(f"❌ Failed to load model artifacts: {e}")
            self.is_loaded = False

    def predict(self, feature_dict: dict) -> RiskPredictionOutput:
        if not self.is_loaded:
            raise RuntimeError("Models are not loaded.")

        patient_df = pd.DataFrame([feature_dict])

        # Step 1: Model A (0 = Cured, 1 = Defaulter)
        pred_a = self.model_a.predict(patient_df)[0]
        prob_a = self.model_a.predict_proba(patient_df)[0] # [P(Cured), P(Default)]

        default_prob = float(prob_a[1])
        cured_prob = float(prob_a[0])

        if pred_a == 0:
            tier_code = 0
            tier_name = "Low Risk (Expected Completion)"
            interruption_window = "N/A (Treatment Completion)"
            clinical_action = "Standard Monthly DOTS Monitoring"
            early_prob_given_def = None
        else:
            # Step 2: Model B (0 = Late Default, 1 = Early Default)
            pred_b = self.model_b.predict(patient_df)[0]
            prob_b = self.model_b.predict_proba(patient_df)[0] # [P(Late), P(Early)]

            early_prob_given_def = round(float(prob_b[1]), 4)

            if pred_b == 1:
                tier_code = 2
                tier_name = "High Risk (Early / Intensive Phase Default)"
                interruption_window = "Days 0–60 (Intensive Phase)"
                clinical_action = "Immediate DOTS Enabler, Weekly Follow-ups, Intensive Counseling"
            else:
                tier_code = 1
                tier_name = "Medium Risk (Late / Continuation Phase Default)"
                interruption_window = "Days 61–180 (Continuation Phase)"
                clinical_action = "Bi-weekly Digital Reminders, Side-effect Management Check"

        return RiskPredictionOutput(
            risk_tier_code=tier_code,
            risk_tier_name=tier_name,
            overall_default_probability=round(default_prob, 4),
            estimated_interruption_window=interruption_window,
            recommended_clinical_action=clinical_action,
            confidence_scores=ConfidenceScores(
                cured_probability=round(cured_prob, 4),
                default_probability=round(default_prob, 4),
                early_default_probability_given_default=early_prob_given_def
            )
        )

# Global Service Instance
model_service = ModelService()