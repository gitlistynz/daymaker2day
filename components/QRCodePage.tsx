import React from 'react';

interface QRCodePageProps {
  onContinue: () => void;
}

export const QRCodePage: React.FC<QRCodePageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden flex items-center justify-center">
      {/* Snowflakes (smaller, fewer) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 2 + 1; // smaller flakes
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `snowfall ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          );
        })}
      </div>

      {/* Floating Circular Bubbles with short purchase thoughts (smaller) */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { text: "Will they love it?", delay: 0, left: 8, size: 110 },
          { text: "Perfect for Dad", delay: 8, left: 74, size: 100 },
          { text: "Quick & thoughtful", delay: 16, left: 18, size: 120 },
          { text: "Gift-ready", delay: 24, left: 62, size: 90 }
        ].map((bubble, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute"
            style={{
              left: `${bubble.left}%`,
              top: `-10%`,
              animation: `bubbleFloat ${15 + Math.random() * 5}s linear infinite`,
              animationDelay: `${bubble.delay}s`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`
            }}
          >
              <div className="w-full h-full bg-white/92 backdrop-blur-sm rounded-full shadow-md border border-blue-100/50 flex items-center justify-center p-3">
              <p className="text-gray-800 text-xs font-medium italic text-center leading-tight px-1 py-0.5">
                {bubble.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <p className="text-red-500 text-lg font-bold mb-1">Gift!</p>
        <button
          onClick={() => {
            // keep demo isolated: update URL to /christmas-demo so scanning/links open the demo path
            try {
              if (!window.location.pathname.toLowerCase().startsWith('/christmas-demo')) {
                window.history.pushState({}, '', '/christmas-demo');
              }
            } catch (e) {}
            onContinue();
          }}
          className="text-2xl md:text-3xl font-orbitron font-bold mb-4 text-white px-4 py-1 border-2 border-red-500 rounded-lg hover:bg-red-500/20 hover:scale-105 transition-all duration-300"
        >
          Workshops
        </button>

        <p className="text-green-400 text-sm mb-6 font-orbitron">Scan the QR or tap <strong>Workshops</strong></p>

        {/* QR Code Container */}
        <div className="inline-block p-4 bg-white rounded-xl border-2 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
          {/* QR Code - Using custom Christmas QR image */}
          <img 
            src="/presentsImages/qrxmas.png"
            alt="QR Code"
            className="w-44 h-44 md:w-52 md:h-52"
          />
        </div>
      </div>

      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
          }
        }

        @keyframes bubbleFloat {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(30px) rotate(5deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
