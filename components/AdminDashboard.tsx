import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Calendar, Mail, Eye, EyeOff } from 'lucide-react';

interface Newsletter {
  id: string;
  subject: string;
  content: string;
  recipients: number;
  status: 'draft' | 'scheduled' | 'sent';
  sendDate?: string;
  createdDate: string;
}

interface ContentRelease {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  category: string;
  status: 'planned' | 'in-progress' | 'released';
  priority: 'low' | 'medium' | 'high';
}

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'newsletters' | 'calendar'>('newsletters');
  const [newsletters, setNewsletters] = useState<Newsletter[]>([
    {
      id: '1',
      subject: 'Welcome to daymaker2day!',
      content: 'Get exclusive access to our 50+ services...',
      recipients: 245,
      status: 'sent',
      sendDate: '2024-11-20',
      createdDate: '2024-11-20',
    },
  ]);
  const [contentReleases, setContentReleases] = useState<ContentRelease[]>([
    {
      id: '1',
      title: 'New AI Logo Remix Feature',
      description: 'Live AI logo generation with custom prompts',
      releaseDate: '2024-12-01',
      category: 'Feature',
      status: 'planned',
      priority: 'high',
    },
  ]);

  // Newsletter States
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<Newsletter | null>(null);
  const [newsletterForm, setNewsletterForm] = useState({ subject: '', content: '', sendDate: '' });

  // Content Release States
  const [showReleaseForm, setShowReleaseForm] = useState(false);
  const [editingRelease, setEditingRelease] = useState<ContentRelease | null>(null);
  const [releaseForm, setReleaseForm] = useState({
    title: '',
    description: '',
    releaseDate: '',
    category: 'Feature',
    priority: 'medium' as const,
  });

  // Newsletter Handlers
  const handleAddNewsletter = () => {
    if (!newsletterForm.subject || !newsletterForm.content) return;

    if (editingNewsletter) {
      setNewsletters(newsletters.map(n =>
        n.id === editingNewsletter.id
          ? { ...n, subject: newsletterForm.subject, content: newsletterForm.content, sendDate: newsletterForm.sendDate }
          : n
      ));
      setEditingNewsletter(null);
    } else {
      const newNewsletter: Newsletter = {
        id: Date.now().toString(),
        subject: newsletterForm.subject,
        content: newsletterForm.content,
        recipients: 0,
        status: newsletterForm.sendDate ? 'scheduled' : 'draft',
        sendDate: newsletterForm.sendDate,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setNewsletters([newNewsletter, ...newsletters]);
    }

    setNewsletterForm({ subject: '', content: '', sendDate: '' });
    setShowNewsletterForm(false);
  };

  const handleDeleteNewsletter = (id: string) => {
    setNewsletters(newsletters.filter(n => n.id !== id));
  };

  const handleEditNewsletter = (newsletter: Newsletter) => {
    setEditingNewsletter(newsletter);
    setNewsletterForm({
      subject: newsletter.subject,
      content: newsletter.content,
      sendDate: newsletter.sendDate || '',
    });
    setShowNewsletterForm(true);
  };

  // Content Release Handlers
  const handleAddRelease = () => {
    if (!releaseForm.title || !releaseForm.description || !releaseForm.releaseDate) return;

    if (editingRelease) {
      setContentReleases(contentReleases.map(r =>
        r.id === editingRelease.id ? { ...r, ...releaseForm } : r
      ));
      setEditingRelease(null);
    } else {
      const newRelease: ContentRelease = {
        id: Date.now().toString(),
        ...releaseForm,
      };
      setContentReleases([newRelease, ...contentReleases]);
    }

    setReleaseForm({ title: '', description: '', releaseDate: '', category: 'Feature', priority: 'medium' });
    setShowReleaseForm(false);
  };

  const handleDeleteRelease = (id: string) => {
    setContentReleases(contentReleases.filter(r => r.id !== id));
  };

  const handleEditRelease = (release: ContentRelease) => {
    setEditingRelease(release);
    setReleaseForm(release);
    setShowReleaseForm(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900">
          <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 px-6">
          <button
            onClick={() => setActiveTab('newsletters')}
            className={`px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'newsletters'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="inline mr-2" size={18} />
            Newsletters
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'calendar'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="inline mr-2" size={18} />
            Content Calendar
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Newsletters Tab */}
          {activeTab === 'newsletters' && (
            <div className="space-y-6">
              <button
                onClick={() => {
                  setEditingNewsletter(null);
                  setNewsletterForm({ subject: '', content: '', sendDate: '' });
                  setShowNewsletterForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus size={18} />
                New Newsletter
              </button>

              {showNewsletterForm && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {editingNewsletter ? 'Edit Newsletter' : 'Create Newsletter'}
                  </h3>
                  <input
                    type="text"
                    placeholder="Newsletter Subject"
                    value={newsletterForm.subject}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, subject: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    placeholder="Newsletter Content"
                    value={newsletterForm.content}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, content: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 h-32"
                  />
                  <input
                    type="datetime-local"
                    value={newsletterForm.sendDate}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, sendDate: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowNewsletterForm(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddNewsletter}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      {editingNewsletter ? 'Update' : 'Send'} Newsletter
                    </button>
                  </div>
                </div>
              )}

              {/* Newsletters List */}
              <div className="space-y-3">
                {newsletters.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No newsletters yet</p>
                ) : (
                  newsletters.map((newsletter) => (
                    <div
                      key={newsletter.id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-start justify-between hover:border-gray-600 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{newsletter.subject}</h4>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{newsletter.content}</p>
                        <div className="flex gap-4 mt-3 text-xs text-gray-500">
                          <span>📅 {newsletter.createdDate}</span>
                          <span>👥 {newsletter.recipients} recipients</span>
                          <span
                            className={`px-2 py-1 rounded ${
                              newsletter.status === 'sent'
                                ? 'bg-green-900 text-green-200'
                                : newsletter.status === 'scheduled'
                                  ? 'bg-yellow-900 text-yellow-200'
                                  : 'bg-gray-700 text-gray-200'
                            }`}
                          >
                            {newsletter.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditNewsletter(newsletter)}
                          className="p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteNewsletter(newsletter.id)}
                          className="p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Content Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <button
                onClick={() => {
                  setEditingRelease(null);
                  setReleaseForm({ title: '', description: '', releaseDate: '', category: 'Feature', priority: 'medium' });
                  setShowReleaseForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus size={18} />
                New Release
              </button>

              {showReleaseForm && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {editingRelease ? 'Edit Release' : 'Schedule Release'}
                  </h3>
                  <input
                    type="text"
                    placeholder="Release Title"
                    value={releaseForm.title}
                    onChange={(e) => setReleaseForm({ ...releaseForm, title: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    placeholder="Release Description"
                    value={releaseForm.description}
                    onChange={(e) => setReleaseForm({ ...releaseForm, description: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 h-24"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={releaseForm.releaseDate}
                      onChange={(e) => setReleaseForm({ ...releaseForm, releaseDate: e.target.value })}
                      className="bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                    />
                    <select
                      value={releaseForm.category}
                      onChange={(e) => setReleaseForm({ ...releaseForm, category: e.target.value })}
                      className="bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Feature</option>
                      <option>Update</option>
                      <option>Bug Fix</option>
                      <option>Integration</option>
                    </select>
                  </div>
                  <select
                    value={releaseForm.priority}
                    onChange={(e) => setReleaseForm({ ...releaseForm, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowReleaseForm(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRelease}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      {editingRelease ? 'Update' : 'Schedule'} Release
                    </button>
                  </div>
                </div>
              )}

              {/* Content Releases List */}
              <div className="space-y-3">
                {contentReleases.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No releases scheduled</p>
                ) : (
                  contentReleases
                    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
                    .map((release) => (
                      <div
                        key={release.id}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-start justify-between hover:border-gray-600 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{release.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{release.description}</p>
                          <div className="flex gap-3 mt-3 text-xs">
                            <span className="text-gray-500">📅 {release.releaseDate}</span>
                            <span
                              className={`px-2 py-1 rounded ${
                                release.priority === 'high'
                                  ? 'bg-red-900 text-red-200'
                                  : release.priority === 'medium'
                                    ? 'bg-yellow-900 text-yellow-200'
                                    : 'bg-green-900 text-green-200'
                              }`}
                            >
                              {release.priority.toUpperCase()} PRIORITY
                            </span>
                            <span
                              className={`px-2 py-1 rounded ${
                                release.status === 'released'
                                  ? 'bg-green-900 text-green-200'
                                  : release.status === 'in-progress'
                                    ? 'bg-blue-900 text-blue-200'
                                    : 'bg-gray-700 text-gray-200'
                              }`}
                            >
                              {release.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditRelease(release)}
                            className="p-2 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Edit2 size={16} className="text-blue-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteRelease(release.id)}
                            className="p-2 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
