/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Service, Testimonial, FAQ, GalleryItem } from './types';

// Custom generated and premium stock images
export const IMAGES = {
  hero: '/src/assets/images/luxury_boutique_interior_1784337633769.jpg',
  fabricsCat: '/src/assets/images/premium_fabrics_display_1784337649289.jpg',
  accessoriesCat: '/src/assets/images/tailoring_materials_1784337664361.jpg',
  stitchingCat: '/src/assets/images/designer_embroidery_1784337680221.jpg',
  
  // High quality Unsplash curated items matching maroon and gold aesthetic
  silkFabric: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
  cottonFabric: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  designerFabric: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
  blousePiece: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
  laces: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
  buttons: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=80',
  threads: 'https://images.unsplash.com/photo-1528578577235-b963df6db908?auto=format&fit=crop&w=800&q=80',
  zippers: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80',
  accessories: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
};

export const CONTACT_INFO = {
  name: 'K.T Tailoring Material And Boutique',
  tagline: 'Everything You Need for Perfect Stitching.',
  phones: [
    { number: '+91 9999296247', display: '+91 99992 96247' },
    { number: '+91 8076901963', display: '+91 80769 01963' }
  ],
  email: 'ktboutique.material@gmail.com',
  address: '750-G, Nyay Khand 1, Indirapuram, Ghaziabad, Uttar Pradesh – 201014',
  addressShort: 'Indirapuram, Ghaziabad',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1643444853013!2d77.3718458!3d28.624816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf547fec0624d%3A0xe54d6fa0a48a946b!2sNyay%20Khand%20I%2C%20Indirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201014!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  hours: [
    { days: 'Monday - Saturday', time: '10:00 AM - 08:30 PM' },
    { days: 'Sunday', time: '11:00 AM - 06:00 PM' }
  ],
  whatsappLink: 'https://wa.me/919999296247',
  callLink: 'tel:+919999296247',
  instagram: 'https://instagram.com/kt_boutique_material',
  facebook: 'https://facebook.com/ktboutiquematerial'
};

