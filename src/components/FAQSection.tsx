/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-white dark:bg-charcoal-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-2">Help Center</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-charcoal-50 dark:bg-charcoal-900 rounded-xl border border-charcoal-200 dark:border-charcoal-800 hover:border-gold-500/10 transition-colors overflow-hidden"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-medium text-charcoal-900 dark:text-white cursor-pointer group"
                >
                  <span className="font-serif font-semibold text-sm sm:text-base group-hover:text-maroon-700 dark:group-hover:text-gold-400 transition-colors flex items-center gap-2.5">
                    <HelpCircle className="w-4.5 h-4.5 text-gold-500 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className="p-1 rounded-full bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer Box */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-charcoal-200/50 dark:border-charcoal-800 text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 font-light leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive banner */}
        <div className="mt-12 text-center p-6 bg-maroon-50 dark:bg-maroon-950/20 rounded-xl border border-maroon-100 dark:border-maroon-900 max-w-xl mx-auto">
          <p className="text-xs text-charcoal-600 dark:text-charcoal-400 font-light">
            Have a different question about specialized bridal wear, custom latkans, or express bulk stitching?
          </p>
          <a
            href="https://wa.me/919999296247"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-700 dark:text-gold-400 mt-2 hover:underline"
          >
            <span>Ask Us Directly on WhatsApp</span>
            <span>&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
