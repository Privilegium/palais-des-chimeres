export type ProductAttribute = {
  label: string;
  value: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Short eyebrow shown above the title, e.g. "VIDMY — 2026" */
  collectionLine?: string;
  /** Primary image (also used as first gallery image) */
  image: string;
  /** Full gallery — if omitted, only the primary image is shown */
  images?: ProductImage[];
  price?: string;
  type: "priced" | "request";
  shortDescription: string;
  attributes: ProductAttribute[];
  /** Content for the accordion sections on the PDP */
  accordions?: {
    details?: string;
    delivery?: string;
  };
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
