/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if all required config values are provided
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
  } catch (error) {
    console.error('Failed to initialize Firebase SDK:', error);
  }
}

// Simulated mock state for local preview when Firebase is not configured
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
}

let mockUserListener: ((user: User | MockUser | null) => void) | null = null;
let currentMockUser: MockUser | null = null;

// Read mock user from localStorage to persist mock session
const savedMockUser = localStorage.getItem('kt_mock_user');
if (savedMockUser) {
  try {
    currentMockUser = JSON.parse(savedMockUser);
  } catch (e) {
    localStorage.removeItem('kt_mock_user');
  }
}

export function subscribeToAuth(callback: (user: any) => void) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, callback);
  } else {
    mockUserListener = callback;
    // Immediate notification
    setTimeout(() => {
      callback(currentMockUser);
    }, 100);
    return () => {
      mockUserListener = null;
    };
  }
}

export async function loginWithGoogle(): Promise<any> {
  if (isFirebaseConfigured && auth) {
    const provider = new GoogleAuthProvider();
    // Prompt option
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } else {
    // Simulated Google login
    const user: MockUser = {
      uid: 'google-mock-123',
      email: 'kusumtanmay2021@gmail.com',
      displayName: 'Kusum Tanmay (Google Demo)',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      providerId: 'google.com',
    };
    currentMockUser = user;
    localStorage.setItem('kt_mock_user', JSON.stringify(user));
    if (mockUserListener) mockUserListener(user);
    return user;
  }
}

export async function loginWithGithub(): Promise<any> {
  if (isFirebaseConfigured && auth) {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } else {
    // Simulated GitHub login
    const user: MockUser = {
      uid: 'github-mock-123',
      email: 'kusumtanmay2021@gmail.com',
      displayName: 'kusumtanmay (GitHub Demo)',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      providerId: 'github.com',
    };
    currentMockUser = user;
    localStorage.setItem('kt_mock_user', JSON.stringify(user));
    if (mockUserListener) mockUserListener(user);
    return user;
  }
}

export async function signUpWithEmail(email: string, pass: string, name: string): Promise<any> {
  if (isFirebaseConfigured && auth) {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(result.user, { displayName: name });
    return result.user;
  } else {
    // Simulated Email signup
    const user: MockUser = {
      uid: `email-mock-${Math.random().toString(36).substr(2, 9)}`,
      email: email,
      displayName: name || email.split('@')[0],
      photoURL: null,
      providerId: 'password',
    };
    currentMockUser = user;
    localStorage.setItem('kt_mock_user', JSON.stringify(user));
    if (mockUserListener) mockUserListener(user);
    return user;
  }
}

export async function loginWithEmail(email: string, pass: string): Promise<any> {
  if (isFirebaseConfigured && auth) {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return result.user;
  } else {
    // Simulated Email signin
    const user: MockUser = {
      uid: 'email-mock-123',
      email: email,
      displayName: email.split('@')[0],
      photoURL: null,
      providerId: 'password',
    };
    currentMockUser = user;
    localStorage.setItem('kt_mock_user', JSON.stringify(user));
    if (mockUserListener) mockUserListener(user);
    return user;
  }
}

export async function logoutUser(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    currentMockUser = null;
    localStorage.removeItem('kt_mock_user');
    if (mockUserListener) mockUserListener(null);
  }
}
