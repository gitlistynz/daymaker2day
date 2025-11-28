import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: string;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
}

export const Confetti: React.FC<{ trigger?: boolean }> = ({ trigger = true }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const emojis = ['🎉', '🎊', '🎁', '✨', '⭐', '🌟', '💫', '🔥'];
      const newPieces = Array.from({ length: 20 }, (_, i) => ({
        id: `confetti-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 1,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }));
      setPieces(newPieces);

      // Clean up after animation
      setTimeout(() => setPieces([]), 3500);
    }
  }, [trigger]);

  return (
    <>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="fixed pointer-events-none font-bold text-2xl md:text-4xl"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        >
          {piece.emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
