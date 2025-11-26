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
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors"
      >
        <ArrowLeft size={16} /> BACK
      </button>

      <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold text-white mb-2">PAYMENT DETAILS</h2>
            <p className="text-gray-400">Choose your preferred payment method</p>
          </div>

          {/* Amount summary */}
          <div className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-mono">Session Fee:</span>
              <span className="text-3xl font-orbitron text-neon-blue">${amount}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4 mb-8">
            {/* Apple Pay */}
            <button
              onClick={() => handlePayment('APPLE_PAY')}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-black border-2 border-white/20 rounded-xl hover:border-white/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              <Apple size={24} className="text-white" />
              <div className="text-left">
                <div className="font-orbitron font-bold text-white">APPLE PAY</div>
                <div className="text-xs text-gray-400">Fast & Secure</div>
              </div>
              {isProcessing && <div className="ml-auto text-neon-blue animate-spin">⌛</div>}
            </button>

            {/* Google Pay */}
            <button
              onClick={() => handlePayment('GOOGLE_PAY')}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-white/5 border-2 border-white/20 rounded-xl hover:border-neon-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <div className="w-6 h-6 flex items-center justify-center font-bold text-lg bg-gradient-to-r from-blue-500 to-red-500 rounded">G</div>
              <div className="text-left">
                <div className="font-orbitron font-bold text-white">GOOGLE PAY</div>
                <div className="text-xs text-gray-400">Tap to pay</div>
              </div>
              {isProcessing && <div className="ml-auto text-neon-blue animate-spin">⌛</div>}
            </button>

            {/* Stripe (Card) */}
            <button
              onClick={() => handlePayment('STRIPE')}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border-2 border-neon-blue/50 rounded-xl hover:border-neon-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <CreditCard size={24} className="text-neon-blue" />
              <div className="text-left">
                <div className="font-orbitron font-bold text-white">CARD (STRIPE)</div>
                <div className="text-xs text-gray-400">Credit or Debit</div>
              </div>
              {isProcessing && <div className="ml-auto text-neon-blue animate-spin">⌛</div>}
            </button>
          </div>

          {/* Security badge */}
          <div className="text-center text-xs text-gray-500 font-mono">
            ✓ Secure SSL Encrypted • PCI Compliant
          </div>
        </div>
      </div>
    </div>
  );
};
