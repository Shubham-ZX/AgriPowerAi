export type UserRole = 'user' | 'admin';

export type ActiveScreen = 'auth' | 'scanner' | 'history' | 'remedies' | 'nodes' | 'admin';

export interface OrganicRemedy {
  id: string;
  title: string;
  subtitle: string;
  prepTime: string;
  costPerAcre: string;
  savingVsChemical: string;
  ingredients: { item: string; amount: string; note?: string }[];
  steps: string[];
  applicationNotes: string;
  frequency: string;
}

export interface VoiceScripts {
  en: string;
  es: string;
  hi: string;
  sw: string;
}

export interface DiseaseDiagnosis {
  id: string;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  category: 'fungal' | 'bacterial' | 'pest' | 'nutrient' | 'healthy';
  confidence: number;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'High' | 'Severe';
  affectedArea: string;
  sampleImageUrl: string;
  summary: string;
  symptoms: string[];
  organicRemedies: OrganicRemedy[];
  voiceScripts: VoiceScripts;
}

export interface FieldNode {
  id: string;
  zone: string;
  name: string;
  location: string;
  status: 'active' | 'warning' | 'standby';
  soilMoisture: number; // percentage
  airTemp: number; // Celsius
  humidity: number; // percentage
  leafWetnessHours: number;
  sporeRiskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  lastPing: string;
  battery: number;
}

export interface FieldHistoryRecord {
  id: string;
  date: string;
  crop: string;
  plot: string;
  diagnosis: string;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'High' | 'Severe';
  status: 'Active Treatment' | 'Resolved' | 'Monitoring';
  remedyApplied: string;
  notes: string;
  imageUrl: string;
}

export interface RegionalOutbreakAlert {
  id: string;
  disease: string;
  zone: string;
  crop: string;
  incidentCount: number;
  riskTrend: 'rising' | 'steady' | 'declining';
  advisory: string;
  time: string;
}
