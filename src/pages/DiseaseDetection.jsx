import React, { useState, useEffect } from 'react';
import { ImageUpload } from '../components/detection/ImageUpload';
import { ResultCard } from '../components/detection/ResultCard';
import { ChatBot } from '../components/chat/ChatBot';
import { History, Trash2, Loader2, Cpu, Cloud } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { YOLOInferenceService } from '../services/inferenceService';
// import { ExpertChatbot } from '../components/ExpertChatbot';
// import {Chatbot} from '../pages/ChatBot'



// Helper to create thumbnail
const createThumbnail = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 150;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
        } else {
            resolve('');
        }
      };
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  });
};

const yoloService = new YOLOInferenceService();

export const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [inferenceMode, setInferenceMode] = useState('cloud');
  const { analyzeImage, isAnalyzing: isCloudAnalyzing } = useImageAnalysis();
  const [isLocalAnalyzing, setIsLocalAnalyzing] = useState(false);

 useEffect(() => {
  const savedHistory = localStorage.getItem('detectionHistory');
  if (savedHistory) {
    setHistory(JSON.parse(savedHistory));
  }

  // Do NOT auto-load YOLO here
  setInferenceMode('cloud'); // default
}, []);


  const handleImageSelect = async (file) => {
    setSelectedImage(file);
    setResult(null);

    try {
      const thumbnail = await createThumbnail(file);
      let analysisResult;

      if (inferenceMode === 'local') {
  setIsLocalAnalyzing(true);

  try {
    // Load model only if not loaded yet
    if (!yoloService.model) {
      await yoloService.loadModel();
    }

    analysisResult = await yoloService.runInference(file);

    analysisResult = {
      ...analysisResult,
      imageName: file.name,
      date: new Date().toLocaleString(),
      thumbnail
    };

  } catch (e) {
    console.warn("Local inference failed, switching to cloud", e);
    setInferenceMode('cloud');
    analysisResult = await analyzeImage(file);
  }

  setIsLocalAnalyzing(false);

} else {
  analysisResult = await analyzeImage(file);
} 

      const finalResult = {
        ...analysisResult,
        thumbnail: thumbnail,
        disease: analysisResult.disease || analysisResult.prediction,
  confidence: analysisResult.confidence,
  imageName: file.name,
  date: new Date().toLocaleString(),
  treatment: analysisResult.treatment || {
  chemical: [],
  organic: []
},
      };

      setResult(finalResult);

      const newHistory = [finalResult, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('detectionHistory', JSON.stringify(newHistory));

    } catch (error) {
      console.error("Detection failed:", error);
      alert("Failed to analyze image. Please try again.");
      setSelectedImage(null);
      setIsLocalAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('detectionHistory');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Detection Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sm:p-8 relative">
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {inferenceMode === 'local' ? (
                  <><Cpu size={14} className="text-blue-500" /> Local Model (YOLOv8)</>
                ) : (
                  <><Cloud size={14} className="text-green-500" /> </>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">Upload Leaf Image</h2>
              <ImageUpload 
                onImageSelect={handleImageSelect} 
                selectedImage={selectedImage} 
                onClear={handleClear} 
              />
              
              {(isCloudAnalyzing || isLocalAnalyzing) && (
                <div className="mt-8 flex flex-col items-center justify-center text-green-600">
                  <Loader2 size={48} className="animate-spin mb-4" />
                  <p className="text-lg font-medium">
                    {isLocalAnalyzing ? 'Running YOLOv8 in browser...' : 'Analyzing with Cloud AI...'}
                  </p>
                  <p className="text-sm text-gray-500">Identifying disease patterns</p>
                </div>
              )}

              <ResultCard result={result} isLoading={false} />
            </div>
          </div>

          {/* Sidebar / History */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <History size={20} className="text-green-600" />
                  Recent Detections
                </h3>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="text-red-500 hover:text-red-600 p-1 rounded"
                    title="Clear History"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No recent detections</p>
                ) : (
                  history.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 flex gap-3">
                      {item.thumbnail && (
                        <img src={item.thumbnail} alt="Thumbnail" className="w-12 h-12 object-cover rounded-md" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <span className={`font-semibold text-sm ${item.disease === 'Normal' || item.disease === 'Healthy' ? 'text-green-600' : 'text-red-500'}`}>
                            {item.disease}
                          </span>
                          <span className="text-xs text-gray-400">{item.date.split(',')[0]}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">{item.imageName}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

     <ChatBot  />

    </div>
  );
};
