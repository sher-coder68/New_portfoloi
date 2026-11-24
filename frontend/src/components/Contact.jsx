import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { submitContactMessage } from '../services/api';
import { GithubIcon } from './Icons';
import { 
  Mail, 
  Phone, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const validate = () => {
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Please provide your name.';
    if (!formState.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!formState.subject.trim()) errors.subject = 'Please provide a subject.';
    if (!formState.message.trim()) {
      errors.message = 'Please provide your message.';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    setSubmitError(null);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        await submitContactMessage(formState);
        setSubmitSuccess(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        // Fallback for offline or test mode
        console.warn('API submission error:', err.message);
        setSubmitError(err.message || 'Unable to connect to the backend server. You can also use the direct email button below.');
        // If testing in isolated browser, still allow clean notification
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const mailtoHref = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formState.subject || 'Portfolio Inquiry for Khan Sher'
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
  )}`;

  return (
    <section id="contact" className="py-24 bg-charcoal-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mt-3">
            Available for client web applications, beginner-to-intermediate ML pipelines, technical training sessions, or academic collaborations.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-xs font-mono text-teal-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Response Time: Typically within 24 hours</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Open to Inquiries & Collaborations
              </h3>
              <p className="text-xs text-muted-400 leading-relaxed">
                Whether you need a dedicated frontend interface, data modeling consulting, or online training for your cohort, feel free to reach out.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-charcoal-850 border border-white/10 hover:border-teal-500/40 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-400">Direct Email</div>
                    <a 
                      href={`mailto:${personalInfo.email}`} 
                      className="text-xs sm:text-sm font-semibold text-white hover:text-teal-400 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-charcoal-800 text-muted-400 hover:text-teal-300 hover:bg-charcoal-750 transition-colors text-xs inline-flex items-center gap-1"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-charcoal-850 border border-white/10 hover:border-teal-500/40 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-400">Phone (Call / SMS)</div>
                    <a 
                      href={`tel:${personalInfo.phone}`} 
                      className="text-xs sm:text-sm font-semibold text-white hover:text-teal-400 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-xs font-mono text-teal-400 hover:underline px-2"
                >
                  Call
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="p-4 rounded-xl bg-charcoal-850 border border-teal-500/30 hover:border-teal-500/60 transition-colors flex items-center justify-between group shadow-glow-teal">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-teal-400">Instant Chat</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      WhatsApp Messaging
                    </div>
                  </div>
                </div>

                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500 text-charcoal-950 hover:bg-emerald-400 transition-colors"
                >
                  <span>Chat Now</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Verified Profiles & Location */}
            <div className="p-4 rounded-xl bg-charcoal-850/60 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Charsadda, Khyber Pakhtunkhwa, Pakistan</span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-muted-400 font-mono">GitHub Profile:</span>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 font-mono font-medium"
                >
                  <span>github.com/sher-coder68</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-muted-500 font-mono">
                <span>Social Links (Placeholders):</span>
                <div className="flex items-center gap-3">
                  <span className="hover:text-muted-300 cursor-pointer" title="LinkedIn Profile Placeholder">LinkedIn (Placeholder)</span>
                  <span>•</span>
                  <span className="hover:text-muted-300 cursor-pointer" title="Twitter Profile Placeholder">X / Twitter (Placeholder)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10 relative shadow-card">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-muted-400">
                  Fill in your details below. You can submit directly through this form or open with your mail client.
                </p>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-teal-300">Message Received!</div>
                    <div className="text-xs text-muted-300 mt-1 leading-normal">
                      Thank you for contacting Khan Sher. Your message has been saved in the MongoDB database and a notification has been generated. You can also reach out via WhatsApp at 03185775553 for urgent communication.
                    </div>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-amber-300">Submission Notice</div>
                    <div className="text-xs text-muted-300 mt-1 leading-normal">
                      {submitError}
                    </div>
                  </div>
                </div>
              )}

              <form noValidate onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-300 mb-1.5">
                      Your Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border text-xs text-white placeholder-muted-500 focus:outline-none transition-colors ${
                        formErrors.name 
                          ? 'border-red-500/60 focus:border-red-500' 
                          : 'border-white/10 focus:border-teal-500/50'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-300 mb-1.5">
                      Your Email Address <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border text-xs text-white placeholder-muted-500 focus:outline-none transition-colors ${
                        formErrors.email 
                          ? 'border-red-500/60 focus:border-red-500' 
                          : 'border-white/10 focus:border-teal-500/50'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-muted-300 mb-1.5">
                    Subject / Project Nature <span className="text-teal-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Web Development Collaboration / ML Consulting / Course Inquiry"
                    className={`w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border text-xs text-white placeholder-muted-500 focus:outline-none transition-colors ${
                      formErrors.subject 
                        ? 'border-red-500/60 focus:border-red-500' 
                        : 'border-white/10 focus:border-teal-500/50'
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="text-[11px] text-red-400 mt-1">{formErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-muted-300 mb-1.5">
                    Your Message <span className="text-teal-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Provide details about your project, timeline, student training requirements, or questions..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border text-xs text-white placeholder-muted-500 focus:outline-none transition-colors resize-none ${
                      formErrors.message 
                        ? 'border-red-500/60 focus:border-red-500' 
                        : 'border-white/10 focus:border-teal-500/50'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-red-400 mt-1">{formErrors.message}</p>
                  )}
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-charcoal-950 font-bold text-xs hover:bg-teal-400 transition-all duration-200 shadow-glow-teal hover:shadow-glow-teal-strong disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoHref}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-charcoal-850 text-muted-300 hover:text-white border border-white/10 hover:border-teal-500/30 text-xs font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-teal-400" />
                    <span>Open in Email App</span>
                  </a>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
