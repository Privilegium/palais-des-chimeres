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
      title: 'About the Brand',
      intro: 'In Ukrainian, the name Vyshnevetska translates to "cherry"—a metaphor that perfectly captures the essence of the brand. Like the fruit, the label is a study in captivating contrasts: sweet and alluring, yet possessing a sharp, tart edge that makes it unforgettable.\n\nPalais Des Chimères is a demi-couture house focused on wearable art. Crafted from premium materials with impeccable tailoring, these garments are designed to act as a second skin. They are an invitation to shift your perspective. By stepping into a piece, the wearer is encouraged to leave the ordinary behind, look at the world through a new skin, and embrace the transformative power of becoming a chimera.',
      image: {
        src: '/assets/images/campaign/ggg.jpeg',
        alt: 'Red sculptural garment from Palais des Chimères',
        position: '54% center',
      },
    },
    brandWorld: {
      eyebrow: 'The world',
      title: 'VID’MY',
      lines: [
        'The collection is inspired by an ancient Ukrainian belief that every being and every object possesses its own skin through which it perceives reality. Humans see one world, while other beings may simultaneously witness another. Reality is never singular; it depends on who—or what—is looking.',
        'The story follows a group of young witches who gather in the forest to perform a ritual. A black cat watches them silently, acting as a guide between two worlds. During the ritual, something shifts. The witches cross into what appears to be the afterlife, where the boundaries between consciousness and madness dissolve. Only the cat remains unchanged, observing their transformation.',
        'Yet the narrative deliberately leaves questions unanswered. Did the witches truly enter another realm, or did they simply experience the reality the cat chose to reveal? And perhaps the most unsettling question is: was the cat ever truly a cat?',
        'Each look represents a different state of seeing, blurring the boundaries between reality, illusion, folklore, and memory.',
        'Ultimately, Vid’my proposes that clothing can transform not only the body but also the way we experience the world. By wearing these pieces, one symbolically adopts another perspective—seeing reality through a different skin.',
      ],
      image: {
        src: '/assets/images/products/vaza/vaza-editorial.webp',
        alt: 'Sculptural ivory garment with hand-finished red-pink embroidery',
        position: 'center 38%',
      },
    },
    manifesto: {
      eyebrow: 'The manifesto',
      title: 'See the world through a different skin',
      lines: ['Because each garment is crafted as a living creature, the wearer transforms into a chimera, stepping into a palace of chimeras.'],
      image: {
        src: '/assets/images/products/red-witch/red-witch-editorial.webp',
        alt: 'Figure veiled in translucent red fabric',
        position: 'center 28%',
      },
    },
    designer: {
      eyebrow: 'The designer',
      name: 'Diana Vyshnevetska',
      paragraphs: [
        'About the Designer',
        'Diana Vyshnevetska is an emerging fashion designer with a deep commitment to traditional craftsmanship. Launching her eponymous label is the realization of a lifelong dream, built upon nearly a decade of dedicated training.',
        'Before graduating from ESMOD France, Diana spent six years studying fine and applied arts, earning a degree in fashion design alongside professional embroidery training. Today, she brings this highly technical, hands-on approach to everything she creates, personally guiding her designs from the first sketch to the final hand-stitched detail. Finally, she is trying to show people the world of fashion through her unique prism of vision.',
      ],
      note: '',
      image: {
        src: '/assets/images/products/black-witch/black-witch-editorial.webp',
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
        { src: '/assets/images/products/vaza/vaza-editorial.webp', alt: 'Ivory wool and red-pink embroidery details', position: 'center 70%' },
        { src: '/assets/images/campaign/ggg.jpeg', alt: 'Hands shaping translucent red fabric', position: '18% 52%' },
        { src: '/assets/images/products/red-witch/red-witch-editorial.webp', alt: 'Layered red veil and sleeve construction', position: '38% 42%' },
        { src: '/assets/images/products/black-witch/black-witch-editorial.webp', alt: 'Tailoring and necklace detail in red and black', position: 'center 58%' },
        { src: '/assets/images/campaign/allll111111.jpg', alt: 'The collection assembled at a stone atelier setting', position: 'center 44%' },
        { src: '/assets/images/products/vaza/vaza-editorial.webp', alt: 'Sculptural silhouette and appliqué detail', position: 'center 45%' },
      ],
    },
  },
  fr: {
    hero: {
      title: 'À PROPOS',
      intro: 'En ukrainien, le nom Vyshnevetska signifie « cerise » — une métaphore qui capture parfaitement l’essence de la marque. Comme le fruit, le label est une étude de contrastes captivants : doux et séduisant, mais doté d’une pointe vive et acidulée qui le rend inoubliable.\n\nPalais Des Chimères est une maison de demi-couture dédiée à l’art portable. Confectionnés dans des matières premium avec une coupe impeccable, ces vêtements sont pensés comme une seconde peau. Ils invitent à déplacer son regard. En revêtant une pièce, on est encouragé à laisser l’ordinaire derrière soi, à regarder le monde à travers une nouvelle peau et à accueillir le pouvoir transformateur du devenir chimère.',
      image: {
        src: '/assets/images/campaign/ggg.jpeg',
        alt: 'Silhouette sculpturale rouge de Palais des Chimères',
        position: '54% center',
      },
    },
    brandWorld: {
      eyebrow: 'Le monde',
      title: 'VID’MY',
      lines: [
        'La collection s’inspire d’une ancienne croyance ukrainienne selon laquelle chaque être et chaque objet possède sa propre peau à travers laquelle il perçoit la réalité. Les humains voient un monde, tandis que d’autres êtres peuvent en observer simultanément un autre. La réalité n’est jamais singulière : elle dépend de celui — ou de ce — qui regarde.',
        'L’histoire suit un groupe de jeunes sorcières qui se réunissent dans la forêt pour accomplir un rituel. Un chat noir les observe en silence, comme un guide entre deux mondes. Pendant le rituel, quelque chose bascule. Les sorcières passent dans ce qui semble être l’au-delà, là où les frontières entre conscience et folie se dissolvent. Seul le chat reste inchangé, témoin de leur transformation.',
        'Pourtant, le récit laisse volontairement les questions ouvertes. Les sorcières ont-elles réellement pénétré dans un autre monde, ou ont-elles simplement vécu la réalité que le chat a choisi de révéler ? Et peut-être la question la plus troublante est-elle celle-ci : le chat a-t-il vraiment été un chat ?',
        'Chaque silhouette représente un état différent du regard, brouillant les frontières entre réalité, illusion, folklore et mémoire.',
        'En définitive, Vid’my propose que le vêtement puisse transformer non seulement le corps, mais aussi notre manière d’expérimenter le monde. En portant ces pièces, on adopte symboliquement une autre perspective — on voit la réalité à travers une peau différente.',
      ],
      image: {
        src: '/assets/images/products/vaza/vaza-editorial.webp',
        alt: 'Silhouette ivoire sculpturale brodée à la main en rouge et rose',
        position: 'center 38%',
      },
    },
    manifesto: {
      eyebrow: 'Le manifeste',
      title: 'Voir le monde à travers une peau différente',
      lines: ['Parce que chaque vêtement est façonné comme une créature vivante, la personne qui le porte se transforme en chimère et entre dans un palais de chimères.'],
      image: {
        src: '/assets/images/products/red-witch/red-witch-editorial.webp',
        alt: 'Figure voilée d’une étoffe rouge translucide',
        position: 'center 28%',
      },
    },
    designer: {
      eyebrow: 'La créatrice',
      name: 'Diana Vyshnevetska',
      paragraphs: [
        'À propos de la créatrice',
        'Diana Vyshnevetska est une créatrice de mode émergente profondément attachée aux savoir-faire traditionnels. Le lancement de sa maison éponyme réalise un rêve de longue date, construit sur près d’une décennie de formation assidue.',
        'Avant d’être diplômée d’ESMOD France, Diana a étudié pendant six ans les arts plastiques et appliqués, obtenant un diplôme en design de mode ainsi qu’une formation professionnelle en broderie. Aujourd’hui, elle apporte cette approche technique et manuelle à chacune de ses créations, en guidant personnellement ses designs du premier croquis au dernier détail cousu à la main. Elle cherche ainsi à montrer le monde de la mode à travers son prisme singulier.',
      ],
      note: '',
      image: {
        src: '/assets/images/products/black-witch/black-witch-editorial.webp',
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
        { src: '/assets/images/products/vaza/vaza-editorial.webp', alt: 'Détails de laine ivoire et de broderie rouge et rose', position: 'center 70%' },
        { src: '/assets/images/campaign/ggg.jpeg', alt: 'Mains travaillant une étoffe rouge translucide', position: '18% 52%' },
        { src: '/assets/images/products/red-witch/red-witch-editorial.webp', alt: 'Construction superposée d’un voile et de manches rouges', position: '38% 42%' },
        { src: '/assets/images/products/black-witch/black-witch-editorial.webp', alt: 'Détail de tailleur rouge et de bijoux noirs', position: 'center 58%' },
        { src: '/assets/images/campaign/allll111111.jpg', alt: 'La collection réunie dans un décor d’atelier en pierre', position: 'center 44%' },
        { src: '/assets/images/products/vaza/vaza-editorial.webp', alt: 'Silhouette sculpturale et détail d’appliqué', position: 'center 45%' },
      ],
    },
  },
};

export function getAboutContent(locale: string): AboutContent {
  return aboutContent[locale as Locale] ?? aboutContent.en;
}
