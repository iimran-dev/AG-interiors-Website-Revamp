/**
 * V36 Suites Athens — Data Layer & Content Source
 *
 * Single source of truth for all content, copy, configuration, and visual asset URLs.
 * High-resolution curated web imagery from Unsplash for luxury hospitality presentation.
 */

export type Suite = {
  id: string;
  name: string;
  eyebrow: string;
  image: string;
  sqm: number;
  guests: number;
  view: string;
  bed: string;
  highlights: string[];
  description: string;
  fromPrice: number;
  available: number;
};

export type Landmark = {
  id: string;
  name: string;
  image: string;
  walkMeters: number;
  walkMinutes: number;
  description: string;
  pos: { x: number; y: number };
  lat: number;
  lng: number;
};

export type Experience = {
  id: string;
  name: string;
  image: string;
  category: string;
  duration: string;
  description: string;
  featured?: boolean;
};

export type Review = {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  source: "Google";
};

export type Faq = {
  q: string;
  a: string;
};

export type Benefit = {
  title: string;
  description: string;
  icon: "shield" | "clock" | "book" | "plane" | "refresh";
};

export type GalleryItem = {
  id: string;
  image: string;
  caption: string;
  category: "Interiors" | "Architecture" | "Athens" | "Details" | "Dining";
  span: "tall" | "wide" | "regular";
};

export type InstagramPost = {
  id: string;
  image: string;
  caption: string;
};

export type Destination = {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  span: string;
};

/** Key Hero & Featured Section Web Images */
export const HERO_IMAGE = "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=2000&q=85";
export const BRAND_STORY_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85";
export const VIDEO_REEL_POSTER = "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85";

/** Editorial Destination Story Grid */
export const DESTINATIONS: Destination[] = [
  {
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85",
    eyebrow: "Rooftop Athens",
    title: "The Acropolis, lit gold, from above.",
    text: "Rooftops are a second city in Athens. Find one at dusk and the Parthenon floats above the rooftops like a held breath.",
    span: "lg:col-span-7 aspect-[4/3]",
  },
  {
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85",
    eyebrow: "The Streets",
    title: "Cobbled lanes & ivy.",
    text: "Plaka and Anafiotika — the village beneath the Acropolis.",
    span: "lg:col-span-5 aspect-[3/4]",
  },
  {
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    eyebrow: "The Table",
    title: "Olives, feta, sea bream.",
    text: "Greek cooking is a quiet art of a few excellent things.",
    span: "lg:col-span-5 aspect-[3/4]",
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
    eyebrow: "The Evening",
    title: "A glass, a corner, the night.",
    text: "Athens stays up late and quietly. Follow the warm light down a side street.",
    span: "lg:col-span-7 aspect-[4/3]",
  },
];

