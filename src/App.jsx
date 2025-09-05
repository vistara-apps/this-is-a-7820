import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  MapPin, 
  Shield, 
  MessageSquare, 
  FileText, 
  AlertTriangle,
  ChevronRight,
  Lock,
  Check,
  Menu,
  X
} from 'lucide-react';
import StateSelector from './components/StateSelector';
import StateGuide from './components/StateGuide';
import ScriptLibrary from './components/ScriptLibrary';
import IncidentLogger from './components/IncidentLogger';
import EmergencyAlert from './components/EmergencyAlert';
import PaymentModal from './components/PaymentModal';
import { usePaymentContext } from './hooks/usePaymentContext';
import { stateGuides } from './data/stateGuides';

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [activeTab, setActiveTab] = useState('guide');
  const [userLocation, setUserLocation] = useState(null);
  const [purchasedStates, setPurchasedStates] = useState(new Set(['demo']));
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPurchase, setPendingPurchase] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { createSession } = usePaymentContext();

  // Get user's location on app load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied or unavailable');
        }
      );
    }
  }, []);

  // Auto-suggest state based on location (simplified)
  useEffect(() => {
    if (userLocation && !selectedState) {
      // This would typically use a reverse geocoding service
      // For demo, we'll suggest California
      setSelectedState('CA');
    }
  }, [userLocation, selectedState]);

  const handleStateSelect = (stateCode) => {
    setSelectedState(stateCode);
    setSidebarOpen(false);
  };

  const handlePurchaseState = async (stateCode) => {
    try {
      setPendingPurchase(stateCode);
      setShowPaymentModal(true);
      await createSession();
      setPurchasedStates(prev => new Set([...prev, stateCode]));
      setShowPaymentModal(false);
      setPendingPurchase(null);
    } catch (error) {
      console.error('Payment failed:', error);
      setShowPaymentModal(false);
      setPendingPurchase(null);
    }
  };

  const isStatePurchased = (stateCode) => {
    return purchasedStates.has(stateCode) || stateCode === 'demo';
  };

  const currentStateGuide = selectedState ? stateGuides[selectedState] : null;

  const navigationItems = [
    { id: 'guide', label: 'Rights Guide', icon: Shield },
    { id: 'scripts', label: 'Scripts', icon: MessageSquare },
    { id: 'incidents', label: 'Incidents', icon: FileText },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile Header */}
      <div className="lg:hidden bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-bg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">KnowYourRights</h1>
        <div className="w-8" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-80 bg-surface border-r border-border" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-bg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <StateSelector
                selectedState={selectedState}
                onStateSelect={handleStateSelect}
                purchasedStates={purchasedStates}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-surface border-r border-border min-h-screen">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary mb-2">KnowYourRights</h1>
            <p className="text-sm text-textSecondary">Navigate police stops with confidence</p>
          </div>
          
          <div className="p-6">
            <StateSelector
              selectedState={selectedState}
              onStateSelect={handleStateSelect}
              purchasedStates={purchasedStates}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-surface border-b border-border px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {currentStateGuide && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span className="font-medium">{currentStateGuide.stateName}</span>
                    {!isStatePurchased(selectedState) && (
                      <Lock className="w-4 h-4 text-textSecondary" />
                    )}
                  </div>
                )}
              </div>
              <ConnectButton />
            </div>
          </header>

          {/* Tab Navigation */}
          {selectedState && (
            <nav className="bg-surface border-b border-border px-4 lg:px-8">
              <div className="flex space-x-8 overflow-x-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center space-x-2 py-4 px-2 border-b-2 whitespace-nowrap ${
                        activeTab === item.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-textSecondary hover:text-textPrimary'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}

          {/* Content Area */}
          <div className="flex-1 p-4 lg:p-8">
            {!selectedState ? (
              <div className="max-w-2xl mx-auto text-center py-16">
                <Shield className="w-16 h-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Welcome to KnowYourRights</h2>
                <p className="text-textSecondary mb-8 text-lg">
                  Select your state to access specific legal information and scripts for police interactions.
                </p>
                <div className="lg:hidden">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="btn-primary"
                  >
                    Select Your State
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {!isStatePurchased(selectedState) ? (
                  <div className="card-feature text-center max-w-md mx-auto">
                    <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4">
                      Unlock {currentStateGuide.stateName} Guide
                    </h3>
                    <p className="text-textSecondary mb-6">
                      Get state-specific legal information and actionable scripts for police interactions.
                    </p>
                    <div className="bg-bg rounded-lg p-4 mb-6">
                      <div className="text-2xl font-bold text-primary mb-1">$2.99</div>
                      <div className="text-sm text-textSecondary">One-time purchase</div>
                    </div>
                    <button
                      onClick={() => handlePurchaseState(selectedState)}
                      className="btn-primary w-full"
                    >
                      Purchase State Guide
                    </button>
                  </div>
                ) : (
                  <>
                    {activeTab === 'guide' && (
                      <StateGuide guide={currentStateGuide} />
                    )}
                    {activeTab === 'scripts' && (
                      <ScriptLibrary stateCode={selectedState} />
                    )}
                    {activeTab === 'incidents' && (
                      <IncidentLogger stateCode={selectedState} />
                    )}
                    {activeTab === 'emergency' && (
                      <EmergencyAlert />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          stateCode={pendingPurchase}
          stateName={pendingPurchase ? stateGuides[pendingPurchase]?.stateName : ''}
          onClose={() => {
            setShowPaymentModal(false);
            setPendingPurchase(null);
          }}
        />
      )}
    </div>
  );
}

export default App;