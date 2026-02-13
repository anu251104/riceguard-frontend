import React, { useEffect, useState } from 'react';
import { Trash2, Calendar, AlertCircle, CheckCircle, Search, Image as ImageIcon } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

export const History = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedHistory = localStorage.getItem('detectionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      localStorage.removeItem('detectionHistory');
    }
  };

  const filteredHistory = history.filter(item => {
  const disease = item.disease || item.prediction || '';
  const date = item.date || '';

  return (
    disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
    date.includes(searchTerm)
  );
});


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Detection History</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track your past crop analysis results</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No History Found</h3>
            <p className="text-gray-500 dark:text-gray-400">Start by analyzing some rice leaves in the Detect section.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.disease} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${item.disease === 'Healthy' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {item.disease || item.prediction || 'Unknown'}

                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} />
                      <span>{item.date}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                      {(item.confidence ).toFixed(0)}% Confidence
                    </span>
                  </div>
                  
                  <div className="mt-auto space-y-3">
  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
    Treatment:
  </h4>

  {/* Chemical */}
  {item.treatment?.chemical?.length > 0 && (
    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs">
      <span className="font-semibold text-red-600">Chemical:</span>
      <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700 dark:text-gray-300">
        {item.treatment.chemical.slice(0, 2).map((remedy, i) => (
          <li key={i}>{remedy}</li>
        ))}
      </ul>
    </div>
  )}

  {/* Organic */}
  {item.treatment?.organic?.length > 0 && (
    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs">
      <span className="font-semibold text-green-600">Organic:</span>
      <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700 dark:text-gray-300">
        {item.treatment.organic.slice(0, 2).map((remedy, i) => (
          <li key={i}>{remedy}</li>
        ))}
      </ul>
    </div>
  )}
</div>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
