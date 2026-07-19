/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, AlertCircle, Sparkles, Check } from 'lucide-react';
import {
  isFirebaseConfigured,
  loginWithGoogle,
  loginWithGithub,
  signUpWithEmail,
  loginWithEmail
} from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError(null);
    setSuccessMsg(null);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!name) {
        setError('Please enter your full name.');
        return;
      }
    }

    setLoading(true);
    try {
      let user;
      if (isSignUp) {
        user = await signUpWithEmail(email, password, name);
        setSuccessMsg('Account created successfully!');
      } else {
        user = await loginWithEmail(email, password);
        setSuccessMsg('Signed in successfully!');
      }
      
      setTimeout(() => {
        onSuccess(user);
        resetForm();
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const user = provider === 'google' ? await loginWithGoogle() : await loginWithGithub();
      setSuccessMsg(`Successfully authenticated via ${provider === 'google' ? 'Google' : 'GitHub'}!`);
      
      setTimeout(() => {
        onSuccess(user);
        resetForm();
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message || `An error occurred logging in with ${provider}.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-white dark:bg-charcoal-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-gold-500/20 relative z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-charcoal-100 dark:hover:bg-charcoal-800 text-charcoal-500 hover:text-charcoal-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close Authentication Screen"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal content body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
            
            {/* Header / Logo branding */}
            <div className="text-center mb-6">
              <span className="inline-flex w-10 h-10 bg-gradient-to-tr from-maroon-700 to-maroon-900 rounded-full items-center justify-center shadow-md border border-gold-500/20 mb-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
              </span>
              <h2 className="text-xl font-serif font-bold text-maroon-700 dark:text-gold-400 leading-tight">
                {isSignUp ? 'Create your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                {isSignUp ? 'Join K.T Tailoring Material And Boutique' : 'Access your personalized bespoke design portal'}
              </p>
            </div>

            {/* Config Status Banner */}
            {!isFirebaseConfigured && (
              <div className="mb-5 p-3 rounded-lg bg-gold-500/10 border border-gold-500/25 text-left text-[10.5px] text-maroon-800 dark:text-gold-300 font-medium leading-normal flex gap-2">
                <AlertCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider">Demo Sandbox Mode</span>
                  <p className="mt-0.5 opacity-90 font-light">
                    Firebase variables are currently unconfigured. You can proceed with mock authorization to experience the full customer dashboard and personalized interactions.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider font-bold text-charcoal-600 dark:text-charcoal-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                    <input
                      id="auth-input-name"
                      type="text"
                      placeholder="e.g. Kusum Tanmay"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 bg-charcoal-50 dark:bg-charcoal-850 text-charcoal-900 dark:text-white text-xs focus:ring-2 focus:ring-maroon-700 focus:outline-none focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10.5px] uppercase tracking-wider font-bold text-charcoal-600 dark:text-charcoal-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                  <input
                    id="auth-input-email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 bg-charcoal-50 dark:bg-charcoal-850 text-charcoal-900 dark:text-white text-xs focus:ring-2 focus:ring-maroon-700 focus:outline-none focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10.5px] uppercase tracking-wider font-bold text-charcoal-600 dark:text-charcoal-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                  <input
                    id="auth-input-password"
                    type="password"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 bg-charcoal-50 dark:bg-charcoal-850 text-charcoal-900 dark:text-white text-xs focus:ring-2 focus:ring-maroon-700 focus:outline-none focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider font-bold text-charcoal-600 dark:text-charcoal-400">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                    <input
                      id="auth-input-confirm-password"
                      type="password"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-charcoal-300 dark:border-charcoal-700 bg-charcoal-50 dark:bg-charcoal-850 text-charcoal-900 dark:text-white text-xs focus:ring-2 focus:ring-maroon-700 focus:outline-none focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                id="auth-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-charcoal-950 py-2 rounded-lg text-xs font-bold transition-all shadow-md hover:scale-[1.01] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : isSignUp ? 'Create Boutique Account' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-charcoal-200 dark:border-charcoal-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-charcoal-900 px-3 text-charcoal-400 font-semibold tracking-wider text-[10px]">
                  Or Continue With
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google OAuth Button */}
              <button
                id="oauth-btn-google"
                type="button"
                onClick={() => handleOAuth('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-charcoal-300 dark:border-charcoal-700 hover:bg-charcoal-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 text-xs font-semibold transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <span className="text-maroon-700 dark:text-gold-400 font-bold font-serif">G</span>
                <span>Google</span>
              </button>

              {/* GitHub OAuth Button */}
              <button
                id="oauth-btn-github"
                type="button"
                onClick={() => handleOAuth('github')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-charcoal-300 dark:border-charcoal-700 hover:bg-charcoal-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 text-xs font-semibold transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
            </div>

            {/* Switch Mode Link */}
            <div className="mt-6 text-center text-xs">
              <span className="text-charcoal-500 dark:text-charcoal-400 font-light">
                {isSignUp ? 'Already have an account? ' : 'New to K.T Boutique? '}
              </span>
              <button
                id="auth-toggle-mode-btn"
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-maroon-700 dark:text-gold-400 font-bold hover:underline transition-all cursor-pointer"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
