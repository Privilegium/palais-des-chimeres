import { Product } from "@/types";

/*
  Every product has exactly 4 gallery images.
  Where fewer than 4 unique assets exist, the most visually appropriate
  existing image is repeated as the 4th entry — clearly commented so it
  can be replaced with a real asset later.
*/

export const products: Product[] = [
  {
    id: "product-veil-of-becoming",
    slug: "veil-of-becoming",
    name: "Veil of Becoming",
    collectionLine: "VIDMY — 2026",
    image: "/assets/images/products/vampire_dress.png",
    images: [
      { src: "/assets/images/products/vampire_dress.png", alt: "Veil of Becoming — front" },
      { src: "/assets/images/products/vase_dress.png",    alt: "Veil of Becoming — detail" },
      { src: "/assets/images/products/red_witch_dress.png", alt: "Veil of Becoming — side" },
      { src: "/assets/images/products/goat_dress.png",   alt: "Veil of Becoming — editorial" }, // replace with dedicated shot
    ],
    price: "€2,450",
    type: "priced",
    shortDescription: "A veil for the in-between. Wool and hand-embroidery, sculpted into ceremony.",
    attributes: [
      { label: "Material",     value: "Hand-felted wool, hand embroidery" },
      { label: "Silhouette",   value: "Sculptural cocoon" },
      { label: "Collection",   value: "VIDMY — 2026" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:  "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
  },
  {
    id: "product-chimera-form",
    slug: "chimera-form",
    name: "Chimera Form",
    collectionLine: "VIDMY — 2026",
    image: "/assets/images/products/goat_dress.png",
    images: [
      { src: "/assets/images/products/goat_dress.png",     alt: "Chimera Form — front" },
      { src: "/assets/images/products/cat_dress.png",      alt: "Chimera Form — detail" },
      { src: "/assets/images/products/vampire_dress.png",  alt: "Chimera Form — editorial" },
      { src: "/assets/images/products/red_witch_dress.png", alt: "Chimera Form — silhouette" }, // replace with dedicated shot
    ],
    price: "€3,850",
    type: "priced",
    shortDescription: "A mythological entity, neither one thing nor another. Structured wool meets leather.",
    attributes: [
      { label: "Material",     value: "Wool and structured leather" },
      { label: "Silhouette",   value: "Geometric overlay" },
      { label: "Collection",   value: "VIDMY — 2026" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:  "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
  },
  {
    id: "product-ivory-bloom",
    slug: "ivory-bloom",
    name: "Ivory Bloom",
    collectionLine: "VIDMY — 2026",
    image: "/assets/images/products/vase_dress.png",
    images: [
      { src: "/assets/images/products/vase_dress.png",    alt: "Ivory Bloom — front" },
      { src: "/assets/images/products/vampire_dress.png", alt: "Ivory Bloom — detail" },
      { src: "/assets/images/products/goat_dress.png",    alt: "Ivory Bloom — editorial" },
      { src: "/assets/images/products/cat_dress.png",     alt: "Ivory Bloom — silhouette" }, // replace with dedicated shot
    ],
    price: "€2,990",
    type: "priced",
    shortDescription: "A monumental piece capturing the space between breath and form.",
    attributes: [
      { label: "Material",   value: "Embroidered taffeta" },
      { label: "Silhouette", value: "Sculptural bell" },
      { label: "Collection", value: "VIDMY — 2026" },
      { label: "Production", value: "Haute Couture" },
    ],
    accordions: {
      details:  "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
  },
  {
    id: "product-blood-current",
    slug: "blood-current",
    name: "Blood Current",
    collectionLine: "VIDMY — 2026",
    image: "/assets/images/products/red_witch_dress.png",
    images: [
      { src: "/assets/images/products/red_witch_dress.png", alt: "Blood Current — front" },
      { src: "/assets/images/products/cat_dress.png",       alt: "Blood Current — detail" },
      { src: "/assets/images/products/vampire_dress.png",   alt: "Blood Current — editorial" },
      { src: "/assets/images/products/vase_dress.png",      alt: "Blood Current — silhouette" }, // replace with dedicated shot
    ],
    type: "request",
    shortDescription: "An elaborate manifestation of crimson devotion. Velvet and hand-dyed organza.",
    attributes: [
      { label: "Material",   value: "Velvet and hand-dyed organza" },
      { label: "Silhouette", value: "Voluminous gown" },
      { label: "Collection", value: "VIDMY — 2026" },
      { label: "Production", value: "Haute Couture" },
    ],
    accordions: {
      details:  "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
  },
  {
    id: "product-nocturne-creature",
    slug: "nocturne-creature",
    name: "Nocturne Creature",
    collectionLine: "VIDMY — 2026",
    image: "/assets/images/products/cat_dress.png",
    images: [
      { src: "/assets/images/products/cat_dress.png",      alt: "Nocturne Creature — front" },
      { src: "/assets/images/products/goat_dress.png",     alt: "Nocturne Creature — detail" },
      { src: "/assets/images/products/red_witch_dress.png", alt: "Nocturne Creature — editorial" },
      { src: "/assets/images/products/vampire_dress.png",  alt: "Nocturne Creature — silhouette" }, // replace with dedicated shot
    ],
    type: "request",
    shortDescription: "Sculptural elegance with a sharp, poised edge. Heavy crepe and satin.",
    attributes: [
      { label: "Material",     value: "Heavy crepe and satin" },
      { label: "Silhouette",   value: "Fitted corset" },
      { label: "Collection",   value: "VIDMY — 2026" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:  "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
