# 04 — Content Model

## Product model

Each product must have a stable ID and slug for future CMS migration.

```ts
type ProductStatus = "available" | "made-to-order" | "request-only" | "archived";
type ProductType = "priced" | "request";

type Product = {
  id: string;
  slug: string;
  status: ProductStatus;
  type: ProductType;
  price?: number;
  currency?: "EUR";
  featured?: boolean;
  collection: string;
  mainImage: string;
  galleryImages: string[];
  relatedProductIds?: string[];
  translations: {
    en: ProductTranslation;
    fr: ProductTranslation;
  };
  attributes: ProductAttributes;
};

type ProductTranslation = {
  name: string;
  shortDescription: string;
  description?: string;
  ctaLabel: string;
};

type ProductAttributes = {
  material?: string;
  silhouette?: string;
  collection?: string;
  madeToOrder?: string;
  care?: string;
  details?: string[];
};
```

## Product CTA logic

Priced product:

```txt
Show price.
CTA: Order.
CTA opens inquiry modal.
```

Request-only product:

```txt
Do not show price.
Show: Personal request.
CTA opens inquiry modal.
```

## Page content model

Page content should also be separated from components.

```ts
type PageContent = {
  slug: string;
  translations: {
    en: LocalizedPageContent;
    fr: LocalizedPageContent;
  };
};
```

## Contact links

Final approved contact links:

```txt
Instagram
LinkedIn
Email
Portfolio
```

Do not include in v1 contact layout:

```txt
Appointments
Studio
```