/** Suites Collection */
export const SUITES: Suite[] = [
  {
    id: "signature",
    name: "Signature Suite",
    eyebrow: "Signature Suite",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
    sqm: 55,
    guests: 4,
    view: "Athens skyline views",
    bed: "King bed · Living area",
    highlights: ["King bed", "Living area", "Skyline views", "Marble bathroom"],
    description:
      "Our flagship suite — a calm, light-filled space framing the city through floor-to-ceiling glass. Warm ivory walls, oak underfoot, and a quiet corner to watch Athens wake.",
    fromPrice: 179,
    available: 2,
  },
  {
    id: "acropolis-view",
    name: "Acropolis View Suite",
    eyebrow: "Acropolis View Suite",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    sqm: 48,
    guests: 2,
    view: "Direct Acropolis views",
    bed: "King bed",
    highlights: ["Acropolis framing", "King bed", "Brass reading lamp", "Stone details"],
    description:
      "A framed portrait of the Parthenon from your bed. The room holds a single, deliberate view — the rest is quiet, warm, and unhurried.",
    fromPrice: 229,
    available: 1,
  },
  {
    id: "terrace",
    name: "Terrace Suite",
    eyebrow: "Terrace Suite",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85",
    sqm: 62,
    guests: 3,
    view: "Rooftop & Acropolis",
    bed: "King bed · Sofa bed",
    highlights: ["Private terrace", "Olive tree", "Outdoor lounge", "Evening light"],
    description:
      "Step out onto travertine stone as the city turns gold. A private terrace with the Acropolis beyond — made for slow evenings and a glass of Assyrtiko.",
    fromPrice: 269,
    available: 0,
  },
  {
    id: "garden",
    name: "Garden Suite",
    eyebrow: "Garden Suite",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85",
    sqm: 44,
    guests: 2,
    view: "Private courtyard garden",
    bed: "Queen bed",
    highlights: ["Private garden", "Olive branches", "Ground floor", "Soft daylight"],
    description:
      "A ground-floor retreat opening onto a stone courtyard garden. Lush, green, and entirely your own — a quieter side of Athens.",
    fromPrice: 159,
    available: 3,
  },
  {
    id: "penthouse",
    name: "Penthouse Suite",
    eyebrow: "Penthouse Suite",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
    sqm: 78,
    guests: 4,
    view: "Panoramic city view",
    bed: "King bed · Lounge",
    highlights: ["Vaulted ceilings", "Panoramic views", "Lounge area", "Blue hour"],
    description:
      "The top of the house — vaulted beams, an arched window framing all of Athens, and a lounge made for lingering as the city turns to blue hour.",
    fromPrice: 349,
    available: 1,
  },
];

/** Landmarks & Map Locations */
export const LANDMARKS: Landmark[] = [
  {
    id: "v36",
    name: "V36 Suites",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    walkMeters: 0,
    walkMinutes: 0,
    description: "Your address in the heart of Athens.",
    pos: { x: 50, y: 46 },
    lat: 37.9750,
    lng: 23.7322,
  },
  {
    id: "acropolis",
    name: "Acropolis",
    image: "https://images.unsplash.com/photo-1603565816030-6bb341e20413?auto=format&fit=crop&w=1200&q=85",
    walkMeters: 1100,
    walkMinutes: 14,
    description: "The Parthenon. The reason the world still looks up to Athens.",
    pos: { x: 34, y: 58 },
    lat: 37.9715,
    lng: 23.7257,
  },
  {
    id: "plaka",
    name: "Plaka",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    walkMeters: 700,
    walkMinutes: 10,
    description: "The old neighbourhood beneath the Acropolis — lanes, tavernas, bougainvillea.",
    pos: { x: 47, y: 58 },
    lat: 37.9729,
    lng: 23.7299,
  },
  {
    id: "monastiraki",
    name: "Monastiraki",
    image: "https://images.unsplash.com/photo-1505672678657-cc7037095e60?auto=format&fit=crop&w=1200&q=85",
    walkMeters: 650,
    walkMinutes: 9,
    description: "Markets, antiques and the buzz of old Athens.",
    pos: { x: 42, y: 39 },
    lat: 37.9763,
    lng: 23.7257,
  },
  {
    id: "temple-zeus",
    name: "Temple of Zeus",
    image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=1200&q=85",
    walkMeters: 1200,
    walkMinutes: 16,
    description: "Colossal Corinthian columns, standing for two thousand years.",
    pos: { x: 74, y: 34 },
    lat: 37.9693,
    lng: 23.7331,
  },
  {
    id: "national-garden",
    name: "National Garden",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=85",
    walkMeters: 400,
    walkMinutes: 5,
    description: "A green, shaded refuge in the centre of the city.",
    pos: { x: 62, y: 67 },
    lat: 37.9729,
    lng: 23.7371,
  },
  {
    id: "syntagma",
    name: "Syntagma Square",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=85",
    walkMeters: 250,
    walkMinutes: 3,
    description: "The constitutional heart of Athens and the Greek Parliament.",
    pos: { x: 64, y: 52 },
    lat: 37.9755,
    lng: 23.7348,
  },
];

