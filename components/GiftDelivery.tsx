import React, { useState } from 'react';
import { Mail, Copy, Share2, ArrowLeft, Check } from 'lucide-react';
import { GiftDeliveryMethod } from '../types';

interface GiftDeliveryProps {
  recipientName: string;
  sessionTitle: string;
  giftLink: string;
  onDeliveryComplete: (method: GiftDeliveryMethod) => void;
  onBack: () => void;
}

export const GiftDelivery: React.FC<GiftDeliveryProps> = ({
  recipientName,
  sessionTitle,
  giftLink,
  onDeliveryComplete,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(giftLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onDeliveryComplete('COPY_LINK');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('You\'ve been gifted a session!');
    const body = encodeURIComponent(
      `Hi ${recipientName}!\n\nSomeone just gifted you a fun 25-minute Zoom session:\n\n"${sessionTitle}"\n\nClick here to choose your time:\n${giftLink}\n\nEnjoy!`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    onDeliveryComplete('EMAIL');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Gift Session',
          text: `You've been gifted a session: ${sessionTitle}`,
          url: giftLink,
        });
        onDeliveryComplete('SHARE');
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

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
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-12 pb-8 border-b border-white/10">
            <h2 className="text-4xl font-orbitron font-bold text-white mb-2">DELIVER YOUR GIFT</h2>
            <p className="text-gray-400 mb-6">Choose how you want to send this to {recipientName}</p>
            <div className="inline-block px-4 py-2 bg-neon-purple/10 border border-neon-purple/30 rounded-lg">
              <span className="text-white font-bold">{sessionTitle}</span>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4 mb-12">
            {/* Option 1: Open Email */}
            <button
              onClick={handleEmailShare}
              className="w-full p-6 bg-white/5 border-2 border-white/10 rounded-xl hover:border-neon-blue/50 hover:bg-white/10 transition-all duration-300 group text-left"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-orbitron font-bold text-white mb-1">Option 1 — OPEN EMAIL APP</div>
                  <p className="text-sm text-gray-400">
                    Opens Gmail/Outlook/iPhone Mail with pre-filled message. (Recommended)
                  </p>
                  <div className="mt-3 text-xs text-gray-500 font-mono bg-black/50 p-2 rounded inline-block">
                    Subject: "You've been gifted a session!"
                  </div>
                </div>
                <Mail className="text-neon-blue group-hover:scale-110 transition-transform" size={24} />
              </div>
            </button>

            {/* Option 2: Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full p-6 bg-white/5 border-2 border-white/10 rounded-xl hover:border-neon-purple/50 hover:bg-white/10 transition-all duration-300 group text-left"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-orbitron font-bold text-white mb-1">
                    Option 2 — COPY LINK {copied && <span className="text-neon-blue text-sm ml-2">✓ Copied!</span>}
                  </div>
                  <p className="text-sm text-gray-400">
                    Copies unique gift link to clipboard. Paste into text, DM, Messenger, etc.
                  </p>
                  <div className="mt-3 text-xs text-gray-500 font-mono break-all bg-black/50 p-2 rounded">
                    {giftLink}
                  </div>
                </div>
                {copied ? (
                  <Check className="text-neon-green" size={24} />
                ) : (
                  <Copy className="text-neon-purple group-hover:scale-110 transition-transform" size={24} />
                )}
              </div>
            </button>

            {/* Option 3: Native Share */}
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full p-6 bg-white/5 border-2 border-white/10 rounded-xl hover:border-neon-green/50 hover:bg-white/10 transition-all duration-300 group text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-orbitron font-bold text-white mb-1">Option 3 — SHARE MENU</div>
                    <p className="text-sm text-gray-400">
                      Opens native share sheet: Messages, WhatsApp, Facebook, Instagram, etc.
                    </p>
                  </div>
                  <Share2 className="text-neon-blue group-hover:scale-110 transition-transform" size={24} />
                </div>
              </button>
            )}
          </div>

          {/* Info */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-gray-400 text-center">
              The recipient receives a link → chooses time → gets Zoom info automatically. You're all set! 🎁
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
