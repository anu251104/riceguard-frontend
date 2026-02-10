import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export function useImageAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeImage = async (file) => {
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file); // MUST be "file"

      const response = await fetch(`${API}/analyze`, {
        method: "POST",
        body: formData,
      });

      // 🔥 LOG RAW RESPONSE FOR DEBUG
      if (!response.ok) {
        const text = await response.text();
        console.error("Backend error:", text);
        throw new Error(text);
      }

      const result = await response.json();

      return {
        ...result,
        imageName: file.name,
        date: new Date().toLocaleString(),
      };
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze image. Backend returned an error.");
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeImage, isAnalyzing };
}
