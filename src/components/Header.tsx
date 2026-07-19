/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Moon, Sun, Scissors, Phone, User, LogOut, ChevronDown, Key } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  searchQuery,
  setSearchQuery,
  user,
  onAuthClick,
  onLogout,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setActiveTab('products');
    setShowSearch(false);
    // Scroll to products
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getUserInitials = () => {
    if (!user) return '?';
    const name = user.displayName || user.email || '';
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Top Bar for contact details */}
      <div className="bg-maroon-700 dark:bg-maroon-950 text-white py-1 px-4 text-xs font-medium border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <a href={`tel:${CONTACT_INFO.phones[0].number}`} className="hover:text-gold-400 transition-colors">
                {CONTACT_INFO.phones[0].display}
              </a>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <a href={`tel:${CONTACT_INFO.phones[1].number}`} className="hover:text-gold-400 transition-colors">
                {CONTACT_INFO.phones[1].display}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-gold-300">|</span>
            <span className="text-[11px] sm:text-xs text-gold-200">750-G, Nyay Khand 1, Indirapuram, Ghaziabad</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        id="main-navigation"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md shadow-md py-3'
            : 'bg-white dark:bg-charcoal-900 py-4'
        } border-b border-gold-500/10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-maroon-700 to-maroon-900 rounded-full flex items-center justify-center shadow-lg border border-gold-500/30 group-hover:rotate-12 transition-transform duration-300">
              <Scissors className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-serif font-bold text-maroon-700 dark:text-gold-400 tracking-tight leading-none">
                K.T BOUTIQUE
              </h1>
              <p className="text-[9px] uppercase tracking-widest text-charcoal-500 dark:text-charcoal-300 mt-0.5">
                Tailoring & Materials
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1.5 ${
                  activeTab === item.id
                    ? 'text-maroon-700 dark:text-gold-400 font-semibold'
                    : 'text-charcoal-700 dark:text-charcoal-300 hover:text-maroon-700 dark:hover:text-gold-400'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Search Trigger */}
            <button
              id="search-toggle-btn"
              onClick={() => {
                setShowSearch(!showSearch);
                setSearchInput('');
              }}
              className="p-2 rounded-full hover:bg-maroon-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-maroon-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-gold-400" /> : <Moon className="w-5 h-5 text-maroon-700" />}
            </button>

            {/* User Account Dropdown / Auth CTA */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <div>
                  <button
                    id="user-profile-menu-btn"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 bg-maroon-50 dark:bg-charcoal-800 hover:bg-maroon-100 dark:hover:bg-charcoal-750 border border-gold-500/15 rounded-full transition-all text-charcoal-900 dark:text-white cursor-pointer shadow-sm text-xs"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover border border-gold-500/20"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-maroon-700 dark:bg-gold-500 text-white dark:text-charcoal-950 font-bold flex items-center justify-center text-[9px]">
                        {getUserInitials()}
                      </div>
                    )}
                    <span className="max-w-[70px] truncate font-semibold hidden lg:inline-block">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-charcoal-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2.5 w-64 bg-white dark:bg-charcoal-850 rounded-xl shadow-xl border border-gold-500/20 py-2.5 z-100 animate-fade-in text-left">
                      <div className="px-4 py-2 border-b border-charcoal-100 dark:border-charcoal-800">
                        <p className="text-xs font-bold text-charcoal-900 dark:text-white truncate">
                          {user.displayName || 'Boutique Guest'}
                        </p>
                        <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400 truncate mt-0.5 font-mono">
                          {user.email}
                        </p>
                        <span className="inline-flex mt-1.5 px-2 py-0.5 rounded-md bg-gold-500/10 text-[9px] font-bold text-maroon-700 dark:text-gold-400 uppercase tracking-wider border border-gold-500/15">
                          {user.providerId === 'password' ? 'Email Auth' : user.providerId === 'google.com' ? 'Google Sign-In' : 'GitHub Sign-In'}
                        </span>
                      </div>
                      
                      <div className="px-2 pt-2">
                        <button
                          id="dropdown-logout-btn"
                          onClick={() => {
                            onLogout();
                            setShowUserDropdown(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-600 hover:bg-red-500/10 transition-colors font-semibold text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="header-sign-in-btn"
                  onClick={onAuthClick}
                  className="flex items-center gap-1 px-3.5 py-1.5 bg-gradient-to-tr from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 dark:from-gold-500 dark:to-gold-500/90 dark:hover:from-gold-600 dark:hover:to-gold-600 text-white dark:text-charcoal-950 font-bold text-xs rounded-full border border-gold-500/10 hover:border-gold-500/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden rounded-full hover:bg-maroon-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Global Search Overlay (Slide down) */}
        {showSearch && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-charcoal-900 border-b border-gold-500/20 shadow-lg px-4 py-4 animate-fade-in z-50">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="text"
                  placeholder="Search fabrics, laces, buttons, accessories..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-charcoal-300 dark:border-charcoal-700 bg-charcoal-50 dark:bg-charcoal-850 text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent text-sm"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-charcoal-950 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-[105px] z-40 bg-charcoal-950/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <div 
              className="bg-white dark:bg-charcoal-900 w-64 h-screen shadow-xl p-5 border-r border-gold-500/10 flex flex-col gap-6 animate-slide-in-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Auth Section */}
              <div className="border-b border-charcoal-100 dark:border-charcoal-800 pb-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full border border-gold-500/20 shadow"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-maroon-700 dark:bg-gold-500 text-white dark:text-charcoal-950 font-bold flex items-center justify-center text-sm shadow">
                        {getUserInitials()}
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-bold text-charcoal-900 dark:text-white truncate">
                        {user.displayName || 'Boutique Guest'}
                      </p>
                      <button
                        id="mobile-logout-btn"
                        onClick={() => {
                          onLogout();
                          setIsOpen(false);
                        }}
                        className="text-[10px] text-red-600 dark:text-red-400 font-bold flex items-center gap-1 mt-0.5"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    id="mobile-drawer-login-btn"
                    onClick={() => {
                      setIsOpen(false);
                      onAuthClick();
                    }}
                    className="w-full py-2 bg-gradient-to-tr from-maroon-700 to-maroon-800 dark:from-gold-500 dark:to-gold-500/90 text-white dark:text-charcoal-950 text-xs font-bold rounded-lg border border-gold-500/10 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In to Account</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider">Navigation</p>
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-maroon-50 dark:bg-maroon-950/40 text-maroon-700 dark:text-gold-400 font-semibold'
                          : 'text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto border-t border-charcoal-200 dark:border-charcoal-800 pt-6 pb-24 space-y-4">
                <p className="text-xs uppercase font-semibold text-charcoal-400 tracking-wider">Call Us Now</p>
                <div className="space-y-2 text-xs">
                  <a href={`tel:${CONTACT_INFO.phones[0].number}`} className="flex items-center gap-2 text-charcoal-700 dark:text-charcoal-300 hover:text-maroon-700">
                    <Phone className="w-4 h-4 text-gold-500" />
                    <span>{CONTACT_INFO.phones[0].display}</span>
                  </a>
                  <a href={`tel:${CONTACT_INFO.phones[1].number}`} className="flex items-center gap-2 text-charcoal-700 dark:text-charcoal-300 hover:text-maroon-700">
                    <Phone className="w-4 h-4 text-gold-500" />
                    <span>{CONTACT_INFO.phones[1].display}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
