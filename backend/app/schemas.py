from pydantic import BaseModel, Field
from typing import Dict, Optional, Any

class PatientFeatures(BaseModel):
    """
    Dynamic container for baseline patient features.
    Accepts arbitrary key-value pairs matching feature columns used during training.
    """
    features: Dict[str, Any] = Field(
        ...,
        example={
            "age": 45,
            "gender": "Male",
            "hiv_status": "Positive",
            "smear_result": "Positive",
            "treatment_category": "Category I",
            "distance_to_clinic_km": 12.5,
            "alcohol_use": "Yes"
        }
    )

class ConfidenceScores(BaseModel):
    cured_probability: float
    default_probability: float
    early_default_probability_given_default: Optional[float] = None

class RiskPredictionOutput(BaseModel):
    risk_tier_code: int = Field(..., description="0: Low Risk, 1: Medium Risk, 2: High Risk")
    risk_tier_name: str
    overall_default_probability: float
    estimated_interruption_window: str
    recommended_clinical_action: str
    confidence_scores: ConfidenceScores

class HealthCheckResponse(BaseModel):
    status: str
    models_loaded: bool