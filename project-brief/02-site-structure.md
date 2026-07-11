# 02 — Site Structure

## Routes

Recommended locale-prefixed structure:

```txt
/[locale]
/[locale]/collection
/[locale]/collection/[slug]
/[locale]/film
/[locale]/about
/[locale]/contact
/[locale]/shipping-returns
/[locale]/legal-notice
/[locale]/privacy-policy
/[locale]/payment-ordering
/[locale]/terms
```

## Pages

### Home

One-screen editorial hero page.

- No internal footer.
- Fullscreen hero image.
- Header over image.
- Minimal navigation.
- Centered logo.

### Collection / PLP

Editorial, non-standard product listing.

- Asymmetric product layout.
- Large product cards.
- Commerce hints but not generic e-commerce.

### Product Detail / PDP

Clean luxury product page.

- Product gallery.
- Main product image.
- Price or request-only state.
- Order / Personal Request CTA.
- Inquiry modal.
- Related looks.
- Internal footer.

### Fashion Film

One-screen cinematic poster-first page.

- Not a simple iframe.
- Initial state uses poster / hero image.
- Video loads only after `Watch Film` click.
- Internal footer.

### About

Scrollable emerging designer page.

- 2 brand blocks.
- 1 designer block.
- Optional 3 approach cards.
- Process image grid.
- Internal footer.

### Contact

One-screen split layout.

- Form and links on one side.
- Large editorial photo on the other.
- 4 contact links in 2 rows.
- Internal footer.

### Legal / Text pages

Reusable scrollable legal/info template.

- Title area.
- Left section nav.
- Right article content.
- Optional bottom red fabric strip.
- Internal footer.

## Footer rule

Homepage: no internal footer.

All internal pages: use the shared internal footer:

```txt
PALAIS DES CHIMÈRES — AW24
SHIPPING & RETURNS
TERMS
PRIVACY
```
