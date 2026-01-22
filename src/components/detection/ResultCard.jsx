import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export const ResultCard = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  if (!result) return null;

  const isHealthy = result.disease.toLowerCase() === 'healthy';
  const isUnknown = result.disease.toLowerCase() === 'unknown';

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className={`p-4 ${isHealthy ? 'bg-green-500' : isUnknown ? 'bg-gray-500' : 'bg-red-500'} text-white flex items-center justify-between`}>
        <h3 className="text-xl font-bold flex items-center gap-2">
          {isHealthy ? <CheckCircle /> : isUnknown ? <AlertCircle /> : <AlertCircle />}
          {result.disease}
        </h3>
        <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">
          {(result.confidence * 100).toFixed(1)}% Confidence
        </span>
      </div>
      
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <Info size={20} className="text-blue-500" />
          Treatment & Advice
        </h4>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {result.treatment}
        </p>
      </div>
    </div>
  );
};
