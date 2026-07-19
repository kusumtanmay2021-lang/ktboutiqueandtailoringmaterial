/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Star, Heart, Scissors, Clock, MapPin, Quote } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import FloatingWidgets from './components/FloatingWidgets';
import CookieConsent from './components/CookieConsent';
import AuthModal from './components/AuthModal';
import { subscribeToAuth, logoutUser } from './lib/firebase';

import { PRODUCTS, SERVICES, TESTIMONIALS, IMAGES } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Subscribe to auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuth((u: any) => {
      setUser(u);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Handle system dark mode on initial mount and state changes

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('kt_theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
    } else if (!storedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kt_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kt_theme', 'light');
    }
  }, [isDark]);

  // Testimonials Carousel state
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-play testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const featuredProducts = PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-100 flex flex-col justify-between transition-colors duration-300">
      
      {/* Header component */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={logoutUser}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Luxury Hero banner with CTA */}
              <Hero setActiveTab={setActiveTab} />

              {/* Homepage Feature: Featured Products / New Arrivals */}
              <section className="py-16 sm:py-24 bg-charcoal-50 dark:bg-charcoal-900/60 border-b border-gold-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
                    <div className="text-center sm:text-left">
                      <span className="text-xs uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-1">
                        Curated Collection
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900 dark:text-white">
                        Featured New Arrivals
                      </h3>
                      <div className="w-12 h-0.5 bg-gold-500 mt-2 mx-auto sm:mx-0" />
                    </div>

                    <button
                      id="home-view-all-products-btn"
                      onClick={() => {
                        setActiveTab('products');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-white dark:bg-charcoal-800 text-maroon-700 dark:text-gold-400 hover:text-white hover:bg-maroon-700 dark:hover:bg-gold-500 dark:hover:text-charcoal-950 rounded-xl text-xs font-semibold border border-gold-500/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>View Full Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Featured grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.slice(0, 4).map((product) => (
                      <div
                        key={product.id}
                        className="bg-white dark:bg-charcoal-850 rounded-xl overflow-hidden border border-charcoal-200 dark:border-charcoal-800 hover:border-gold-500/20 transition-all duration-300 hover:shadow-md flex flex-col justify-between group relative"
                      >
                        <div className="h-48 overflow-hidden bg-charcoal-100 dark:bg-charcoal-900 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2.5 left-2.5 bg-gold-500 text-charcoal-950 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md shadow flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>New</span>
                          </span>
                        </div>

                        <div className="p-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif font-bold text-sm text-charcoal-900 dark:text-white line-clamp-1 group-hover:text-maroon-700 dark:group-hover:text-gold-400 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400 mt-1 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                          
                          <div className="pt-3 mt-3 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between gap-2">
                            <span className="text-xs font-bold font-serif text-maroon-700 dark:text-gold-400">
                              {product.price}
                            </span>
                            <button
                              id={`featured-enquire-btn-${product.id}`}
                              onClick={() => {
                                const text = `Hello K.T Boutique! I am interested in enquiring about the featured item: *${product.name}* (${product.price}). Please share details!`;
                                window.open(`https://wa.me/919999296247?text=${encodeURIComponent(text)}`, '_blank');
                              }}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                            >
                              <span>Enquire</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Story/Boutique brief banner */}
              <section className="py-16 bg-white dark:bg-charcoal-950 border-b border-gold-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="space-y-5">
                      <span className="text-xs uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block">
                        Our Craftsmanship
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900 dark:text-white">
                        Every Stitch Tailored to Absolute Perfection
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-light">
                        We don’t just customize sizes; we personalize designs. From selecting traditional zardozi patterns, matching pastel blouses, to selecting sturdy cotton lining materials, we sit with you to design dresses that celebrate you.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-maroon-50 dark:bg-maroon-950 rounded-full flex items-center justify-center shrink-0 border border-gold-500/15">
                            <Scissors className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs text-charcoal-900 dark:text-white">Custom Blouse Work</h4>
                            <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400">Padded cuts, elegant dori-latkan tassels, and hand-embroidery matching.</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-maroon-50 dark:bg-maroon-950 rounded-full flex items-center justify-center shrink-0 border border-gold-500/15">
                            <Clock className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs text-charcoal-900 dark:text-white">Same-Day Pico Service</h4>
                            <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400">Overlock styling and high-grade cotton saree fall attachments.</p>
                          </div>
                        </div>
                      </div>

                      <button
                        id="home-story-read-more"
                        onClick={() => {
                          setActiveTab('about');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-700 dark:text-gold-400 hover:underline pt-4"
                      >
                        <span>Read Our Story</span>
                        <span>&rarr;</span>
                      </button>
                    </div>

                    <div className="relative">
                      <img
                        src={IMAGES.stitchingCat}
                        alt="Handcrafting zardozi embroidery"
                        referrerPolicy="no-referrer"
                        className="rounded-2xl shadow-lg w-full h-80 object-cover border border-gold-500/15"
                      />
                      <div className="absolute top-4 left-4 bg-charcoal-900/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-white flex items-center gap-1.5 shadow-md">
                        <Heart className="w-4 h-4 text-gold-400 fill-current animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Bespoke Couture</span>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Homepage Feature: Services Overview */}
              <section className="py-16 sm:py-24 bg-charcoal-50 dark:bg-charcoal-900/60 border-b border-gold-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  
                  <div className="max-w-2xl mx-auto mb-12">
                    <span className="text-xs uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-1">
                      Our Expertise
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900 dark:text-white">
                      Bespoke Stitching Offerings
                    </h3>
                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-2 font-light">
                      Professional cutting, tailored fittings, saree fall pico, and same-day delivery options.
                    </p>
                    <div className="w-12 h-0.5 bg-gold-500 mx-auto mt-3" />
                  </div>

                  {/* Top 3 services preview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {SERVICES.slice(0, 3).map((service) => (
                      <div
                        key={service.id}
                        className="bg-white dark:bg-charcoal-850 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 bg-maroon-50 dark:bg-maroon-950 rounded-lg flex items-center justify-center mb-4 text-maroon-700 dark:text-gold-400 border border-gold-500/10">
                            <Scissors className="w-4.5 h-4.5" />
                          </div>
                          <h4 className="font-serif font-bold text-sm text-charcoal-900 dark:text-white">
                            {service.title}
                          </h4>
                          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-2 leading-relaxed font-light">
                            {service.description}
                          </p>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex justify-between items-center">
                          <span className="text-xs text-charcoal-400 font-light">Starting from {service.priceStart}</span>
                          <button
                            id={`home-service-cta-${service.id}`}
                            onClick={() => {
                              setActiveTab('services');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xs font-semibold text-maroon-700 dark:text-gold-400 hover:underline"
                          >
                            Details &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Homepage Feature: Customer Testimonials (Carousel) */}
              <section className="py-16 sm:py-24 bg-white dark:bg-charcoal-950 border-b border-gold-500/10 relative overflow-hidden">
                {/* Background decorative patterns */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-maroon-700/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                  <div className="text-center mb-12">
                    <Quote className="w-10 h-10 text-gold-500/40 mx-auto mb-3" />
                    <span className="text-xs uppercase tracking-widest text-maroon-700 dark:text-gold-400 font-bold block mb-1">
                      Our Success
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900 dark:text-white">
                      What Our Happy Clients Say
                    </h3>
                  </div>

                  {/* Testimonial card slider */}
                  <div className="bg-charcoal-50 dark:bg-charcoal-900 rounded-2xl p-6 sm:p-10 border border-gold-500/10 relative shadow-sm text-center">
                    
                    <div className="flex justify-center gap-1 mb-4 text-gold-500">
                      {[...Array(TESTIMONIALS[currentTestimonialIdx].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-charcoal-700 dark:text-charcoal-300 italic font-light leading-relaxed px-2 sm:px-6">
                      "{TESTIMONIALS[currentTestimonialIdx].text}"
                    </p>

                    <div className="mt-6">
                      <h4 className="font-serif font-bold text-sm text-charcoal-900 dark:text-white">
                        {TESTIMONIALS[currentTestimonialIdx].name}
                      </h4>
                      <p className="text-[10px] text-charcoal-400 uppercase font-semibold tracking-wider mt-0.5">
                        {TESTIMONIALS[currentTestimonialIdx].role} • {TESTIMONIALS[currentTestimonialIdx].date}
                      </p>
                    </div>

                    {/* Manual controls */}
                    <div className="flex justify-center gap-3 mt-8">
                      <button
                        id="prev-testimonial-btn"
                        onClick={handlePrevTestimonial}
                        className="p-1.5 rounded-full border border-charcoal-200 dark:border-charcoal-800 hover:bg-white dark:hover:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 transition-colors cursor-pointer"
                        aria-label="Previous Testimonial"
                      >
                        &larr;
                      </button>
                      <div className="flex items-center gap-1">
                        {TESTIMONIALS.map((_, idx) => (
                          <div
                            key={idx}
                            onClick={() => setCurrentTestimonialIdx(idx)}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                              currentTestimonialIdx === idx ? 'w-4 bg-maroon-700 dark:bg-gold-500' : 'bg-charcoal-300 dark:bg-charcoal-700'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        id="next-testimonial-btn"
                        onClick={handleNextTestimonial}
                        className="p-1.5 rounded-full border border-charcoal-200 dark:border-charcoal-800 hover:bg-white dark:hover:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 transition-colors cursor-pointer"
                        aria-label="Next Testimonial"
                      >
                        &rarr;
                      </button>
                    </div>

                  </div>
                </div>
              </section>

              {/* Homepage Feature: FAQ brief */}
              <FAQSection />

              {/* Homepage Feature: Contact Section */}
              <ContactSection />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AboutSection />
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ProductsSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesSection setActiveTab={setActiveTab} />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GallerySection />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer component */}
      <Footer setActiveTab={setActiveTab} />

      {/* Persistent floating user contact widgets */}
      <FloatingWidgets />

      {/* Privacy & cookie compliance banner */}
      <CookieConsent />

      {/* User authentication dialog overlay */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          console.log('Authenticated user:', user);
        }}
      />

    </div>
  );
}
