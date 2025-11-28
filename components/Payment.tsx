import React, { useState } from 'react';
import { CreditCard, Apple, ArrowLeft } from 'lucide-react';

interface PaymentProps {
  onPaymentComplete: (method: string) => void;
  onBack: () => void;
  amount?: number;
}

export const Payment: React.FC<PaymentProps> = ({
  onPaymentComplete,
  onBack,
  amount = 25,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (method: string) => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(method);
    }, 1500);
  };

  return (
    <div className="w-full animate-fadeIn">
      <div className="glass-panel rounded-3xl p-6 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white mb-2">💳 PAYMENT</h2>
            <p className="text-gray-400 text-sm md:text-base">Choose your payment method</p>
          </div>

          {/* Amount summary - large and clear */}
          <div className="mb-8 md:mb-12 p-6 md:p-8 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-xl border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-mono text-sm md:text-base">Session Fee:</span>
              <span className="text-2xl md:text-4xl font-orbitron text-neon-blue font-bold">${amount}</span>
            </div>
          </div>

          {/* Payment Methods - big, tappable buttons */}
          <div className="space-y-3 md:space-y-4 mb-8">
            {/* Apple Pay - highest priority for iOS users */}
            <button
              onClick={() => handlePayment('APPLE_PAY')}
              disabled={isProcessing}
              className="w-full py-4 md:py-5 px-4 md:px-6 bg-black border-2 border-white/30 rounded-xl hover:border-white/60 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 md:gap-4 group"
            >
              <Apple size={28} className="text-white" />
              <div className="text-left">
                <div className="font-orbitron font-bold text-white text-base md:text-lg">APPLE PAY</div>
                <div className="text-xs text-gray-400">Fastest checkout</div>
              </div>
              {isProcessing && <div className="ml-auto text-neon-blue animate-spin text-xl">⌛</div>}
            </button>

            {/* Google Pay */}
            <button
              onClick={() => handlePayment('GOOGLE_PAY')}
              disabled={isProcessing}
              className="w-full py-4 md:py-5 px-4 md:px-6 bg-white/5 border-2 border-white/30 rounded-xl hover:border-blue-500/50 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 md:gap-4"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center font-bold text-lg bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded">G</div>
              <div className="text-left">
                <div className="font-orbitron font-bold text-white text-base md:text-lg">GOOGLE PAY</div>
                <div className="text-xs text-gray-400">Tap & go</div>
              </div>
              {isProcessing && <div className="ml-auto text-neon-blue animate-spin text-xl">⌛</div>}
            </button>

            {/* Stripe (Card) */}
            <button
              onClick={() => handlePayment('STRIPE')}
              disabled={isProcessing}
              className="w-full py-4 md:py-5 px-4 md:px-6 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border-2 border-neon-blue/50 rounded-xl hover:border-neon-blue active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 md:gap-4"
            >
              <CreditCard size={28} className="text-neon-blue" />
              <div className="text-left">
                <div className="font-orbitron font-bold text-white text-base md:text-lg">CARD (STRIPE)</div>
                <div className="text-xs text-gray-400">Credit or Debit</div>
              </div>
              {isProcessing && <div className="ml-auto text-neon-blue animate-spin text-xl">⌛</div>}
            </button>
          </div>

          {/* Security info and trust badges */}
          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500 font-mono mb-4">
              🔒 Secure SSL Encrypted • PCI Compliant
            </p>
            <p className="text-xs text-gray-600">
              All transactions are 100% secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
