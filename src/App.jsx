import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import siteData from './siteData.json';
import Gym3DCanvas from './components/Gym3DCanvas';
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Star,
  CheckCircle,
  ShieldCheck,
  Award,
  Wrench,
  Search,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Check,
  Zap,
  Users,
  Rotate3d
} from 'lucide-react';

const iconMap = {
  CheckCircle,
  ShieldCheck,
  Clock,
  Award,
  Wrench,
  Search,
  Sparkles,
  Phone,
  Zap,
  Users,
  Rotate3d
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanOrService, setSelectedPlanOrService] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', notes: '' });
  const [heroViewMode, setHeroViewMode] = useState('3d');

  const enableMotion = Boolean(siteData.enable_motion);
  const primaryColor = siteData.theme?.primary_color || '#090d16';
  const accentColor = siteData.theme?.accent_color || '#f59e0b';
  const isDark = siteData.theme?.theme_mode === 'dark';

  const handleOpenModal = (itemTitle = '') => {
    if (itemTitle) {
      setSelectedPlanOrService(itemTitle);
      setFormData(prev => ({ ...prev, service: itemTitle }));
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setModalOpen(false);
      setFormData({ name: '', phone: '', email: '', service: '', notes: '' });
    }, 2500);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans overflow-x-hidden transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. TOP NOTICE / ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">
              {siteData.announcement?.text || `Serving ${siteData.address ? siteData.address.split(',').slice(-2, -1)[0] || 'Tokyo' : 'Tokyo'} & Surrounding Areas`}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-amber-400 font-bold">⚡ Zero Queue Guarantee</span>
            {siteData.phone && (
              <a href={`tel:${siteData.phone}`} className="flex items-center gap-1.5 font-bold text-white hover:text-amber-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Concierge: {siteData.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. STICKY GLASSMORPHISM NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${isDark ? 'bg-slate-950/90 border-slate-800/80' : 'bg-white/95 border-slate-200/80 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            {siteData.logo_url ? (
              <img
                src={siteData.logo_url}
                alt={siteData.business_name}
                className="w-12 h-12 object-contain rounded-xl shadow-md bg-slate-900 p-1 border border-slate-700 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                {siteData.business_name.charAt(0)}
              </div>
            )}
            <div>
              <span className={`font-black text-xl sm:text-2xl tracking-tight block leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {siteData.business_name}
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:block">
                {siteData.tagline}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-400">
            {siteData.pillars?.length > 0 && (
              <a href="#pillars" className="hover:text-white transition-colors">The Standard</a>
            )}
            <a href="#services" className="hover:text-white transition-colors">Protocols</a>
            {siteData.pricing_plans?.length > 0 && (
              <a href="#pricing" className="hover:text-white transition-colors">Tiers</a>
            )}
            {siteData.gallery_images?.length > 0 && (
              <a href="#gallery" className="hover:text-white transition-colors">Sanctuary</a>
            )}
            <a href="#reviews" className="hover:text-white transition-colors">Results</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#hours" className="hover:text-white transition-colors">Location</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleOpenModal()}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-950 shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              style={{ backgroundColor: accentColor }}
            >
              <Calendar className="w-4 h-4" />
              <span>{siteData.call_to_action_text || 'Claim VIP Pass'}</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-6 py-4 space-y-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            {siteData.pillars?.length > 0 && (
              <a href="#pillars" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">The Standard</a>
            )}
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Protocols</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Tiers</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Sanctuary</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Results</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">FAQ</a>
            <a href="#hours" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Location</a>
            <button
              onClick={() => { setMobileMenuOpen(false); handleOpenModal(); }}
              className="w-full text-center py-3 rounded-xl text-slate-950 font-bold mt-3 shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              {siteData.call_to_action_text || 'Claim VIP Pass'}
            </button>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION WITH 3D WEBGL INTERACTIVE CANVAS */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Strategic High-Conversion Copy */}
            <motion.div
              initial={enableMotion ? { opacity: 0, y: 24 } : false}
              animate={enableMotion ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{siteData.hero_badge_text || 'Capped Membership Sanctuary'}</span>
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {siteData.hero_headline}
              </h1>

              <p className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {siteData.hero_description}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-3">
                <button
                  onClick={() => handleOpenModal('Executive Day Pass')}
                  className="px-8 py-4 rounded-xl text-slate-950 font-black text-base shadow-xl hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
                  style={{ backgroundColor: accentColor }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>{siteData.call_to_action_text || 'Claim Executive Pass'}</span>
                </button>
                {siteData.phone && (
                  <a
                    href={`tel:${siteData.phone}`}
                    className={`px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2.5 border ${isDark ? 'bg-slate-900/80 hover:bg-slate-800 text-white border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm'}`}
                  >
                    <Phone className="w-5 h-5 text-amber-400" />
                    <span>Call Concierge</span>
                  </a>
                )}
              </div>

              {/* Trust Proof Badges Bar */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-bold text-slate-400">
                <div className="flex items-center gap-2 text-amber-400">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className={`font-black ml-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    4.9★
                  </span>
                  <span className="text-xs text-slate-400 font-normal">240+ Tokyo Execs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Eleiko Equipment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Capped 350 Members</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Interactive Model & Visual Showcase */}
            <motion.div
              initial={enableMotion ? { opacity: 0, scale: 0.95 } : false}
              animate={enableMotion ? { opacity: 1, scale: 1 } : false}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* 3D / Photo Mode Switcher */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <button
                    onClick={() => setHeroViewMode('3d')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${heroViewMode === '3d' ? 'bg-amber-400 text-slate-950 scale-105' : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'}`}
                  >
                    <Rotate3d className="w-3.5 h-3.5" />
                    <span>3D Interactive Gear</span>
                  </button>
                  <button
                    onClick={() => setHeroViewMode('photo')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${heroViewMode === 'photo' ? 'bg-amber-400 text-slate-950 scale-105' : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Facility Photo</span>
                  </button>
                </div>

                {heroViewMode === '3d' ? (
                  <Gym3DCanvas isDark={isDark} accentColor={accentColor} />
                ) : (
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                    {siteData.hero_image_url ? (
                      <img
                        src={siteData.hero_image_url}
                        alt={siteData.business_name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-amber-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Floating Highlight Pill */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">Minato-ku Sanctuary</span>
                          <span className="text-sm font-bold text-white">{siteData.business_name}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Capped Active</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* INFINITE RUNNING ATHLETIC MARQUEE */}
      {enableMotion && (
        <div className="py-3 bg-amber-400/10 border-y border-amber-400/20 overflow-hidden relative select-none">
          <motion.div
            className="flex gap-8 whitespace-nowrap text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400"
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-6">
                <span>★ CAPPED AT 350 MEMBERS</span>
                <span className="text-slate-600">•</span>
                <span>⚡ 100% ELEIKO &amp; ROGUE GEAR</span>
                <span className="text-slate-600">•</span>
                <span>🛡️ INFRARED &amp; 4°C CRYO LAB</span>
                <span className="text-slate-600">•</span>
                <span>✨ BIOMECHANICAL SCREENING</span>
                <span className="text-slate-600">•</span>
                <span>🏆 24/7 BIOMETRIC SANCTUARY</span>
                <span className="text-slate-600">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      )}

      {/* 4. METRICS & PROOF BAR */}
      {siteData.stats?.length > 0 && (
        <section className={`py-10 border-y ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {siteData.stats.map((st, idx) => (
                <motion.div
                  key={idx}
                  initial={enableMotion ? { opacity: 0, y: 20 } : false}
                  whileInView={enableMotion ? { opacity: 1, y: 0 } : false}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="space-y-1"
                >
                  <div className="text-3xl sm:text-4xl font-black text-amber-400">{st.number}</div>
                  <div className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{st.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. THE APEX STANDARD: 4 CORE PERFORMANCE PILLARS */}
      {siteData.pillars?.length > 0 && (
        <section id="pillars" className="py-20 lg:py-24 border-b border-slate-800/80 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-400/20">
                The Apex Standard
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Engineered For Frictionless Performance
              </h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Four non-negotiable architectural pillars that distinguish Tokyo Apex from conventional commercial gyms.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteData.pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={enableMotion ? { opacity: 0, y: 24 } : false}
                  whileInView={enableMotion ? { opacity: 1, y: 0 } : false}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={enableMotion ? { y: -6 } : {}}
                  className={`p-6 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${isDark ? 'bg-slate-900/70 border-slate-800 hover:border-amber-400/40 hover:bg-slate-900' : 'bg-white border-slate-200 shadow-sm hover:border-amber-400/40'}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-amber-400/40 group-hover:text-amber-400 transition-colors font-mono">
                        {pillar.step}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-amber-400/60 group-hover:bg-amber-400 transition-colors" />
                    </div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {pillar.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-amber-400/80">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Apex Standard Verified</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. SPECIALIZED ATHLETIC PROTOCOLS */}
      <section id="services" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
              Specialized Protocols
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              What We Do Best
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every protocol is calibrated with sports science, Eleiko Olympic equipment, and certified master coaches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.services?.map((svc, idx) => {
              const IconComp = iconMap[svc.icon_name] || CheckCircle;
              return (
                <motion.div
                  key={idx}
                  initial={enableMotion ? { opacity: 0, y: 30 } : false}
                  whileInView={enableMotion ? { opacity: 1, y: 0 } : false}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={enableMotion ? { y: -8, transition: { duration: 0.2 } } : {}}
                  className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col hover:shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-md hover:border-slate-300'}`}
                >
                  {/* Protocol Photo */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-slate-800">
                    {svc.image_url ? (
                      <img
                        src={svc.image_url}
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800">
                        <IconComp className="w-10 h-10 text-slate-500" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 flex items-center justify-center shadow-md">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className={`text-lg font-bold group-hover:text-amber-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {svc.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {svc.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenModal(svc.title)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-slate-950"
                    >
                      <span>Inquire Protocol</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENT MEMBERSHIP TIERS */}
      {siteData.pricing_plans?.length > 0 && (
        <section id="pricing" className={`py-20 lg:py-28 ${isDark ? 'bg-slate-900/40' : 'bg-slate-100/70'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
                Capped Allocations
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Transparent Membership Tiers
              </h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Zero long-term contracts. Strict floor density guarantees an uncrowded sanctuary.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {siteData.pricing_plans.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={enableMotion ? { opacity: 0, scale: 0.95 } : false}
                  whileInView={enableMotion ? { opacity: 1, scale: 1 } : false}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={enableMotion ? { scale: p.popular ? 1.05 : 1.02, transition: { duration: 0.2 } } : {}}
                  className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${p.popular ? 'border-2 border-amber-400 shadow-2xl scale-105 z-10' : 'border'} ${isDark ? (p.popular ? 'bg-slate-900' : 'bg-slate-950 border-slate-800') : (p.popular ? 'bg-white' : 'bg-white border-slate-200 shadow-md')}`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md whitespace-nowrap">
                      ★ Most Popular • Capped Tier
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>{p.name}</h3>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.description}</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-4xl sm:text-5xl font-black text-amber-400">{p.price}</span>
                      <span className={`text-xs ml-2 font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/{p.period}</span>
                    </div>

                    <ul className="space-y-3 pt-4 border-t border-slate-800">
                      {p.features?.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-sm">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => handleOpenModal(`${p.name} (${p.price})`)}
                      className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-md ${p.popular ? 'bg-amber-400 text-slate-950 hover:opacity-95 hover:scale-102' : (isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800')}`}
                    >
                      {p.cta_text || 'Select Tier'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FACILITY SHOWCASE */}
      {siteData.gallery_images?.length > 0 && (
        <section id="gallery" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
                Inside The Sanctuary
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Precision Architecture &amp; Rigging
              </h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Meticulously designed training floor, Eleiko competition zones, and restorative recovery suites.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {siteData.gallery_images.map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  initial={enableMotion ? { opacity: 0, scale: 0.9 } : false}
                  whileInView={enableMotion ? { opacity: 1, scale: 1 } : false}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-2xl overflow-hidden aspect-square relative group bg-slate-900 shadow-md"
                >
                  <img
                    src={imgUrl}
                    alt={`Facility ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-bold text-white">Minato Sanctuary Floor</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. TESTIMONIALS / VERIFIED REVIEWS */}
      <section id="reviews" className={`py-20 lg:py-28 ${isDark ? 'bg-slate-900/40' : 'bg-slate-100/70'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
              Executive Results
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Trusted By Driven Leaders
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Authentic feedback from Tokyo founders, executives, and elite athletes who refuse standard commercial compromises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {siteData.testimonials?.map((t, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border flex flex-col justify-between space-y-6 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-950'}`}>{t.author}</span>
                      <span className="text-xs text-slate-400 block">{t.role || 'Apex Member'}</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold shrink-0">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. OBJECTION-HANDLING FAQ */}
      {siteData.faqs?.length > 0 && (
        <section id="faq" className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
                Direct Answers
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Frequently Asked Questions
              </h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Clear, upfront answers on membership limits, coaching credentials, and access.
              </p>
            </div>

            <div className="space-y-4">
              {siteData.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <div className={`px-6 pb-6 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. HOURS & LOCATION MAP */}
      <section id="hours" className={`py-20 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 text-white border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Sanctuary Hours &amp; Access</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white">24/7 Biometric Access</h3>
              <ul className="space-y-3 pt-2">
                {siteData.business_hours?.map((h, idx) => (
                  <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-sm">
                    <span className="text-slate-300">{h.split(':')[0]}</span>
                    <span className="font-bold text-white">{h.includes(':') ? h.split(':').slice(1).join(':') : h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center space-y-6 shadow-2xl">
              <MapPin className="w-12 h-12 text-amber-400 mx-auto" />
              <h4 className="text-2xl font-black text-white">Minato-ku Sanctuary</h4>
              <p className="text-slate-300 text-sm max-w-sm mx-auto">{siteData.address || '512 Parkview Blvd, Minato-ku, Tokyo'}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {siteData.phone && (
                  <a
                    href={`tel:${siteData.phone}`}
                    className="px-6 py-3.5 rounded-xl font-bold text-sm bg-amber-400 text-slate-950 hover:opacity-95 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Concierge</span>
                  </a>
                )}
                <button
                  onClick={() => handleOpenModal('Facility Walkthrough')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Request Tour</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. HIGH-IMPACT PRE-FOOTER CTA STRIP */}
      <section className="py-20 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-blue-500/10 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strict Floor Density • 14 Allocations Left</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {siteData.cta_banner?.headline || "Ready to Train Without Compromise?"}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {siteData.cta_banner?.subheadline || "Experience Tokyo's most exclusive athletic performance floor and cellular recovery lab."}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleOpenModal('Executive Pass')}
              className="px-8 py-4 rounded-xl bg-amber-400 text-slate-950 font-black text-base shadow-2xl hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>{siteData.cta_banner?.cta_text || "Claim Your Executive Pass"}</span>
            </button>
            {siteData.phone && (
              <a
                href={`tel:${siteData.phone}`}
                className="px-8 py-4 rounded-xl font-bold text-base bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call Concierge {siteData.phone}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 13. RICH FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800/80 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-800 text-center sm:text-left">
            <div className="flex items-center gap-3">
              {siteData.logo_url && (
                <img
                  src={siteData.logo_url}
                  alt={siteData.business_name}
                  className="w-12 h-12 object-contain rounded-xl shadow-lg bg-slate-900 p-1 border border-slate-700"
                />
              )}
              <div>
                <span className="font-black text-lg text-white block">
                  {siteData.business_name}
                </span>
                <span className="text-xs text-slate-400">
                  {siteData.footer?.description || siteData.tagline}
                </span>
              </div>
            </div>
            {siteData.phone && (
              <a
                href={`tel:${siteData.phone}`}
                className="text-white hover:text-amber-400 font-bold transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Concierge: {siteData.phone}</span>
              </a>
            )}
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {siteData.business_name}. All rights reserved.</span>
            <span>Agency Grade Athletic Architecture.</span>
          </div>
        </div>
      </footer>

      {/* 14. INTERACTIVE BOOKING MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={enableMotion ? { opacity: 0 } : false}
            animate={enableMotion ? { opacity: 1 } : false}
            exit={enableMotion ? { opacity: 0 } : false}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={enableMotion ? { scale: 0.9, opacity: 0, y: 20 } : false}
              animate={enableMotion ? { scale: 1, opacity: 1, y: 0 } : false}
              exit={enableMotion ? { scale: 0.9, opacity: 0, y: 20 } : false}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-900 border border-slate-700 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 mb-6">
                <h3 className="text-2xl font-black">Request Executive Allocation</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {selectedPlanOrService ? `Selected: ${selectedPlanOrService}` : 'Leave your details to schedule your movement screen or private tour.'}
                </p>
              </div>

              {contactSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white">Application Received</h4>
                  <p className="text-sm text-slate-300">The Tokyo Apex concierge team will contact you within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Kenji Sato"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+81 90-0000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Selected Allocation / Tier</label>
                    <input
                      type="text"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      placeholder="e.g. All-Access Apex Pro ($149/mo)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Training Background or Preferences</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g., Olympic lifting focus, joint rehabilitation, recovery lounge inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider hover:opacity-95 shadow-xl mt-4"
                  >
                    Submit Allocation Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
