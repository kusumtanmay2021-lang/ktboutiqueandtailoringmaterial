/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Scissors, Sparkles, MapPin, PhoneCall, ChevronRight } from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../data';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <section id="hero-section" className="relative bg-white dark:bg-charcoal-950 overflow-hidden">
      {/* Visual Canvas Backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/95 via-maroon-950/85 to-charcoal-900/40 z-10" />
        <img
          src={IMAGES.hero}
          alt="Luxury Tailoring Atelier Storefront"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105"
        />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-36">
        <div className="max-w-2xl text-left">
          
          {/* Animated Premium Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 backdrop-blur-md rounded-full border border-gold-500/35 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>ESTD 2026 • Premier Fashion Studio</span>
          </motion.div>

          {/* Luxury Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.1] tracking-tight"
          >
            Crafting Elegance, <br />
            <span className="text-gold-400 relative inline-block">
              Perfecting Stitching.
              <span className="absolute bottom-0.5 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-transparent rounded-full" />
            </span>
          </motion.h2>

          {/* Supporting Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-charcoal-200 mt-6 leading-relaxed max-w-xl font-light"
          >
            Everything you need for perfect tailoring. Discover our handpicked catalog of premium suit materials, Jaipuri cottons, borders, laces, and designer accessories, paired with our master-tailored bespoke stitching services in Indirapuram.
          </motion.p>

          {/* Action Call to Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button
              id="hero-explore-products-btn"
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-white font-medium rounded-xl shadow-lg shadow-maroon-950/50 hover:shadow-maroon-950/70 border border-gold-500/20 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Scissors className="w-4.5 h-4.5 text-gold-400" />
              <span>Explore Materials</span>
              <ChevronRight className="w-4 h-4 text-gold-300" />
            </button>

            <button
              id="hero-contact-consultation-btn"
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:border-white/40 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PhoneCall className="w-4.5 h-4.5 text-gold-400" />
              <span>Book Appointment</span>
            </button>
          </motion.div>

          {/* Live Address Short Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-2 text-charcoal-300 text-xs mt-8 font-light"
          >
            <MapPin className="w-4.5 h-4.5 text-gold-400 shrink-0" />
            <span>Visit Us: {CONTACT_INFO.addressShort} (Opp. Shipra Mall Area)</span>
          </motion.div>

        </div>
      </div>

      {/* Feature Badges Banner */}
      <div className="bg-charcoal-50 dark:bg-charcoal-900 border-y border-gold-500/10 py-8 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-maroon-700 dark:text-gold-400">100%</span>
              <span className="text-xs uppercase tracking-wider text-charcoal-500 dark:text-charcoal-300 font-semibold mt-1">Pure Fabrics</span>
            </div>

            <div className="flex flex-col items-center border-l border-charcoal-200 dark:border-charcoal-800">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-maroon-700 dark:text-gold-400">Custom</span>
              <span className="text-xs uppercase tracking-wider text-charcoal-500 dark:text-charcoal-300 font-semibold mt-1">Tailor Designs</span>
            </div>

            <div className="flex flex-col items-center border-l border-charcoal-200 dark:border-charcoal-800">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-maroon-700 dark:text-gold-400">Express</span>
              <span className="text-xs uppercase tracking-wider text-charcoal-500 dark:text-charcoal-300 font-semibold mt-1">24Hr Fall/Pico</span>
            </div>

            <div className="flex flex-col items-center border-l border-charcoal-200 dark:border-charcoal-800">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-maroon-700 dark:text-gold-400">5-Star</span>
              <span className="text-xs uppercase tracking-wider text-charcoal-500 dark:text-charcoal-300 font-semibold mt-1">Fitting Guarantee</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