/** Concierge Experiences */
export const EXPERIENCES: Experience[] = [
  {
    id: "acropolis-tour",
    name: "Private Acropolis Tour",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    category: "Heritage",
    duration: "Half day · Sunrise",
    description:
      "Walk the Acropolis before the crowds arrive, with a licensed archaeologist as your guide. The Parthenon in first light, the Erechtheion, the Theatre of Dionysus — slowly, privately, and well told.",
    featured: true,
  },
  {
    id: "food-walk",
    name: "Greek Food Walk",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",
    category: "Taste",
    duration: "3 hours · Morning",
    description: "Varvakios market, olives, spices, and the best spanakopita in the city.",
  },
  {
    id: "santorini",
    name: "Santorini Day Trip",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    category: "Escape",
    duration: "Full day · Private",
    description: "A private flight to the island, the caldera, and a long lunch above the sea.",
  },
  {
    id: "airport-pickup",
    name: "Airport Pickup",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=85",
    category: "Arrival",
    duration: "On request",
    description: "Discreet transfer from the airport, with cold water and a warm welcome.",
  },
  {
    id: "car-rental",
    name: "Car Rental",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    category: "Explore",
    duration: "Flexible",
    description: "A classic convertible for a coastal drive down the Attica Riviera.",
  },
];

/** Guest Testimonials & Reviews */
export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Elena Marchetti",
    country: "Milan, Italy",
    flag: "IT",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    title: "Felt like a private Athenian apartment",
    body: "The light in the Signature Suite in the morning is something I keep thinking about. Walking distance to everything, yet absolutely quiet. The concierge arranged an early Acropolis visit that felt like we had the place to ourselves.",
    source: "Google",
  },
  {
    id: "r2",
    name: "Thomas Lindqvist",
    country: "Stockholm, Sweden",
    flag: "SE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    title: "Restrained, warm, exactly right",
    body: "Nobis-level design sensibility in the heart of Athens. Nothing flashy, nothing missing. The terrace suite at dusk, with a glass of wine and the Acropolis lit below — that's the image I brought home.",
    source: "Google",
  },
  {
    id: "r3",
    name: "Amélie Dubois",
    country: "Paris, France",
    flag: "FR",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    title: "The way a city should be discovered",
    body: "We travel a lot and V36 understood something others miss — you don't need more amenities, you need better ones. The Athens guide they prepared for us was worth more than any guidebook.",
    source: "Google",
  },
  {
    id: "r4",
    name: "Daniel Okafor",
    country: "London, United Kingdom",
    flag: "GB",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    title: "The concierge made the trip",
    body: "Asked the AI concierge for a romantic evening and received a plan that hit exactly the right note — rooftop, then a quiet walk, then dinner they had booked for us. Effortless.",
    source: "Google",
  },
  {
    id: "r5",
    name: "Sophia Costa",
    country: "Lisbon, Portugal",
    flag: "PT",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    title: "Quiet luxury, done properly",
    body: "Booked three nights, stayed five. The garden suite is a little green world of its own, and breakfast each morning felt like a private ritual. We are already planning our return.",
    source: "Google",
  },
];

export const RATING = {
  score: 4.9,
  count: 1247,
  source: "Google Reviews",
} as const;

/** Frequently Asked Questions */
export const FAQS: Faq[] = [
  {
    q: "What time is check-in and check-out?",
    a: "Check-in is from 15:00, and check-out is by 11:00. Early check-in and late check-out are available on request and subject to availability — direct bookers receive priority.",
  },
  {
    q: "Is airport transfer available?",
    a: "Yes. We arrange discreet private transfers from Athens International Airport with a meet-and-greet service. Please share your flight details at least 24 hours in advance.",
  },
  {
    q: "How far is the Acropolis from the property?",
    a: "The Acropolis is approximately a 14-minute walk from V36 Suites. Syntagma Square is just 3 minutes away, and Plaka begins around the corner.",
  },
  {
    q: "Do you offer luggage storage?",
    a: "Of course. Luggage can be stored with us before check-in and after check-out, so you can enjoy your final day in Athens unburdened.",
  },
  {
    q: "Is breakfast available?",
    a: "A curated breakfast of Greek and Mediterranean specialties is served each morning, either in your suite or on the terrace. It is included for direct bookings.",
  },
  {
    q: "Can you arrange tours and experiences?",
    a: "Yes — from a private Acropolis visit at sunrise to a day trip to Santorini. Our concierge will tailor every detail to your interests and pace.",
  },
  {
    q: "Is the property suitable for families?",
    a: "Several of our suites accommodate families, and we can provide connecting arrangements and cots on request. Let us know the ages of your children when booking.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Direct bookings enjoy flexible cancellation up to 7 days before arrival, with no fee. Special rates and peak-period bookings may have specific terms, clearly shown at booking.",
  },
];

