import { DetectionResult, HighlightedArea } from '../types';

export async function analyzeXRayImage(imageFile: File): Promise<DetectionResult> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const imageUrl = URL.createObjectURL(imageFile);
  const img = new Image();

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = imageUrl;
  });

  const width = img.naturalWidth;
  const height = img.naturalHeight;

  const conditions = [
    'Cardiomegaly',
    'Pleural Effusion',
    'Pneumonia',
    'Atelectasis'
  ];

  const randomConditions = conditions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 1);

  const highlightedAreas: HighlightedArea[] = randomConditions.map((condition, index) => {
    const x = (width * (0.2 + Math.random() * 0.4)) / width * 100;
    const y = (height * (0.2 + Math.random() * 0.4)) / height * 100;
    const w = 15 + Math.random() * 20;
    const h = 15 + Math.random() * 20;

    const severities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    const severity = severities[Math.floor(Math.random() * 3)];

    return {
      id: `area-${index}`,
      x,
      y,
      width: w,
      height: h,
      label: condition,
      severity
    };
  });

  const analysisTexts = {
    'Cardiomegaly': 'The cardiac silhouette appears enlarged, measuring greater than 50% of the thoracic width. This suggests possible heart enlargement which may indicate underlying cardiac conditions such as heart failure, valvular disease, or hypertension.',
    'Pleural Effusion': 'Fluid accumulation is visible in the pleural space, appearing as a homogeneous opacity with a meniscus sign. This could indicate congestive heart failure, infection, malignancy, or other systemic conditions.',
    'Pneumonia': 'Consolidation patterns are present in the lung parenchyma, showing increased density consistent with inflammatory infiltrates. The distribution suggests bacterial or viral pneumonia requiring clinical correlation.',
    'Atelectasis': 'Partial lung collapse is observed with volume loss and increased opacity. This may be due to airway obstruction, compression, or post-surgical changes. The affected area shows displacement of adjacent structures.'
  };

  const analysis = randomConditions.map(condition => analysisTexts[condition as keyof typeof analysisTexts]).join(' ');

  const recommendations = [
    'Correlation with clinical symptoms and patient history is recommended',
    'Consider follow-up imaging studies for monitoring progression',
    'Laboratory tests including CBC and cardiac enzymes may be helpful',
    'Consultation with a cardiologist or pulmonologist is advised',
    'Review previous imaging studies for comparison if available'
  ].slice(0, 3);

  const confidence = 0.75 + Math.random() * 0.2;

  URL.revokeObjectURL(imageUrl);

  return {
    confidence: Math.round(confidence * 100) / 100,
    detectedConditions: randomConditions,
    highlightedAreas,
    analysis,
    recommendations
  };
}
