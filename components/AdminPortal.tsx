import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Calendar, Send, Clock, CheckCircle, AlertCircle, Image, Link2, ExternalLink, Zap, Globe, Share2 } from 'lucide-react';

interface SocialPost {
  id: string;
  content: string;
  mediaUrl?: string;
  scheduledDate: string;
  scheduledTime: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  hashtags: string[];
}

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  connected: boolean;
  icon: string;
  color: string;
  authUrl: string;
  description: string;
}

interface AdminPortalProps {
  onClose: () => void;
}

const SOCIAL_PLATFORMS: SocialAccount[] = [
  { id: 'facebook', platform: 'Facebook', username: '', connected: false, icon: '📘', color: 'bg-blue-600', authUrl: 'https://www.facebook.com/login', description: 'Share posts, photos & videos to your page or profile' },
  { id: 'instagram', platform: 'Instagram', username: '', connected: false, icon: '📸', color: 'bg-gradient-to-br from-purple-600 to-pink-500', authUrl: 'https://www.instagram.com/accounts/login', description: 'Post photos, reels & stories to your feed' },
  { id: 'threads', platform: 'Threads', username: '', connected: false, icon: '🧵', color: 'bg-gray-800', authUrl: 'https://www.threads.net/login', description: 'Share text posts & join conversations' },
  { id: 'nextdoor', platform: 'Nextdoor', username: '', connected: false, icon: '🏘️', color: 'bg-green-600', authUrl: 'https://nextdoor.com/login', description: 'Connect with your local neighborhood community' },
  { id: 'twitter', platform: 'X (Twitter)', username: '', connected: false, icon: '𝕏', color: 'bg-black', authUrl: 'https://twitter.com/i/flow/login', description: 'Post tweets & engage with your audience' },
  { id: 'linkedin', platform: 'LinkedIn', username: '', connected: false, icon: '💼', color: 'bg-blue-700', authUrl: 'https://www.linkedin.com/login', description: 'Share professional content & network' },
  { id: 'tiktok', platform: 'TikTok', username: '', connected: false, icon: '🎵', color: 'bg-gray-900', authUrl: 'https://www.tiktok.com/login', description: 'Post short-form videos & go viral' },
  { id: 'youtube', platform: 'YouTube', username: '', connected: false, icon: '▶️', color: 'bg-red-600', authUrl: 'https://accounts.google.com/signin', description: 'Upload videos & community posts' },
  { id: 'pinterest', platform: 'Pinterest', username: '', connected: false, icon: '📌', color: 'bg-red-700', authUrl: 'https://www.pinterest.com/login', description: 'Pin images & drive traffic to your site' },
  { id: 'snapchat', platform: 'Snapchat', username: '', connected: false, icon: '👻', color: 'bg-yellow-400', authUrl: 'https://accounts.snapchat.com/accounts/login', description: 'Share stories & connect with Gen Z' },
  { id: 'whatsapp', platform: 'WhatsApp Business', username: '', connected: false, icon: '💬', color: 'bg-green-500', authUrl: 'https://business.whatsapp.com/', description: 'Message customers & share updates' },
  { id: 'telegram', platform: 'Telegram', username: '', connected: false, icon: '✈️', color: 'bg-blue-500', authUrl: 'https://web.telegram.org/', description: 'Broadcast to channels & groups' },
  { id: 'reddit', platform: 'Reddit', username: '', connected: false, icon: '🤖', color: 'bg-orange-600', authUrl: 'https://www.reddit.com/login', description: 'Post in communities & subreddits' },
  { id: 'tumblr', platform: 'Tumblr', username: '', connected: false, icon: '📝', color: 'bg-indigo-900', authUrl: 'https://www.tumblr.com/login', description: 'Blog posts & multimedia content' },
  { id: 'mastodon', platform: 'Mastodon', username: '', connected: false, icon: '🐘', color: 'bg-purple-700', authUrl: 'https://mastodon.social/auth/sign_in', description: 'Decentralized social networking' },
  { id: 'bluesky', platform: 'Bluesky', username: '', connected: false, icon: '🦋', color: 'bg-sky-500', authUrl: 'https://bsky.app/', description: 'The new decentralized Twitter alternative' },
];

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'accounts' | 'analytics'>('calendar');
  const [accounts, setAccounts] = useState<SocialAccount[]>(SOCIAL_PLATFORMS);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      content: '🌟 Ready to upgrade your day? Book a 25-min session with daymaker2day! #productivity #lifehacks',
      scheduledDate: '2025-12-01',
      scheduledTime: '09:00',
      platforms: ['facebook', 'instagram', 'threads'],
      status: 'scheduled',
      hashtags: ['productivity', 'lifehacks', 'daymaker2day'],
    },
  ]);

  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [postForm, setPostForm] = useState({
    content: '',
    mediaUrl: '',
    scheduledDate: '',
    scheduledTime: '',
    platforms: [] as string[],
    hashtags: '',
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatformForConnect, setSelectedPlatformForConnect] = useState<SocialAccount | null>(null);

  // Simulate OAuth connection flow
  const handleConnectAccount = (platform: SocialAccount) => {
    setSelectedPlatformForConnect(platform);
    setShowConnectModal(true);
  };

  const handleConfirmConnect = (username: string) => {
    if (selectedPlatformForConnect && username) {
      setAccounts(accounts.map(acc =>
        acc.id === selectedPlatformForConnect.id
          ? { ...acc, connected: true, username: username }
          : acc
      ));
      setShowConnectModal(false);
      setSelectedPlatformForConnect(null);
    }
  };

  const handleDisconnect = (platformId: string) => {
    setAccounts(accounts.map(acc =>
      acc.id === platformId
        ? { ...acc, connected: false, username: '' }
        : acc
    ));
  };

  const handleTogglePlatform = (platformId: string) => {
    if (postForm.platforms.includes(platformId)) {
      setPostForm({ ...postForm, platforms: postForm.platforms.filter(p => p !== platformId) });
    } else {
      setPostForm({ ...postForm, platforms: [...postForm.platforms, platformId] });
    }
  };

  // Select all connected platforms
  const handleSelectAllPlatforms = () => {
    const allConnected = connectedAccounts.map(a => a.id);
    setPostForm({ ...postForm, platforms: allConnected });
  };

  const handleSavePost = () => {
    if (!postForm.content || postForm.platforms.length === 0) return;

    const newPost: SocialPost = {
      id: editingPost?.id || Date.now().toString(),
      content: postForm.content,
      mediaUrl: postForm.mediaUrl,
      scheduledDate: postForm.scheduledDate,
      scheduledTime: postForm.scheduledTime,
      platforms: postForm.platforms,
      status: postForm.scheduledDate ? 'scheduled' : 'draft',
      hashtags: postForm.hashtags.split(' ').filter(h => h.startsWith('#')).map(h => h.replace('#', '')),
    };

    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? newPost : p));
    } else {
      setPosts([newPost, ...posts]);
    }

    setPostForm({ content: '', mediaUrl: '', scheduledDate: '', scheduledTime: '', platforms: [], hashtags: '' });
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleEditPost = (post: SocialPost) => {
    setEditingPost(post);
    setPostForm({
      content: post.content,
      mediaUrl: post.mediaUrl || '',
      scheduledDate: post.scheduledDate,
      scheduledTime: post.scheduledTime,
      platforms: post.platforms,
      hashtags: post.hashtags.map(h => `#${h}`).join(' '),
    });
    setShowPostForm(true);
  };

  const handlePublishNow = (post: SocialPost) => {
    setPosts(posts.map(p =>
      p.id === post.id ? { ...p, status: 'published' as const } : p
    ));
  };

  const connectedAccounts = accounts.filter(a => a.connected);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty slots for days before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getPostsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return posts.filter(p => p.scheduledDate === dateStr);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border border-gray-700/50 rounded-2xl w-full max-w-6xl my-4 shadow-2xl shadow-black/50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-700/50 bg-gradient-to-r from-gray-900 via-gray-800/50 to-gray-900">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-neon-blue to-purple-500 rounded-xl flex items-center justify-center text-lg">📊</span>
              Admin Portal
            </h2>
            <p className="text-sm text-gray-400 mt-2 ml-[52px]">Social Media Content Calendar & Management</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group">
            <X size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700/50 px-6 md:px-8 overflow-x-auto bg-gray-900/50">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-6 py-4 font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'border-neon-blue text-neon-blue'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            📅 Content Calendar
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-6 py-4 font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === 'accounts'
                ? 'border-neon-blue text-neon-blue'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            🔗 Connected Accounts ({connectedAccounts.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-4 font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-neon-blue text-neon-blue'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            📈 Analytics
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* ACCOUNTS TAB */}
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              {/* Header with stats */}
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/40 border border-gray-700/50 rounded-2xl p-6 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-neon-blue to-purple-500 rounded-xl flex items-center justify-center">🔌</span>
                      Connect Your Social Media Accounts
                    </h3>
                    <p className="text-sm text-gray-400 ml-[52px]">Link your accounts to cross-post content across all platforms at once.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-xl">
                      <div className="text-2xl font-bold text-green-400">{connectedAccounts.length}</div>
                      <div className="text-xs text-gray-400">Connected</div>
                    </div>
                    <div className="text-center px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                      <div className="text-2xl font-bold text-gray-300">{accounts.length}</div>
                      <div className="text-xs text-gray-400">Available</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected Accounts Section */}
              {connectedAccounts.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-400" />
                    Connected Platforms ({connectedAccounts.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {connectedAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="border border-green-500/30 bg-gradient-to-br from-green-900/20 to-gray-900/50 rounded-2xl p-5 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{account.icon}</span>
                            <div>
                              <span className="font-semibold text-white block">{account.platform}</span>
                              <span className="text-sm text-green-400">{account.username}</span>
                            </div>
                          </div>
                          <CheckCircle size={24} className="text-green-400" />
                        </div>
                        <p className="text-xs text-gray-400 mb-4">{account.description}</p>
                        <button
                          onClick={() => handleDisconnect(account.id)}
                          className="w-full py-2 rounded-xl font-semibold text-sm bg-red-900/30 text-red-400 border border-red-700/50 hover:bg-red-900/50 transition-all"
                        >
                          Disconnect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Platforms Section */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-neon-blue" />
                  Available Platforms ({accounts.filter(a => !a.connected).length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {accounts.filter(a => !a.connected).map((account) => (
                    <div
                      key={account.id}
                      className="border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-800/40 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-gray-600 group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl group-hover:scale-110 transition-transform">{account.icon}</span>
                        <span className="font-semibold text-white">{account.platform}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4 min-h-[32px]">{account.description}</p>
                      <button
                        onClick={() => handleConnectAccount(account)}
                        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${account.color} text-white hover:opacity-90 hover:shadow-lg`}
                      >
                        <Link2 size={16} />
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Connect Account Modal */}
          {showConnectModal && selectedPlatformForConnect && (
            <ConnectAccountModal
              platform={selectedPlatformForConnect}
              onClose={() => { setShowConnectModal(false); setSelectedPlatformForConnect(null); }}
              onConnect={handleConfirmConnect}
            />
          )}

          {/* CALENDAR TAB */}
          {activeTab === 'calendar' && (
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setPostForm({ content: '', mediaUrl: '', scheduledDate: '', scheduledTime: '', platforms: [], hashtags: '' });
                    setShowPostForm(true);
                  }}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-neon-blue to-cyan-400 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-neon-blue/30 transition-all duration-300 hover:scale-105"
                >
                  <Plus size={20} />
                  Create Post
                </button>
                <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl border border-gray-600/50 hover:border-gray-500 transition-all duration-300 hover:scale-105">
                  <Clock size={20} />
                  Bulk Schedule
                </button>
              </div>

              {/* Post Form Modal */}
              {showPostForm && (
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl p-8 space-y-6 shadow-2xl">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                    <span className="w-10 h-10 bg-neon-blue/20 rounded-xl flex items-center justify-center">
                      <Edit2 size={20} className="text-neon-blue" />
                    </span>
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h3>

                  {/* Platform Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm text-gray-400">Select Platforms for Cross-Posting</label>
                      {connectedAccounts.length > 0 && (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSelectAllPlatforms}
                            className="text-xs px-3 py-1.5 bg-neon-blue/20 text-neon-blue border border-neon-blue/50 rounded-lg hover:bg-neon-blue/30 transition-all flex items-center gap-1"
                          >
                            <Share2 size={12} />
                            Select All ({connectedAccounts.length})
                          </button>
                          <button
                            onClick={() => setPostForm({ ...postForm, platforms: [] })}
                            className="text-xs px-3 py-1.5 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-600 transition-all"
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {connectedAccounts.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {connectedAccounts.map((account) => (
                          <button
                            key={account.id}
                            onClick={() => handleTogglePlatform(account.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                              postForm.platforms.includes(account.id)
                                ? 'border-neon-blue bg-neon-blue/20 text-white shadow-lg shadow-neon-blue/20'
                                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800'
                            }`}
                          >
                            <span className="text-xl">{account.icon}</span>
                            <span className="text-sm font-medium">{account.platform}</span>
                            {postForm.platforms.includes(account.id) && (
                              <CheckCircle size={14} className="text-neon-blue" />
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4 flex items-center gap-3">
                        <AlertCircle size={20} className="text-yellow-400" />
                        <div>
                          <p className="text-yellow-300 font-medium">No accounts connected</p>
                          <p className="text-yellow-400/70 text-sm">Go to the Accounts tab to connect your social media platforms</p>
                        </div>
                      </div>
                    )}
                    
                    {postForm.platforms.length > 0 && (
                      <p className="text-sm text-green-400 mt-3 flex items-center gap-2">
                        <Zap size={14} />
                        Your post will be published to {postForm.platforms.length} platform{postForm.platforms.length > 1 ? 's' : ''} simultaneously
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Post Content</label>
                    <textarea
                      placeholder="What's on your mind? Write your post content here..."
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue h-32 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">{postForm.content.length}/280 characters</p>
                  </div>

                  {/* Media URL */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Media URL (optional)</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Image size={18} className="absolute left-3 top-3 text-gray-500" />
                        <input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={postForm.mediaUrl}
                          onChange={(e) => setPostForm({ ...postForm, mediaUrl: e.target.value })}
                          className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Hashtags</label>
                    <input
                      type="text"
                      placeholder="#daymaker2day #productivity #85044"
                      value={postForm.hashtags}
                      onChange={(e) => setPostForm({ ...postForm, hashtags: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  {/* Schedule */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Schedule Date</label>
                      <input
                        type="date"
                        value={postForm.scheduledDate}
                        onChange={(e) => setPostForm({ ...postForm, scheduledDate: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Schedule Time</label>
                      <input
                        type="time"
                        value={postForm.scheduledTime}
                        onChange={(e) => setPostForm({ ...postForm, scheduledTime: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => { setShowPostForm(false); setEditingPost(null); }}
                      className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePost}
                      className="flex-1 py-3 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      {postForm.scheduledDate ? 'Schedule Post' : 'Save as Draft'}
                    </button>
                  </div>
                </div>
              )}

              {/* Calendar View */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-3 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
                  >
                    ←
                  </button>
                  <h3 className="text-xl font-semibold text-white tracking-wide">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-3 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
                  >
                    →
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-400 py-3 uppercase tracking-wider">{day}</div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentMonth).map((date, idx) => (
                    <div
                      key={idx}
                      className={`min-h-[70px] md:min-h-[90px] border rounded-xl p-2 transition-all duration-200 ${
                        date ? 'border-gray-700/50 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50' : 'border-transparent'
                      }`}
                    >
                      {date && (
                        <>
                          <div className="text-xs font-medium text-gray-300 mb-1">{date.getDate()}</div>
                          <div className="space-y-1">
                            {getPostsForDate(date).slice(0, 2).map(post => (
                              <div
                                key={post.id}
                                onClick={() => handleEditPost(post)}
                                className={`text-xs p-1.5 rounded-lg truncate cursor-pointer transition-all hover:scale-105 ${
                                  post.status === 'published' ? 'bg-green-900/60 text-green-200 border border-green-700/50' :
                                  post.status === 'scheduled' ? 'bg-blue-900/60 text-blue-200 border border-blue-700/50' :
                                  'bg-gray-700/60 text-gray-200 border border-gray-600/50'
                                }`}
                              >
                                {post.platforms.map(p => accounts.find(a => a.id === p)?.icon).join('')}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheduled Posts List */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">📋</span>
                  Scheduled Posts
                </h3>
                <div className="space-y-4">
                  {posts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                      <p className="text-gray-400">No posts scheduled yet. Create your first post!</p>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-gradient-to-r from-gray-800/80 to-gray-800/40 border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.platforms.map(platformId => {
                                const platform = accounts.find(a => a.id === platformId);
                                return platform ? (
                                  <span key={platformId} className="text-xl bg-gray-700/50 p-1.5 rounded-lg" title={platform.platform}>
                                    {platform.icon}
                                  </span>
                                ) : null;
                              })}
                            </div>
                            <p className="text-white mb-3 leading-relaxed">{post.content}</p>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <span className="text-gray-400 flex items-center gap-1.5">
                                📅 {post.scheduledDate} at {post.scheduledTime}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full font-medium text-xs ${
                                  post.status === 'published' ? 'bg-green-900/50 text-green-300 border border-green-700/50' :
                                  post.status === 'scheduled' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' :
                                  post.status === 'failed' ? 'bg-red-900/50 text-red-300 border border-red-700/50' :
                                  'bg-gray-700/50 text-gray-300 border border-gray-600/50'
                                }`}
                              >
                                {post.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {post.status !== 'published' && (
                              <button
                                onClick={() => handlePublishNow(post)}
                                className="p-2.5 hover:bg-green-900/40 rounded-xl text-green-400 transition-all"
                                title="Publish Now"
                              >
                                <Send size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-2.5 hover:bg-blue-900/40 rounded-xl text-blue-400 transition-all"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2.5 hover:bg-red-900/40 rounded-xl text-red-400 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="w-14 h-14 bg-neon-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="text-4xl font-bold text-neon-blue mb-2">{posts.length}</div>
                  <div className="text-gray-400 font-medium">Total Posts</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {posts.filter(p => p.status === 'published').length}
                  </div>
                  <div className="text-gray-400 font-medium">Published</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {posts.filter(p => p.status === 'scheduled').length}
                  </div>
                  <div className="text-gray-400 font-medium">Scheduled</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">📊</span>
                  Platform Reach
                </h3>
                <div className="space-y-5">
                  {connectedAccounts.map(account => (
                    <div key={account.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
                      <span className="text-3xl w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center">{account.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-white font-medium">{account.platform}</span>
                          <span className="text-gray-400">
                            {posts.filter(p => p.platforms.includes(account.id)).length} posts
                          </span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-neon-blue to-cyan-400 rounded-full h-3 transition-all duration-500"
                            style={{
                              width: `${(posts.filter(p => p.platforms.includes(account.id)).length / Math.max(posts.length, 1)) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {connectedAccounts.length === 0 && (
                    <div className="text-center py-8 bg-gray-800/30 rounded-xl border border-gray-700/50">
                      <p className="text-gray-400">Connect accounts to see analytics</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Connect Account Modal Component
interface ConnectModalProps {
  platform: SocialAccount;
  onClose: () => void;
  onConnect: (username: string) => void;
}

const ConnectAccountModal: React.FC<ConnectModalProps> = ({ platform, onClose, onConnect }) => {
  const [step, setStep] = useState<'intro' | 'auth' | 'confirm'>('intro');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenAuth = () => {
    setIsLoading(true);
    // Open the platform's auth URL in a new window
    window.open(platform.authUrl, '_blank', 'width=600,height=700');
    // Simulate auth completion after a delay
    setTimeout(() => {
      setIsLoading(false);
      setStep('confirm');
    }, 2000);
  };

  const handleConfirm = () => {
    if (username.trim()) {
      onConnect(username.startsWith('@') ? username : `@${username}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700/50 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{platform.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-white">Connect {platform.platform}</h3>
              <p className="text-sm text-gray-400">Link your account</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'intro' && (
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-300 text-sm">{platform.description}</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-white font-semibold">What you'll be able to do:</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Post content directly from this dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Schedule posts in advance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Cross-post to multiple platforms at once
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Track engagement analytics
                  </li>
                </ul>
              </div>

              <button
                onClick={handleOpenAuth}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-3 ${platform.color} hover:opacity-90 hover:shadow-lg disabled:opacity-50`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <ExternalLink size={20} />
                    Sign in to {platform.platform}
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                You'll be redirected to {platform.platform} to authorize access
              </p>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Almost Done!</h4>
                <p className="text-gray-400 text-sm">Enter your {platform.platform} username to complete the connection</p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@yourusername"
                  className="w-full bg-gray-900 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('intro')}
                  className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!username.trim()}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Connect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};