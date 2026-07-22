# Image asset naming for Palais des Chimères

Put every new image into one upload folder. The filename is the mapping key, so use lowercase ASCII, hyphens, and one stable role suffix. Do not use spaces, accents, dates, or camera-generated names.

## Naming pattern

```text
<area>__<entity>__<role>.<extension>
```

Use these roles:

- `card` — collection/jewelry preview card.
- `main` — primary image on the page or product detail page.
- `support-01`, `support-02`, `support-03` — additional gallery images in display order.
- `hero` — full-bleed page hero.
- `poster` — film poster.
- `process-01`, `process-02` — About/process gallery images.

## Examples

```text
home__vidmy__hero.webp
contact__editorial__main.webp
about__brand-world__main.webp
about__process__process-01.webp
film__vidmy__poster.webp

product__red-witch__card.webp
product__red-witch__main.webp
product__red-witch__support-01.webp
product__red-witch__support-02.webp
product__red-witch__support-03.webp

product__koza__card.webp
product__koza__main.webp
product__koza__support-01.webp
```

For a future split into separate pieces, use the exact piece as the entity instead of a look name:

```text
product__red-witch-cape__main.webp
product__red-witch-hood__main.webp
product__red-witch-top__main.webp
product__red-witch-skirt__main.webp
```

`film` stays unchanged for the MVP. Do not replace its poster or stills unless requested. Contact imagery can stay unchanged until a file with a stable `contact__...` name is supplied.

## Upload checklist

1. Keep the original aspect ratio and export a web-sized JPG or WebP; use PNG only when transparency is required.
2. Upload one `card`, one `main`, and up to three `support-*` files for each product.
3. Keep the same filename when replacing an image; that lets the code keep the placement.
4. Add a short human-readable alt description in the content mapping when the image is editorial, process, or detail photography.
5. Do not upload multiple versions with names such as `final-2`, `new`, or `latest`; create a deliberate role name instead.
