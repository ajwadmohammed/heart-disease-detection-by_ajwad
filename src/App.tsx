import { useState } from 'react';
import { Activity, Shield, Cpu, Scan } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import XRayViewer from './components/XRayViewer';
import AnalysisReport from './components/AnalysisReport';
import { DetectionResult } from './types';
import { analyzeXRayImage } from './services/imageAnalysis';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageSelect = async (file: File) => {
    setSelectedFile(file);
    setResult(null);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeXRayImage(selectedFile);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl">
              <Activity className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              MediScan AI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered chest X-ray analysis with real-time disease detection and clinical insights by INNOVEX
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Scan className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Detection</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Upload chest X-rays and get immediate AI-powered disease detection with precise highlighting
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Deep Learning</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Powered by state-of-the-art neural networks trained on thousands of medical images
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Grade</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Comprehensive analysis with detailed reports and actionable medical recommendations
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload X-ray Image</h2>
            <p className="text-gray-600">
              Upload a chest X-ray image to begin AI-powered analysis
            </p>
          </div>

          <ImageUploader onImageSelect={handleImageSelect} isAnalyzing={isAnalyzing} />

          {imageUrl && !result && (
            <div className="mt-6">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing X-ray...
                  </>
                ) : (
                  <>
                    <Scan className="w-6 h-6" />
                    Analyze X-ray
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {result && imageUrl && (
          <>
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Detected Anomalies</h2>
                <p className="text-gray-600">
                  Interactive visualization of detected conditions
                </p>
              </div>

              <XRayViewer imageUrl={imageUrl} highlightedAreas={result.highlightedAreas} />
            </div>

            <div className="mb-8">
              <AnalysisReport result={result} />
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setImageUrl(null);
                  setResult(null);
                }}
                className="bg-white text-blue-600 py-3 px-8 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-600"
              >
                Analyze Another X-ray
              </button>
            </div>
          </>
        )}

        <footer className="mt-16 text-center">
          <div className="inline-block bg-white rounded-xl shadow-lg p-6 max-w-4xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About MediScan AI</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              MediScan AI uses advanced computer vision and deep learning to analyze chest X-rays for common
              thoracic conditions including cardiomegaly, pleural effusion, pneumonia, and atelectasis.
              The system provides detailed spatial localization of abnormalities with severity classification
              and comprehensive clinical summaries.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                Convolutional Neural Networks
              </span>
              <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                Object Detection
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">
                Medical Imaging
              </span>
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                Clinical AI
              </span>
            </div>
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            © 2025 MediScan AI • Design and Developed by Team INNOVEX
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;