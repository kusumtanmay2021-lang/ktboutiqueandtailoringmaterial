/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ChevronLeft, ChevronRight, Filter, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { value: 'all', label: 'All Creations' },
    { value: 'fabrics', label: 'Premium Fabrics' },
    { value: 'stitching', label: 'Bespoke Stitching' },
    { value: 'laces', label: 'Designer Laces' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery-section" className="py-16 sm:py-24 bg-charcoal-50 dark:bg-charcoal-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-2">Our Work</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 dark:text-white">
            Boutique Design Showcase & Lookbook
          </h2>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-2 font-light">
            Take a closer look at our latest custom stitching creations, fabric layouts, and beautiful lace assortments.
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          <Filter className="w-4 h-4 text-gold-500 mr-1 hidden sm:inline" />
          {filters.map((f) => (
            <button
              key={f.value}
              id={`gallery-filter-${f.value}`}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                activeFilter === f.value
                  ? 'bg-maroon-700 dark:bg-gold-500 text-white dark:text-charcoal-950 font-semibold shadow-sm'
                  : 'bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:border-maroon-300 dark:hover:border-gold-500 border border-charcoal-200 dark:border-charcoal-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid Container (Masonry-like flex layout) */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                id={`gallery-item-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(index)}
                className="bg-white dark:bg-charcoal-850 rounded-xl overflow-hidden border border-charcoal-200 dark:border-charcoal-800 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative h-80"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Hover overlay */}
                <div className="absolute inset-0 bg-maroon-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-white text-base mt-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-charcoal-200 mt-1 line-clamp-2 font-light">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 mt-4 border border-gold-400/20 px-3 py-1 rounded-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Fullscreen</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-charcoal-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-10"
            >
              {/* Close Button */}
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full flex flex-col items-center justify-center"
              >
                {/* Active Image */}
                <div className="relative max-h-[60vh] md:max-h-[70vh] rounded-lg overflow-hidden border border-white/10 bg-black">
                  <img
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[60vh] md:max-h-[70vh] object-contain"
                  />
                </div>

                {/* Info Bar */}
                <div className="text-center text-white mt-6 max-w-xl">
                  <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-widest bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/25">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl mt-3">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-charcoal-300 mt-2 font-light leading-relaxed">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
