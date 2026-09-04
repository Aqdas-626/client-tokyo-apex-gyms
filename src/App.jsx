import React, { useState } from 'react';
import siteData from './siteData.json';
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
  Users
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
  Users
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanOrService, setSelectedPlanOrService] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', notes: '' });

  const primaryColor = siteData.theme?.primary_color || '#0f172a';
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
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. TOP NOTICE / ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Serving {siteData.address ? siteData.address.split(',').slice(-2, -1)[0] || 'Local Community' : 'Local Community'} & Surrounding Areas</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-slate-400">⚡ Fast Scheduling &amp; Transparent Pricing</span>
            {siteData.phone && (
              <a href={`tel:${siteData.phone}`} className="flex items-center gap-1.5 font-bold text-white hover:text-amber-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{siteData.phone}</span>
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
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            {siteData.pricing_plans?.length > 0 && (
              <a href="#pricing" className="hover:text-white transition-colors">Plans &amp; Pricing</a>
            )}
            {siteData.gallery_images?.length > 0 && (
              <a href="#gallery" className="hover:text-white transition-colors">Facility &amp; Work</a>
            )}
            <a href="#reviews" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#hours" className="hover:text-white transition-colors">Hours</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleOpenModal()}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-950 shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              style={{ backgroundColor: accentColor }}
            >
              <Calendar className="w-4 h-4" />
              <span>{siteData.call_to_action_text || 'Book Now'}</span>
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
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Services</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Pricing</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Testimonials</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">FAQ</a>
            <a href="#hours" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold">Hours</a>
            <button
              onClick={() => { setMobileMenuOpen(false); handleOpenModal(); }}
              className="w-full text-center py-3 rounded-xl text-slate-950 font-bold mt-3 shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              {siteData.call_to_action_text || 'Book Now'}
            </button>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION WITH HIGH-RES IMAGERY */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{siteData.hero_badge_text || 'Top-Rated Local Professional'}</span>
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
                  onClick={() => handleOpenModal()}
                  className="px-8 py-4 rounded-xl text-slate-950 font-black text-base shadow-xl hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
                  style={{ backgroundColor: accentColor }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>{siteData.call_to_action_text || 'Book Appointment'}</span>
                </button>
                {siteData.phone && (
                  <a
                    href={`tel:${siteData.phone}`}
                    className={`px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2.5 border ${isDark ? 'bg-slate-900/80 hover:bg-slate-800 text-white border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm'}`}
                  >
                    <Phone className="w-5 h-5 text-amber-400" />
                    <span>Call {siteData.phone}</span>
                  </a>
                )}
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-bold text-slate-400">
                <div className="flex items-center gap-2 text-amber-400">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className={`font-black ml-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {siteData.testimonials?.length > 0 ? `${siteData.testimonials[0].rating}.0★` : '5.0★'}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">Google Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Certified &amp; Insured</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>100% Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
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
                        <span className="text-xs text-slate-400 block font-medium">Local Excellence</span>
                        <span className="text-sm font-bold text-white">{siteData.business_name}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Open Today</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. METRICS & STATS BAR */}
      {siteData.stats?.length > 0 && (
        <section className={`py-10 border-y ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {siteData.stats.map((st, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-amber-400">{st.number}</div>
                  <div className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. SERVICES GRID WITH PHOTOGRAPHY */}
      <section id="services" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
              Specialized Solutions
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              What We Do Best
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every service is delivered with master craftsmanship, certified equipment, and our complete satisfaction guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.services?.map((svc, idx) => {
              const IconComp = iconMap[svc.icon_name] || CheckCircle;
              return (
                <div
                  key={idx}
                  className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-md hover:border-slate-300'}`}
                >
                  {/* Service Photo */}
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
                      <span>Inquire / Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE PRICING & MEMBERSHIP PLANS */}
      {siteData.pricing_plans?.length > 0 && (
        <section id="pricing" className={`py-20 lg:py-28 ${isDark ? 'bg-slate-900/40' : 'bg-slate-100/70'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
                Transparent Packages
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Simple, Honest Pricing
              </h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Choose the plan that fits your exact goals. No surprise charges or hidden fees.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {siteData.pricing_plans.map((p, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${p.popular ? 'border-2 border-amber-400 shadow-2xl scale-105 z-10' : 'border'} ${isDark ? (p.popular ? 'bg-slate-900' : 'bg-slate-950 border-slate-800') : (p.popular ? 'bg-white' : 'bg-white border-slate-200 shadow-md')}`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
                      ★ Most Popular
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
                      {p.cta_text || 'Get Started'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. VISUAL GALLERY / FACILITY SHOWCASE */}
      {siteData.gallery_images?.length > 0 && (
        <section id="gallery" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
                Visual Showcase
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Inside Our Facility &amp; Craft
              </h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Take a look around our space and see the high standards we bring to every single client.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {siteData.gallery_images.map((imgUrl, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden aspect-square relative group bg-slate-900 shadow-md">
                  <img
                    src={imgUrl}
                    alt={`Showcase ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-bold text-white">Verified Facility</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. TESTIMONIALS / VERIFIED REVIEWS */}
      <section id="reviews" className={`py-20 lg:py-28 ${isDark ? 'bg-slate-900/40' : 'bg-slate-100/70'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
              Client Feedback
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Trusted By Local Residents
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Authentic verified customer reviews from Google and local community members.
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
                    <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-950'}`}>{t.author}</span>
                      <span className="text-xs text-emerald-400 font-semibold">Verified Review</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">Google</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      {siteData.faqs?.length > 0 && (
        <section id="faq" className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider">
                Common Inquiries
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Frequently Asked Questions
              </h2>
              <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Clear, upfront answers to make your decision simple and confident.
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

      {/* 10. HOURS & LOCATION MAP */}
      <section id="hours" className={`py-20 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 text-white border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white">When We Are Available</h3>
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
              <h4 className="text-2xl font-black text-white">Visit or Contact Us</h4>
              <p className="text-slate-300 text-sm max-w-sm mx-auto">{siteData.address || 'Serving the metropolitan area with excellence.'}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {siteData.phone && (
                  <a
                    href={`tel:${siteData.phone}`}
                    className="px-6 py-3.5 rounded-xl font-bold text-sm bg-amber-400 text-slate-950 hover:opacity-95 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {siteData.phone}</span>
                  </a>
                )}
                <button
                  onClick={() => handleOpenModal()}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Request Booking</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. RICH FOOTER */}
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
                <span>{siteData.phone}</span>
              </a>
            )}
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {siteData.business_name}. All rights reserved.</span>
            <span>Agency Grade Web Architecture.</span>
          </div>
        </div>
      </footer>

      {/* 12. INTERACTIVE BOOKING MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <h3 className="text-2xl font-black">Schedule With Us</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {selectedPlanOrService ? `Selected: ${selectedPlanOrService}` : 'Leave your contact details and we will reach back promptly.'}
              </p>
            </div>

            {contactSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">Request Received!</h4>
                <p className="text-sm text-slate-300">We will call or text you shortly to confirm your booking.</p>
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
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Service or Package</label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="Select or type service..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Notes / Preferences</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Preferred time or specific requests..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider hover:opacity-95 shadow-xl mt-4"
                >
                  Submit Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
