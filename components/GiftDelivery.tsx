import React, { useState } from 'react';
import { Mail, Copy, Share2, ArrowLeft, Check, MessageCircle, Send } from 'lucide-react';

interface GiftDeliveryProps {
  onDeliverySelect: (method: string) => void;
  onBack: () => void;
  recipientName?: string;
  sessionTitle?: string;
  giftLink?: string;
}

export const GiftDelivery: React.FC<GiftDeliveryProps> = ({
  onDeliverySelect,
  onBack,
  recipientName = 'friend',
  sessionTitle = 'Experience Session',
  giftLink = 'https://daymaker2day.app/gift/xyz123',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(giftLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onDeliverySelect('COPY_LINK');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('You\'ve been gifted a session! 🎁');
    const body = encodeURIComponent(
      `Hi!\n\nSomeone just gifted you a fun session:\n\n"${sessionTitle}"\n\nClick here to book your time:\n${giftLink}\n\nEnjoy! 🎉`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    onDeliverySelect('EMAIL');
  };

  const handleTextShare = () => {
    const message = encodeURIComponent(
      `Hey! I just sent you a gift session! 🎁\n\nBook it here: ${giftLink}`
    );
    window.location.href = `sms:?body=${message}`;
    onDeliverySelect('TEXT');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '🎁 Gift Session',
          text: `You've been gifted a session! Book here: ${giftLink}`,
          url: giftLink,
        });
        onDeliverySelect('SHARE');
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="w-full animate-fadeIn">
      <div className="glass-panel rounded-3xl p-6 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white mb-2">📤 HOW TO DELIVER?</h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">Choose your favorite way to send this gift</p>
            <div className="inline-block px-4 py-2 bg-neon-purple/10 border border-neon-purple/30 rounded-lg">
              <span className="text-white font-bold text-sm md:text-base">🎁 {sessionTitle}</span>
            </div>
          </div>

          {/* Delivery Options - mobile-first stacking */}
          <div className="space-y-3 md:space-y-4 mb-8">
            {/* Email - big tappable button */}
            <button
              onClick={handleEmailShare}
              className="w-full p-5 md:p-6 bg-white/5 border-2 border-white/20 rounded-xl hover:border-neon-blue/70 hover:bg-white/10 active:scale-95 transition-all duration-200 group text-left flex items-center gap-4"
            >
              <div className="text-3xl">📧</div>
              <div className="flex-1">
                <div className="font-orbitron font-bold text-white text-base md:text-lg">EMAIL</div>
                <p className="text-xs md:text-sm text-gray-400">
                  Open email with pre-filled message
                </p>
              </div>
              <Mail className="text-neon-blue group-hover:scale-110 transition-transform flex-shrink-0" size={24} />
            </button>

            {/* Text/SMS */}
            <button
              onClick={handleTextShare}
              className="w-full p-5 md:p-6 bg-white/5 border-2 border-white/20 rounded-xl hover:border-neon-purple/70 hover:bg-white/10 active:scale-95 transition-all duration-200 group text-left flex items-center gap-4"
            >
              <div className="text-3xl">💬</div>
              <div className="flex-1">
                <div className="font-orbitron font-bold text-white text-base md:text-lg">TEXT MESSAGE</div>
                <p className="text-xs md:text-sm text-gray-400">
                  Send via SMS or WhatsApp
                </p>
              </div>
              <MessageCircle className="text-neon-purple group-hover:scale-110 transition-transform flex-shrink-0" size={24} />
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full p-5 md:p-6 bg-white/5 border-2 border-white/20 rounded-xl hover:border-neon-green/70 hover:bg-white/10 active:scale-95 transition-all duration-200 group text-left flex items-center gap-4"
            >
              <div className="text-3xl">📋</div>
              <div className="flex-1">
                <div className="font-orbitron font-bold text-white text-base md:text-lg">
                  {copied ? '✓ COPIED!' : 'COPY LINK'}
                </div>
                <p className="text-xs md:text-sm text-gray-400">
                  Paste anywhere you like
                </p>
              </div>
              {copied ? (
                <Check className="text-neon-green flex-shrink-0" size={24} />
              ) : (
                <Copy className="text-neon-purple group-hover:scale-110 transition-transform flex-shrink-0" size={24} />
              )}
            </button>

            {/* Native Share if available */}
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full p-5 md:p-6 bg-white/5 border-2 border-white/20 rounded-xl hover:border-neon-blue/70 hover:bg-white/10 active:scale-95 transition-all duration-200 group text-left flex items-center gap-4"
              >
                <div className="text-3xl">✨</div>
                <div className="flex-1">
                  <div className="font-orbitron font-bold text-white text-base md:text-lg">MORE OPTIONS</div>
                  <p className="text-xs md:text-sm text-gray-400">
                    Share via social, apps, & more
                  </p>
                </div>
                <Share2 className="text-neon-blue group-hover:scale-110 transition-transform flex-shrink-0" size={24} />
              </button>
            )}
          </div>

          {/* Quick info */}
          <div className="p-4 md:p-5 bg-neon-blue/5 rounded-lg border border-neon-blue/20">
            <p className="text-xs md:text-sm text-gray-300 text-center">
              ✅ They get a link → pick their time → get Zoom details → done! You're all set 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
