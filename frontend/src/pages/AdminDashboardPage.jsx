import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  getAdminProfile, 
  getContactMessages, 
  getMessageStats, 
  updateMessageStatus, 
  deleteContactMessage, 
  removeToken,
  getToken
} from '../services/api';
import { 
  ShieldCheck, 
  LogOut, 
  Inbox, 
  Star, 
  Mail, 
  Clock, 
  Search, 
  CheckCircle2, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Home,
  User,
  X
} from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, starred: 0, today: 0 });
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'starred'
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [feedbackNotice, setFeedbackNotice] = useState(null);

  // Authenticate and load initial data
  const loadDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [adminRes, statsRes, messagesRes] = await Promise.all([
        getAdminProfile(),
        getMessageStats(),
        getContactMessages({
          isRead: filter === 'unread' ? 'false' : undefined,
          isStarred: filter === 'starred' ? 'true' : undefined,
          search: searchTerm || undefined,
        }),
      ]);

      setAdmin(adminRes.admin);
      setStats(statsRes.data);
      setMessages(messagesRes.data || []);
    } catch (err) {
      console.warn('Dashboard load failed:', err.message);
      if (err.message.includes('authorized') || err.message.includes('token') || !getToken()) {
        removeToken();
        navigate('/admin/login');
      } else {
        setFeedbackNotice({ type: 'error', message: err.message });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
  }, [filter, searchTerm]);

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  const handleToggleRead = async (msg) => {
    try {
      const newStatus = !msg.isRead;
      await updateMessageStatus(msg._id, { isRead: newStatus });
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, isRead: newStatus } : m))
      );
      if (selectedMessage && selectedMessage._id === msg._id) {
        setSelectedMessage((prev) => ({ ...prev, isRead: newStatus }));
      }
      // Update stats
      setStats((prev) => ({
        ...prev,
        unread: newStatus ? Math.max(0, prev.unread - 1) : prev.unread + 1,
      }));
    } catch (err) {
      setFeedbackNotice({ type: 'error', message: err.message });
    }
  };

  const handleToggleStar = async (msg) => {
    try {
      const newStarred = !msg.isStarred;
      await updateMessageStatus(msg._id, { isStarred: newStarred });
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, isStarred: newStarred } : m))
      );
      if (selectedMessage && selectedMessage._id === msg._id) {
        setSelectedMessage((prev) => ({ ...prev, isStarred: newStarred }));
      }
      setStats((prev) => ({
        ...prev,
        starred: newStarred ? prev.starred + 1 : Math.max(0, prev.starred - 1),
      }));
    } catch (err) {
      setFeedbackNotice({ type: 'error', message: err.message });
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message permanently?')) {
      return;
    }

    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
      setFeedbackNotice({ type: 'success', message: 'Message removed successfully.' });
      setTimeout(() => setFeedbackNotice(null), 3000);
      // Refresh stats
      getMessageStats().then((res) => setStats(res.data));
    } catch (err) {
      setFeedbackNotice({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-charcoal-950">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shadow-glow-teal">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Portfolio Control Center
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-[10px] font-mono text-teal-300">
                  {admin?.role || 'Admin'}
                </span>
              </div>
              <p className="text-xs text-muted-400 font-mono mt-0.5">
                Logged in as: <span className="text-slate-200">{admin?.username || 'Khan Sher'}</span> ({admin?.email || 'khansher68u@gmail.com'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="p-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-muted-300 hover:text-white hover:border-teal-500/30 text-xs inline-flex items-center gap-1.5 transition-colors"
              title="View Public Site"
            >
              <Home className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              type="button"
              onClick={loadDashboardData}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-muted-300 hover:text-teal-300 text-xs inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Refresh Messages"
            >
              <RefreshCw className={`w-4 h-4 text-teal-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-muted-300 hover:text-red-400 hover:border-red-500/30 text-xs inline-flex items-center gap-1.5 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert Notice */}
        {feedbackNotice && (
          <div className={`p-4 rounded-xl flex items-center justify-between text-xs animate-fade-in ${
            feedbackNotice.type === 'error'
              ? 'bg-red-500/10 border border-red-500/30 text-red-300'
              : 'bg-teal-500/10 border border-teal-500/30 text-teal-300'
          }`}>
            <div className="flex items-center gap-2">
              {feedbackNotice.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{feedbackNotice.message}</span>
            </div>
            <button onClick={() => setFeedbackNotice(null)} className="opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-muted-400 uppercase">Total Messages</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">{stats.total}</div>
            </div>
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <Inbox className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-teal-400 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Unread Inquiries</span>
              </div>
              <div className="text-2xl font-bold font-mono text-teal-300 mt-1">{stats.unread}</div>
            </div>
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase">Starred</div>
              <div className="text-2xl font-bold font-mono text-amber-300 mt-1">{stats.starred}</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Star className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-muted-400 uppercase">Today's Inquiries</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">{stats.today}</div>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-900 text-teal-400 border border-white/5">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['all', 'unread', 'starred'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFilter(mode)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                  filter === mode
                    ? 'bg-teal-500 text-charcoal-950 font-bold shadow-glow-teal'
                    : 'bg-charcoal-850 text-muted-400 hover:text-white border border-white/5'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-muted-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sender, email, subject..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white placeholder-muted-500 focus:outline-none focus:border-teal-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-charcoal-900/60 text-xs font-mono text-muted-400">
            <span>Inquiries ({messages.length})</span>
            <span>Real-time MongoDB Records</span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-xs font-mono text-muted-400">
              Loading inquiries from database...
            </div>
          ) : messages.length === 0 ? (
            <div className="p-16 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-charcoal-900 text-muted-500 mx-auto flex items-center justify-center">
                <Inbox className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-white">No inquiries found</div>
              <p className="text-xs text-muted-400 max-w-sm mx-auto">
                Submissions from the public Contact form will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-5 sm:p-6 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    !msg.isRead ? 'bg-teal-500/[0.03] hover:bg-teal-500/[0.06]' : 'hover:bg-charcoal-850/50'
                  }`}
                >
                  <div className="flex-1 space-y-1.5 cursor-pointer" onClick={() => setSelectedMessage(msg)}>
                    <div className="flex flex-wrap items-center gap-2">
                      {!msg.isRead && (
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" title="Unread" />
                      )}
                      <span className="font-bold text-sm text-white">{msg.name}</span>
                      <a 
                        href={`mailto:${msg.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono text-teal-400 hover:underline flex items-center gap-1"
                      >
                        {msg.email}
                      </a>
                      <span className="text-muted-600 text-xs">•</span>
                      <span className="text-[11px] font-mono text-muted-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200">
                      {msg.subject}
                    </div>

                    <p className="text-xs text-muted-400 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => handleToggleStar(msg)}
                      className={`p-2 rounded-lg border transition-colors ${
                        msg.isStarred
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-charcoal-900 text-muted-500 border-white/5 hover:text-amber-400'
                      }`}
                      title={msg.isStarred ? 'Unstar' : 'Star message'}
                    >
                      <Star className={`w-4 h-4 ${msg.isStarred ? 'fill-amber-400' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleRead(msg)}
                      className="p-2 rounded-lg bg-charcoal-900 border border-white/5 text-muted-400 hover:text-teal-400 transition-colors"
                      title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      {msg.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMessage(msg)}
                      className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-mono transition-colors"
                    >
                      Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteMessage(msg._id)}
                      className="p-2 rounded-lg bg-charcoal-900 border border-white/5 text-muted-500 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-charcoal-850 border border-teal-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in my-8">
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-charcoal-900 border border-white/10 text-muted-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  selectedMessage.isRead ? 'bg-charcoal-900 text-muted-400' : 'bg-teal-500/20 text-teal-300'
                }`}>
                  {selectedMessage.isRead ? 'Read' : 'New / Unread'}
                </span>
                <span className="text-[11px] font-mono text-muted-400">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {selectedMessage.subject}
              </h3>
              <div className="text-xs text-muted-300 mt-2 font-mono">
                From: <strong className="text-white">{selectedMessage.name}</strong> &lt;{selectedMessage.email}&gt;
              </div>
            </div>

            {/* Message Body */}
            <div className="p-5 rounded-xl bg-charcoal-900/90 border border-white/10 mb-6 text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
              {selectedMessage.message}
            </div>

            {/* Metadata (IP & User Agent) */}
            <div className="p-3 rounded-lg bg-charcoal-900 border border-white/5 text-[11px] font-mono text-muted-500 mb-6 space-y-1">
              <div>IP Address: {selectedMessage.ipAddress || '127.0.0.1'}</div>
              <div className="truncate">Client: {selectedMessage.userAgent || 'Modern Browser'}</div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleRead(selectedMessage)}
                  className="px-3 py-1.5 rounded-lg bg-charcoal-900 border border-white/10 text-xs font-mono text-muted-300 hover:text-teal-300 transition-colors"
                >
                  {selectedMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleStar(selectedMessage)}
                  className="px-3 py-1.5 rounded-lg bg-charcoal-900 border border-white/10 text-xs font-mono text-muted-300 hover:text-amber-400 transition-colors"
                >
                  {selectedMessage.isStarred ? 'Unstar' : 'Star'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                    `Re: ${selectedMessage.subject}`
                  )}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 text-charcoal-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-glow-teal"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

