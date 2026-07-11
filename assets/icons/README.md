# Palais des Chimères — fixed SVG icon pack v2

This pack fixes the icon files themselves:

- tight viewBoxes with almost no internal whitespace;
- stronger line weights for real display sizes;
- useful intrinsic width/height values;
- `currentColor` for Tailwind/CSS coloring;
- exactly two decorative ornament files:
  - `star-ornament.svg`
  - `woven-ornament.svg`

## Important

Replacing files alone cannot override a component that forces an icon into a `20px × 20px`
wrapper or applies `max-width: 100%` inside a small parent.

When replacing the files, also remove accidental `w-5 h-5`, `size-5`, `max-w-full`,
or 20px parent constraints from Contact link icons and other large icon placements.

Use the included `icon-size-reference.css` as the sizing reference.

## Recommended display sizes

- Contact/social icons: 36–48px
- Header Instagram: 20px
- Star ornament: 20–28px
- Wide woven ornament: 110–180px wide, height auto
- Product gallery arrow control: 38–48px

## Files

Functional:
- instagram.svg
- linkedin.svg
- email.svg
- portfolio-book.svg
- play.svg
- plus.svg
- chevron-left.svg
- chevron-right.svg
- close.svg

Decorative:
- star-ornament.svg
- woven-ornament.svg
