import React from 'react';
import { ServiceItem } from '../types';
import { ArrowLeft, Gift, Calendar } from 'lucide-react';
import * as Icons from 'lucide-react';

interface SessionDetailProps {
  service: ServiceItem;
  onBookNow: (service: ServiceItem) => void;
  onSendAsGift: (service: ServiceItem) => void;
  onBack: () => void;
}

export const SessionDetail: React.FC<SessionDetailProps> = ({
  service,
  onBookNow,
  onSendAsGift,
  onBack,
}) => {
  const IconComponent = (Icons as any)[service.iconName] || Icons.Box;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors"
      >
        <ArrowLeft size={16} /> BACK TO MENU
      </button>

      <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          {/* Header with icon */}
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-neon-blue mb-2 block tracking-widest">
                {service.category.toUpperCase()}
              </span>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-gray-300 mb-4">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-neon-blue" />
                  25 MIN SESSION
                </span>
                <span>•</span>
                <span>1:1 ZOOM CALL</span>
              </div>
            </div>
            <div className="p-4 bg-neon-purple/10 rounded-xl border border-neon-purple/20">
              <IconComponent size={48} className="text-neon-purple" />
            </div>
          </div>

          {/* Session Benefits */}
          <div className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-orbitron text-white mb-4 font-bold">WHAT YOU GET</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-neon-blue mt-1">✓</span>
                <span>25 minutes of focused 1:1 time on Zoom</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-blue mt-1">✓</span>
                <span>Personalized session tailored to your needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-blue mt-1">✓</span>
                <span>Add to your calendar instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-blue mt-1">✓</span>
                <span>Zoom link sent via email & app notification</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => onBookNow(service)}
              className="group relative py-6 px-8 bg-gradient-to-r from-neon-blue to-cyan-500 text-black font-bold font-orbitron tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300"
            >
              <div className="absolute inset-0 border border-neon-blue rounded-xl scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
              <div className="relative flex items-center justify-center gap-2">
                <Calendar size={20} />
                BOOK NOW
              </div>
            </button>

            <button
              onClick={() => onSendAsGift(service)}
              className="group relative py-6 px-8 bg-white/10 border-2 border-neon-purple text-white font-bold font-orbitron tracking-widest rounded-xl hover:bg-neon-purple/20 hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all duration-300"
            >
              <div className="relative flex items-center justify-center gap-2">
                <Gift size={20} />
                SEND AS GIFT
              </div>
            </button>
          </div>

          {/* Info text */}
          <p className="text-center text-gray-500 text-sm mt-8 font-mono">
            Both options include instant Zoom setup. Choose your path. 🔮
          </p>
        </div>
      </div>
    </div>
  );
};
