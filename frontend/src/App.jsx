import { useState, useEffect } from "react";
import axios from "axios";
import MetricsTable from "./components/MetricsTable";
import ImageUpload from "./components/ImageUpload";
import clothImg from "./assets/fashion/clothing.jpg";
import jacketImg from "./assets/fashion/jacket.jpg";
import pullImg from "./assets/fashion/pullover.jpg";
import tshirtImg from "./assets/fashion/tshirt.jpg";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/metrics`).then((res) => setMetrics(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white flex flex-col items-center">
      
      {/* Hero Section */}
      <header className="w-full text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3">
          👗 Fashion-MNIST Classifier
        </h1>
        <p className="mt-3 text-lg md:text-xl opacity-90">
          Upload an image and let AI guess your style ✨
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
          alt="Fashion illustration"
          className="mx-auto mt-6 w-32 md:w-40 drop-shadow-lg"
        />
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl flex flex-col items-center gap-10 px-4 pb-20">
        
        {/* Metrics Card */}
        <section className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            📊 Model Performance
          </h2>
          {metrics && <MetricsTable metrics={metrics} />}
        </section>

        {/* Upload Card */}
        <section className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            📤 Upload Your Image
          </h2>
          <ImageUpload apiBase={API_BASE} />
        </section>
      </main>
    </div>
  );
}
