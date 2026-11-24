import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin, setupInitialAdmin, getToken } from '../services/api';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2,
  KeyRound,
  Home
} from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // If already logged in, offer quick jump to dashboard
  const hasExistingToken = Boolean(getToken());

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      await loginAdmin({
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      });
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      await setupInitialAdmin({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage('Admin account initialized successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Setup failed. Admin may already exist.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center bg-radial-vignette">
      <div className="w-full max-w-md">
        
        {/* Top Logo / Shield Card */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 mx-auto flex items-center justify-center mb-4 shadow-glow-teal">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isSetupMode ? 'Initial Admin Setup' : 'Admin Portal Login'}
          </h1>
          <p className="text-xs sm:text-sm text-muted-400 mt-2 font-mono">
            {isSetupMode
              ? 'Configure master credentials for Khan Sher portfolio management'
              : 'Secure credentials required to view and manage inquiries'}
          </p>
        </div>

        {/* Existing Session Alert */}
        {hasExistingToken && (
          <div className="mb-6 p-4 rounded-xl bg-charcoal-850 border border-teal-500/30 flex items-center justify-between text-xs">
            <span className="text-slate-200">You have an active session.</span>
            <Link
              to="/admin/dashboard"
              className="px-3 py-1.5 rounded-lg bg-teal-500 text-charcoal-950 font-bold hover:bg-teal-400 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 animate-fade-in text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3 animate-fade-in text-xs text-teal-300">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>{successMessage}</div>
          </div>
        )}

        {/* Form Container */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          
          {!isSetupMode ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted-300 mb-1.5">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.usernameOrEmail}
                    onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
                    placeholder="admin or khansher68u@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white placeholder-muted-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white placeholder-muted-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-teal-500 text-charcoal-950 font-bold text-xs hover:bg-teal-400 transition-all duration-200 shadow-glow-teal hover:shadow-glow-teal-strong flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate & Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Setup Form */
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted-300 mb-1.5">
                  Desired Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="e.g. khansher"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white placeholder-muted-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-300 mb-1.5">
                  Notification & Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="khansher68u@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white placeholder-muted-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-300 mb-1.5">
                  Master Password (min 6 chars)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white placeholder-muted-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-teal-500 text-charcoal-950 font-bold text-xs hover:bg-teal-400 transition-all duration-200 shadow-glow-teal hover:shadow-glow-teal-strong flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <span>Initializing Account...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Create Initial Master Admin</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Mode Switcher */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setIsSetupMode(!isSetupMode);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              {isSetupMode ? '← Back to Login' : 'Need initial setup? Initialize Admin →'}
            </button>

            <Link
              to="/"
              className="text-muted-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

