import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { PRICING_PLANS } from '../pricing';

interface PricingModalProps {
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-white mb-2">Plans & Pricing</h2>
            <p className="text-gray-400">Choose the perfect plan for your needs</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="text-gray-400" size={24} />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl p-6 border-2 transition-all hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-b from-neon-blue/10 to-neon-purple/10 border-neon-blue shadow-[0_0_30px_rgba(0,243,255,0.2)]'
                  : 'bg-gray-800/50 border-gray-700'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-neon-blue text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Sparkles size={12} />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.duration}</p>

              {/* Price */}
              <div className="mb-6">
                {plan.originalPrice && (
                  <div className="text-gray-500 line-through text-sm">${plan.originalPrice}</div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/session</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-neon-blue mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  plan.popular
                    ? 'bg-neon-blue text-black hover:bg-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* Focus Group Info */}
        <div className="p-6 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-t border-gray-700">
          <h3 className="text-lg font-bold text-white mb-2">🎯 Focus Group Participants</h3>
          <p className="text-gray-300 mb-3">
            Get <strong className="text-neon-blue">40% off</strong> in exchange for 5 minutes of feedback after your session. 
            Help us improve while saving money!
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✓ Quick 5-minute feedback survey after session</li>
            <li>✓ Shape the future of daymaker2day</li>
            <li>✓ Early access to new features</li>
            <li>✓ Valid for the next 50 participants</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
