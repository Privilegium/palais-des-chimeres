# Palais des Chimères content guide

This website is a static editorial catalogue. Content lives in a few named TypeScript files; no CMS, database, cart, or admin area is required.

## Products

Edit [src/data/products.ts](src/data/products.ts). Each product has one clearly marked entry.

- `name` — product name
- `price` — price for a priced piece; omit it for a request-only piece
- `type` — use `"priced"` or `"request"`
- `shortDescription` — the short text shown on the product page
- `attributes` — the product details list (material, silhouette, collection, etc.)
- `accordions` — the longer details and delivery text
- `images` — the full product gallery

To add a gallery image, add one more line inside that product’s `images` list. For example:

```ts
{ src: '/assets/images/products/veil-of-becoming-detail-02.webp', alt: 'Veil of Becoming — embroidered detail' },
```

No change to the gallery component is needed. The thumbnail rail will scroll automatically when a gallery has more images than fit on screen.

## About page

Edit [src/content/about.ts](src/content/about.ts). This file contains the English and French copy, image captions, and process-gallery images for the About page. Find the `en` or `fr` block, then edit the section you need (`hero`, `brandWorld`, `manifesto`, `designer`, `approach`, or `process`).

## Contact page

Edit the `CONTACT_LINKS` list near the top of [src/app/[locale]/contact/page.tsx](src/app/[locale]/contact/page.tsx). Each entry controls one of the four approved contact links: Instagram, LinkedIn, Email, and Portfolio. Update `sub` for the visible address/handle and `href` for its destination.

## Legal pages

Legal content is held in the `legalPages` data near the top of [src/app/[locale]/legal/[slug]/page.tsx](src/app/[locale]/legal/[slug]/page.tsx). Each page contains named numbered sections. Update the text there carefully and have it legally reviewed before launch.

## English and French

Shared interface translations, including navigation and common buttons, are in [src/i18n/dictionaries.ts](src/i18n/dictionaries.ts). Edit the `en` or `fr` object. About copy already has separate `en` and `fr` content in `src/content/about.ts`.

When adding a new product or legal page, provide both language versions before publishing. Product content currently shares the typed product model in `src/data/products.ts`; add localized fields there when separate product copy is ready.

## Images

Place production images in:

- Product and gallery images: `public/assets/images/products/`
- Campaign, About, Contact, and Film images: `public/assets/images/campaign/`
- Logo files: `public/assets/images/logo/`

Use lowercase filenames with hyphens, for example `veil-of-becoming-detail-02.webp`. Avoid spaces and changing an existing filename without updating every content reference.

Use `.webp`, `.jpg`, or `.png` images. Prefer `.webp` or high-quality `.jpg` for photographs; use `.png` only when transparency is needed.

Recommended source dimensions:

- Product/gallery photography: 2400 × 3200 px (3:4 portrait)
- Campaign/contact/editorial photography: at least 2400 px on the longest edge
- About process images: at least 1600 × 1200 px
- Logos: transparent PNG or SVG

Keep images sharp, avoid embedded text, and ensure each image has an accurate `alt` description in its content entry.

## Inquiry email delivery

All form submissions are delivered to `opryshkosm@gmail.com`. Create a local `.env.local` file from `.env.example` and add a Resend API key plus a sender address on a verified domain. Product inquiries include the product name, ID, price, and product-page source; general inquiries are labelled `Main website contact form`.
