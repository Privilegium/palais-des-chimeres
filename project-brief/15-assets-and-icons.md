# 15 — Assets & Icons Notes

This ZIP intentionally does not include the `/assets` folder.

Use the existing project asset folders for images, icons, logos, and mockups.

## Recommended icon format

Prefer SVG for icons and ornaments.

PNG fallback is acceptable, but SVG is better for:

- scaling
- hover color changes
- smaller file size
- consistent line rendering

## Approved / required icon set

Social / contact:

- Instagram
- LinkedIn
- Email
- Portfolio / open book

UI:

- Play
- Plus
- Chevron down
- Scroll-to-explore

Decorative:

- small starburst ornament
- thorn divider / flourish
- small cross/star marker

## Sizing guidance

```txt
Small header/social icon: 20–24px
Contact link icons: 28–32px
Plus/chevron UI icons: 16–24px
Decorative star: 12–24px depending on placement
Thorn divider: width 80–180px depending on placement
Source artboard: 64x64 or larger for simple icons
```

## Color guidance

Default icon color:

```txt
warm muted gold
```

Alternative icon colors:

```txt
ivory for header/social icons
deep red for active states only
```

## Notes for implementation

Do not rely on raster screenshots for icons when SVG recreation is possible.

If using generated PNG icons, crop and optimize them before shipping.
