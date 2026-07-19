/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Phone, Filter, Sparkles, Tag, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES, CONTACT_INFO } from '../data';

interface ProductsSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProductsSection({ searchQuery, setSearchQuery }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    let result = PRODUCTS;

    // Filter by Category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'new-arrivals') {
        result = result.filter((p) => p.isNewArrival);
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  const handleWhatsAppEnquiry = (product: Product) => {
    const text = `Hello K.T Boutique! I am interested in enquiring about the following material:

*${product.name}*
Category: ${CATEGORIES.find((c) => c.value === product.category)?.label || product.category}
Pricing: Contact Shop / Price on Request

Please share current pricing, color matching options, and availability details. Thank you!`;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/919999296247?text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <section id="products-section" className="py-16 sm:py-24 bg-charcoal-50 dark:bg-charcoal-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-2">Our Catalog</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 dark:text-white">
            Premium Materials & Tailoring Accessories
          </h2>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-2 font-light">
            Browse our handpicked catalog of boutique-grade materials. To maintain the freshest selection and best competitive rates, individual item pricing is on request. Click <strong className="font-bold text-maroon-700 dark:text-gold-400">"Enquire"</strong> to check current prices or colors directly with us!
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        {/* Global Search and Quick Filter Info */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              type="text"
              id="catalog-search-input"
              placeholder="Search products, fabrics, materials, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-850 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent text-sm shadow-sm"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-maroon-700 dark:text-gold-400 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Carousel / Horizontal Tabs */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-300 text-sm font-semibold mb-3">
            <Filter className="w-4 h-4 text-gold-500" />
            <span>Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                id={`cat-tab-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-maroon-700 dark:bg-gold-500 text-white dark:text-charcoal-950 shadow-md font-semibold border border-gold-500/20'
                    : 'bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700 hover:border-maroon-300 dark:hover:border-gold-500/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || searchQuery !== '') && (
          <div className="flex items-center justify-between bg-white dark:bg-charcoal-800 px-4 py-2.5 rounded-lg border border-gold-500/10 mb-8 text-xs">
            <div className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-300">
              <span>Showing results for:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-maroon-50 dark:bg-maroon-950/50 text-maroon-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full font-medium border border-maroon-100 dark:border-maroon-900">
                  Category: {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                </span>
              )}
              {searchQuery && (
                <span className="bg-gold-50 dark:bg-gold-950/30 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full font-medium border border-gold-100 dark:border-gold-900">
                  Keyword: "{searchQuery}"
                </span>
              )}
            </div>
            <button
              id="reset-all-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-maroon-700 dark:text-gold-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-charcoal-850 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-charcoal-200 dark:border-charcoal-850 hover:border-gold-500/20 transition-all duration-300 flex flex-col group relative"
                >
                  
                  {/* Image & Badges */}
                  <div className="relative h-56 overflow-hidden bg-charcoal-100 dark:bg-charcoal-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* New Arrival Badge */}
                    {product.isNewArrival && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md border border-white/20 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>New Arrival</span>
                      </span>
                    )}

                    {/* Category Label Overlay */}
                    <span className="absolute bottom-3 right-3 bg-charcoal-900/80 backdrop-blur-md text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full border border-white/10">
                      {CATEGORIES.find((c) => c.value === product.category)?.label}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Name */}
                      <h3 className="font-serif font-bold text-base text-charcoal-900 dark:text-white line-clamp-1 group-hover:text-maroon-700 dark:group-hover:text-gold-400 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-0.5 bg-charcoal-50 dark:bg-charcoal-800 text-[10px] text-charcoal-600 dark:text-charcoal-400 px-2 py-0.5 rounded border border-charcoal-100 dark:border-charcoal-700"
                          >
                            <Tag className="w-2.5 h-2.5 text-gold-500" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-charcoal-600 dark:text-charcoal-400 line-clamp-2 leading-relaxed font-light mb-4">
                        {product.description}
                      </p>
                    </div>

                    {/* Bottom details & button */}
                    <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-charcoal-400 dark:text-charcoal-500 font-semibold leading-none">Pricing</span>
                        <span className="text-xs font-serif font-bold text-maroon-700 dark:text-gold-400 mt-0.5" title="Contact us for latest pricing & bundles">
                          Contact Shop
                        </span>
                      </div>

                      <button
                        id={`enquire-whatsapp-btn-${product.id}`}
                        onClick={() => handleWhatsAppEnquiry(product)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                        title="Enquire on WhatsApp"
                      >
                        <Phone className="w-4 h-4 fill-current" />
                        <span>Enquire</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-charcoal-850 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 p-8 max-w-md mx-auto shadow-sm"
            >
              <div className="w-16 h-16 bg-maroon-50 dark:bg-maroon-950/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-maroon-700 dark:text-gold-500" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal-900 dark:text-white">No items match your search</h3>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-2">
                We couldn't find any products matching "{searchQuery}". Try selecting a different category or clearing the search box.
              </p>
              <button
                id="empty-clear-search-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-5 px-5 py-2 bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-charcoal-950 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
