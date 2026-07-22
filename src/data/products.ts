import { Product } from "@/types";

/*
  Collection cards use records with kind: "look". Individual items use the
  same Product model with kind: "piece", so both continue to use the existing
  /[locale]/collection/[slug] PDP route.
*/

function placeholderPiece(
  id: string,
  slug: string,
  name: string,
  image: string,
): Product {
  return {
    id,
    slug,
    kind: "piece",
    name: `${name} — Placeholder`,
    collectionLine: "VID’MY — 2027",
    image,
    images: [{ src: image, alt: `${name} placeholder` }],
    type: "request",
    description: "Placeholder item. Final product information will be added to this record.",
    itemName: name,
    attributes: [
      { label: "Material", value: "To be confirmed" },
      { label: "Collection", value: "VID’MY — 2027" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details: "Placeholder product details will be provided with the final product list.",
      delivery: "Delivery information will be confirmed with the final product details.",
    },
  };
}

export const products: Product[] = [
  {
    id: "product-veil-of-becoming",
    slug: "veil-of-becoming",
    kind: "look",
    name: "Red witch",
    lookTitle: "Red witch",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: [
      "placeholder-dress",
      "placeholder-jacket",
      "placeholder-necklace",
      "placeholder-ring",
    ],
    image: "/assets/images/products/vampire_dress.png",
    images: [
      { src: "/assets/images/products/vampire_dress.png", alt: "Red witch — front" },
      { src: "/assets/images/products/vase_dress.png", alt: "Red witch — detail" },
      { src: "/assets/images/products/red_witch_dress.png", alt: "Red witch — side" },
      { src: "/assets/images/products/goat_dress.png", alt: "Red witch — editorial" },
    ],
    price: "€1,300",
    type: "priced",
    description: "A veil for the in-between. Wool and hand-embroidery, sculpted into ceremony.",
    itemName: "A Red Silk Cape",
    attributes: [
      { label: "Material", value: "Silk organza 100%, black metal hooks, 1 piece" },
      { label: "Silhouette", value: "Oversized with voluminous sleeves" },
      { label: "Collection", value: "VID’MY — 2027" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details: "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
    translations: {
      fr: {
        name: "Sorcière rouge",
        lookTitle: "Sorcière rouge",
        collectionLine: "VID’MY — 2027",
        price: "1 300 €",
        type: "priced",
        description: "Un voile pour l’entre-deux. Laine et broderie main, sculptées en cérémonie.",
        itemName: "Une cape en soie rouge",
        attributes: [
          { label: "Matière", value: "Organza de soie 100 %, crochets en métal noir, 1 pièce" },
          { label: "Silhouette", value: "Oversize aux manches volumineuses" },
          { label: "Collection", value: "VID’MY — 2027" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details: "Composition et mesures précises disponibles sur demande. Chaque pièce est confectionnée à la main dans notre atelier parisien.",
          delivery: "Prévoyez 4 à 6 semaines pour les pièces réalisées sur commande. Expédition internationale possible. Les frais d’envoi sont calculés lors de la demande.",
        },
        images: [
          { src: "/assets/images/products/vampire_dress.png", alt: "Sorcière rouge — face" },
          { src: "/assets/images/products/vase_dress.png", alt: "Sorcière rouge — détail" },
          { src: "/assets/images/products/red_witch_dress.png", alt: "Sorcière rouge — côté" },
          { src: "/assets/images/products/goat_dress.png", alt: "Sorcière rouge — éditorial" },
        ],
      },
    },
  },
  {
    id: "product-chimera-form",
    slug: "chimera-form",
    kind: "look",
    name: "KOZA",
    lookTitle: "KOZA",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: ["placeholder-dress", "placeholder-accessory"],
    image: "/assets/images/products/goat_dress.png",
    images: [
      { src: "/assets/images/products/goat_dress.png", alt: "Koza" },
      { src: "/assets/images/products/cat_dress.png", alt: "Koza" },
      { src: "/assets/images/products/vampire_dress.png", alt: "Koza" },
      { src: "/assets/images/products/red_witch_dress.png", alt: "Koza" },
    ],
    type: "request",
    description: "The mystical skin of a creature that lets you see the world differently",
    attributes: [
      { label: "Material", value: "Hand-felted wool and reused cowhide leather" },
      { label: "Silhouette", value: "Mystical" },
      { label: "Collection", value: "VID’MY — 2027" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details: "Composition and exact measurements available upon request. Each piece is hand-crafted in our atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
    translations: {
      fr: {
        name: "KOZA",
        lookTitle: "KOZA",
        collectionLine: "VID’MY — 2027",
        description: "La peau mystique d’une créature qui permet de voir le monde autrement",
        attributes: [
          { label: "Matière", value: "Laine feutrée à la main et cuir de vache réemployé" },
          { label: "Silhouette", value: "Mystique" },
          { label: "Collection", value: "VID’MY — 2027" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details: "Composition et mesures précises disponibles sur demande. Chaque pièce est confectionnée à la main dans notre atelier.",
          delivery: "Prévoyez 4 à 6 semaines pour les pièces réalisées sur commande. Expédition internationale possible. Les frais d’envoi sont calculés lors de la demande.",
        },
        images: [
          { src: "/assets/images/products/goat_dress.png", alt: "Koza" },
          { src: "/assets/images/products/cat_dress.png", alt: "Koza" },
          { src: "/assets/images/products/vampire_dress.png", alt: "Koza" },
          { src: "/assets/images/products/red_witch_dress.png", alt: "Koza" },
        ],
      },
    },
  },
  {
    id: "product-ivory-bloom",
    slug: "ivory-bloom",
    kind: "look",
    name: "Vase",
    lookTitle: "Vase",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: [
      "placeholder-dress",
      "placeholder-necklace",
      "placeholder-ring",
    ],
    image: "/assets/images/products/vase_dress.png",
    images: [
      { src: "/assets/images/products/vase_dress.png", alt: "Vase — front" },
      { src: "/assets/images/products/vampire_dress.png", alt: "Vase — detail" },
      { src: "/assets/images/products/goat_dress.png", alt: "Vase — editorial" },
      { src: "/assets/images/products/cat_dress.png", alt: "Vase — silhouette" },
    ],
    type: "request",
    description: "The mystical skin of a vase that lets you see the world differently",
    itemName: "Vase Dress",
    attributes: [
      { label: "Material", value: "Hand-felted wool and hand embroidery" },
      { label: "Silhouette", value: "Sculptural vase" },
      { label: "Collection", value: "VID’MY — 2027" },
      { label: "Production", value: "Haute Couture" },
    ],
    accordions: {
      details: "Composition and exact measurements available upon request. Each piece is hand-crafted in our atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
    translations: {
      fr: {
        name: "Vase",
        lookTitle: "Vase",
        collectionLine: "VID’MY — 2027",
        description: "La peau mystique d’un vase qui permet de voir le monde autrement",
        itemName: "Robe vase",
        attributes: [
          { label: "Matière", value: "Laine feutrée à la main et broderie main" },
          { label: "Silhouette", value: "Vase sculptural" },
          { label: "Collection", value: "VID’MY — 2027" },
          { label: "Production", value: "Haute couture" },
        ],
        accordions: {
          details: "Composition et mesures précises disponibles sur demande. Chaque pièce est confectionnée à la main dans notre atelier.",
          delivery: "Prévoyez 4 à 6 semaines pour les pièces réalisées sur commande. Expédition internationale possible. Les frais d’envoi sont calculés lors de la demande.",
        },
        images: [
          { src: "/assets/images/products/vase_dress.png", alt: "Vase — face" },
          { src: "/assets/images/products/vampire_dress.png", alt: "Vase — détail" },
          { src: "/assets/images/products/goat_dress.png", alt: "Vase — éditorial" },
          { src: "/assets/images/products/cat_dress.png", alt: "Vase — silhouette" },
        ],
      },
    },
  },
  {
    id: "product-blood-current",
    slug: "blood-current",
    kind: "look",
    name: "Black witch",
    lookTitle: "Black witch",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: [
      "placeholder-jacket",
      "placeholder-dress",
      "placeholder-necklace",
      "placeholder-ring",
      "placeholder-accessory",
    ],
    image: "/assets/images/products/red_witch_dress.png",
    images: [
      { src: "/assets/images/products/red_witch_dress.png", alt: "Blood Current — front" },
      { src: "/assets/images/products/cat_dress.png", alt: "Black witch detail" },
      { src: "/assets/images/products/vampire_dress.png", alt: "Bw-editorial" },
      { src: "/assets/images/products/vase_dress.png", alt: "Bw" },
    ],
    type: "request",
    description: "The mystical skin of a black witch that lets you see the world differently",
    attributes: [
      { label: "Material", value: "Hand-felted wool skirt and wool/cashmere blazer" },
      { label: "Silhouette", value: "Witch" },
      { label: "Collection", value: "VID’MY — 2027" },
      { label: "Production", value: "Luxe demi-couture" },
    ],
    accordions: {
      details: "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
    translations: {
      fr: {
        name: "Sorcière noire",
        lookTitle: "Sorcière noire",
        collectionLine: "VID’MY — 2027",
        description: "La peau mystique d’une sorcière noire qui permet de voir le monde autrement",
        attributes: [
          { label: "Matière", value: "Jupe en laine feutrée à la main et blazer en laine/cachemire" },
          { label: "Silhouette", value: "Sorcière" },
          { label: "Collection", value: "VID’MY — 2027" },
          { label: "Production", value: "Demi-couture de luxe" },
        ],
        accordions: {
          details: "Composition et mesures précises disponibles sur demande. Chaque pièce est confectionnée à la main dans notre atelier parisien.",
          delivery: "Prévoyez 4 à 6 semaines pour les pièces réalisées sur commande. Expédition internationale possible. Les frais d’envoi sont calculés lors de la demande.",
        },
        images: [
          { src: "/assets/images/products/red_witch_dress.png", alt: "Blood Current — face" },
          { src: "/assets/images/products/cat_dress.png", alt: "Sorcière noire — détail" },
          { src: "/assets/images/products/vampire_dress.png", alt: "Sorcière noire — éditorial" },
          { src: "/assets/images/products/vase_dress.png", alt: "Sorcière noire — silhouette" },
        ],
      },
    },
  },
  {
    id: "product-nocturne-creature",
    slug: "nocturne-creature",
    kind: "look",
    name: "The CAT",
    lookTitle: "The CAT",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: [
      "placeholder-dress",
      "placeholder-jacket",
      "placeholder-necklace",
      "placeholder-ring",
      "placeholder-accessory",
      "placeholder-boots",
    ],
    image: "/assets/images/products/cat_dress.png",
    images: [
      { src: "/assets/images/products/cat_dress.png", alt: "Nocturne Creature — front" },
      { src: "/assets/images/products/goat_dress.png", alt: "The Cat" },
      { src: "/assets/images/products/red_witch_dress.png", alt: "The Cat" },
      { src: "/assets/images/products/vampire_dress.png", alt: "The Cat" },
    ],
    type: "request",
    description: "The mystical skin of a black cat that lets you see the world differently",
    attributes: [
      { label: "Material", value: "Hand-felted wool and organdy (cotton)" },
      { label: "Silhouette", value: "Cat" },
      { label: "Collection", value: "VID’MY — 2027" },
      { label: "Pants made to order", value: "Available on request" },
    ],
    accordions: {
      details: "Composition and exact measurements available upon request. Each piece is hand-crafted in our Paris atelier.",
      delivery: "Please allow 4–6 weeks for made-to-order pieces. Worldwide shipping available. Shipping cost calculated during inquiry.",
    },
    translations: {
      fr: {
        name: "Le CAT",
        lookTitle: "Le CAT",
        collectionLine: "VID’MY — 2027",
        description: "La peau mystique d’un chat noir qui permet de voir le monde autrement",
        attributes: [
          { label: "Matière", value: "Laine feutrée à la main et organdi (coton)" },
          { label: "Silhouette", value: "Chat" },
          { label: "Collection", value: "VID’MY — 2027" },
          { label: "Pantalon sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details: "Composition et mesures précises disponibles sur demande. Chaque pièce est confectionnée à la main dans notre atelier parisien.",
          delivery: "Prévoyez 4 à 6 semaines pour les pièces réalisées sur commande. Expédition internationale possible. Les frais d’envoi sont calculés lors de la demande.",
        },
        images: [
          { src: "/assets/images/products/cat_dress.png", alt: "Nocturne Creature — face" },
          { src: "/assets/images/products/goat_dress.png", alt: "Le CAT" },
          { src: "/assets/images/products/red_witch_dress.png", alt: "Le CAT" },
          { src: "/assets/images/products/vampire_dress.png", alt: "Le CAT" },
        ],
      },
    },
  },
  placeholderPiece(
    "piece-placeholder-dress",
    "placeholder-dress",
    "Dress",
    "/assets/images/products/vase_dress.png",
  ),
  placeholderPiece(
    "piece-placeholder-jacket",
    "placeholder-jacket",
    "Jacket",
    "/assets/images/products/red_witch_dress.png",
  ),
  placeholderPiece(
    "piece-placeholder-necklace",
    "placeholder-necklace",
    "Necklace",
    "/assets/images/products/vampire_dress.png",
  ),
  placeholderPiece(
    "piece-placeholder-ring",
    "placeholder-ring",
    "Ring",
    "/assets/images/products/goat_dress.png",
  ),
  placeholderPiece(
    "piece-placeholder-accessory",
    "placeholder-accessory",
    "Accessory",
    "/assets/images/products/cat_dress.png",
  ),
  placeholderPiece(
    "piece-placeholder-boots",
    "placeholder-boots",
    "Boots",
    "/assets/images/products/vase_dress.png",
  ),
];

export const collectionLooks = products.filter((product) => product.kind === "look");

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: readonly string[]): Product[] {
  const productsBySlug = new Map(products.map((product) => [product.slug, product]));

  return slugs.flatMap((slug) => {
    const product = productsBySlug.get(slug);
    return product?.kind === "piece" ? [product] : [];
  });
}

export function getProductForLocale(product: Product, locale: string): Product {
  const translation = product.translations?.[locale as "en" | "fr"];
  if (!translation) return product;

  return {
    ...product,
    ...translation,
    images: translation.images ?? product.images,
  };
}
