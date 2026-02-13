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

  if (!result || !result.prediction) return null;

  const disease = result.prediction.toLowerCase();
  const confidence = result.confidence ?? 0;

  const isHealthy = disease === 'healthy';
  const isUnknown = disease === 'unknown';

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      
      {/* Header */}
      <div
        className={`p-4 ${
          isHealthy ? 'bg-green-500' : isUnknown ? 'bg-gray-500' : 'bg-red-500'
        } text-white flex items-center justify-between`}
      >
        <h3 className="text-xl font-bold flex items-center gap-2 capitalize">
          {isHealthy ? <CheckCircle /> : <AlertCircle />}
          {disease.replaceAll('_', ' ')}
        </h3>

        <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">
          {confidence}% Confidence
        </span>
      </div>

      <div className="p-6 space-y-6">

        {/* General Advice */}
        <div>
          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Info size={20} className="text-blue-500" />
            Advice
          </h4>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {isHealthy
              ? 'Your rice plant appears healthy. Continue regular monitoring and good farming practices.'
              : 'This disease was detected by the model. Follow the treatment recommendations below.'}
          </p>
        </div>

        {/* 🔴 Chemical Treatment */}
        {!isHealthy && result.treatment?.chemical?.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-red-600 mb-2">
              Chemical Treatment
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
              {result.treatment.chemical.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 🟢 Organic Remedies */}
        {!isHealthy && result.treatment?.organic?.length > 0 && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-600 mb-2">
              Organic Remedies
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
              {result.treatment.organic.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ⚠ Disclaimer */}
        {!isHealthy && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ⚠ Always consult a local agricultural officer before applying pesticides.
          </p>
        )}

      </div>
    </div>
  );
};