export const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'suit-materials', label: 'Suit Materials' },
  { value: 'cotton-fabrics', label: 'Cotton Fabrics' },
  { value: 'silk-fabrics', label: 'Silk Fabrics' },
  { value: 'designer-fabrics', label: 'Designer Fabrics' },
  { value: 'blouse-pieces', label: 'Blouse Pieces' },
  { value: 'laces', label: 'Laces' },
  { value: 'borders', label: 'Borders' },
  { value: 'buttons', label: 'Buttons' },
  { value: 'threads', label: 'Threads' },
  { value: 'zippers', label: 'Zippers' },
  { value: 'boutique-accessories', label: 'Boutique Accessories' },
  { value: 'new-arrivals', label: 'New Arrivals' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Chanderi Silk Suit Material',
    description: 'An elegant premium quality silk suit material with fine gold zari borders and matching dupatta. Perfect for festivals and weddings.',
    image: IMAGES.silkFabric,
    category: 'suit-materials',
    tags: ['Silk', 'Wedding', 'Zari', 'Chanderi'],
    isNewArrival: true
  },
  {
    id: 'p2',
    name: 'Pure Organic Jaipuri Cotton Fabric',
    description: 'Hand-block printed floral pattern on super soft, highly breathable pure cotton fabric. Safe for delicate skin.',
    image: IMAGES.cottonFabric,
    category: 'cotton-fabrics',
    tags: ['Jaipuri', 'Cotton', 'Print', 'Daily Wear'],
    isNewArrival: false
  },
  {
    id: 'p3',
    name: 'Benaresi Brocade Designer Fabric',
    description: 'Exquisite banarasi silk brocade woven with golden metallic thread work in intricate traditional patterns.',
    image: IMAGES.designerFabric,
    category: 'designer-fabrics',
    tags: ['Benaresi', 'Golden', 'Luxury', 'Designer'],
    isNewArrival: true
  },
  {
    id: 'p4',
    name: 'Handcrafted Kutchi Mirror-Work Border',
    description: 'Vibrant embroidered border featuring authentic mirror work. Elevate your plain sarees and dupattas.',
    image: IMAGES.accessoriesCat,
    category: 'borders',
    tags: ['Handmade', 'Kutchi', 'Mirror Work', 'Colorful'],
    isNewArrival: false
  },
  {
    id: 'p5',
    name: 'Intricate Crochet Lace Border',
    description: 'Delicate cotton crochet lace border for sleeve edges, neck designs, and curtain styling.',
    image: IMAGES.laces,
    category: 'laces',
    tags: ['Crochet', 'White Lace', 'Vintage', 'Cotton'],
    isNewArrival: false
  },
  {
    id: 'p6',
    name: 'Royal Kundan Designer Buttons',
    description: 'Gold-plated brass buttons inlaid with artificial Kundan stones and rhinestones. Perfect for royal blouses and sherwanis.',
    image: IMAGES.buttons,
    category: 'buttons',
    tags: ['Kundan', 'Royal', 'Designer', 'Gold'],
    isNewArrival: true
  },
  {
    id: 'p7',
    name: 'Heavy Silk Embroidery Blouse Piece',
    description: 'Semi-stitched raw silk blouse piece with heavily detailed zardozi hand embroidery on neck and sleeves.',
    image: IMAGES.blousePiece,
    category: 'blouse-pieces',
    tags: ['Raw Silk', 'Hand Embroidery', 'Zardozi', 'Blouse'],
    isNewArrival: true
  },
  {
    id: 'p8',
    name: 'Vardhman Premium Stitching Threads',
    description: 'High-tensile, colorfast mercerized cotton sewing threads. Available in over 150 matching shades.',
    image: IMAGES.threads,
    category: 'threads',
    tags: ['Vardhman', 'Threads', 'Stitching', 'Cotton'],
    isNewArrival: false
  },
  {
    id: 'p9',
    name: 'YKK Premium Brass Zippers',
    description: 'Durable and ultra-smooth brass metal zippers for heavy dresses, skirts, and blouses.',
    image: IMAGES.zippers,
    category: 'zippers',
    tags: ['YKK', 'Zippers', 'Metal', 'Durable'],
    isNewArrival: false
  },
  {
    id: 'p10',
    name: 'Tailoring Canvas & Buckram Roll',
    description: 'Premium iron-on fusing canvas buckram paper for collars, blouse necklines, and waistbands.',
    image: IMAGES.accessories,
    category: 'boutique-accessories',
    tags: ['Canvas', 'Buckram', 'Interlining', 'Stiffener'],
    isNewArrival: false
  },
  {
    id: 'p11',
    name: 'Elegant Gota Patti Border Lace',
    description: 'Traditional Rajasthani golden Gota Patti lace border for festive ethnic outfits.',
    image: IMAGES.stitchingCat,
    category: 'laces',
    tags: ['Gota Patti', 'Gold', 'Rajasthani', 'Festive'],
    isNewArrival: true
  },
  {
    id: 'p12',
    name: 'Rich Tussar Silk Unstitched Suit fabric',
    description: 'Authentic Tussar silk printed shirt fabric paired with plain cotton silk bottoms and printed silk dupatta.',
    image: IMAGES.fabricsCat,
    category: 'suit-materials',
    tags: ['Tussar', 'Pure Silk', 'Traditional', 'Luxe'],
    isNewArrival: true
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Custom Blouse Stitching',
    description: 'Beautiful designer blouses with princess cuts, boat necks, pad inserts, back drapes, and intricate hand-embellished zardozi work tailored to perfection.',
    priceStart: '₹450',
    features: ['Sabyasachi/Princess Cut options', 'Padded or non-padded linings', 'Dori & handcrafted latkans', 'Perfect matching adjustments'],
    image: IMAGES.stitchingCat,
    icon: 'Sparkles'
  },
  {
    id: 's2',
    title: 'Suit Pant & Trouser Stitching',
    description: 'Perfect-fit women’s trousers, pants, palazzos, salwars, or cigarette pants with customizable waistbands, pockets, and elegant side cuts.',
    priceStart: '₹450',
    features: ['Tailored comfort fit', 'Pocket insertion options', 'High-quality fusing canvas waist', 'Side-slits & button detailing'],
    image: IMAGES.accessoriesCat,
    icon: 'Scissors'
  },
  {
    id: 's3',
    title: 'Premium Salwar Suit Stitching',
    description: 'Elegant custom salwar suits, straight Kurtis, Anarkalis, and Sharara sets tailored with perfect proportions and premium lining materials.',
    priceStart: '₹650',
    features: ['Premium lining attachment', 'Designer necklines & sleeve patterns', 'Symmetrical front-back falls', 'Precision trial checks'],
    image: IMAGES.fabricsCat,
    icon: 'Scissors'
  },
  {
    id: 's4',
    title: 'Lehenga & Gown Stitching',
    description: 'Stunning heavy-flared designer bridal lehengas, bridesmaid outfits, and modern evening gowns designed and tailored by our veteran master cutter.',
    priceStart: '₹1,800',
    features: ['High-volume can-can attachment', 'Custom heavy tassels & doris', 'Intricate border layouts', 'Multiple trial sessions included'],
    image: IMAGES.stitchingCat || 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80',
    icon: 'Sparkles'
  },
  {
    id: 's5',
    title: 'Saree Fall & Pico',
    description: 'Get high-quality matching cotton fall stitching and extremely neat overlock edge pico styling to prepare your brand new sarees.',
    priceStart: '₹100',
    features: ['100% color-matched cotton falls', 'Premium pico edging', 'Ironing & saree folding included', 'Fast 1-day standard delivery'],
    image: IMAGES.laces,
    icon: 'TrendingUp'
  },
  {
    id: 's6',
    title: 'Precision Alterations',
    description: 'Don’t let bad fitting ruin your favorite outfit. Get precision adjustments for shoulders, waist, bust, sleeves, and lengths.',
    priceStart: '₹80',
    features: ['Invisible stitch repairs', 'Resize outfits up or down', 'Restyle necklines/sleeves', 'Saree to gown transformations'],
    image: IMAGES.hero,
    icon: 'Layers'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sneha Sharma',
    role: 'Indirapuram Resident',
    text: 'K.T Boutique has completely transformed how I stitch my festive wear! Their blouse stitching is flawless, and the collection of gold laces is simply unmatched in Nyay Khand. Highly recommended!',
    rating: 5,
    date: 'June 14, 2026'
  },
  {
    id: 't2',
    name: 'Priyanka Goel',
    role: 'Fashion Enthusiast',
    text: 'The quality of cotton fabric I bought here for summer suits is incredibly soft. Also got customized dori and buttons to match. It is a one-stop-shop for all tailoring lovers.',
    rating: 5,
    date: 'July 2, 2026'
  },
  {
    id: 't3',
    name: 'Meenakshi Iyer',
    role: 'Homemaker',
    text: 'I had urgent saree fall/pico and some suit alterations. They finished everything in just 1 day with superb neatness. The owners are very polite and cooperative!',
    rating: 5,
    date: 'May 20, 2026'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'How long does custom boutique stitching take?',
    answer: 'Typically, standard stitching orders are ready within 5 to 7 business days. For express requirements or complex bridal/festive wear, we offer a priority service (ready in 2-3 days) for a small additional fee.',
    category: 'stitching'
  },
  {
    id: 'f2',
    question: 'Do you sell both unstitched materials and stitching accessories?',
    answer: 'Yes! We carry a rich catalog of unstitched suit materials, designer fabrics (silk, cotton, brocades), and a complete collection of tailoring accessories including laces, Borders, designer buttons, YKK zippers, Vardhman threads, and buckram rolls.',
    category: 'materials'
  },
  {
    id: 'f3',
    question: 'Can I bring my own fabric for stitching?',
    answer: 'Absolutely! You can bring your own fabrics to our boutique in Indirapuram. We will take your exact measurements and discuss custom neckline and sleeve ideas. Alternatively, you can browse and choose from our premium fabric selection.',
    category: 'stitching'
  },
  {
    id: 'f4',
    question: 'Do you offer doorstep pickup and measurement services?',
    answer: 'We currently request our local clients to visit our physical boutique at Nyay Khand 1, Indirapuram, so that our master tailor can take precise measurements and secure the perfect fit. You can also send a well-fitting sample garment.',
    category: 'general'
  },
  {
    id: 'f5',
    question: 'How do I place an enquiry for a product online?',
    answer: 'Simply click the "Enquire on WhatsApp" button on any product or service card. It will automatically pre-fill a detailed WhatsApp message containing the product name so you can chat directly with our boutique owners to discuss availability and pricing!',
    category: 'general'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Intricate Gold Zardozi Blouse Embroidery',
    category: 'stitching',
    image: IMAGES.stitchingCat,
    description: 'Custom boutique bridal embroidery with intricate golden zari threadwork.'
  },
  {
    id: 'g2',
    title: 'Premium Banarasi & Silk Fabric Stack',
    category: 'fabrics',
    image: IMAGES.fabricsCat,
    description: 'Bright red and deep maroon raw silks and brocades available for custom dress styling.'
  },
  {
    id: 'g3',
    title: 'Tailoring Shears & Lace Layout',
    category: 'laces',
    image: IMAGES.accessoriesCat,
    description: 'Professional precision layout highlighting designer laces, tassels, and golden borders.'
  },
  {
    id: 'g4',
    title: 'Custom Pastel Designer Blouse Piece',
    category: 'stitching',
    image: IMAGES.blousePiece,
    description: 'Custom soft pastel blouse detailing with matching piping and delicate button closures.'
  },
  {
    id: 'g5',
    title: 'Pure Indigo Hand-block Printed Cotton',
    category: 'fabrics',
    image: IMAGES.cottonFabric,
    description: 'Artisanal organic Jaipuri cotton fabric rolls in gorgeous natural dyes.'
  },
  {
    id: 'g6',
    title: 'Ornate Antique Designer Buttons Collection',
    category: 'accessories',
    image: IMAGES.buttons,
    description: 'Kundan style antique gold and silver button designs for sherwanis and blouses.'
  }
];
