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
  X
} from 'lucide-react';

const iconMap = {
  CheckCircle,
  ShieldCheck,
  Clock,
  Award,
  Wrench,
  Search,
  Sparkles,
  Phone
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', notes: '' });

  const primaryColor = siteData.theme?.primary_color || '#2563eb';

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Serving {siteData.address ? siteData.address.split(',').slice(-2, -1)[0] || 'your community' : 'your community'} & Surrounding Areas</span>
          </div>
          {siteData.phone && (
            <a href={`tel:${siteData.phone}`} className="flex items-center gap-1.5 font-semibold text-white hover:underline">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteData.phone}</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteData.logo_url ? (
              <img
                src={siteData.logo_url}
                alt={siteData.business_name}
                className="w-12 h-12 object-contain rounded-xl shadow-md bg-slate-900 p-1"
              />
            ) : (
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                {siteData.business_name.charAt(0)}
              </div>
            )}
            <div>
              <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight block leading-tight">
                {siteData.business_name}
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                {siteData.tagline}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
            <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#reviews" className="hover:text-slate-900 transition-colors">Reviews</a>
            <a href="#hours" className="hover:text-slate-900 transition-colors">Hours & Info</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            {siteData.phone && (
              <a
                href={`tel:${siteData.phone}`}
                className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold text-slate-700">Services</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold text-slate-700">About</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold text-slate-700">Reviews</a>
            <a href="#hours" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-semibold text-slate-700">Hours</a>
            {siteData.phone && (
              <a
                href={`tel:${siteData.phone}`}
                className="block text-center py-2.5 rounded-lg text-white font-semibold mt-4"
                style={{ backgroundColor: primaryColor }}
              >
                Call {siteData.phone}
              </a>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white to-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Local Professional</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {siteData.hero_headline}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {siteData.hero_description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                {siteData.phone && (
                  <a
                    href={`tel:${siteData.phone}`}
                    className="px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2.5"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call {siteData.phone}</span>
                  </a>
                )}
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-xl bg-white border-2 border-slate-300 text-slate-800 font-bold text-base hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{siteData.call_to_action_text}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-slate-600">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-900 font-bold ml-1">5.0 Star Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Licensed & Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Hero Quick Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200" id="contact">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request an Estimate</h3>
                <p className="text-sm text-slate-500 mb-6">Leave your details and we will reach back promptly.</p>

                {contactSubmitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-lg font-bold text-emerald-900">Thank You!</h4>
                    <p className="text-sm text-emerald-700">We have received your request and will call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Service Needed</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="">Select a service...</option>
                        {siteData.services.map((s, idx) => (
                          <option key={idx} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Brief Description</label>
                      <textarea
                        rows="2"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 transition-all"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Submit Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-blue-600">Our Expertise</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Services We Offer</h3>
            <p className="text-slate-600 text-base">Dependable craftmanship and tailored solutions designed to meet your highest expectations.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.services.map((service, idx) => {
              const IconComp = iconMap[service.icon_name] || CheckCircle;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 leading-snug">{service.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us & About */}
      <section id="about" className="py-20 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Why Work With Us</span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Dedicated to Unmatched Quality & Customer Satisfaction
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {siteData.about_text}
              </p>

              <div className="space-y-3 pt-2">
                {siteData.why_choose_us.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-800 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Info Box */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
              <h4 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Business Information</h4>
              {siteData.address && (
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="block font-semibold text-sm text-slate-900">Physical Address</span>
                    <span className="text-sm">{siteData.address}</span>
                  </div>
                </div>
              )}
              {siteData.phone && (
                <div className="flex items-start gap-3 text-slate-700">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="block font-semibold text-sm text-slate-900">Direct Contact</span>
                    <a href={`tel:${siteData.phone}`} className="text-sm hover:underline font-medium text-blue-600">
                      {siteData.phone}
                    </a>
                  </div>
                </div>
              )}
              {siteData.email && (
                <div className="flex items-start gap-3 text-slate-700">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="block font-semibold text-sm text-slate-900">Email Address</span>
                    <a href={`mailto:${siteData.email}`} className="text-sm hover:underline text-slate-700">
                      {siteData.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-blue-600">Social Proof</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What Our Clients Say</h3>
            <p className="text-slate-600 text-base">Real experiences from local customers who count on us.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.testimonials.map((t, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">"{t.comment}"</p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{t.author}</span>
                  <span className="text-xs text-emerald-600 font-semibold">Verified Review</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location Section */}
      <section id="hours" className="py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <h3 className="text-3xl font-extrabold">When We Are Open</h3>
              <ul className="space-y-2.5 text-slate-300 text-sm pt-2">
                {siteData.business_hours.map((h, idx) => (
                  <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span>{h.split(':')[0]}</span>
                    <span className="font-semibold text-white">{h.includes(':') ? h.split(':').slice(1).join(':') : h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-6">
              <MapPin className="w-10 h-10 text-blue-400 mx-auto" />
              <h4 className="text-2xl font-bold">Visit or Call Us</h4>
              <p className="text-slate-300 text-sm">{siteData.address || 'Serving the broader metropolitan area'}</p>
              {siteData.phone && (
                <a
                  href={`tel:${siteData.phone}`}
                  className="inline-block px-8 py-3.5 rounded-xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  Call {siteData.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-800 text-center sm:text-left">
            <div className="flex items-center gap-3">
              {(siteData.footer?.logo_url || siteData.logo_url) && (
                <img
                  src={siteData.footer?.logo_url || siteData.logo_url}
                  alt={siteData.business_name}
                  className="w-12 h-12 object-contain rounded-xl shadow-lg bg-slate-900 p-1"
                />
              )}
              <div>
                <span className="font-bold text-lg text-white block">
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
                className="text-white hover:text-emerald-400 font-semibold transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{siteData.phone}</span>
              </a>
            )}
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {siteData.business_name}. All rights reserved.</span>
            <span>Premium Performance &amp; Web Standards.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
