/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '../data';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    serviceType: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    
    // Email Validation
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }

    // Phone Validation (Indian 10-digit formats roughly)
    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (phoneClean.length < 10) {
      tempErrors.phone = 'Please provide a valid 10-digit phone';
    }

    if (!formData.message.trim()) tempErrors.message = 'Message content is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        serviceType: '',
        message: '',
      });
    }, 1200);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-charcoal-50 dark:bg-charcoal-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-2">Connect With Us</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 dark:text-white">
            Visit Our Boutique or Drop a Message
          </h2>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-2 font-light">
            We are here to assist you with custom blouse stitching, fabric enquiries, and accessories. Feel free to visit or contact us!
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Quick Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Call details card */}
            <div className="bg-white dark:bg-charcoal-850 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-maroon-700 dark:text-gold-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                <span>Contact Details</span>
              </h3>
              
              <div className="space-y-4 pt-2">
                {/* Phones */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-maroon-50 dark:bg-maroon-950/40 rounded-full flex items-center justify-center text-maroon-700 dark:text-gold-400 shrink-0 border border-gold-500/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400 font-semibold uppercase tracking-wider">Phone Numbers</p>
                    <div className="flex flex-col gap-1 mt-1 text-sm text-charcoal-800 dark:text-white">
                      <a href={`tel:${CONTACT_INFO.phones[0].number}`} className="hover:text-maroon-700 dark:hover:text-gold-400 font-medium transition-colors">
                        {CONTACT_INFO.phones[0].display}
                      </a>
                      <a href={`tel:${CONTACT_INFO.phones[1].number}`} className="hover:text-maroon-700 dark:hover:text-gold-400 font-medium transition-colors">
                        {CONTACT_INFO.phones[1].display}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-maroon-50 dark:bg-maroon-950/40 rounded-full flex items-center justify-center text-maroon-700 dark:text-gold-400 shrink-0 border border-gold-500/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400 font-semibold uppercase tracking-wider">Email Address</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-charcoal-800 dark:text-white font-medium hover:text-maroon-700 dark:hover:text-gold-400 block mt-1 break-all transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-maroon-50 dark:bg-maroon-950/40 rounded-full flex items-center justify-center text-maroon-700 dark:text-gold-400 shrink-0 border border-gold-500/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400 font-semibold uppercase tracking-wider">Boutique Address</p>
                    <p className="text-xs sm:text-sm text-charcoal-800 dark:text-white font-medium leading-relaxed mt-1">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Details Card */}
            <div className="bg-white dark:bg-charcoal-850 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-maroon-700 dark:text-gold-400 flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gold-500" />
                <span>Working Hours</span>
              </h3>
              <div className="space-y-2 text-xs text-charcoal-700 dark:text-charcoal-300">
                {CONTACT_INFO.hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-charcoal-100 dark:border-charcoal-800 last:border-0">
                    <span className="font-medium text-charcoal-900 dark:text-white">{item.days}</span>
                    <span className="text-charcoal-500 dark:text-charcoal-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-charcoal-850 p-6 sm:p-8 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-charcoal-900 dark:text-white mb-2">Send us a Message</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mb-6 font-light">
              Fill out the details below. Our boutique manager will get in touch with you shortly.
            </p>

            {isSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-8 text-center space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-500">Thank You! Message Received</h4>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-light max-w-sm mx-auto">
                  Your enquiry has been successfully compiled. We will review your styling/materials request and reply via email or phone within 24 hours.
                </p>
                <button
                  id="reset-contact-form-btn"
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full p-2.5 rounded-lg border text-xs bg-charcoal-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent ${
                        errors.name ? 'border-rose-500' : 'border-charcoal-200 dark:border-charcoal-700'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@gmail.com"
                      className={`w-full p-2.5 rounded-lg border text-xs bg-charcoal-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent ${
                        errors.email ? 'border-rose-500' : 'border-charcoal-200 dark:border-charcoal-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Service Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 99992 96247"
                      className={`w-full p-2.5 rounded-lg border text-xs bg-charcoal-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent ${
                        errors.phone ? 'border-rose-500' : 'border-charcoal-200 dark:border-charcoal-700'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Service Type Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">Select Service Interest (Optional)</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 text-xs bg-charcoal-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent"
                    >
                      <option value="">-- Choose Option --</option>
                      <option value="stitching">Bespoke Salwar/Lehenga Stitching</option>
                      <option value="blouse">Custom Designer Blouse Stitching</option>
                      <option value="fabric">Suit Materials & Fabrics Purchase</option>
                      <option value="laces">Laces, Borders, & Embellishments</option>
                      <option value="alterations">Alterations & Saree Fall Pico</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Enquiry about Silk Fabric patterns"
                    className="w-full p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 text-xs bg-charcoal-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">Your Message *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type details about fabric quantity, specific design details, neck styles..."
                    className={`w-full p-2.5 rounded-lg border text-xs bg-charcoal-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent ${
                      errors.message ? 'border-rose-500' : 'border-charcoal-200 dark:border-charcoal-700'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 dark:from-gold-500 dark:to-gold-600 text-white dark:text-charcoal-950 font-semibold rounded-lg text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Message'}</span>
                </button>

              </form>
            )}
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="bg-white dark:bg-charcoal-850 p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif font-bold text-base text-charcoal-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-gold-500" />
                <span>Our Physical Location</span>
              </h3>
              <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400 font-light mt-0.5">
                We are situated at Nyay Khand 1, close to central transit routes in Indirapuram, Ghaziabad.
              </p>
            </div>
            
            <a
              id="google-maps-navigation-link"
              href="https://maps.google.com/?q=750-G,+Nyay+Khand+1,+Indirapuram,+Ghaziabad,+Uttar+Pradesh+201014"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-gold-400 hover:bg-maroon-50 dark:hover:bg-charcoal-700 text-xs font-semibold rounded-lg border border-gold-500/10 transition-all flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Iframe with Maps Embed */}
          <div className="h-[380px] rounded-xl overflow-hidden border border-charcoal-200 dark:border-charcoal-800">
            <iframe
              title="K.T Boutique Location Map"
              src={CONTACT_INFO.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
