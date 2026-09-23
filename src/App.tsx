import React from 'react';
import { SafetyProvider, useSafety } from './context/SafetyContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';
import { OpeningHero } from './components/landing/OpeningHero';
import { InteractiveMap } from './components/map/InteractiveMap';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { ReportHazardWizard } from './components/report/ReportHazardWizard';
import { AiDetectionStudio } from './components/ai-detection/AiDetectionStudio';
import { SmartAlertsCenter } from './components/alerts/SmartAlertsCenter';
import { SaferRouteComparison } from './components/routes/SaferRouteComparison';
import { CommandCenter } from './components/authority/CommandCenter';
import { RiskHotspotsView } from './components/hotspots/RiskHotspotsView';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { SosSettings } from './components/sos/SosSettings';
import { PersonalSosModal } from './components/sos/PersonalSosModal';

const AppContent: React.FC = () => {
  const { currentView } = useSafety();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <OpeningHero />;
      case 'dashboard':
        return <UserDashboard />;
      case 'map':
        return <InteractiveMap />;
      case 'report':
        return <ReportHazardWizard />;
      case 'ai-detect':
        return <AiDetectionStudio />;
      case 'alerts':
        return <SmartAlertsCenter />;
      case 'routes':
        return <SaferRouteComparison />;
      case 'authority':
        return <CommandCenter />;
      case 'hotspots':
        return <RiskHotspotsView />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'sos-settings':
        return <SosSettings />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070D17] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Command Navbar */}
      <Navbar />

      {/* Main Content Area with Tactical Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {currentView !== 'landing' && <Sidebar />}

        <main className="flex-1 overflow-y-auto bg-[#070D17] relative">
          {renderCurrentView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {currentView !== 'landing' && <MobileNav />}

      {/* Global Personal Emergency SOS Modal */}
      <PersonalSosModal />

      {/* Floating Tactical Notification Toasts */}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AudioProvider>
      <SafetyProvider>
        <AppContent />
      </SafetyProvider>
    </AudioProvider>
  );
};

export default App;
