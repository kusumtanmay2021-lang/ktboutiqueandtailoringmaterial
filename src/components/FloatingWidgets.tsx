/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function FloatingWidgets() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      
      {/* Floating Call Widget */}
      <a
        id="floating-call-btn"
        href={CONTACT_INFO.callLink}
        className="w-12 h-12 bg-gradient-to-r from-maroon-700 to-maroon-800 text-white rounded-full flex items-center justify-center shadow-lg border border-gold-500/20 hover:scale-110 transition-transform duration-300"
        title="Call Us Now"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Widget */}
      <a
        id="floating-whatsapp-btn"
        href={CONTACT_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-float"
        title="Chat on WhatsApp"
      >
        {/* Custom SVG for cleaner WhatsApp icon representation */}
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.015 14.062 1.014 11.933 1.014c-5.452 0-9.88 4.373-9.884 9.802-.001 1.745.485 3.447 1.402 4.904l-.997 3.642 3.753-.984z" />
        </svg>
      </a>

      {/* Scroll-To-Top Widget */}
      {showScroll && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          className="w-10 h-10 bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-gold-400 rounded-full flex items-center justify-center shadow-md border border-charcoal-200 dark:border-charcoal-700 hover:bg-charcoal-100 dark:hover:bg-charcoal-750 hover:scale-105 transition-all duration-300 cursor-pointer"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
