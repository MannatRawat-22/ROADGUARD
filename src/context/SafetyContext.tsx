import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  RoadSegment,
  Incident,
  SmartAlert,
  Hotspot,
  SaferRoute,
  UserRole,
  EmergencyContact,
  SosState,
  IncidentType,
  SeverityLevel,
} from '../types';
import { ROAD_SEGMENTS, USER_CURRENT_LOCATION } from '../data/modinagarMapData';
import { INITIAL_INCIDENTS } from '../data/mockIncidents';
import { INITIAL_ALERTS } from '../data/mockAlerts';
import { MOCK_HOTSPOTS } from '../data/mockHotspots';
import { DEMO_ROUTES } from '../data/mockRoutes';
import { useTacticalAudio } from './AudioContext';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

export type AppView = 
  | 'landing'
  | 'dashboard'
  | 'map'
  | 'report'
  | 'ai-detect'
  | 'alerts'
  | 'routes'
  | 'authority'
  | 'hotspots'
  | 'analytics'
  | 'sos-settings';

interface SafetyContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  roadSegments: RoadSegment[];
  incidents: Incident[];
  alerts: SmartAlert[];
  hotspots: Hotspot[];
  routes: SaferRoute[];
  selectedRoad: RoadSegment | null;
  setSelectedRoad: (road: RoadSegment | null) => void;
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  activeRoute: SaferRoute | null;
  setActiveRoute: (route: SaferRoute | null) => void;
  isNavigating: boolean;
  setIsNavigating: (navigating: boolean) => void;
  // Map layers
  showTraffic: boolean;
  setShowTraffic: (show: boolean) => void;
  showRiskLayer: boolean;
  setShowRiskLayer: (show: boolean) => void;
  showIncidents: boolean;
  setShowIncidents: (show: boolean) => void;
  showHotspots: boolean;
  setShowHotspots: (show: boolean) => void;
  radiusKm: number;
  setRadiusKm: (radius: number) => void;
  // Actions
  addHazardReport: (report: {
    type: IncidentType;
    locationName: string;
    description: string;
    severity?: SeverityLevel;
    image?: string;
    isAnonymous?: boolean;
    lat?: number;
    lng?: number;
  }) => string;
  verifyIncident: (id: string, verifiedBy?: string) => void;
  rejectIncident: (id: string) => void;
  resolveIncident: (id: string) => void;
  dispatchPatrol: (id: string, patrolUnit: string) => void;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;
  // SOS
  sosState: SosState;
  emergencyContacts: EmergencyContact[];
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  removeEmergencyContact: (id: string) => void;
  triggerSos: (triggerType: 'crash' | 'shake' | 'manual') => void;
  cancelSos: () => void;
  dispatchSosImmediately: () => void;
  isSosModalOpen: boolean;
  setIsSosModalOpen: (open: boolean) => void;
  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
}

