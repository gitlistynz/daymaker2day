import React, { useState, useEffect } from 'react';
import { AppView, ServiceItem, BookingDetails, UserProfileData, BookingType, GiftDeliveryMethod } from './types';
import { QRCodePage } from './components/QRCodePage';
import ChristmasFront from './components/ChristmasFront';
import { ChristmasLanding } from './components/ChristmasLanding';
import { ChristmasPricing } from './components/ChristmasPricing';
import { ChristmasServices } from './components/ChristmasServices';
import { ChristmasCheckout } from './components/ChristmasCheckout';
import ChristmasPayment from './components/ChristmasPayment';
import { ChristmasConfirmation } from './components/ChristmasConfirmation';
import { LandingPage } from './components/LandingPage';
import { SignupPage } from './components/SignupPage';
import { PricingPage } from './components/PricingPage';
import { MenuGrid } from './components/MenuGrid';
import { SessionDetail } from './components/SessionDetail';
import { BookOrGift } from './components/BookOrGift';
import { BookingCalendar } from './components/BookingCalendar';
import { Payment } from './components/Payment';
import { GiftDelivery } from './components/GiftDelivery';
import { UserProfile } from './components/UserProfile';
import { AIChat } from './components/AIChat';
import { AdminPortal } from './components/AdminPortal';
import { LiveSession } from './components/LiveSession';
import { PricingModal } from './components/PricingModal';
import { SERVICES_LIST } from './constants';
import { format } from 'date-fns';
import { CheckCircle, ArrowLeft, Terminal, User, Gift, Calendar as CalendarIcon, Settings, Radio, Bell, BellOff } from 'lucide-react';

