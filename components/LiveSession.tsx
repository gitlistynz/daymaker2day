import React, { useState, useEffect, useRef } from 'react';
import { Monitor, MonitorOff, Mic, MicOff, Video, VideoOff, Phone, MessageCircle, Send, X, Maximize2, Minimize2 } from 'lucide-react';

interface LiveSessionProps {
  hostName: string;
  hostImage: string;
  sessionTitle: string;
  onEndSession: () => void;
}

export const LiveSession: React.FC<LiveSessionProps> = ({
  hostName,
  hostImage,
  sessionTitle,
  onEndSession,
}) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: string; text: string; time: string }[]>([
    { from: 'host', text: 'Hey! I can see you. Ready when you are! 👋', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

      // Handle when user stops sharing via browser UI
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
      from: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
    
    // Simulate host response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        from: 'host',
        text: 'Got it! Let me help you with that...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
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
