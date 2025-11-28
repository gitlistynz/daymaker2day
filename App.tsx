import React, { useState } from 'react';
import { AppView, ServiceItem, BookingDetails, UserProfileData, BookingType, GiftDeliveryMethod } from './types';
import { MenuGrid } from './components/MenuGrid';
import { SessionDetail } from './components/SessionDetail';
import { BookOrGift } from './components/BookOrGift';
import { BookingCalendar } from './components/BookingCalendar';
import { Payment } from './components/Payment';
import { GiftDelivery } from './components/GiftDelivery';
import { UserProfile } from './components/UserProfile';
import { AIChat } from './components/AIChat';
import { AdminPortal } from './components/AdminPortal';
import { format } from 'date-fns';
import { CheckCircle, ArrowLeft, Terminal, User, Gift, Calendar as CalendarIcon, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [showSettings, setShowSettings] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [booking, setBooking] = useState<BookingDetails>({
    serviceId: null,
    date: null,
    timeSlot: null,
    userEmail: '',
    userName: ''
  });
  const [selectedServiceData, setSelectedServiceData] = useState<ServiceItem | null>(null);
  
  // Mock User Profile Data
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: 'Alex Voyager',
    email: 'alex@future.net',
    bio: 'Focusing on productivity and mental clarity.'
  });

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
    // Here you would integrate with a backend API
    alert(`Booking Confirmed for ${booking.userName}! Check your email.`);
    // Reset or redirect
    setCurrentView(AppView.HOME);
    setBooking({ serviceId: null, date: null, timeSlot: null, userEmail: '', userName: '' });
  };

  const handleUpdateProfile = (data: UserProfileData) => {
    setUserProfile(data);
    // In a real app, this would send an API request
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-neon-blue selection:text-black overflow-x-hidden relative">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-purple/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[20%] w-[2px] h-[2px] bg-white opacity-50 rounded-full animate-pulse" />
        <div className="absolute top-[60%] right-[30%] w-[3px] h-[3px] bg-white opacity-30 rounded-full animate-pulse delay-700" />
      </div>

      {/* Navigation / Header */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div 
            onClick={() => setCurrentView(AppView.HOME)}
            className="flex items-center gap-2 cursor-pointer group"
        >
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:border-neon-blue transition-colors">
                <Terminal size={20} className="text-neon-blue" />
            </div>
            <span className="font-orbitron font-bold text-xl tracking-widest">
                daymaker<span className="text-neon-blue">2day</span>
            </span>
        </div>
        
        <div className="flex items-center gap-4">
             {currentView !== AppView.HOME && (
                 <button 
                    onClick={() => setCurrentView(AppView.HOME)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                 >
                    HOME
                 </button>
            )}
            
            <button
                onClick={() => setCurrentView(AppView.PROFILE)}
                className="p-2 rounded-full border transition-all duration-300 bg-white/5 border-white/10 hover:border-neon-blue/50"
            >
                <User size={20} className="text-neon-blue" />
            </button>

            {/* Settings Gear Button */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full border transition-all duration-300 bg-white/5 border-white/10 hover:border-neon-blue/50"
              >
                <Settings size={20} className="text-neon-blue" />
              </button>

              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute top-12 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 min-w-[200px]">
                  <button
                    onClick={() => { setShowSettings(false); }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-left"
                  >
                    <span className="text-blue-400">💰</span>
                    <span>Plans & Pricing</span>
                  </button>
                  <button
                    onClick={() => { setShowSettings(false); }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-left border-t border-gray-700"
                  >
                    <span className="text-green-400">📋</span>
                    <span>Terms of Use</span>
                  </button>
                  <button
                    onClick={() => { setShowSettings(false); }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-left border-t border-gray-700"
                  >
                    <span className="text-purple-400">🔒</span>
                    <span>Privacy Policy</span>
                  </button>
                  <button
                    onClick={() => { setShowSettings(false); setShowAdmin(true); }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-red-900/30 transition-colors text-left border-t border-gray-700"
                  >
                    <span className="text-red-400">🔐</span>
                    <span className="font-semibold">Admin Portal</span>
                  </button>
                </div>
              )}
            </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-start min-h-[85vh] px-4">
        
        {/* HOME VIEW */}
        {currentView === AppView.HOME && (
          <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-24 max-w-4xl animate-fadeIn">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neon-blue tracking-[0.2em]">
              SYSTEM ONLINE // V2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 leading-tight">
              UPGRADE YOUR<br/> REALITY
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              Access 50+ specialized micro-services designed to optimize your day in exactly 25 minutes. 
              Start with a 1-on-1 Zoom session. Future-proof your schedule.
            </p>
            <button 
              onClick={() => setCurrentView(AppView.MENU)}
              className="group relative px-8 py-4 bg-white text-black font-bold font-orbitron tracking-wider rounded-lg hover:bg-neon-blue transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
            >
              INITIATE BOOKING
              <div className="absolute inset-0 border border-white rounded-lg scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
            </button>
            
            <div className="mt-16 grid grid-cols-3 gap-8 text-center text-gray-500 font-mono text-sm">
                <div>
                    <span className="block text-2xl text-white font-orbitron mb-1">50+</span>
                    MODULES
                </div>
                <div>
                    <span className="block text-2xl text-white font-orbitron mb-1">25m</span>
                    DURATION
                </div>
                <div>
                    <span className="block text-2xl text-white font-orbitron mb-1">1:1</span>
                    ZOOM
                </div>
            </div>
          </div>
        )}

        {/* MENU VIEW */}
        {currentView === AppView.MENU && (
          <MenuGrid onSelect={handleServiceSelect} />
        )}

        {/* BOOKING VIEW */}
        {currentView === AppView.BOOKING && (
          <BookingCalendar 
            onConfirm={handleSlotConfirm} 
            onBack={() => setCurrentView(AppView.MENU)} 
          />
        )}

        {/* PROFILE VIEW */}
        {currentView === AppView.PROFILE && (
            <UserProfile 
                profile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                onBack={() => setCurrentView(AppView.HOME)}
            />
        )}

        {/* CONFIRMATION / FORM VIEW */}
        {currentView === AppView.CONFIRMATION && selectedServiceData && (
           <div className="w-full max-w-2xl mx-auto mt-8 animate-fadeIn">
              <button 
                onClick={() => setCurrentView(AppView.BOOKING)}
                className="mb-6 flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors"
              >
                <ArrowLeft size={16} /> CHANGE TIME
              </button>

              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-neon-blue/30 shadow-[0_0_40px_rgba(0,243,255,0.1)]">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-full mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(188,19,254,0.4)]">
                        <CheckCircle className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-orbitron text-white mb-2">SECURE SLOT</h2>
                    <p className="text-gray-400">Finalize your 25-minute session.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-gray-400 text-sm">SERVICE</span>
                        <span className="text-white font-bold text-right">{selectedServiceData.title}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-gray-400 text-sm">DATE</span>
                        <span className="text-white font-bold text-right">
                            {booking.date && format(booking.date, 'MMMM do, yyyy')}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">TIME</span>
                        <span className="text-neon-blue font-bold text-right font-mono">{booking.timeSlot}</span>
                    </div>
                </div>

                <form onSubmit={handleFinalizeBooking} className="space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-neon-blue mb-2">IDENTIFIER (NAME)</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neon-blue focus:outline-none transition-colors"
                            value={booking.userName}
                            onChange={e => setBooking(b => ({...b, userName: e.target.value}))}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-neon-blue mb-2">CONTACT (EMAIL)</label>
                        <input 
                            required
                            type="email" 
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neon-blue focus:outline-none transition-colors"
                            value={booking.userEmail}
                            onChange={e => setBooking(b => ({...b, userEmail: e.target.value}))}
                            placeholder="john@example.com"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full py-4 mt-4 bg-white text-black font-bold font-orbitron tracking-widest rounded-lg hover:bg-neon-blue transition-all duration-300"
                    >
                        INITIALIZE LINK
                    </button>
                </form>
              </div>
           </div>
        )}

      </main>

      {/* AI Assistant */}
      <AIChat />

      {/* Admin Portal */}
      {showAdmin && <AdminPortal onClose={() => setShowAdmin(false)} />}

      <footer className="relative z-10 py-8 text-center text-gray-600 text-sm font-mono mt-auto border-t border-white/5">
        <p>DAYMAKER2DAY SYSTEM © 2024 // STATUS: OPTIMAL</p>
      </footer>
    </div>
  );
};

export default App;