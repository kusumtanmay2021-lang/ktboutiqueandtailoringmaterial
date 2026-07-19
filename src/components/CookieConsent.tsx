/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const accepted = localStorage.getItem('kt_cookies_accepted');
    if (!accepted) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('kt_cookies_accepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      id="cookie-consent-banner"
      className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-white dark:bg-charcoal-900 border border-gold-500/15 shadow-xl rounded-2xl p-5 z-40 animate-slide-in-bottom transition-all duration-300"
    >
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 bg-maroon-50 dark:bg-maroon-950/40 rounded-full flex items-center justify-center shrink-0 text-maroon-700 dark:text-gold-400 border border-gold-500/10">
          <ShieldCheck className="w-5 h-5" />
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-serif font-bold text-sm text-charcoal-900 dark:text-white">Cookie Preferences</h4>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed font-light mt-1">
              We use standard cookies to optimize your catalog browsing experience and understand our boutique traffic. By continuing to browse, you agree to our policies.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              id="decline-cookies-btn"
              onClick={() => setShowBanner(false)}
              className="px-3.5 py-1.5 text-xs text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-700 dark:hover:text-white transition-colors font-medium cursor-pointer"
            >
              Close
            </button>
            <button
              id="accept-cookies-btn"
              onClick={handleAccept}
              className="px-4 py-1.5 bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-charcoal-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
