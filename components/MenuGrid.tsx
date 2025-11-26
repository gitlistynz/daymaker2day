import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { CATEGORIES, SERVICES_LIST } from '../constants';
import * as Icons from 'lucide-react';

interface MenuGridProps {
  onSelect: (service: ServiceItem) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ onSelect }) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredServices = SERVICES_LIST.filter(s => {
    const matchesCategory = filter === 'All' || s.category === filter;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                          s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-orbitron text-white tracking-widest">
          SELECT <span className="text-neon-blue">PROTOCOL</span>
        </h2>
        
        <div className="flex flex-wrap gap-2 justify-center">
            <button
                onClick={() => setFilter('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  filter === 'All' 
                    ? 'bg-neon-blue text-black shadow-[0_0_10px_#00f3ff]' 
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
            >
                ALL
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
      </div>

      <div className="mb-8">
        <input
            type="text"
            placeholder="Search database..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          // Dynamic Icon Rendering
          const IconComponent = (Icons as any)[service.iconName] || Icons.Box;

          return (
            <div 
              key={service.id}
              onClick={() => onSelect(service)}
              className="group relative overflow-hidden glass-panel rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-neon-purple/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-neon-blue mb-2 block">{service.category.toUpperCase()}</span>
                  <h3 className="text-xl font-bold text-white mb-2 font-orbitron">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-neon-purple/20 transition-colors">
                  <IconComponent size={24} className="text-gray-300 group-hover:text-neon-purple transition-colors" />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-xs text-gray-500 font-mono">25 MIN // ZOOM</span>
                <span className="text-neon-blue text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                  BOOK <Icons.ArrowRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};