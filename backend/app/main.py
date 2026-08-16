from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import PatientFeatures, RiskPredictionOutput, HealthCheckResponse
from app.model_service import model_service

app = FastAPI(
    title="TB Adherence Risk Engine API",
    description="Hierarchical Machine Learning API for predicting TB treatment adherence and default timing.",
    version="1.0.0"
)

# Enable CORS for React/Next.js frontend dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=HealthCheckResponse, tags=["Diagnostics"])
def health_check():
    return HealthCheckResponse(
        status="healthy" if model_service.is_loaded else "unhealthy",
        models_loaded=model_service.is_loaded
    )

@app.post(
    "/api/v1/predict",
    response_model=RiskPredictionOutput,
    status_code=status.HTTP_200_OK,
    tags=["Predictions"]
)
def predict_adherence_risk(payload: PatientFeatures):
    if not model_service.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Machine learning model service is uninitialized."
        )
    try:
        prediction = model_service.predict(payload.features)
        return prediction
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Inference error: {str(e)}"
        )