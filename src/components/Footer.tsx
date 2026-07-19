/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scissors, Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { CONTACT_INFO, CATEGORIES } from '../data';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const quickLinks = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'Our Story' },
    { id: 'products', label: 'Materials Catalog' },
    { id: 'services', label: 'Bespoke Services' },
    { id: 'gallery', label: 'Creations Gallery' },
    { id: 'contact', label: 'Reach Out' },
  ];

  const handleLinkClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-900 dark:bg-charcoal-950 text-charcoal-200 border-t border-gold-500/15 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Introduction */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-maroon-700 rounded-full flex items-center justify-center border border-gold-500/30">
                <Scissors className="w-4.5 h-4.5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white tracking-tight">K.T BOUTIQUE</h3>
                <p className="text-[9px] uppercase tracking-widest text-gold-400">Tailoring & Materials</p>
              </div>
            </div>
            
            <p className="text-xs text-charcoal-400 leading-relaxed font-light">
              Your one-stop local destination in Indirapuram for unstitched suit materials, designer brocades, floral cottons, custom tailored blouses, saree falls, and beautiful lace borders.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-instagram-link"
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-maroon-700 text-charcoal-300 hover:text-white flex items-center justify-center border border-charcoal-700 hover:border-gold-500/30 transition-all duration-300"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-facebook-link"
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-maroon-700 text-charcoal-300 hover:text-white flex items-center justify-center border border-charcoal-700 hover:border-gold-500/30 transition-all duration-300"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-l-2 border-gold-500 pl-2">Quick Navigation</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-nav-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-gold-400 text-charcoal-400 transition-colors text-left py-1 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Material Categories Column */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-l-2 border-gold-500 pl-2">Our Materials</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {CATEGORIES.slice(1, 9).map((cat) => (
                <li key={cat.value}>
                  <button
                    id={`footer-category-${cat.value}`}
                    onClick={() => {
                      setActiveTab('products');
                      setTimeout(() => {
                        const tabBtn = document.getElementById(`cat-tab-${cat.value}`);
                        if (tabBtn) tabBtn.click();
                      }, 100);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="hover:text-gold-400 text-charcoal-400 transition-colors text-left py-1 cursor-pointer line-clamp-1"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact & Map Column */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-l-2 border-gold-500 pl-2">Contact Us</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${CONTACT_INFO.phones[0].number}`} className="hover:text-gold-400 transition-colors font-medium">
                  {CONTACT_INFO.phones[0].display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-gold-400 transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location Note */}
        <div className="border-t border-charcoal-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-charcoal-500">
          <p className="text-center md:text-left">
            © 2026 {CONTACT_INFO.name}. All Rights Reserved.
          </p>
          <p className="text-center md:text-right font-light">
            Designed with Elegance & Precision • Indirapuram, Uttar Pradesh
          </p>
        </div>

      </div>
    </footer>
  );
}
