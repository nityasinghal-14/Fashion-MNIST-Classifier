from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib, json, cv2
import numpy as np
import base64
from utils import preprocess_external_image

# Load model + class names + metrics
model = joblib.load("model.pkl")
with open("class_names.json") as f:
    class_names = json.load(f)
with open("metrics.json") as f:
    metrics = json.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/metrics")
def get_metrics():
    return metrics

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_GRAYSCALE)

    X_proc, processed_img = preprocess_external_image(img)

    pred = model.predict(X_proc)[0]
    probs = model.predict_proba(X_proc)[0]

    _, buffer = cv2.imencode(".png", (processed_img * 255).astype(np.uint8))
    processed_base64 = base64.b64encode(buffer).decode("utf-8")

    return {
        "prediction": int(pred),
        "label": class_names[str(pred)],
        "probabilities": {class_names[str(i)]: float(p) for i, p in enumerate(probs)},
        "processed_image": processed_base64
    }
