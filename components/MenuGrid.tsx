import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { CATEGORIES, SERVICES_LIST } from '../constants';
import * as Icons from 'lucide-react';

interface MenuGridProps {
  onSelectService: (service: ServiceItem) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ onSelectService }) => {
  const [filter, setFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredServices = SERVICES_LIST.filter(s => {
    const matchesCategory = filter === 'All' || s.category === filter;
    const matchesClass = classFilter === 'All' || 
      (classFilter === 'full' && s.classType === 'full') ||
      (classFilter === 'half' && s.classType === 'half');
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                          s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesClass && matchesSearch;
  });

  // Count services by type
  const fullCount = SERVICES_LIST.filter(s => s.classType === 'full').length;
  const halfCount = SERVICES_LIST.filter(s => s.classType === 'half').length;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-orbitron text-white tracking-widest mb-2">
          CHOOSE YOUR <span className="text-neon-blue">SESSION</span>
        </h2>
        <p className="text-gray-400">Select a class type and explore what we can create together</p>
      </div>

      {/* Class Type Toggle - Big Prominent Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setClassFilter('All')}
          className={`px-6 py-3 rounded-xl font-bold tracking-wider transition-all duration-300 ${
            classFilter === 'All'
              ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_20px_rgba(0,243,255,0.3)]'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          ALL SESSIONS
        </button>
        <button
          onClick={() => setClassFilter('full')}
          className={`px-6 py-3 rounded-xl font-bold tracking-wider transition-all duration-300 flex items-center gap-2 ${
            classFilter === 'full'
              ? 'bg-gradient-to-r from-neon-purple to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          <Icons.Clock size={18} />
          FULL CLASS
          <span className="text-xs opacity-70">55 min • $49</span>
        </button>
        <button
          onClick={() => setClassFilter('half')}
          className={`px-6 py-3 rounded-xl font-bold tracking-wider transition-all duration-300 flex items-center gap-2 ${
            classFilter === 'half'
              ? 'bg-gradient-to-r from-neon-green to-emerald-400 text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          <Icons.Zap size={18} />
          HALF CLASS
          <span className="text-xs opacity-70">25 min • $29</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
            filter === 'All' 
              ? 'bg-neon-blue text-black shadow-[0_0_10px_#00f3ff]' 
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          ALL CATEGORIES
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
              filter === cat 
                ? 'bg-neon-blue text-black shadow-[0_0_10px_#00f3ff]' 
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search sessions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all"
        />
      </div>

      {/* Results Count */}
      <div className="text-center text-gray-500 text-sm mb-6">
        Showing {filteredServices.length} sessions
        {classFilter !== 'All' && ` • ${classFilter === 'full' ? 'Full Class (55 min)' : 'Half Class (25 min)'}`}
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = (Icons as any)[service.iconName] || Icons.Box;
          const isFullClass = service.classType === 'full';
          const duration = isFullClass ? '55 MIN' : '25 MIN';
          const price = isFullClass ? '$49' : '$29';
          const classLabel = isFullClass ? 'FULL CLASS' : 'HALF CLASS';
          const accentColor = isFullClass ? 'neon-purple' : 'neon-green';
          const gradientFrom = isFullClass ? 'from-purple-500/10' : 'from-emerald-500/10';

          return (
            <div 
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`group relative overflow-hidden glass-panel rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                isFullClass ? 'hover:border-neon-purple/50' : 'hover:border-neon-green/50'
              }`}
            >
              {/* Class Type Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                isFullClass 
                  ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30' 
                  : 'bg-neon-green/20 text-neon-green border border-neon-green/30'
              }`}>
                {classLabel}
              </div>

              <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg transition-colors ${
                    isFullClass 
                      ? 'bg-neon-purple/10 group-hover:bg-neon-purple/20' 
                      : 'bg-neon-green/10 group-hover:bg-neon-green/20'
                  }`}>
                    <IconComponent size={24} className={`transition-colors ${
                      isFullClass 
                        ? 'text-neon-purple' 
                        : 'text-neon-green'
                    }`} />
                  </div>
                  <div className="flex-1 pr-16">
                    <span className="text-xs font-mono text-gray-500 mb-1 block">{service.category.toUpperCase()}</span>
                    <h3 className="text-lg font-bold text-white font-orbitron leading-tight">{service.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${isFullClass ? 'text-neon-purple' : 'text-neon-green'}`}>
                      {price}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{duration} // ZOOM</span>
                  </div>
                  <span className={`text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1 ${
                    isFullClass ? 'text-neon-purple' : 'text-neon-green'
                  }`}>
                    BOOK <Icons.ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};