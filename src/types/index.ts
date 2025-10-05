export interface DetectionResult {
  confidence: number;
  detectedConditions: string[];
  highlightedAreas: HighlightedArea[];
  analysis: string;
  recommendations: string[];
}

export interface HighlightedArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  severity: 'low' | 'medium' | 'high';
}
