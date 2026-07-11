# 05 — i18n Strategy

## Locales

Supported locales:

- `en`
- `fr`

Default locale can be confirmed later. The route structure should support both.

## Routing

Use locale-prefixed routes:

```txt
/en/collection
/fr/collection
/en/contact
/fr/contact
```

## Rules

- Do not duplicate full pages per language.
- Do not hardcode translated strings directly in JSX.
- Keep navigation labels in translation files or typed localized objects.
- Product names, descriptions, CTA labels, and attributes must support both languages.
- Form labels and validation messages must support both languages.
- Legal pages must support both languages.

## Static but scalable

Even if all content is static in v1, structure it as localized objects so a CMS can later replace the content source.
