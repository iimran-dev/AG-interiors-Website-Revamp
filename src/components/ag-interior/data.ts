export interface ProjectItem {
  id: string;
  title: string;
  location?: string;
  category: "Residential" | "Commercial" | "Kitchens" | "Living" | "Bedrooms";
  image: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
  interiorImage: string;
}

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  {
    value: "50+",
    label: "Projects Completed",
    icon: "building",
  },
  {
    value: "100%",
    label: "Custom Designs",
    icon: "compass",
  },
  {
    value: "End-to-End",
    label: "Execution —",
    icon: "refresh",
  },
  {
    value: "Chennai Based",
    label: "Serving Across Tamil Nadu",
    icon: "mapPin",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "home-interiors",
    title: "Home Interiors",
    description: "Spaces that feel like you.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "modular-kitchens",
    title: "Modular Kitchens",
    description: "Smart. Stylish. Functional.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "wardrobes",
    title: "Wardrobes",
    description: "Designed for modern living.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "false-ceilings",
    title: "False Ceilings",
    description: "Crafting light, creating mood.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800&auto=format&fit=crop",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "modern-villa",
    title: "Modern Villa",
    location: "Chennai",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "apartment-interior",
    title: "Apartment Interior",
    location: "ECR, Chennai",
    category: "Living",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "modular-kitchen-project",
    title: "Modular Kitchen",
    location: "Anna Nagar",
    category: "Kitchens",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "luxury-bedroom",
    title: "Luxury Bedroom",
    location: "Adyar, Chennai",
    category: "Bedrooms",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "office-space",
    title: "Office Space",
    location: "OMR IT Corridor",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation",
    description: "Understand your needs",
  },
  {
    step: "02",
    title: "Design & Planning",
    description: "3D concept & space planning",
  },
  {
    step: "03",
    title: "Material Selection",
    description: "Curated for quality & style",
  },
  {
    step: "04",
    title: "Execution",
    description: "On-time delivery with precision",
  },
  {
    step: "05",
    title: "Handover",
    description: "Spaces ready for a better you",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "priya-karthik",
    quote:
      "AG Interior transformed our house into a home. Their attention to detail, creative ideas, and professional execution were outstanding!",
    name: "Priya & Karthik",
    location: "Chennai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    interiorImage:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ramesh-anitha",
    quote:
      "The modular kitchen and wardrobe work exceeded all our expectations. The team delivered right on schedule with flawless finishing.",
    name: "Ramesh & Anitha",
    location: "Coimbatore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    interiorImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
  },
];
