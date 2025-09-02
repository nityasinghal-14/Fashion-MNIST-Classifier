import { useState } from "react";
import axios from "axios";

export default function ImageUpload({ apiBase }) {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${apiBase}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-200 
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-500 file:text-white
                   hover:file:bg-blue-600 cursor-pointer"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white 
                   font-semibold rounded-full shadow-lg transition-all 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Predicting..." : "Upload & Predict"}
      </button>

      {prediction && (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">
            Predicted: {prediction.label}
          </h3>
          <p className="text-gray-200">
            Confidence:{" "}
            {(
              prediction.probabilities[prediction.label] * 100
            ).toFixed(2)}
            %
          </p>
          <img
            src={`data:image/png;base64,${prediction.processed_image}`}
            alt="Processed"
            className="mx-auto mt-4 rounded-lg shadow-md border border-white/20"
          />
        </div>
      )}
    </div>
  );
}
