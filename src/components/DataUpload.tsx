import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Database, Zap } from 'lucide-react';

const DataUpload = () => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processingResults, setProcessingResults] = useState(null);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setUploadStatus('error');
      return;
    }

    setUploadedFile(file);
    setUploadStatus('uploading');

    // Simulate file processing
    setTimeout(() => {
      setUploadStatus('success');
      setProcessingResults({
        citiesProcessed: 12,
        newCities: 5,
        updatedCities: 7,
        validationErrors: 2,
        averageScore: 78.5
      });
    }, 2000);
  }, []);

  const downloadTemplate = () => {
    const csvContent = `city_name,state,tier,population,demographics_score,digital_score,competition_score,logistics_score,economic_score,total_sellers,active_sellers,fashion_sellers,home_sellers,electronics_sellers,beauty_sellers,sports_sellers,delivery_time_avg,delivery_cost_total,success_rate,customer_satisfaction
Nashik,Maharashtra,Tier 2,1530000,85,68,92,88,91,12500,8750,3200,2800,1900,1650,950,2.8,65,94,4.3
Rajkot,Gujarat,Tier 2,1380000,82,72,95,85,89,9800,7350,2800,2200,1600,1400,800,3.2,77,91,4.1`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'market_data_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const requiredFields = [
    { field: 'city_name', description: 'Name of the city', example: 'Nashik' },
    { field: 'state', description: 'State where city is located', example: 'Maharashtra' },
    { field: 'tier', description: 'City tier classification', example: 'Tier 2' },
    { field: 'population', description: 'Total population', example: '1530000' },
    { field: 'demographics_score', description: 'Demographics score (0-100)', example: '85' },
    { field: 'digital_score', description: 'Digital penetration score (0-100)', example: '68' },
    { field: 'competition_score', description: 'Competition analysis score (0-100)', example: '92' },
    { field: 'logistics_score', description: 'Logistics infrastructure score (0-100)', example: '88' },
    { field: 'economic_score', description: 'Economic indicators score (0-100)', example: '91' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Intelligent Data Processing</h1>
            <p className="text-indigo-100 mt-2">Upload market data and let our AI-powered algorithms generate comprehensive insights</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <Zap className="w-6 h-6 mb-2" />
            <h3 className="font-semibold">Smart Processing</h3>
            <p className="text-sm text-indigo-100">Advanced algorithms automatically calculate market scores and business metrics</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <CheckCircle className="w-6 h-6 mb-2" />
            <h3 className="font-semibold">Data Validation</h3>
            <p className="text-sm text-indigo-100">Built-in validation ensures data quality and identifies potential issues</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <FileText className="w-6 h-6 mb-2" />
            <h3 className="font-semibold">Instant Insights</h3>
            <p className="text-sm text-indigo-100">Generate business cases, seller mapping, and logistics analysis automatically</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Market Data</h2>
          
          <div className="mb-6">
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                uploadStatus === 'success' ? 'border-green-300 bg-green-50' :
                uploadStatus === 'error' ? 'border-red-300 bg-red-50' :
                'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              {uploadStatus === 'uploading' ? (
                <div className="space-y-4">
                  <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-gray-600">Processing your data...</p>
                </div>
              ) : uploadStatus === 'success' ? (
                <div className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Upload Successful!</h3>
                    <p className="text-green-600">File: {uploadedFile?.name}</p>
                  </div>
                </div>
              ) : uploadStatus === 'error' ? (
                <div className="space-y-4">
                  <AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Upload Failed</h3>
                    <p className="text-red-600">Please upload a valid CSV file</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Drop your CSV file here</h3>
                    <p className="text-gray-500">or click to browse</p>
                  </div>
                </div>
              )}
              
              {uploadStatus !== 'uploading' && (
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={downloadTemplate}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Template</span>
            </button>
            
            <div className="text-sm text-gray-500">
              Supported format: CSV
            </div>
          </div>

          {/* Processing Results */}
          {processingResults && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{processingResults.citiesProcessed}</div>
                  <div className="text-sm text-gray-600">Cities Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{processingResults.newCities}</div>
                  <div className="text-sm text-gray-600">New Cities Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{processingResults.updatedCities}</div>
                  <div className="text-sm text-gray-600">Cities Updated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{processingResults.averageScore}</div>
                  <div className="text-sm text-gray-600">Avg Market Score</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Schema */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Schema & Requirements</h2>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {requiredFields.map((field, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono bg-gray-200 px-2 py-1 rounded text-indigo-600">
                    {field.field}
                  </code>
                  <span className="text-xs text-gray-500">Required</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">{field.description}</p>
                <p className="text-xs text-gray-500">Example: <code>{field.example}</code></p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">How It Works</h3>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Upload CSV with market data</li>
              <li>2. AI algorithms calculate composite scores</li>
              <li>3. Generate seller potential estimates</li>
              <li>4. Create logistics cost models</li>
              <li>5. Build complete business cases</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Intelligent Processing Algorithms</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Market Scoring</h3>
            <p className="text-sm text-gray-600">Weighted algorithm combining demographics, digital penetration, competition, logistics, and economic factors</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Seller Estimation</h3>
            <p className="text-sm text-gray-600">Predictive models for seller potential based on population, business density, and digital adoption</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Logistics Modeling</h3>
            <p className="text-sm text-gray-600">Cost optimization algorithms considering distance, infrastructure, and delivery patterns</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Business Case</h3>
            <p className="text-sm text-gray-600">Financial modeling with ROI, NPV, and risk assessment based on market characteristics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;