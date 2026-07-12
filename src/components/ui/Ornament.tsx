/**
 * Ornament.tsx — shared decorative SVG ornament components
 *
 * WHY THIS EXISTS:
 * Both approved ornament SVGs have large internal canvases:
 *   - star-ornament.svg: 1254×1254 viewBox, artwork at x:338–919 y:329–897 (≈46% of canvas)
 *   - woven-ornament.svg: wide/horizontal canvas, artwork in center
 *
 * Rendering them at a small explicit width/height causes the visible artwork
 * to be a fraction of that size. The fix: render the image larger than the
 * container, use overflow:hidden to clip to the desired visual size.
 *
 * USAGE:
 *   <StarOrnament size={22} className="opacity-60" />
 *   <WovenOrnament width={140} className="opacity-55" />
 */

import Image from 'next/image';

interface StarOrnamentProps {
  /** Target visual diameter in px. The image renders at size/0.46 and is clipped. */
  size?: number;
  className?: string;
}

/**
 * Four-point star ornament from /assets/icons/star-ornament.svg.
 * Artwork occupies ~46% of the 1254×1254 viewBox — rendered larger + clipped.
 */
export function StarOrnament({ size = 22, className = '' }: StarOrnamentProps) {
  const rendered = Math.round(size / 0.46);
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/icons/star-ornament.svg"
        alt=""
        width={rendered}
        height={rendered}
        className="max-w-none shrink-0"
      />
    </span>
  );
}

interface WovenOrnamentProps {
  /** Desired display width in px. Height scales automatically. */
  width?: number;
  /** Display height in px. Defaults to auto (woven-ornament.svg canvas is wide/horizontal). */
  height?: number;
  className?: string;
}

/**
 * Wide woven divider from the approved `assets/icons/woven-ornament.svg`.
 */
export function WovenOrnament({ width = 140, height = 16, className = '' }: WovenOrnamentProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width, height }}
    >
      <Image
        src="/assets/icons/woven-ornament.svg"
        alt=""
        fill
        className="object-fill"
        style={{ filter: 'invert(66%) sepia(29%) saturate(722%) hue-rotate(359deg) brightness(86%) contrast(85%)' }}
      />
    </span>
  );
}
