import React, { useState } from 'react';
import { BookingCalendar } from './BookingCalendar';
import { Payment } from './Payment';
import { GiftDelivery } from './GiftDelivery';
import { SessionDetail } from './SessionDetail';
import { CheckCircle, Gift, Calendar, CreditCard, Send } from 'lucide-react';

interface BookingFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<'detail' | 'calendar' | 'payment' | 'delivery' | 'confirm'>('detail');
  const [bookingData, setBookingData] = useState({
    serviceId: null as string | null,
    date: null as Date | null,
    time: null as string | null,
    paymentMethod: null as string | null,
    deliveryMethod: null as string | null,
  });

  const handleDetailConfirm = (serviceId: string) => {
    setBookingData(prev => ({ ...prev, serviceId }));
    setStep('calendar');
  };

  const handleCalendarConfirm = (date: Date, time: string) => {
    setBookingData(prev => ({ ...prev, date, time }));
    setStep('payment');
  };

  const handlePaymentComplete = (method: string) => {
    setBookingData(prev => ({ ...prev, paymentMethod: method }));
    setStep('delivery');
  };

  const handleDeliverySelect = (method: string) => {
    setBookingData(prev => ({ ...prev, deliveryMethod: method }));
    setStep('confirm');
  };

  const progressSteps = [
    { key: 'detail', label: 'Service', icon: '📋' },
    { key: 'calendar', label: 'Date & Time', icon: '📅' },
    { key: 'payment', label: 'Payment', icon: '💳' },
    { key: 'delivery', label: 'Delivery', icon: '📤' },
    { key: 'confirm', label: 'Done', icon: '✅' },
  ];

  const currentStepIndex = progressSteps.findIndex(s => s.key === step);

  return (
    <div className="w-full min-h-screen bg-black/90 p-4 md:p-8">
      {/* Mobile-friendly progress indicator */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6 overflow-x-auto pb-2">
          {progressSteps.map((s, idx) => (
            <div key={s.key} className="flex items-center flex-shrink-0">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold transition-all ${
                  idx <= currentStepIndex
                    ? 'bg-neon-blue text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                    : 'bg-white/10 text-gray-500'
                }`}
              >
                {s.icon}
              </div>
              {idx < progressSteps.length - 1 && (
                <div
                  className={`h-1 w-8 md:w-12 mx-1 md:mx-2 transition-all ${
                    idx < currentStepIndex ? 'bg-neon-blue' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step labels - hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:flex justify-between text-xs md:text-sm text-gray-400 px-1">
          {progressSteps.map(s => (
            <div key={s.key} className="flex-1 text-center">{s.label}</div>
          ))}
        </div>
      </div>

      {/* Back button */}
      {step !== 'detail' && (
        <button
          onClick={() => {
            if (step === 'calendar') setStep('detail');
            else if (step === 'payment') setStep('calendar');
            else if (step === 'delivery') setStep('payment');
            else if (step === 'confirm') setStep('delivery');
          }}
          className="mb-4 text-gray-400 hover:text-neon-blue transition-colors text-sm flex items-center gap-2"
        >
          ← BACK
        </button>
      )}

      {/* Content area */}
      <div className="max-w-2xl mx-auto">
        {step === 'detail' && (
          <SessionDetail onConfirm={handleDetailConfirm} onBack={onBack} />
        )}
        {step === 'calendar' && (
          <BookingCalendar
            onConfirm={handleCalendarConfirm}
            onBack={() => setStep('detail')}
          />
        )}
        {step === 'payment' && (
          <Payment
            onPaymentComplete={handlePaymentComplete}
            onBack={() => setStep('calendar')}
            amount={25}
          />
        )}
        {step === 'delivery' && (
          <GiftDelivery
            onDeliverySelect={handleDeliverySelect}
            onBack={() => setStep('payment')}
          />
        )}
        {step === 'confirm' && (
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 text-center animate-fadeIn">
            <div className="mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
                🎉 ALL SET!
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Your booking is confirmed and ready to go
              </p>
            </div>

            {/* Booking summary - mobile friendly */}
            <div className="bg-white/5 rounded-xl p-6 mb-8 space-y-4 text-left border border-white/10">
              {bookingData.date && bookingData.time && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">📅 Date & Time:</span>
                    <span className="text-white font-mono">
                      {bookingData.date.toLocaleDateString()} @ {bookingData.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">💳 Payment:</span>
                    <span className="text-neon-blue font-bold">{bookingData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">📤 Delivery:</span>
                    <span className="text-neon-purple font-bold">{bookingData.deliveryMethod}</span>
                  </div>
                </>
              )}
            </div>

            {/* Big, tappable CTA buttons */}
            <div className="space-y-3">
              <button
                onClick={onComplete}
                className="w-full py-4 md:py-6 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-lg md:text-xl rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,243,255,0.3)] active:scale-95 transition-transform"
              >
                ✅ DONE
              </button>
              <button
                onClick={() => {
                  setBookingData({
                    serviceId: null,
                    date: null,
                    time: null,
                    paymentMethod: null,
                    deliveryMethod: null,
                  });
                  setStep('detail');
                }}
                className="w-full py-3 md:py-4 bg-white/10 text-gray-400 font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                📝 BOOK ANOTHER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
