export type ProductAttribute = {
  label: string;
  value: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  /** Optional editorial crop used when one campaign image represents several pieces. */
  position?: string;
  /** Product-only shots use contain; campaign crops can opt into cover. */
  fit?: "cover" | "contain";
};

export type ProductKind = "look" | "piece";

export type ProductTranslation = {
  name: string;
  lookTitle?: string;
  collectionLine?: string;
  price?: string;
  type?: "priced" | "request";
  description: string;
  itemName?: string;
  attributes: ProductAttribute[];
  accordions?: {
    details?: string;
    delivery?: string;
  };
  images?: ProductImage[];
};

export type Product = {
  id: string;
  slug: string;
  /** A Collection card is a complete look; a piece is an individual item within a look. */
  kind: ProductKind;
  name: string;
  /** Complete-look title shown as the PDP heading. */
  lookTitle?: string;
  /** Short eyebrow shown above the title, e.g. "VID’MY — 2027" */
  collectionLine?: string;
  /** Primary image (also used as first gallery image) */
  image: string;
  /** Crop used for the product card when the source is a wider campaign image. */
  imagePosition?: string;
  /** Optional zoom used only inside the compact related-product card. */
  relatedImageScale?: number;
  /** Full gallery — if omitted, only the primary image is shown */
  images?: ProductImage[];
  price?: string;
  type: "priced" | "request";
  /** Editorial description of the complete look or individual piece. */
  description: string;
  /** Name of the specific sellable item, distinct from the look title. */
  itemName?: string;
  attributes: ProductAttribute[];
  /** Content for the accordion sections on the PDP */
  accordions?: {
    details?: string;
    delivery?: string;
  };
  /** Ordered PDP slugs for the individual pieces that make up this look. */
  relatedPieceSlugs?: string[];
  translations?: Partial<Record<"en" | "fr", ProductTranslation>>;
};

export type InquirySourceContext =
  | {
      sourceType: "product_inquiry";
      sourceLabel: string;
      productId: string;
      productSlug: string;
      productName: string;
      productType: "priced" | "request";
      productPrice?: string;
      pageUrl?: string;
      locale: "en" | "fr";
    }
  | {
      sourceType: "contact_form";
      sourceLabel: string;
      pageUrl?: string;
      locale: "en" | "fr";
    };

export type InquiryFormValues = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  message: string;
};
