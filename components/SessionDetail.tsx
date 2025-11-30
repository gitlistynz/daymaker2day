import React from 'react';
import { ServiceItem } from '../types';
import { ArrowLeft, Gift, Calendar, Clock, Zap } from 'lucide-react';
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
  const isFullClass = service.classType === 'full';
  const duration = isFullClass ? '55' : '25';
  const price = isFullClass ? '$49' : '$29';
  const classLabel = isFullClass ? 'FULL CLASS' : 'HALF CLASS';
  const accentColor = isFullClass ? 'neon-purple' : 'neon-green';

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
        <div className={`absolute top-0 right-0 w-96 h-96 ${isFullClass ? 'bg-neon-purple/10' : 'bg-neon-green/10'} blur-[120px] rounded-full pointer-events-none`} />

        <div className="relative z-10">
          {/* Class Type Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 ${
            isFullClass 
              ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30' 
              : 'bg-neon-green/20 text-neon-green border border-neon-green/30'
          }`}>
            {isFullClass ? <Clock size={16} /> : <Zap size={16} />}
            {classLabel} • {duration} MIN • {price}
          </div>

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
                  <Calendar size={16} className={isFullClass ? 'text-neon-purple' : 'text-neon-green'} />
                  {duration} MIN SESSION
                </span>
                <span>•</span>
                <span>1:1 ZOOM CALL</span>
              </div>
            </div>
            <div className={`p-4 rounded-xl border ${
              isFullClass 
                ? 'bg-neon-purple/10 border-neon-purple/20' 
                : 'bg-neon-green/10 border-neon-green/20'
            }`}>
              <IconComponent size={48} className={isFullClass ? 'text-neon-purple' : 'text-neon-green'} />
            </div>
          </div>

          {/* Session Benefits */}
          <div className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-orbitron text-white mb-4 font-bold">WHAT YOU GET</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <span className={isFullClass ? 'text-neon-purple' : 'text-neon-green'}>✓</span>
                <span>{duration} minutes of focused 1:1 time on Zoom</span>
              </li>
              <li className="flex items-start gap-3">
                <span className={isFullClass ? 'text-neon-purple' : 'text-neon-green'}>✓</span>
                <span>{isFullClass ? 'Deep dive session with comprehensive guidance' : 'Quick, focused session for fast results'}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className={isFullClass ? 'text-neon-purple' : 'text-neon-green'}>✓</span>
                <span>Personalized session tailored to your needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className={isFullClass ? 'text-neon-purple' : 'text-neon-green'}>✓</span>
                <span>Zoom link sent via email instantly</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => onBookNow(service)}
              className={`group relative py-6 px-8 font-bold font-orbitron tracking-widest rounded-xl transition-all duration-300 ${
                isFullClass 
                  ? 'bg-gradient-to-r from-neon-purple to-pink-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                  : 'bg-gradient-to-r from-neon-green to-emerald-400 text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]'
              }`}
            >
              <div className={`absolute inset-0 border rounded-xl scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none ${
                isFullClass ? 'border-neon-purple' : 'border-neon-green'
              }`} />
              <div className="relative flex items-center justify-center gap-2">
                <Calendar size={20} />
                BOOK NOW • {price}
              </div>
            </button>

            <button
              onClick={() => onSendAsGift(service)}
              className={`group relative py-6 px-8 bg-white/10 border-2 text-white font-bold font-orbitron tracking-widest rounded-xl transition-all duration-300 ${
                isFullClass 
                  ? 'border-neon-purple hover:bg-neon-purple/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                  : 'border-neon-green hover:bg-neon-green/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]'
              }`}
            >
              <div className="relative flex items-center justify-center gap-2">
                <Gift size={20} />
                SEND AS GIFT
              </div>
            </button>
          </div>

          {/* Price Summary */}
          <div className={`text-center mt-8 p-4 rounded-xl border ${
            isFullClass 
              ? 'bg-neon-purple/5 border-neon-purple/20' 
              : 'bg-neon-green/5 border-neon-green/20'
          }`}>
            <span className={`text-2xl font-bold ${isFullClass ? 'text-neon-purple' : 'text-neon-green'}`}>{price}</span>
            <span className="text-gray-400 ml-2">for {duration} minutes</span>
          </div>

          {/* Info text */}
          <p className="text-center text-gray-500 text-sm mt-6 font-mono">
            Both options include instant Zoom setup. Choose your path. 🔮
          </p>
        </div>
      </div>
    </div>
  );
};
