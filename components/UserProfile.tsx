import React, { useState } from 'react';
import { User, Mail, Save, FileText, Clock, CheckCircle, XCircle, ChevronLeft, Shield, Cpu, Edit3 } from 'lucide-react';
import { UserProfileData, BookingHistoryItem } from '../types';

interface UserProfileProps {
  profile: UserProfileData;
  onUpdateProfile: (data: UserProfileData) => void;
  onBack: () => void;
}

const MOCK_HISTORY: BookingHistoryItem[] = [
  { id: 'LOG-001', serviceTitle: 'Neural Reset (Meditation)', dateStr: 'Oct 12, 2023 • 09:00 AM', status: 'COMPLETED' },
  { id: 'LOG-002', serviceTitle: 'Inbox Zero Strategy', dateStr: 'Nov 05, 2023 • 02:30 PM', status: 'COMPLETED' },
  { id: 'LOG-003', serviceTitle: 'Digital Detox Plan', dateStr: 'Jan 20, 2024 • 10:00 AM', status: 'CANCELLED' },
  { id: 'LOG-004', serviceTitle: 'React Component Debug', dateStr: 'Feb 14, 2024 • 11:30 AM', status: 'UPCOMING' },
];

export const UserProfile: React.FC<UserProfileProps> = ({ profile, onUpdateProfile, onBack }) => {
  const [formData, setFormData] = useState(profile);
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'LOGS'>('IDENTITY');

  const handleChange = (field: keyof UserProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    // Optional: add toast notification logic here
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn">
        <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors group"
        >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            RETURN TO HUB
        </button>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar / Tabs */}
            <div className="w-full md:w-64 flex flex-col gap-4">
                <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple p-[2px] rounded-full mb-4 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                <User size={40} className="text-white" />
                            </div>
                        </div>
                        <h3 className="text-white font-orbitron tracking-wider text-lg truncate">{formData.name || 'USER'}</h3>
                        <p className="text-xs text-neon-blue font-mono mt-1 opacity-80">ID: #8842-AX</p>
                    </div>
                </div>

                <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col">
                    <button
                        onClick={() => setActiveTab('IDENTITY')}
                        className={`p-3 rounded-lg text-left text-sm font-bold tracking-wider transition-all flex items-center gap-3 ${
                            activeTab === 'IDENTITY' ? 'bg-white/10 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Shield size={16} /> IDENTITY
                    </button>
                    <button
                        onClick={() => setActiveTab('LOGS')}
                        className={`p-3 rounded-lg text-left text-sm font-bold tracking-wider transition-all flex items-center gap-3 ${
                            activeTab === 'LOGS' ? 'bg-white/10 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Clock size={16} /> HISTORY
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 glass-panel rounded-3xl border border-white/10 p-6 md:p-8 min-h-[600px] relative overflow-hidden flex flex-col">
                {/* Background Decor */}
                <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

                {activeTab === 'IDENTITY' ? (
                    <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                            <div>
                                <h2 className="text-2xl font-orbitron text-white tracking-widest">IDENTITY MATRIX</h2>
                                <p className="text-xs text-gray-500 font-mono mt-1">UPDATE PERSONAL IDENTIFIERS</p>
                            </div>
                            <Cpu className="text-neon-purple animate-pulse-slow" size={24} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Name Card */}
                            <div className="group relative glass-panel p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-neon-blue/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Edit3 size={14} className="text-neon-blue" />
                                </div>
                                <div className="flex items-center gap-3 mb-4 text-neon-blue">
                                    <div className="p-2 bg-neon-blue/10 rounded-lg">
                                        <User size={20} />
                                    </div>
                                    <label className="text-xs font-mono font-bold tracking-widest">DESIGNATION</label>
                                </div>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full bg-transparent border-b border-white/10 focus:border-neon-blue text-white text-xl font-orbitron py-2 focus:outline-none transition-colors placeholder-white/20"
                                    placeholder="ENTER NAME"
                                />
                            </div>

                            {/* Email Card */}
                            <div className="group relative glass-panel p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(188,19,254,0.1)]">
                                 <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Edit3 size={14} className="text-neon-purple" />
                                </div>
                                <div className="flex items-center gap-3 mb-4 text-neon-purple">
                                    <div className="p-2 bg-neon-purple/10 rounded-lg">
                                        <Mail size={20} />
                                    </div>
                                    <label className="text-xs font-mono font-bold tracking-widest">COMM LINK</label>
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full bg-transparent border-b border-white/10 focus:border-neon-purple text-white text-xl font-orbitron py-2 focus:outline-none transition-colors placeholder-white/20"
                                    placeholder="ENTER EMAIL"
                                />
                            </div>

                            {/* Bio Card (Full Width) */}
                            <div className="md:col-span-2 group relative glass-panel p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(10,255,10,0.1)]">
                                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Edit3 size={14} className="text-neon-green" />
                                </div>
                                <div className="flex items-center gap-3 mb-4 text-neon-green">
                                    <div className="p-2 bg-neon-green/10 rounded-lg">
                                        <FileText size={20} />
                                    </div>
                                    <label className="text-xs font-mono font-bold tracking-widest">DATA LOG / BIO</label>
                                </div>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => handleChange('bio', e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-gray-300 focus:text-white focus:border-neon-green/50 focus:bg-black/40 focus:outline-none transition-all resize-none leading-relaxed"
                                    placeholder="Enter preference data or specific requirements for your sessions..."
                                />
                            </div>
                        </div>

                        <div className="mt-auto pt-6 flex justify-end">
                            <button
                                onClick={handleSave}
                                className="group relative px-8 py-3 bg-white text-black font-bold font-orbitron tracking-widest rounded-lg hover:bg-neon-blue transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2">
                                    <Save size={18} /> SAVE CONFIG
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10">
                         <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                             <div>
                                <h2 className="text-2xl font-orbitron text-white tracking-widest">MISSION LOGS</h2>
                                <p className="text-xs text-gray-500 font-mono mt-1">PAST & UPCOMING PROTOCOLS</p>
                             </div>
                            <Clock className="text-neon-purple animate-pulse-slow" size={24} />
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {MOCK_HISTORY.map((item) => (
                                <div key={item.id} className="group glass-panel border border-white/5 rounded-xl p-5 flex items-center justify-between hover:bg-white/5 hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center gap-5">
                                        <div className={`p-3 rounded-full transition-all duration-300 group-hover:scale-110 ${
                                            item.status === 'COMPLETED' ? 'bg-neon-green/10 text-neon-green shadow-[0_0_10px_rgba(10,255,10,0.2)]' :
                                            item.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                                            'bg-neon-blue/10 text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                                        }`}>
                                            {item.status === 'COMPLETED' && <CheckCircle size={20} />}
                                            {item.status === 'CANCELLED' && <XCircle size={20} />}
                                            {item.status === 'UPCOMING' && <Clock size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">{item.serviceTitle}</h4>
                                            <p className="text-xs text-gray-400 font-mono mt-1 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                                                {item.dateStr}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider border ${
                                        item.status === 'COMPLETED' ? 'border-neon-green/30 text-neon-green bg-neon-green/5' :
                                        item.status === 'CANCELLED' ? 'border-red-500/30 text-red-500 bg-red-500/5' :
                                        'border-neon-blue/30 text-neon-blue bg-neon-blue/5'
                                    }`}>
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};