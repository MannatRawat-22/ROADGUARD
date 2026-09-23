export type RiskCategory = 'SAFE' | 'CAUTION' | 'RISKY' | 'HIGH RISK';

export type RoadType = 'national_highway' | 'arterial' | 'collector' | 'local';

export interface ScoreBreakdown {
  accidentHistory: number; // Max 30
  roadHazards: number;     // Max 25
  visibility: number;      // Max 20
  recentReports: number;   // Max 15
  reportDensity: number;   // Max 10
  total: number;           // Max 100
}

export interface RoadSegment {
  id: string;
  name: string;
  roadType: RoadType;
  badge?: string;
  score: number;
  riskCategory: RiskCategory;
  color: string;
  accidents: number;
  hazards: number;
  visibilityMeters: number;
  visibilityText: 'Good' | 'Moderate' | 'Low' | 'Dense Fog';
  recentReports: number;
  reportDensity: number;
  lastUpdated: string;
  coordinates: [number, number][]; // Array of [lat, lng]
  breakdown: ScoreBreakdown;
  trafficSpeedKmh: number;
  trafficStatus: 'normal' | 'moderate' | 'slow' | 'congested';
  description: string;
}

export type IncidentType = 
  | 'accident'
  | 'pothole'
  | 'obstruction'
  | 'waterlogging'
  | 'low_visibility'
  | 'damaged_road'
  | 'other';

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical';

export type VerificationStatus = 'pending' | 'verified' | 'dismissed' | 'resolved';

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  severity: SeverityLevel;
  status: VerificationStatus;
  reportedAt: string;
  reporterType: 'citizen' | 'ai_camera' | 'patrol' | 'traffic_sensor';
  description: string;
  image?: string;
  upvotes?: number;
  verifiedBy?: string;
  assignedPatrol?: string;
  roadId?: string;
}

export interface SmartAlert {
  id: string;
  title: string;
  message: string;
  reason: string;
  location: string;
  timestamp: string;
  priority: 'critical' | 'high' | 'caution' | 'info';
  recommendedAction: string;
  roadId?: string;
  isRead: boolean;
}

export interface Hotspot {
  id: string;
  name: string;
  score: number;
  riskCategory: RiskCategory;
  accidentReports30d: number;
  hazardReports30d: number;
  visibilityReports30d: number;
  totalIncidents: number;
  peakHours: string;
  primaryFactor: string;
  coordinates: [number, number];
  aiInsight: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface RouteStep {
  instruction: string;
  distance: string;
  roadName: string;
  riskScore: number;
  status: 'safe' | 'caution' | 'risky';
}

export interface SaferRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  durationMinutes: number;
  distanceKm: number;
  riskScore: number;
  riskCategory: 'SAFE' | 'CAUTION' | 'RISKY';
  hazardCount: number;
  visibility: string;
  recentAccidents: number;
  coordinates: [number, number][];
  isRecommended: boolean;
  steps: RouteStep[];
}

export type UserRole = 'citizen' | 'authority';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface SosState {
  active: boolean;
  triggerType: 'crash' | 'shake' | 'manual';
  countdownRemaining: number;
  isCancelled: boolean;
  alertDispatched: boolean;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface AiDetectionResult {
  id: string;
  timestamp: string;
  type: IncidentType;
  confidence: number;
  location: string;
  coordinates: [number, number];
  boundingBox: { x: number; y: number; width: number; height: number };
  snapshotUrl: string;
  status: 'needs_verification' | 'verified' | 'dismissed';
  suggestedAction: string;
}
