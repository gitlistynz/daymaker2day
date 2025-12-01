import React, { useState, useEffect, useRef } from 'react';
import { Monitor, MonitorOff, Mic, MicOff, Video, VideoOff, Phone, MessageCircle, Send, X, Maximize2, Minimize2, Clock, Calendar, User, Star, Loader2 } from 'lucide-react';
import { SERVICES_LIST } from '../constants';

interface LiveSessionProps {
  hostName: string;
  hostImage: string;
  sessionTitle: string;
  customerName?: string;
  customerBio?: string;
  customerEmail?: string;
  scheduledTime?: string;
  onEndSession: () => void;
  isHostView?: boolean; // true = host (you), false = customer
}

// Upcoming events mock data
const UPCOMING_EVENTS = [
  { title: 'Daymaker Pet Party', time: '3:00 PM', customer: 'Sarah M.' },
  { title: 'Daymaker Style Check', time: '4:30 PM', customer: 'Jake L.' },
  { title: 'Daymaker Beat Jam', time: '5:00 PM', customer: 'Maria T.' },
];

export const LiveSession: React.FC<LiveSessionProps> = ({
  hostName,
  hostImage,
  sessionTitle,
  customerName = 'Guest User',
  customerBio = 'Looking forward to this session!',
  customerEmail = 'guest@example.com',
  scheduledTime = '2:00 PM',
  onEndSession,
  isHostView = true,
}) => {
  const [hostJoined, setHostJoined] = useState(false);
  const [waitingTime, setWaitingTime] = useState(0);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: string; text: string; time: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Waiting timer (before host joins)
  useEffect(() => {
    if (!hostJoined) {
      const timer = setInterval(() => {
        setWaitingTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hostJoined]);

  // Session timer (after host joins)
  useEffect(() => {
    if (hostJoined) {
      const timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hostJoined]);

  // If host view, auto-join and set initial message
  useEffect(() => {
    if (isHostView) {
      // Host joins after a brief moment (simulating connection)
      const joinTimer = setTimeout(() => {
        setHostJoined(true);
        setChatMessages([{
          from: 'host',
          text: `Hey ${customerName}! I can see you. Ready when you are! 👋`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1500);
      return () => clearTimeout(joinTimer);
    }
  }, [isHostView, customerName]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Screen sharing
  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      setScreenStream(stream);
      setIsScreenSharing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.log('Screen share cancelled or failed');
    }
  };

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
    setIsScreenSharing(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages(prev => [...prev, {
      from: isHostView ? 'host' : 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
    
    // Simulate response
    if (!isHostView) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          from: 'host',
          text: 'Got it! Let me help you with that...',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 2000);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // ============ WAITING ROOM ============
  if (!hostJoined) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex flex-col">
        {/* Waiting Room Header */}
        <div className="p-6 border-b border-white/10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-blue/10 rounded-xl">
                <Clock size={24} className="text-neon-blue" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Waiting Room</h2>
                <p className="text-gray-400 text-sm">Your session will begin shortly</p>
              </div>
            </div>
            <button
              onClick={onEndSession}
              className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
            >
              Leave
            </button>
          </div>
        </div>

        {/* Main Waiting Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
            
            {/* Left: Session Info & Host Status */}
            <div className="space-y-6">
              {/* Session Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img 
                      src={hostImage} 
                      alt={hostName}
                      className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover grayscale"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Loader2 size={12} className="text-black animate-spin" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{hostName}</h3>
                    <p className="text-yellow-400 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      Connecting...
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Session</span>
                    <span className="text-white font-medium">{sessionTitle}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Scheduled</span>
                    <span className="text-neon-blue font-mono">{scheduledTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Waiting</span>
                    <span className="text-white font-mono">{formatTime(waitingTime)}</span>
                  </div>
                </div>

                {/* Waiting Animation */}
                <div className="mt-6 p-4 bg-black/30 rounded-xl text-center">
                  <div className="flex justify-center gap-1 mb-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-gray-400 text-sm">Host will join momentarily</p>
                </div>
              </div>

              {/* Customer Bio (Host sees this) */}
              {isHostView && (
                <div className="bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 rounded-2xl p-6 border border-neon-purple/20">
                  <div className="flex items-center gap-2 mb-4">
                    <User size={18} className="text-neon-purple" />
                    <h4 className="font-bold text-white">Customer Info</h4>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-xl font-bold text-white">
                      {customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="text-white font-bold">{customerName}</h5>
                      <p className="text-gray-400 text-sm">{customerEmail}</p>
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-gray-300 text-sm italic">"{customerBio}"</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <Star size={12} className="text-yellow-400" />
                    <span>First-time customer</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Upcoming Events & Tips */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={18} className="text-neon-green" />
                  <h4 className="font-bold text-white">Upcoming Sessions</h4>
                </div>
                <div className="space-y-3">
                  {UPCOMING_EVENTS.map((event, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 p-3 bg-black/30 rounded-xl hover:bg-black/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center">
                        <Clock size={18} className="text-neon-green" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{event.title}</p>
                        <p className="text-gray-500 text-xs">{event.customer}</p>
                      </div>
                      <span className="text-neon-green text-sm font-mono">{event.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips While Waiting */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="font-bold text-white mb-4">💡 Quick Tips</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-neon-blue">•</span>
                    Make sure your screen is ready to share
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-blue">•</span>
                    Close any private windows or tabs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-blue">•</span>
                    Have your questions ready
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-blue">•</span>
                    Check your mic and camera
                  </li>
                </ul>
              </div>

              {/* Test Devices */}
              <div className="flex gap-3">
                <button className="flex-1 p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm">
                  <Mic size={16} />
                  Test Mic
                </button>
                <button className="flex-1 p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm">
                  <Video size={16} />
                  Test Camera
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Join as Host Button (for host view) */}
        {isHostView && (
          <div className="p-6 border-t border-white/10 bg-black/50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                <span className="text-white font-bold">{customerName}</span> is waiting for you
              </div>
              <button
                onClick={() => setHostJoined(true)}
                className="px-8 py-3 bg-gradient-to-r from-neon-green to-emerald-500 text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all flex items-center gap-2"
              >
                <Video size={20} />
                Join Session Now
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-black/80 border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* Live Host Indicator */}
          <div className="relative">
            <img 
              src={hostImage} 
              alt={hostName}
              className="w-12 h-12 rounded-full border-2 border-neon-green object-cover"
            />
            {/* Pulsing live indicator */}
            <div className="absolute -top-1 -right-1 flex items-center justify-center">
              <span className="absolute w-4 h-4 bg-neon-green rounded-full animate-ping opacity-75"></span>
              <span className="relative w-3 h-3 bg-neon-green rounded-full"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{hostName}</span>
              <span className="px-2 py-0.5 bg-neon-green/20 text-neon-green text-xs font-bold rounded-full animate-pulse">
                LIVE
              </span>
            </div>
            <span className="text-gray-400 text-sm">{sessionTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Session Timer */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-mono">{formatTime(sessionTime)}</span>
          </div>

          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative">
        {/* Screen Share Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-900 relative">
          {isScreenSharing ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center border-2 border-dashed border-white/20">
                <Monitor size={48} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Share Your Screen</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Click the button below to share your screen so your host can guide you in real-time
              </p>
              <button
                onClick={startScreenShare}
                className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all"
              >
                <span className="flex items-center gap-2">
                  <Monitor size={20} />
                  Start Screen Share
                </span>
              </button>
            </div>
          )}

          {/* Floating Host PIP */}
          <div className="absolute bottom-4 right-4 group">
            <div className="relative">
              <img 
                src={hostImage} 
                alt={hostName}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-neon-green shadow-[0_0_20px_rgba(0,255,136,0.3)] object-cover"
              />
              {/* Live badge */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-neon-green text-black text-xs font-bold rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                LIVE
              </div>
              {/* Name */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs font-bold rounded-full whitespace-nowrap">
                {hostName} is watching
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-black/90 border-l border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-white">Session Chat</span>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    msg.from === 'user' 
                      ? 'bg-neon-blue/20 text-white' 
                      : 'bg-white/10 text-white'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-neon-blue/50"
                />
                <button 
                  onClick={sendMessage}
                  className="p-2 bg-neon-blue rounded-lg text-black hover:bg-neon-blue/80 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="p-4 bg-black/80 border-t border-white/10">
        <div className="flex items-center justify-center gap-4">
          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${
              isMuted 
                ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {/* Video */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-4 rounded-full transition-all ${
              !isVideoOn 
                ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full transition-all ${
              isScreenSharing 
                ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isScreenSharing ? <Monitor size={24} /> : <MonitorOff size={24} />}
          </button>

          {/* Chat */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-4 rounded-full transition-all ${
              showChat 
                ? 'bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <MessageCircle size={24} />
          </button>

          {/* End Call */}
          <button
            onClick={onEndSession}
            className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all ml-4"
          >
            <Phone size={24} className="rotate-[135deg]" />
          </button>
        </div>

        {/* Screen Share Status */}
        {isScreenSharing && (
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 text-neon-green text-sm rounded-full">
              <Monitor size={16} />
              You are sharing your screen
              <button 
                onClick={stopScreenShare}
                className="ml-2 text-neon-green/70 hover:text-neon-green"
              >
                Stop
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
