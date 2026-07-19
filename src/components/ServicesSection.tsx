/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, Layers, TrendingUp, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { SERVICES, CONTACT_INFO } from '../data';

interface ServicesSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function ServicesSection({ setActiveTab }: ServicesSectionProps) {
  // Map string icon names to Lucide Icon components
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Scissors,
    Sparkles,
    Layers,
    TrendingUp,
    MessageSquare,
  };

  const handleBookService = (service: Service) => {
    const text = `Hello K.T Boutique! I want to book/enquire about your stitching service:

*${service.title}*
Starting Price: ${service.priceStart}

Please let me know how I can submit my measurements or fabric. Thank you!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919999296247?text=${encodedText}`, '_blank');
  };

  return (
    <section id="services-section" className="py-16 sm:py-24 bg-white dark:bg-charcoal-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-2">Our Services</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 dark:text-white">
            Bespoke Tailoring & Styling Services
          </h2>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-2 font-light">
            Crafted with ultimate precision. Experience custom-fit garments tailored specifically for your body and fashion tastes.
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Scissors;

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-charcoal-50 dark:bg-charcoal-900 rounded-2xl overflow-hidden border border-gold-500/5 hover:border-gold-500/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Visual Thumbnail */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Icon badge */}
                  <div className="absolute top-4 right-4 bg-maroon-700 dark:bg-gold-500 text-white dark:text-charcoal-950 p-3 rounded-xl shadow-lg border border-gold-500/20">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {/* Backdrop Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
                  
                  {/* Title overlay */}
                  <h3 className="absolute bottom-4 left-4 font-serif font-bold text-lg text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Details Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-charcoal-600 dark:text-charcoal-400 font-light leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-charcoal-700 dark:text-charcoal-300">
                          <Check className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action Link */}
                  <div className="pt-4 border-t border-charcoal-200 dark:border-charcoal-850 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-charcoal-400 font-semibold leading-none">Starting From</span>
                      <span className="text-sm font-serif font-bold text-maroon-700 dark:text-gold-400 mt-1">
                        {service.priceStart}
                      </span>
                    </div>

                    <button
                      id={`book-service-btn-${service.id}`}
                      onClick={() => handleBookService(service)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-maroon-700 dark:text-gold-400 hover:text-maroon-800 dark:hover:text-gold-300 transition-colors group/btn cursor-pointer"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Consultation Notice banner */}
        <div className="mt-16 bg-gradient-to-r from-gold-500/5 to-maroon-700/5 rounded-2xl border border-gold-500/25 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="font-serif font-bold text-lg text-charcoal-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-gold-500 animate-pulse" />
              <span>Free Fabric-Matching Consultation</span>
            </h4>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-400 mt-1 font-light">
              Unsure how many meters of silk fabric are required for a design or which lace complements your cotton suit? Message us or visit us for a free expert fabric consultation.
            </p>
          </div>
          <button
            id="consult-whatsapp-btn"
            onClick={() => {
              const text = `Hello K.T Boutique! I would like to schedule a free fabric-matching consultation. Please guide me.`;
              window.open(`https://wa.me/919999296247?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="px-6 py-3 bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-charcoal-950 font-semibold rounded-xl text-xs transition-colors shadow-sm hover:shadow-md cursor-pointer"
          >
            Chat with Designer
          </button>
        </div>

      </div>
    </section>
  );
}
