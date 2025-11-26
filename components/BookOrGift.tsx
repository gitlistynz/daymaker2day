import React from 'react';
import { Calendar, Gift, ArrowLeft } from 'lucide-react';

interface BookOrGiftProps {
  onSelectBook: () => void;
  onSelectGift: () => void;
  onBack: () => void;
}

export const BookOrGift: React.FC<BookOrGiftProps> = ({
  onSelectBook,
  onSelectGift,
  onBack,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors"
      >
        <ArrowLeft size={16} /> BACK
      </button>

      <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold text-white mb-2">CHOOSE YOUR PATH</h2>
            <p className="text-gray-400">Is this for you or someone special?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Book for yourself */}
            <button
              onClick={onSelectBook}
              className="group relative p-8 rounded-2xl border-2 border-white/20 bg-white/5 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-xl bg-neon-blue/20 border border-neon-blue/30 group-hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all">
                    <Calendar size={40} className="text-neon-blue" />
                  </div>
                </div>
                <h3 className="text-2xl font-orbitron font-bold text-white mb-3">BOOK NOW</h3>
                <p className="text-gray-400 mb-4">Schedule a session for yourself</p>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>✓ Choose your date & time</p>
                  <p>✓ Pick a payment method</p>
                  <p>✓ Get Zoom link instantly</p>
                </div>
              </div>
            </button>

            {/* Send as gift */}
            <button
              onClick={onSelectGift}
              className="group relative p-8 rounded-2xl border-2 border-white/20 bg-white/5 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-xl bg-neon-purple/20 border border-neon-purple/30 group-hover:shadow-[0_0_20px_rgba(188,19,254,0.3)] transition-all">
                    <Gift size={40} className="text-neon-purple" />
                  </div>
                </div>
                <h3 className="text-2xl font-orbitron font-bold text-white mb-3">SEND AS GIFT</h3>
                <p className="text-gray-400 mb-4">Give a session to someone else</p>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>✓ They choose date & time</p>
                  <p>✓ Easy delivery options</p>
                  <p>✓ They get Zoom link instantly</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
