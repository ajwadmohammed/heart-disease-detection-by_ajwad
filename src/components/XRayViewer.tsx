import { useState, useRef, useEffect } from 'react';
import { HighlightedArea } from '../types';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface XRayViewerProps {
  imageUrl: string;
  highlightedAreas: HighlightedArea[];
}

export default function XRayViewer({ imageUrl, highlightedAreas }: XRayViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-500/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/20';
      case 'low':
        return 'border-green-500 bg-green-500/20';
      default:
        return 'border-blue-500 bg-blue-500/20';
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm ml-2"
            title="Reset Zoom"
          >
            <Maximize className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          {highlightedAreas.length} area{highlightedAreas.length !== 1 ? 's' : ''} detected
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-auto bg-black rounded-xl"
        style={{ maxHeight: '600px' }}
      >
        <div
          className="relative inline-block min-w-full"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s'
          }}
        >
          <img
            src={imageUrl}
            alt="X-ray scan"
            className="w-full h-auto"
          />

          {highlightedAreas.map((area) => (
            <div
              key={area.id}
              className={`absolute border-3 rounded-lg cursor-pointer transition-all ${getSeverityColor(
                area.severity
              )} ${
                selectedArea === area.id ? 'ring-4 ring-white' : ''
              }`}
              style={{
                left: `${area.x}%`,
                top: `${area.y}%`,
                width: `${area.width}%`,
                height: `${area.height}%`
              }}
              onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
              onMouseEnter={() => setSelectedArea(area.id)}
            >
              <div className="absolute -top-8 left-0 bg-gray-900 text-white px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-lg">
                {area.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {highlightedAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => setSelectedArea(area.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedArea === area.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{area.label}</p>
                <p className="text-xs text-gray-500 mt-1 capitalize">{area.severity} severity</p>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  area.severity === 'high'
                    ? 'bg-red-500'
                    : area.severity === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
