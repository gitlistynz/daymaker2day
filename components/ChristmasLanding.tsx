import React, { useState } from 'react';

interface ChristmasLandingProps {
  onEnter: () => void;
}

export const ChristmasLanding: React.FC<ChristmasLandingProps> = ({ onEnter }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
    setTimeout(() => {
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1000, audioContext.currentTime);
      gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      osc2.start();
      osc2.stop(audioContext.currentTime + 0.2);
    }, 100);
  };

  const handleClick = () => {
    playSound();
    setIsAnimating(true);
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex items-center justify-center relative overflow-hidden">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Elegant Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#ef4444' : '#ffffff',
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#ef4444' : '#ffffff'}`,
              animation: `float-down ${Math.random() * 15 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Snowman Teaching Layout */}
      <div 
        onClick={handleClick}
        className={`relative z-10 transition-all duration-700 ${!isAnimating ? 'hover:scale-105' : ''} ${isAnimating ? 'scale-110 opacity-0' : ''} mx-auto max-w-6xl px-4 flex flex-col items-center justify-center gap-8`}
      >
        {/* Teaching Board - The List */}
        <div className="glass-panel-dark p-6 rounded-2xl max-w-md">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white glow-text-white mb-2">
              25 MINUTES TO HELP YOU WITH...
            </h1>
          </div>
          
          <div className="space-y-3">
            {/* List Item 1 */}
            <div className="flex items-start gap-3 glass-panel-green p-3 rounded-lg border-l-4 border-emerald-400">
              <div className="text-emerald-400 text-xl font-bold">✓</div>
              <div>
                <div className="text-emerald-300 font-bold text-sm">That Problem You've Been Avoiding</div>
                <div className="text-white/80 text-xs">Get unstuck. Move forward. Today.</div>
              </div>
            </div>
            
            {/* List Item 2 */}
            <div className="flex items-start gap-3 glass-panel-green p-3 rounded-lg border-l-4 border-red-400">
              <div className="text-red-400 text-xl font-bold">✓</div>
              <div>
                <div className="text-red-300 font-bold text-sm">Skills That Actually Stick</div>
                <div className="text-white/80 text-xs">No fluff. Just focused learning that works.</div>
              </div>
            </div>
            
            {/* List Item 3 */}
            <div className="flex items-start gap-3 glass-panel-green p-3 rounded-lg border-l-4 border-blue-400">
              <div className="text-blue-400 text-xl font-bold">✓</div>
              <div>
                <div className="text-blue-300 font-bold text-sm italic">Your Personal Breakthrough</div>
                <div className="text-white/80 text-xs">From confused to confident in 25 minutes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact pricing CTA — consolidated into landing page */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4">
        <div className="mx-auto bg-gradient-to-r from-green-700/30 to-red-700/20 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-sm text-emerald-300 font-semibold">Holiday Special</div>
              <div className="mt-1 text-2xl font-bold text-white">25 minute sessions — giftable & immediate</div>
              <div className="text-xs text-gray-300 mt-1">Limited time offers, lifetime locked pricing while subscribed</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-4xl font-extrabold text-green-300">$25</div>
              <button onClick={onEnter} className="bg-emerald-400 text-black px-4 py-2 rounded font-semibold">Give this gift</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-down {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        
        .glass-panel-green {
          background: rgba(16, 185, 129, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 8px 32px 0 rgba(16, 185, 129, 0.2);
          transition: all 0.3s ease;
        }
        
        .glass-panel-green:hover {
          background: rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px 0 rgba(16, 185, 129, 0.3);
        }
        
        .glass-panel-dark {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 8px 32px 0 rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        
        .glass-panel-dark:hover {
          background: rgba(15, 23, 42, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px 0 rgba(59, 130, 246, 0.3);
        }
        
        .glow-star {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #f59e0b;
          }
          50% {
            box-shadow: 0 0 30px #fbbf24, 0 0 60px #fbbf24, 0 0 90px #f59e0b;
          }
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.6);
        }
        
        .glow-text-red {
          text-shadow: 0 0 10px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.6);
        }
        
        .glow-text-white {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
        }
        
        .glow-text-blue {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </div>
  );
};
