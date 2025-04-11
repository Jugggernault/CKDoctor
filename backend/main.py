from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

# Autoriser les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajuster en production
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    age: float = Field(..., alias="Age")
    sexe: str = Field(..., alias="Sexe")
    hta: bool = Field(..., alias="Personnels Médicaux/HTA")
    diabete: bool = Field(..., alias="Personnels Médicaux/Diabète 2")
    systole: float = Field(..., alias="TA (mmHg)/Systole")
    diastole: float = Field(..., alias="TA (mmHg)/Diastole")
    pulse: float = Field(..., alias="Poul (bpm)")
    uree: float = Field(..., alias="Urée (g/L)")
    creatinine: float = Field(..., alias="Créatinine (mg/L)")
    sodium: float = Field(..., alias="Na^+ (meq/L)")
    potassium: float = Field(..., alias="K^+ (meq/L)")
    chloride: float = Field(..., alias="Cl^- (meq/L)")
    hemoglobin: float = Field(..., alias="Hb (g/dL)")
    oliguria: bool = Field(..., alias="Symptômes/Oligurie")
    omi: bool = Field(..., alias="Symptômes/OMI")

    class Config:
        allow_population_by_field_name = True

class PredictionResponse(BaseModel):
    prediction: str
    probabilities: dict[str, float]

# Charger le pipeline (scaler + modèle)
try:
    pipeline = joblib.load("best_pipeline.pkl")
    classes = pipeline.named_steps['classifier'].classes_
    model = pipeline.named_steps['classifier']
    scaler = pipeline.named_steps['scaler']
except Exception as e:
    print(f"Erreur de chargement du modèle : {e}")
    pipeline = None
    classes = []

class PredictionResponse(BaseModel):
    prediction: str
    probabilities: dict[str, float]
    feature_importance: dict[str, float]

@app.post("/api/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    if pipeline is None:
        print('Le modèle n\'est pas chargé')
        raise HTTPException(status_code=500, detail="Modèle non chargé")

    # Encode the sexe field
    sexe_val = request.sexe.lower()
    if sexe_val in ["male", "m", "homme"]:
        sexe_num = 1
    elif sexe_val in ["female", "f", "femme"]:
        sexe_num = 0
    else:
        raise HTTPException(status_code=400, detail="Valeur invalide pour Sexe")

    features = [
        request.age,
        sexe_num,
        int(request.hta),
        int(request.diabete),
        request.systole,
        request.diastole,
        request.pulse,
        request.uree,
        request.creatinine,
        request.sodium,
        request.potassium,
        request.chloride,
        request.hemoglobin,
        int(request.oliguria),
        int(request.omi),
    ]

    X = np.array([features])
    try:
        scaled_X = scaler.transform(X)
        pred = model.predict(scaled_X)
        proba = pipeline.predict_proba(scaled_X)[0]
    except Exception as e:
        print(f"Erreur de prédiction : {e}")
        raise HTTPException(status_code=500, detail=f"Erreur de prédiction : {e}")

    # Prepare the prediction output
    prediction = pred[0]
    if hasattr(prediction, 'item'):
        prediction = prediction.item()

    # Map classes to probabilities
    prob_dict = {str(cls): float(prob) for cls, prob in zip(classes, proba)}

    # Extract feature importance
    # Extract feature importance
    try:
        feature_importances = model.feature_importances_
        feature_names = [
            "Age", "Sexe", "Personnels Médicaux/HTA", "Personnels Médicaux/Diabète 2",
            "TA (mmHg)/Systole", "TA (mmHg)/Diastole", "Poul (bpm)", "Urée (g/L)",
            "Créatinine (mg/L)", "Na^+ (meq/L)", "K^+ (meq/L)", "Cl^- (meq/L)",
            "Hb (g/dL)", "Symptômes/Oligurie", "Symptômes/OMI"
        ]
        importance_dict = {name: float(importance) for name, importance in zip(feature_names, feature_importances)}
    except AttributeError:
        importance_dict = {}

    return PredictionResponse(
        prediction=str(prediction),
        probabilities=prob_dict,
        feature_importance=importance_dict
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
