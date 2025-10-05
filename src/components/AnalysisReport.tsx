import { DetectionResult } from '../types';
import { FileText, AlertCircle, CheckCircle, TrendingUp, Brain } from 'lucide-react';

interface AnalysisReportProps {
  result: DetectionResult;
}

export default function AnalysisReport({ result }: AnalysisReportProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Analysis Complete</h2>
            <p className="text-blue-100 text-sm">Powered by deep learning algorithms</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">Confidence Score</p>
            <p className="text-3xl font-bold">{Math.round(result.confidence * 100)}%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">Conditions Detected</p>
            <p className="text-3xl font-bold">{result.detectedConditions.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Detected Conditions</h3>
        </div>

        <div className="space-y-3">
          {result.detectedConditions.map((condition, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{condition}</p>
              </div>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Clinical Analysis</h3>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
        </div>

        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700 flex-1">{rec}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">Medical Disclaimer</h4>
            <p className="text-yellow-800 text-sm leading-relaxed">
              This AI-generated analysis is for educational and research purposes only. It should not be
              used as a substitute for professional medical advice, diagnosis, or treatment. Always seek
              the advice of qualified healthcare providers with any questions regarding medical conditions.
              Never disregard professional medical advice or delay seeking it because of information provided
              by this tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
