# TB_Adherence_prediction_tool
This is a data driven TB treatment adherance prediction model with user interface and backend

## Problem Statement
Clinical & Public Health ContextTuberculosis (TB) requires a minimum of 6 months of continuous multi-drug treatment (typically Isoniazid, Rifampicin, Pyrazinamide, and Ethambutol). Globally, between 10% and 30% of patients fail to complete their treatment regimen due to treatment fatigue, severe adverse drug reactions, socio-economic barriers, or lack of family support.  When a patient stops taking anti-TB medication or misses doses intermittently:
### Drug Resistance Escalation: 
    It transforms drug-susceptible TB into Multi-Drug Resistant TB (MDR-TB) or Extensively Drug-Resistant TB (XDR-TB), which requires up to 2 years of expensive, highly toxic second-line regimens.
### Community Transmission: 
    Non-adherent patients remain infectious longer, spreading TB strains directly within households and dense urban areas
### System Strain: 
    Reactive care for defaulted patients costs health systems up to $20\times$ more than preventive adherence management.
## The current model
The Industry Challenge"Current TB control programs rely on one-size-fits-all Directly Observed Therapy (DOT) or reactive identification—detecting non-adherence only AFTER a patient has missed multiple clinic visits or defaulted. 

Healthcare providers lack an automated, data-driven system to stratify newly diagnosed patients into predictive risk tiers (Low, Medium, High) at baseline and dynamically route them to tailored, cost-effective digital and clinical intervention workflows before default occurs.
## Why Existing Solutions Fail?
### Universal DOT Is Resource-Intensive: 
    Expecting every patient to visit a health facility daily for 6 months creates high transportation costs and lost wages, driving default.
### Unstructured Risk Scoring: 
Standard clinical checks ignore compound non-adherence predictors (e.g., distance to facility combined with food insecurity, alcohol use, and early adverse drug effects).
### Prediction Without Action: 
    Existing academic models produce a risk score in a Jupyter Notebook but lack an automated software pipeline to notify community health workers (CHWs) or schedule targeted interventions.
# Proposed Solution
Build an end-to-end predictive risk-stratification system that analyzes patient baseline clinical, socioeconomic, and behavioral indicators at treatment initiation to predict 3-tier non-adherence risk (Low, Medium, High). The system dynamically maps each risk score to automated, tiered intervention workflows and provides clinicians with interpretable feature importance (SHAP) to address specific non-adherence drivers.

## Tiered Intervention Strategy Framework
Rather than applying uniform monitoring, the platform routes patients to specific adherence support protocols based on predicted risk:

### Low Risk Tier (Standard Care)
Intervention: standard of care. Monitoring: standard of care. Goal: Minimal healthcare system burden; low intrusion for stable patients.

### Medium Risk Tier (Enhanced Digital & Peer Support)

    Intervention: 2-way interactive voice/SMS check-ins, asynchronous Video Observed Therapy (VOT), automated alerts sent to treatment supporters, and nutritional support vouchers. 
    Monitoring: Bi-weekly pharmacy logs and automated escalation if two consecutive doses are unconfirmed.
    Goal: Proactive behavioral nudges and early detection of side effects or barriers.

### High Risk Tier (Intensive Community & Clinical Care)

    Intervention: Daily Directly Observed Therapy (DOT) via Community Health Worker (CHW) home visits, dedicated clinical counseling for side-effect management, and transport subsidies.
    Monitoring: Real-time CHW dispatch queue in the web dashboard; immediate alert to treating physician upon any missed dose. 
    Goal: Direct clinical and logistical intervention to prevent MDR-TB emergence.