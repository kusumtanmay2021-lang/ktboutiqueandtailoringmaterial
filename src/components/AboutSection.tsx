/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, Scissors, Clock, MapPin } from 'lucide-react';
import { IMAGES, CONTACT_INFO } from '../data';

export default function AboutSection() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Premium Quality Fabrics',
      description: 'We source only genuine silk, pure Jaipur cottons, and high-tensile threads from trustworthy suppliers.',
    },
    {
      icon: Scissors,
      title: 'Flawless Master Cutting',
      description: 'Our in-house master tailors have decades of experience shaping fabric to compliment your specific silhouette.',
    },
    {
      icon: Clock,
      title: 'On-Time Stitching',
      description: 'We respect your special occasions. Your custom blouse, suit, or lehenga is always ready for trails on schedule.',
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'From neck design suggestions to embroidery color-matching, we handle every detail with extreme love.',
    },
  ];

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-white dark:bg-charcoal-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-2">Our Story</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 dark:text-white">
            K.T Tailoring Material And Boutique
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Visual Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-maroon-900/10 to-transparent rounded-2xl" />
            <img
              src={IMAGES.fabricsCat}
              alt="Premium fabrics rolls showcase"
              referrerPolicy="no-referrer"
              className="rounded-2xl shadow-xl w-full h-[450px] object-cover border border-gold-500/10"
            />
            {/* Overlay card */}
            <div className="absolute -bottom-6 -right-6 bg-maroon-700 dark:bg-maroon-900 text-white p-6 rounded-xl shadow-lg max-w-xs border border-gold-500/30 hidden sm:block">
              <Sparkles className="w-8 h-8 text-gold-400 mb-3" />
              <p className="font-serif font-semibold text-lg">"Everything you need for perfect stitching under one local roof."</p>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-maroon-700 dark:text-gold-400">
              Where Fabric Meets Master Craftsmanship
            </h3>
            
            <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed font-light">
              Located in the heart of Nyay Khand, Indirapuram, <strong>K.T Tailoring Material And Boutique</strong> is born out of a passion for fine clothing and impeccable fits. We believe that every stitch tells a story, and every fabric should reflect the unique persona of its wearer.
            </p>

            <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed font-light">
              We started with a simple mission: to bridge the gap between premium unstitched fabrics, exquisite lace embellishments, and professional bespoke tailoring services. Whether you are searching for high-quality Vardhman sewing threads and YKK zippers, or looking for a customized, masterfully padded blouse for your next celebration, we cater to all your design needs.
            </p>

            {/* Mission / Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-charcoal-50 dark:bg-charcoal-900 rounded-xl border border-gold-500/10">
                <h4 className="font-serif font-bold text-maroon-700 dark:text-gold-400 mb-1">Our Mission</h4>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-400">To deliver high-end bespoke garments and premium stitching materials that empower confidence and showcase individual elegance.</p>
              </div>
              <div className="p-4 bg-charcoal-50 dark:bg-charcoal-900 rounded-xl border border-gold-500/10">
                <h4 className="font-serif font-bold text-maroon-700 dark:text-gold-400 mb-1">Our Vision</h4>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-400">To become Indirapuram's premier luxury fashion destination, respected for authentic traditional embroidery and top-tier fitting standards.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="border-t border-charcoal-200 dark:border-charcoal-800 pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-white">Our Core Values</h3>
            <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-2">The four pillars of excellence that guide our boutique and workshop team daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-charcoal-50 dark:bg-charcoal-900 border border-gold-500/5 hover:border-gold-500/20 transition-all duration-300 hover:shadow-md text-center"
                >
                  <div className="w-12 h-12 bg-maroon-700/5 dark:bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/15">
                    <Icon className="w-5 h-5 text-maroon-700 dark:text-gold-400" />
                  </div>
                  <h4 className="font-serif font-bold text-charcoal-900 dark:text-white mb-2">{val.title}</h4>
                  <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-light">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location Short CTA */}
        <div className="mt-16 bg-gradient-to-r from-maroon-800 to-maroon-950 text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-gold-500/25">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h4 className="text-2xl font-serif font-bold text-gold-400 mb-3">Visit Us In Person</h4>
            <p className="text-sm text-charcoal-200 mb-6 leading-relaxed font-light">
              We are located at <strong>{CONTACT_INFO.address}</strong>. Come explore our fabrics, feel the quality, and sit with our design masters to turn your dream outfit into reality!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full text-xs font-medium border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Indirapuram, Ghaziabad</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full text-xs font-medium border border-white/15">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Open All Days</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
