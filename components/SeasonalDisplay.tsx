import React, { useState, useEffect } from 'react';

interface SeasonalDisplayProps {
  showOnHome?: boolean;
}

export const SeasonalDisplay: React.FC<SeasonalDisplayProps> = ({ showOnHome = true }) => {
  const [currentSeason, setCurrentSeason] = useState<'winter' | 'spring' | 'summer' | 'autumn'>('winter');

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) {
      setCurrentSeason('spring');
    } else if (month >= 5 && month <= 7) {
      setCurrentSeason('summer');
    } else if (month >= 8 && month <= 10) {
      setCurrentSeason('autumn');
    } else {
      setCurrentSeason('winter');
    }
  }, []);

  const seasonalData = {
    winter: {
      name: 'Winter',
      icon: '/daymaker2day/images/winter.svg',
      color: 'from-blue-600 to-blue-900',
      bg: 'bg-blue-900/20',
    },
    spring: {
      name: 'Spring',
      icon: '/daymaker2day/images/spring.svg',
      color: 'from-green-600 to-emerald-900',
      bg: 'bg-green-900/20',
    },
    summer: {
      name: 'Summer',
      icon: '/daymaker2day/images/summer.svg',
      color: 'from-yellow-600 to-orange-900',
      bg: 'bg-yellow-900/20',
    },
    autumn: {
      name: 'Autumn',
      icon: '/daymaker2day/images/autumn.svg',
      color: 'from-orange-600 to-red-900',
      bg: 'bg-orange-900/20',
    },
  };

  const season = seasonalData[currentSeason];

  if (!showOnHome) {
    return (
      <div className="w-full h-20 bg-black flex items-center justify-center">
        <div className="text-center">
          <img src={season.icon} alt={season.name} className="w-16 h-16 mx-auto mb-2" />
          <p className="text-sm text-gray-400">{season.name} Season</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full max-w-md mx-auto px-4 py-12 rounded-2xl border border-gray-700 bg-gradient-to-br ${season.color} ${season.bg} backdrop-blur-sm overflow-hidden`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="mb-4 flex justify-center">
          <img src={season.icon} alt={season.name} className="w-32 h-32 animate-bounce-slow" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{season.name} Sessions</h3>
        <p className="text-gray-300 text-sm mb-4">Special offers available this season</p>

        {/* Seasonal message */}
        <div className="bg-black/40 rounded-lg p-3 text-xs text-gray-300 border border-white/10">
          {currentSeason === 'winter' && '❄️ Cozy Zoom sessions to warm your heart'}
          {currentSeason === 'spring' && '🌸 New beginnings and fresh perspectives'}
          {currentSeason === 'summer' && '☀️ Energy and vitality at its peak'}
          {currentSeason === 'autumn' && '🍂 Reflection and preparation for changes'}
        </div>
      </div>
    </div>
  );
};