const SafetyContext = createContext<SafetyContextType | null>(null);

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [userRole, setUserRole] = useState<UserRole>('citizen');
  const [roadSegments, setRoadSegments] = useState<RoadSegment[]>(ROAD_SEGMENTS);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [alerts, setAlerts] = useState<SmartAlert[]>(INITIAL_ALERTS);
  const [hotspots] = useState<Hotspot[]>(MOCK_HOTSPOTS);
  const [routes] = useState<SaferRoute[]>(DEMO_ROUTES);
  
  const [selectedRoad, setSelectedRoad] = useState<RoadSegment | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [activeRoute, setActiveRoute] = useState<SaferRoute | null>(null);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  // Map Filter states
  const [showTraffic, setShowTraffic] = useState<boolean>(true);
  const [showRiskLayer, setShowRiskLayer] = useState<boolean>(true);
  const [showIncidents, setShowIncidents] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [radiusKm, setRadiusKm] = useState<number>(5);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const audio = useTacticalAudio();

  const addToast = useCallback(
    (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newToast: ToastMessage = {
        ...toast,
        id,
        timestamp: 'Just now',
      };
      setToasts((prev) => [newToast, ...prev.slice(0, 4)]);
      
      if (toast.type === 'error' || toast.type === 'warning') {
        audio.playAlert();
      } else {
        audio.playSuccess();
      }

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    [audio]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Emergency SOS State
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: 'ec-1', name: 'Dr. Anita Sharma', relationship: 'Parent / Guardian', phone: '+91 98765 43210', isPrimary: true },
    { id: 'ec-2', name: 'Campus Security Desk', relationship: 'SRM Campus Police', phone: '+91 98112 00112', isPrimary: false },
    { id: 'ec-3', name: 'Rohan Verma', relationship: 'Hostel Roommate', phone: '+91 94567 89012', isPrimary: false },
  ]);

  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [sosState, setSosState] = useState<SosState>({
    active: false,
    triggerType: 'manual',
    countdownRemaining: 15,
    isCancelled: false,
    alertDispatched: false,
    location: {
      lat: USER_CURRENT_LOCATION.lat,
      lng: USER_CURRENT_LOCATION.lng,
      address: USER_CURRENT_LOCATION.name,
    },
  });

  // SOS Countdown Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosState.active && !sosState.isCancelled && !sosState.alertDispatched) {
      if (sosState.countdownRemaining > 0) {
        audio.playSosBeep(sosState.countdownRemaining);
        timer = setTimeout(() => {
          setSosState((prev) => ({
            ...prev,
            countdownRemaining: prev.countdownRemaining - 1,
          }));
        }, 1000);
      } else {
        // Countdown reached 0 -> Dispatch
        setSosState((prev) => ({
          ...prev,
          alertDispatched: true,
        }));
        audio.playAlert();
        addToast({
          title: 'EMERGENCY SOS DISPATCHED',
          message: 'Telemetry broadcasted to 3 emergency contacts & Modinagar PCR.',
          type: 'error',
        });
      }
    }
    return () => clearTimeout(timer);
  }, [sosState.active, sosState.isCancelled, sosState.alertDispatched, sosState.countdownRemaining, audio, addToast]);

  const triggerSos = useCallback((triggerType: 'crash' | 'shake' | 'manual') => {
    setSosState({
      active: true,
      triggerType,
      countdownRemaining: 15,
      isCancelled: false,
      alertDispatched: false,
      location: {
        lat: USER_CURRENT_LOCATION.lat,
        lng: USER_CURRENT_LOCATION.lng,
        address: USER_CURRENT_LOCATION.name,
      },
    });
    setIsSosModalOpen(true);
  }, []);

  const cancelSos = useCallback(() => {
    setSosState((prev) => ({
      ...prev,
      active: false,
      isCancelled: true,
      countdownRemaining: 15,
    }));
    setIsSosModalOpen(false);
    audio.playSuccess();
    addToast({
      title: 'SOS Cancelled',
      message: 'Status confirmed safe. No emergency services were alerted.',
      type: 'info',
    });
  }, [audio, addToast]);

  const dispatchSosImmediately = useCallback(() => {
    setSosState((prev) => ({
      ...prev,
      countdownRemaining: 0,
      alertDispatched: true,
    }));
    audio.playAlert();
    addToast({
      title: 'EMERGENCY SOS BROADCASTED',
      message: 'Coordinates sent to contacts and Modinagar PCR Control Room.',
      type: 'error',
    });
  }, [audio, addToast]);

  const addEmergencyContact = useCallback((contact: Omit<EmergencyContact, 'id'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: `ec-${Date.now()}`,
    };
    setEmergencyContacts((prev) => [...prev, newContact]);
    addToast({
      title: 'Emergency Contact Added',
      message: `${contact.name} (${contact.relationship}) added to SOS list.`,
      type: 'success',
    });
  }, [addToast]);

  const removeEmergencyContact = useCallback((id: string) => {
    setEmergencyContacts((prev) => prev.filter((c) => c.id !== id));
    addToast({
      title: 'Contact Removed',
      message: 'Emergency contact removed from SOS alert circle.',
      type: 'info',
    });
  }, [addToast]);

  // Hazard reporting action
  const addHazardReport = useCallback(
    (report: {
      type: IncidentType;
      locationName: string;
      description: string;
      severity?: SeverityLevel;
      image?: string;
      isAnonymous?: boolean;
      lat?: number;
      lng?: number;
    }) => {
      const reportNum = Math.floor(1000 + Math.random() * 9000);
      const reportId = `RG-${reportNum}`;
      
      const newIncident: Incident = {
        id: reportId,
        type: report.type,
        title: `${report.type.toUpperCase().replace('_', ' ')}: ${report.locationName}`,
        locationName: report.locationName,
        lat: report.lat || 28.8350 + (Math.random() - 0.5) * 0.015,
        lng: report.lng || 77.5750 + (Math.random() - 0.5) * 0.015,
        severity: report.severity || 'moderate',
        status: 'pending',
        reportedAt: 'Just now',
        reporterType: 'citizen',
        description: report.description,
        image: report.image,
        upvotes: 1,
      };

      setIncidents((prev) => [newIncident, ...prev]);

      // Update road risk telemetry if near known road
      setRoadSegments((prev) =>
        prev.map((r) => {
          if (report.locationName.toLowerCase().includes(r.name.toLowerCase())) {
            const updatedScore = Math.min(100, r.score + 4);
            return {
              ...r,
              score: updatedScore,
              hazards: r.hazards + 1,
              recentReports: r.recentReports + 1,
              lastUpdated: 'Just now',
              riskCategory:
                updatedScore > 75
                  ? 'HIGH RISK'
                  : updatedScore > 50
                  ? 'RISKY'
                  : updatedScore > 25
                  ? 'CAUTION'
                  : 'SAFE',
            };
          }
          return r;
        })
      );

      audio.playSuccess();
      addToast({
        title: `Report Submitted (${reportId})`,
        message: 'Report is queued for traffic authority verification.',
        type: 'success',
      });

      return reportId;
    },
    [audio, addToast]
  );

  // Authority actions
  const verifyIncident = useCallback((id: string, verifiedBy = 'Modinagar Traffic HQ') => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? { ...inc, status: 'verified', verifiedBy }
          : inc
      )
    );
    audio.playVerify();
    addToast({
      title: 'Incident Verified',
      message: `Incident ${id} marked verified by ${verifiedBy}.`,
      type: 'success',
    });
  }, [audio, addToast]);

  const rejectIncident = useCallback((id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id ? { ...inc, status: 'dismissed' } : inc
      )
    );
    audio.playClick();
    addToast({
      title: 'Report Dismissed',
      message: `Incident ${id} dismissed as resolved/inaccurate.`,
      type: 'info',
    });
  }, [audio, addToast]);

  const resolveIncident = useCallback((id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id ? { ...inc, status: 'resolved' } : inc
      )
    );
    audio.playSuccess();
    addToast({
      title: 'Incident Resolved',
      message: `Incident ${id} cleared. Road segment risk recalculated.`,
      type: 'success',
    });
  }, [audio, addToast]);

  const dispatchPatrol = useCallback((id: string, patrolUnit: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id ? { ...inc, assignedPatrol: patrolUnit } : inc
      )
    );
    audio.playAlert();
    addToast({
      title: 'Patrol Dispatched',
      message: `${patrolUnit} assigned to incident ${id}.`,
      type: 'warning',
    });
  }, [audio, addToast]);

  const markAlertRead = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  }, []);

  const markAllAlertsRead = useCallback(() => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
    addToast({
      title: 'Alerts Acknowledged',
      message: 'All priority notices marked as read.',
      type: 'info',
    });
  }, [addToast]);

  return (
    <SafetyContext.Provider
      value={{
        currentView,
        setCurrentView,
        userRole,
        setUserRole,
        roadSegments,
        incidents,
        alerts,
        hotspots,
        routes,
        selectedRoad,
        setSelectedRoad,
        selectedIncident,
        setSelectedIncident,
        activeRoute,
        setActiveRoute,
        isNavigating,
        setIsNavigating,
        showTraffic,
        setShowTraffic,
        showRiskLayer,
        setShowRiskLayer,
        showIncidents,
        setShowIncidents,
        showHotspots,
        setShowHotspots,
        radiusKm,
        setRadiusKm,
        addHazardReport,
        verifyIncident,
        rejectIncident,
        resolveIncident,
        dispatchPatrol,
        markAlertRead,
        markAllAlertsRead,
        sosState,
        emergencyContacts,
        addEmergencyContact,
        removeEmergencyContact,
        triggerSos,
        cancelSos,
        dispatchSosImmediately,
        isSosModalOpen,
        setIsSosModalOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
