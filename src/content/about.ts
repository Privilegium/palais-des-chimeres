import type { Locale } from '@/i18n/dictionaries';

export type AboutImage = {
  src: string;
  alt: string;
  position: string;
};

export type AboutLightboxLabels = {
  openImage: string;
  dialogTitle: string;
  close: string;
};

type StoryBlock = {
  eyebrow: string;
  title: string;
  lines: string[];
  image: AboutImage;
};

type AboutContent = {
  hero: {
    title: string;
    intro: string;
    image: AboutImage;
  };
  brandWorld: StoryBlock;
  manifesto: StoryBlock;
  designer: {
    eyebrow: string;
    name: string;
    paragraphs: string[];
    note: string;
    image: AboutImage;
  };
  approach: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  process: {
    eyebrow: string;
    title: string;
    images: AboutImage[];
    lightbox: AboutLightboxLabels;
  };
};

const aboutContent: Record<Locale, AboutContent> = {
  en: {
    hero: {
      title: 'ABOUT',
      intro: 'Palais des Chimères is the world of an emerging designer — where transformation, memory, and handcraft shape the in-between.',
      image: {
        src: '/assets/images/campaign/ggg.jpeg',
        alt: 'Red sculptural garment from Palais des Chimères',
        position: '54% center',
      },
    },
    brandWorld: {
      eyebrow: 'The world',
      title: 'IN THE BETWEEN',
      lines: ['Not quite past, not yet future.', 'Where shift and shell meet.', 'Memory clings. Ritual remains.'],
      image: {
        src: '/assets/images/products/vase_dress.png',
        alt: 'Sculptural ivory garment with hand-finished red embroidery',
        position: 'center 38%',
      },
    },
    manifesto: {
      eyebrow: 'The manifesto',
      title: 'CRAFT AS MEMORY',
      lines: ['Clothes are vessels for becoming.', 'For change. For what lingers.', 'Made slowly, with intention.', 'Rooted in ritual.'],
      image: {
        src: '/assets/images/products/vampire_dress.png',
        alt: 'Figure veiled in translucent red fabric',
        position: 'center 28%',
      },
    },
    designer: {
      eyebrow: 'The designer',
      name: 'CLARA ROUX',
      paragraphs: [
        'Clara Roux is a fashion designer and recent graduate of La Cambre Mode(s), Brussels.',
        'Her work explores transformation, the body as memory, and the space between form and feeling.',
        'Palais des Chimères is her graduation collection and the beginning of an ongoing world — rooted in ritual, instinct, and experimental forms.',
      ],
      note: 'La Cambre Mode(s) — Class of 2024',
      image: {
        src: '/assets/images/products/red_witch_dress.png',
        alt: 'Portrait of the designer in a deep red tailored jacket',
        position: 'center 30%',
      },
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'Our approach',
      items: [
        { title: 'VISION', text: 'Garments that hold presence — pieces that live between art and wear, body and ghost.' },
        { title: 'PROCESS', text: 'Intuitive and research-led. Each piece develops through drape, handcraft, and test.' },
        { title: 'MATERIALS', text: 'Natural fibres, hand embroidery, sculptural techniques, and experimental textiles.' },
      ],
    },
    process: {
      eyebrow: 'In process',
      title: 'In process',
      lightbox: {
        openImage: 'Open image',
        dialogTitle: 'Process image preview',
        close: 'Close image preview',
      },
      images: [
        { src: '/assets/images/products/vase_dress.png', alt: 'Ivory wool and red embroidery detail', position: 'center 70%' },
        { src: '/assets/images/campaign/ggg.jpeg', alt: 'Hands shaping translucent red fabric', position: '18% 52%' },
        { src: '/assets/images/products/vampire_dress.png', alt: 'Layered red veil and sleeve construction', position: '38% 42%' },
        { src: '/assets/images/products/red_witch_dress.png', alt: 'Tailoring and necklace detail in red and black', position: 'center 58%' },
        { src: '/assets/images/campaign/allll111111.jpg', alt: 'The collection assembled at a stone atelier setting', position: 'center 44%' },
        { src: '/assets/images/products/vase_dress.png', alt: 'Sculptural silhouette and appliqué detail', position: 'center 45%' },
      ],
    },
  },
  fr: {
    hero: {
      title: 'À PROPOS',
      intro: 'Palais des Chimères est l’univers d’une créatrice émergente — où transformation, mémoire et geste artisanal façonnent l’entre-deux.',
      image: {
        src: '/assets/images/campaign/ggg.jpeg',
        alt: 'Silhouette sculpturale rouge de Palais des Chimères',
        position: '54% center',
      },
    },
    brandWorld: {
      eyebrow: 'Le monde',
      title: "DANS L’ENTRE-DEUX",
      lines: ['Ni tout à fait passé, ni encore futur.', 'Là où la mue rencontre la carapace.', 'La mémoire s’attache. Le rituel demeure.'],
      image: {
        src: '/assets/images/products/vase_dress.png',
        alt: 'Silhouette ivoire sculpturale brodée à la main en rouge',
        position: 'center 38%',
      },
    },
    manifesto: {
      eyebrow: 'Le manifeste',
      title: 'LE GESTE COMME MÉMOIRE',
      lines: ['Les vêtements sont des espaces de devenir.', 'Pour la mue. Pour ce qui persiste.', 'Façonnés lentement, avec intention.', 'Enracinés dans le rituel.'],
      image: {
        src: '/assets/images/products/vampire_dress.png',
        alt: 'Figure voilée d’une étoffe rouge translucide',
        position: 'center 28%',
      },
    },
    designer: {
      eyebrow: 'La créatrice',
      name: 'CLARA ROUX',
      paragraphs: [
        'Clara Roux est créatrice de mode et jeune diplômée de La Cambre Mode(s), à Bruxelles.',
        'Son travail explore la transformation, le corps comme mémoire et l’espace entre forme et sensation.',
        'Palais des Chimères est sa collection de fin d’études et le commencement d’un monde en mouvement — guidé par le rituel, l’instinct et les formes expérimentales.',
      ],
      note: 'La Cambre Mode(s) — Promotion 2024',
      image: {
        src: '/assets/images/products/red_witch_dress.png',
        alt: 'Portrait de la créatrice en veste structurée rouge profond',
        position: 'center 30%',
      },
    },
    approach: {
      eyebrow: 'Notre approche',
      title: 'Notre approche',
      items: [
        { title: 'VISION', text: 'Des vêtements habités — entre art et usage, corps et spectre.' },
        { title: 'PROCESSUS', text: 'Intuitif et nourri par la recherche. Chaque pièce naît du drapé, de la main et de l’essai.' },
        { title: 'MATIÈRES', text: 'Fibres naturelles, broderie main, techniques sculpturales et textiles expérimentaux.' },
      ],
    },
    process: {
      eyebrow: 'En création',
      title: 'En création',
      lightbox: {
        openImage: 'Ouvrir l’image',
        dialogTitle: 'Aperçu de l’image du processus',
        close: 'Fermer l’aperçu',
      },
      images: [
        { src: '/assets/images/products/vase_dress.png', alt: 'Détail de laine ivoire et de broderie rouge', position: 'center 70%' },
        { src: '/assets/images/campaign/ggg.jpeg', alt: 'Mains travaillant une étoffe rouge translucide', position: '18% 52%' },
        { src: '/assets/images/products/vampire_dress.png', alt: 'Construction superposée d’un voile et de manches rouges', position: '38% 42%' },
        { src: '/assets/images/products/red_witch_dress.png', alt: 'Détail de tailleur rouge et de bijoux noirs', position: 'center 58%' },
        { src: '/assets/images/campaign/allll111111.jpg', alt: 'La collection réunie dans un décor d’atelier en pierre', position: 'center 44%' },
        { src: '/assets/images/products/vase_dress.png', alt: 'Silhouette sculpturale et détail d’appliqué', position: 'center 45%' },
      ],
    },
  },
};

export function getAboutContent(locale: string): AboutContent {
  return aboutContent[locale as Locale] ?? aboutContent.en;
}
