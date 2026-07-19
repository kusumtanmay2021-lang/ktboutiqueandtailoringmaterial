/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price?: string; // e.g., "₹450 / meter" or "Enquire on WhatsApp"
  tags: string[];
  isNewArrival?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceStart?: string;
  features: string[];
  image: string;
  icon: string; // lucide icon name
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'fabrics' | 'stitching' | 'laces' | 'accessories' | 'all';
  image: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceType?: string;
}
