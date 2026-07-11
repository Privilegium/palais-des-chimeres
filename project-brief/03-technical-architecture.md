# 03 — Technical Architecture

## Recommended stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static typed content in TS/JSON files
- FR/EN translation structure
- React Hook Form or equivalent form handling
- Zod or equivalent validation
- Server Action or API route for sending email
- Resend or SMTP provider for email delivery
- Vercel or equivalent low-cost/free hosting

## v1 has no database

No database should be introduced for MVP. Orders/inquiries are sent via email.

## v1 has no payment layer

No Stripe, Snipcart, Shopify, cart, or checkout in v1.

## v1 has no CMS

Content is static but must be structured as if it may later come from CMS.

Correct:

```txt
UI components consume typed content objects.
Content lives outside JSX components.
```

Wrong:

```txt
Product names, prices, translations, and page text scattered directly inside components.
```

## Recommended source structure

```txt
/src
  /app
  /components
    /layout
    /navigation
    /ui
    /product
    /forms
    /legal
  /content
    site.ts
    navigation.ts
    products.ts
    pages.ts
    legal.ts
    contact.ts
  /i18n
    en.ts
    fr.ts
  /types
    product.ts
    inquiry.ts
    page.ts
    navigation.ts
  /lib
    email.ts
    validation.ts
    media.ts
```

## Future-ready architecture

The project should allow these future replacements:

```txt
Static products → CMS products
Inquiry-only order → Payment checkout
Email-only order tracking → Database order records
Static page content → CMS page content
```

without rewriting the full UI.