// Type for scheduled sessions
interface ScheduledSession {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: Date;
  timeSlot: string;
  hostName: string;
  hostImage: string;
  customerName: string;
  customerEmail: string;
  customerBio: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.QR_CODE);
  // Demo-only mode when the path is /christmas-demo — keeps the Christmas experience isolated
  const [isChristmasDemo, setIsChristmasDemo] = useState<boolean>(() => {
    try {
      return window.location.pathname.toLowerCase().startsWith('/christmas-demo');
    } catch (e) {
      return false;
    }
  });
  const bellsAudioRef = React.useRef<HTMLAudioElement>(null);
  // Default to OFF unless previously enabled by the user (explicit request: "turn the bell off")
  const [bellsEnabled, setBellsEnabled] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('dm2d_bells_enabled');
      return raw === 'true';
    } catch (e) {
      return false;
    }
  });
  useEffect(() => {
    // If we're in the christmas-demo path, start the app on the QR code to match demo flow
    if (isChristmasDemo) {
      setCurrentView(AppView.QR_CODE);
      return;
    }
    // Only play bells for the first two Christmas pages: landing and pricing
    const christmasViews = new Set([
      AppView.CHRISTMAS_LANDING,
      AppView.CHRISTMAS_PRICING
    ]);

    const audio = bellsAudioRef.current;
    if (!audio) return;

    // Ensure audio attributes for consistent playback
    audio.loop = true;
    audio.volume = 0.35; // comfortable starting volume

    const shouldPlay = christmasViews.has(currentView) && bellsEnabled;

    if (shouldPlay) {
      // Try to play unmuted first; some browsers will block this and throw
      // Ensure we use the enabled state — if not yet enabled we still attempt to play
      audio.muted = false;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // If autoplay is blocked, start muted so it can autoplay and remain playing
        // If autoplay blocked, keep it muted but do not require multiple clicks —
        // user gesture listeners on the app will enable audio on first tap
        audio.muted = true;
        audio.play().catch(() => {
          // final fallback: leave it paused
          console.warn('Unable to autoplay bells even muted');
        });
      });
    } else {
      // Outside christmas flow — pause and reset
      audio.pause();
      audio.currentTime = 0;
    }

    // cleanup not required — handled on next effect run
  }, [currentView]);

  // If the URL path changes to /christmas-demo (e.g., scanned QR), enable demo mode.
  useEffect(() => {
    const onPop = () => {
      try {
        const path = window.location.pathname.toLowerCase();
        if (path.startsWith('/christmas-demo')) {
          setIsChristmasDemo(true);
          setCurrentView(AppView.QR_CODE);
        }
      } catch (e) {}
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Try to play bells when the app first loads — browsers may block autoplay.
  // Listen for a single user interaction (pointerdown/keydown) to enable audio
  useEffect(() => {
    const audio = bellsAudioRef.current;
    if (!audio) return;

    const enableBells = async () => {
      try {
        // only try to enable if user hasn't turned them off
        if (!bellsEnabled) return;
        await audio.play();
        audio.muted = false;
        setBellsEnabled(true);
      } catch (err) {
        // Autoplay blocked — keep waiting for a real user interaction
        setBellsEnabled(false);
      }
    };

    // Attempt to play immediately (best-effort) only if bells are enabled
    if (bellsEnabled) enableBells();

    // If blocked, attach a single-use pointerdown/keydown listener that will
    // start the audio with one user gesture. Using pointerdown covers touch and mouse
    const onFirstGesture = async () => {
      try {
        if (!bellsEnabled) return;
        await audio.play();
        audio.muted = false;
        setBellsEnabled(true);
      } catch (e) {
        // still blocked — leave bellsDisabled
        setBellsEnabled(false);
      }
      // remove listeners automatically (used with once: true below)
    };

    window.addEventListener('pointerdown', onFirstGesture, { once: true });
    window.addEventListener('keydown', onFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', onFirstGesture as EventListener);
      window.removeEventListener('keydown', onFirstGesture as EventListener);
    };
  }, []);

  // Persist bellsEnabled preference and stop/start audio immediately when toggled
  useEffect(() => {
    try { localStorage.setItem('dm2d_bells_enabled', bellsEnabled ? 'true' : 'false'); } catch {}
    const audio = bellsAudioRef.current;
    if (!audio) return;

    if (!bellsEnabled) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      // If user re-enabled and we're on an allowed view, attempt to play
      const allowed = [AppView.CHRISTMAS_LANDING, AppView.CHRISTMAS_PRICING];
      if (allowed.includes(currentView)) {
        audio.play().catch(() => {});
      }
    }
  }, [bellsEnabled, currentView]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [christmasCart, setChristmasCart] = useState<string[]>([]);
  const [christmasTotal, setChristmasTotal] = useState(0);
  const [christmasBuyerInfo, setChristmasBuyerInfo] = useState({ name: '', email: '', deliveryMethod: 'email' as 'email' | 'sms' | 'copy', recipientInfo: '' });
  const [showSettings, setShowSettings] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLiveSession, setShowLiveSession] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [activeSession, setActiveSession] = useState<ScheduledSession | null>(null);
  const [scheduledSessions, setScheduledSessions] = useState<ScheduledSession[]>([]);
  const [booking, setBooking] = useState<BookingDetails>({
    serviceId: null,
    date: null,
    timeSlot: null,
    userEmail: '',
    userName: ''
  });
  const [selectedServiceData, setSelectedServiceData] = useState<ServiceItem | null>(null);
  
  // User Profile - starts with placeholder, replaced on signup
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: '',
    email: '',
    bio: ''
  });

  const handleSignup = (name: string, email: string) => {
    setUserProfile({ name, email, bio: '' });
    setIsAuthenticated(true);
    setCurrentView(AppView.PRICING);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentView(AppView.HOME);
  };

  // Check for active sessions every minute
  useEffect(() => {
    const checkForActiveSession = () => {
      const now = new Date();
      
      // Find a session that's happening now (within the session window)
      const active = scheduledSessions.find(session => {
        const sessionDate = new Date(session.date);
        const [time, period] = session.timeSlot.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let hour24 = hours;
        if (period === 'PM' && hours !== 12) hour24 += 12;
        if (period === 'AM' && hours === 12) hour24 = 0;
        
        sessionDate.setHours(hour24, minutes, 0, 0);
        
        // Get service to check duration
        const service = SERVICES_LIST.find(s => s.id === session.serviceId);
        const duration = service?.classType === 'full' ? 55 : 25;
        
        const sessionEnd = new Date(sessionDate.getTime() + duration * 60 * 1000);
        
        // Session is active if current time is within session window
        // Start showing 2 minutes early so they can join
        const sessionStart = new Date(sessionDate.getTime() - 2 * 60 * 1000);
        
        return now >= sessionStart && now <= sessionEnd;
      });
      
      setActiveSession(active || null);
    };

    // Check immediately and then every 30 seconds
    checkForActiveSession();
    const interval = setInterval(checkForActiveSession, 30000);
    
    return () => clearInterval(interval);
  }, [scheduledSessions]);

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedServiceData(service);
    setBooking(prev => ({ ...prev, serviceId: service.id }));
    setCurrentView(AppView.BOOKING);
  };

  const handleSlotConfirm = (date: Date, time: string) => {
    setBooking(prev => ({ ...prev, date, timeSlot: time }));
    setCurrentView(AppView.CONFIRMATION);
  };

  const handleFinalizeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the scheduled session
    if (selectedServiceData && booking.date && booking.timeSlot) {
      const newSession: ScheduledSession = {
        id: Date.now().toString(),
        serviceId: selectedServiceData.id,
        serviceTitle: selectedServiceData.title,
        date: booking.date,
        timeSlot: booking.timeSlot,
        hostName: 'DayMaker',
        hostImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        customerName: booking.userName,
        customerEmail: booking.userEmail,
        customerBio: 'Excited to learn something new today!'
      };
      
      setScheduledSessions(prev => [...prev, newSession]);
    }
    
    alert(`Booking Confirmed for ${booking.userName}! Check your email. You'll see a "Join Session" button when it's time.`);
    setCurrentView(AppView.HOME);
    setBooking({ serviceId: null, date: null, timeSlot: null, userEmail: '', userName: '' });
  };

  const handleUpdateProfile = (data: UserProfileData) => {
    setUserProfile(data);
    // In a real app, this would send an API request
  };

  return (
    <>
      <audio ref={bellsAudioRef} src="/bells.m4a" preload="auto" loop />

      {/* Very-first front page (QR only, no bells) */}
      {currentView === AppView.QR_CODE && (
        <QRCodePage onContinue={() => setCurrentView(AppView.CHRISTMAS_LANDING)} />
      )}

      {/* Christmas Landing Page */}
      {currentView === AppView.CHRISTMAS_LANDING && (
        // Consolidated flow: skip the intermediate pricing page and go straight to services.
        <ChristmasLanding onEnter={() => setCurrentView(AppView.CHRISTMAS_SERVICES)} />
      )}

      {/* Christmas Pricing Page */}
      {currentView === AppView.CHRISTMAS_PRICING && (
        <ChristmasPricing onSelectPlan={() => setCurrentView(AppView.CHRISTMAS_SERVICES)} />
      )}

      {/* Christmas Services Page */}
      {currentView === AppView.CHRISTMAS_SERVICES && (
        <ChristmasServices 
          cart={christmasCart}
          onUpdateCart={setChristmasCart}
          onCheckout={() => setCurrentView(AppView.CHRISTMAS_CHECKOUT)}
          onSelectService={(serviceId) => {
            setSelectedServiceData(SERVICES_LIST.find(s => s.id === serviceId) || null);
            setCurrentView(AppView.SIGNUP);
          }} 
        />
      )}

      {/* Christmas Checkout Page */}
      {currentView === AppView.CHRISTMAS_CHECKOUT && (
        <ChristmasCheckout
          cartItems={christmasCart}
          onBack={() => setCurrentView(AppView.CHRISTMAS_SERVICES)}
          onComplete={() => {
            const subtotal = christmasCart.length * 25;
            const tax = subtotal * 0.1;
            setChristmasTotal(subtotal + tax);
            setCurrentView(AppView.CHRISTMAS_PAYMENT);
          }}
        />
      )}

      {/* Christmas Payment Page */}
      {currentView === AppView.CHRISTMAS_PAYMENT && (
        <ChristmasPayment
          cartItems={christmasCart}
          total={christmasTotal}
          onBack={() => setCurrentView(AppView.CHRISTMAS_CHECKOUT)}
          onComplete={() => setCurrentView(AppView.CHRISTMAS_CONFIRMATION)}
        />
      )}

      {/* Christmas Confirmation Page */}
      {currentView === AppView.CHRISTMAS_CONFIRMATION && (
        <ChristmasConfirmation
          buyerEmail={christmasBuyerInfo.email}
          buyerName={christmasBuyerInfo.name}
          total={christmasTotal}
          cartItems={christmasCart}
          deliveryMethod={christmasBuyerInfo.deliveryMethod}
          recipientInfo={christmasBuyerInfo.recipientInfo}
          onDone={() => setCurrentView(AppView.CHRISTMAS_LANDING)}
        />
      )}

      {/* Landing / Signup / Pricing */}
      {currentView === AppView.LANDING && (
        <LandingPage onGetStarted={() => setCurrentView(AppView.SIGNUP)} />
      )}

      {currentView === AppView.SIGNUP && (
        <SignupPage onSignup={handleSignup} />
      )}

      {currentView === AppView.PRICING && (
        <PricingPage onSelectPlan={handleSelectPlan} />
      )}

      {/* Main app (authenticated) */}
      {isAuthenticated && !isChristmasDemo && currentView !== AppView.LANDING && currentView !== AppView.SIGNUP && currentView !== AppView.PRICING && (
        <>
          <nav>
            <div onClick={() => setCurrentView(AppView.HOME)}>
              <Terminal size={20} />
              <span>daymaker<span>2day</span></span>
            </div>

            <div>
              {currentView !== AppView.HOME && (
                <button onClick={() => setCurrentView(AppView.HOME)}>HOME</button>
              )}

              <button onClick={() => setCurrentView(AppView.PROFILE)}>
                <User size={20} />
              </button>

              <button onClick={() => setBellsEnabled(prev => !prev)} aria-pressed={bellsEnabled}>
                {bellsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
              </button>

              <div>
                <button onClick={() => setShowSettings(!showSettings)}>
                  <Settings size={20} />
                </button>

                {showSettings && (
                  <div>
                    {scheduledSessions.length > 0 && (
                      <div>
                        <div>UPCOMING SESSIONS</div>
                        {scheduledSessions.slice(0, 2).map(session => (
                          <div key={session.id}>
                            <span></span>
                            <span>{session.serviceTitle}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button onClick={() => { setShowSettings(false); setShowPricing(true); }}><span>💰</span> Plans & Pricing</button>
                    <button onClick={() => setShowSettings(false)}><span>📋</span> Terms of Use</button>
                    <button onClick={() => setShowSettings(false)}><span>🔒</span> Privacy Policy</button>
                    <button onClick={() => { setShowSettings(false); setShowAdmin(true); }}><span>🔐</span> Admin Portal</button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <main>
            {currentView === AppView.HOME && (
              <div>
                <div>SYSTEM ONLINE // V2.0</div>
                <h1>UPGRADE YOUR REALITY</h1>
                <p>Access 50+ specialized micro-services designed to optimize your day in exactly 25 minutes.</p>
                <button onClick={() => setCurrentView(AppView.MENU)}>INITIATE BOOKING</button>

                <div>
                  <div><span>50+</span> MODULES</div>
                  <div><span>25m</span> DURATION</div>
                  <div><span>1:1</span> ZOOM</div>
                </div>
              </div>
            )}

            {currentView === AppView.MENU && (
              <MenuGrid onSelectService={handleServiceSelect} />
            )}

            {currentView === AppView.BOOKING && (
              <BookingCalendar onConfirm={handleSlotConfirm} onBack={() => setCurrentView(AppView.MENU)} />
            )}

            {currentView === AppView.PROFILE && (
              <UserProfile profile={userProfile} onUpdateProfile={handleUpdateProfile} onBack={() => setCurrentView(AppView.HOME)} />
            )}

            {currentView === AppView.CONFIRMATION && selectedServiceData && (
              <div>
                <button onClick={() => setCurrentView(AppView.BOOKING)}><ArrowLeft size={16} /> CHANGE TIME</button>

                <div>
                  <div>
                    <CheckCircle size={32} />
                    <h2>SECURE SLOT</h2>
                    <p>Finalize your 25-minute session.</p>
                  </div>

                  <div>
                    <div><span>SERVICE</span><span>{selectedServiceData.title}</span></div>
                    <div><span>DATE</span><span>{booking.date && format(booking.date, 'MMMM do, yyyy')}</span></div>
                    <div><span>TIME</span><span>{booking.timeSlot}</span></div>
                  </div>

                  <form onSubmit={handleFinalizeBooking}>
                    <div>
                      <label>IDENTIFIER (NAME)</label>
                      <input required type="text" value={booking.userName} onChange={e => setBooking(b => ({ ...b, userName: e.target.value }))} placeholder="John Doe" />
                    </div>
                    <div>
                      <label>CONTACT (EMAIL)</label>
                      <input required type="email" value={booking.userEmail} onChange={e => setBooking(b => ({ ...b, userEmail: e.target.value }))} placeholder="john@example.com" />
                    </div>

                    <button type="submit">INITIALIZE LINK</button>
                  </form>
                </div>
              </div>
            )}
          </main>

          {activeSession && (
            <div>
              <button onClick={() => setShowLiveSession(true)}>
                <div><img src={activeSession.hostImage} alt={activeSession.hostName} /></div>
                <div><div>Session Ready</div><div>Join Now</div></div>
                <Radio size={20} />
              </button>
            </div>
          )}

          <AIChat />

          {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
          {showAdmin && <AdminPortal onClose={() => setShowAdmin(false)} />}

          {showLiveSession && activeSession && (
            <LiveSession hostName={activeSession.hostName} hostImage={activeSession.hostImage} sessionTitle={activeSession.serviceTitle} customerName={activeSession.customerName} customerEmail={activeSession.customerEmail} customerBio={activeSession.customerBio} scheduledTime={activeSession.timeSlot} isHostView={true} onEndSession={() => { setShowLiveSession(false); setScheduledSessions(prev => prev.filter(s => s.id !== activeSession.id)); setActiveSession(null); }} />
          )}

          <footer>
            <p>DAYMAKER2DAY SYSTEM © 2024 // STATUS: OPTIMAL</p>
          </footer>
        </>
      )}
    </>
  );
};

export default App;