/** Direct Booking Benefits */
export const BENEFITS: Benefit[] = [
  {
    title: "Best Rate Guarantee",
    description: "The lowest rate, always, when you book directly with us.",
    icon: "shield",
  },
  {
    title: "Early Check-in Priority",
    description: "Arrive early, settle in. Direct bookers receive priority on room readiness.",
    icon: "clock",
  },
  {
    title: "Free Athens City Guide",
    description: "A curated, edited guide to the Athens we love — yours on arrival.",
    icon: "book",
  },
  {
    title: "Airport Transfer Discount",
    description: "A preferred rate on private, discreet transfers to and from the airport.",
    icon: "plane",
  },
  {
    title: "Flexible Cancellation",
    description: "Plans change. Direct bookings stay flexible up to 7 days before arrival.",
    icon: "refresh",
  },
];

/** Gallery Collection */
export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1600&q=85",
    caption: "The Acropolis, lit at night, from a rooftop nearby",
    category: "Athens",
    span: "wide",
  },
  {
    id: "g2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    caption: "Curved stone staircase, morning light",
    category: "Architecture",
    span: "tall",
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
    caption: "Travertine, brass, and quiet",
    category: "Interiors",
    span: "tall",
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1600&q=85",
    caption: "Breakfast by the window",
    category: "Dining",
    span: "wide",
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    caption: "Room key, linen, oak",
    category: "Details",
    span: "regular",
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85",
    caption: "Terrace at blue hour",
    category: "Interiors",
    span: "wide",
  },
  {
    id: "g7",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85",
    caption: "A lane in Plaka",
    category: "Athens",
    span: "regular",
  },
  {
    id: "g8",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    caption: "Olives, wine & evening light",
    category: "Dining",
    span: "regular",
  },
  {
    id: "g9",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
    caption: "The Signature Suite, afternoon",
    category: "Interiors",
    span: "wide",
  },
];

/** Instagram Feed Grid */
export const INSTAGRAM_POSTS: InstagramPost[] = [
  { id: "ig1", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80", caption: "Sunset, rooftop, Acropolis." },
  { id: "ig2", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", caption: "Morning light, white linen." },
  { id: "ig3", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80", caption: "A quiet corner of Plaka." },
  { id: "ig4", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80", caption: "Greek summer, on a plate." },
  { id: "ig5", image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=800&q=80", caption: "Marble, two thousand years on." },
  { id: "ig6", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80", caption: "Dusk on the terrace." },
];

export const CONCIERGE_PROMPTS = [
  "Find me the best rooftop restaurants.",
  "What should I see in Athens in one day?",
  "Plan a romantic evening.",
  "How do I get to the Acropolis?",
  "Where can I find authentic Greek food?",
];

export const CONTACT = {
  address: "V36 Suites, Voulis 36, Athens 10572, Greece",
  phone: "+30 21 0123 4567",
  whatsapp: "+30 21 0123 4567",
  email: "stay@v36suites.gr",
  instagram: "https://instagram.com/v36suites",
  facebook: "https://facebook.com/v36suites",
};

export const OCCUPANCY = {
  remainingTonight: 2,
  note: "Suites remaining tonight",
} as const;
