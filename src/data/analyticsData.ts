export const ANALYTICS_SUMMARY = {
  totalReports: 124,
  verifiedReports: 96,
  resolvedIncidents: 84,
  pendingVerification: 17,
  activeAlerts: 4,
  highRiskAreas: 2,
  resolutionRatePercent: 87.5,
  avgResponseTimeMin: 12.4,
  mostReportedHazard: 'Pothole (46 reports)',
  isSimulated: true,
};

export const ACCIDENTS_BY_DAY = [
  { day: 'Mon', accidents: 3, nearMisses: 8, hazardsReported: 14 },
  { day: 'Tue', accidents: 2, nearMisses: 6, hazardsReported: 18 },
  { day: 'Wed', accidents: 5, nearMisses: 11, hazardsReported: 22 },
  { day: 'Thu', accidents: 1, nearMisses: 5, hazardsReported: 16 },
  { day: 'Fri', accidents: 6, nearMisses: 14, hazardsReported: 26 },
  { day: 'Sat', accidents: 4, nearMisses: 9, hazardsReported: 19 },
  { day: 'Sun', accidents: 2, nearMisses: 7, hazardsReported: 12 },
];

export const HAZARDS_BY_CATEGORY = [
  { name: 'Potholes', count: 46, color: '#F97316' },
  { name: 'Low Visibility / Fog', count: 28, color: '#EAB308' },
  { name: 'Road Obstructions', count: 21, color: '#EF4444' },
  { name: 'Waterlogging', count: 16, color: '#38BDF8' },
  { name: 'Damaged / Trench', count: 13, color: '#A855F7' },
];

export const RISK_DISTRIBUTION = [
  { name: 'Safe (0-25)', value: 32, color: '#22C55E' },
  { name: 'Caution (26-50)', value: 38, color: '#EAB308' },
  { name: 'Risky (51-75)', value: 20, color: '#F97316' },
  { name: 'High Risk (76-100)', value: 10, color: '#EF4444' },
];

export const HOURLY_VISIBILITY_TREND = [
  { time: '00:00', visibilityM: 110, riskIndex: 68 },
  { time: '03:00', visibilityM: 90, riskIndex: 78 },
  { time: '06:00', visibilityM: 140, riskIndex: 64 },
  { time: '09:00', visibilityM: 320, riskIndex: 42 },
  { time: '12:00', visibilityM: 650, riskIndex: 25 },
  { time: '15:00', visibilityM: 600, riskIndex: 28 },
  { time: '18:00', visibilityM: 280, riskIndex: 51 },
  { time: '21:00', visibilityM: 170, riskIndex: 62 },
];

export const REPORT_RESOLUTION_TIMELINE = [
  { week: 'W1', incoming: 22, resolved: 19 },
  { week: 'W2', incoming: 28, resolved: 25 },
  { week: 'W3', incoming: 35, resolved: 31 },
  { week: 'W4', incoming: 39, resolved: 36 },
];
