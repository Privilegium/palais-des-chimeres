import { Product } from "@/types";

/*
  Collection cards use records with kind: "look". Individual garments use the
  same Product model with kind: "piece", so every page continues to use the
  existing /[locale]/collection/[slug] route.
*/

const CAMPAIGN_IMAGE = "/assets/images/campaign/allll111111.jpg";
const RED_DETAIL_IMAGE = "/assets/images/campaign/ggg.jpeg";

export const products: Product[] = [
  {
    id: "product-veil-of-becoming",
    slug: "veil-of-becoming",
    kind: "look",
    name: "Red Witch",
    lookTitle: "Red Witch",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: [
      "horned-red-top",
      "red-jersey-skirt",
      "red-silk-veiled-hood",
    ],
    image: "/assets/images/products/vampire_dress.png",
    images: [
      {
        src: "/assets/images/products/vampire_dress.png",
        alt: "Red Witch in the floor-length silk cape and veiled hood",
      },
      {
        src: RED_DETAIL_IMAGE,
        alt: "Red Witch sculptural jersey top detail",
        fit: "cover",
        position: "center",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "Red Witch complete look in the VID’MY campaign",
        fit: "cover",
        position: "72% center",
      },
    ],
    price: "€1,300",
    type: "priced",
    description:
      "Red Witch is built in layers: a floor-length silk cape, a veiled hood and a fitted red jersey set traced with padded horns. Softness turns strange against the body, somewhere between ceremony and protection.",
    itemName: "Red Silk Cape",
    attributes: [
      { label: "Material", value: "Red silk organza, black metal hooks" },
      { label: "Silhouette", value: "Floor-length cape with sculpted sleeves" },
      { label: "Finish", value: "Layered back panel and black sequin embroidery" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:
        "A floor-length cape cut with an additional back layer that falls beyond the main hem. The rounded sleeves hold their volume through the elbow before narrowing at the wrist, while two black metal hooks close the neckline. A house label finished with black sequin embroidery completes the piece.",
    },
    translations: {
      fr: {
        name: "Sorcière rouge",
        lookTitle: "Sorcière rouge",
        collectionLine: "VID’MY — 2027",
        price: "1 300 €",
        type: "priced",
        description:
          "Sorcière rouge se construit par strates : une cape de soie jusqu’au sol, une cagoule voilée et un ensemble ajusté en jersey rouge parcouru de cornes rembourrées. La douceur devient étrange au contact du corps, entre rituel et protection.",
        itemName: "Cape en soie rouge",
        attributes: [
          { label: "Matière", value: "Organza de soie rouge, crochets en métal noir" },
          { label: "Silhouette", value: "Cape longue aux manches sculptées" },
          { label: "Finition", value: "Panneau dos superposé et broderie de sequins noirs" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details:
            "Une cape jusqu’au sol, prolongée dans le dos par un second panneau plus long que l’ourlet principal. Les manches arrondies gardent leur volume au niveau du coude puis se resserrent au poignet ; deux crochets en métal noir ferment l’encolure. Une étiquette de la maison brodée de sequins noirs signe la pièce.",
        },
        images: [
          {
            src: "/assets/images/products/vampire_dress.png",
            alt: "Sorcière rouge portant la cape longue et la cagoule voilée",
          },
          {
            src: RED_DETAIL_IMAGE,
            alt: "Détail du top rouge sculptural de Sorcière rouge",
            fit: "cover",
            position: "center",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Silhouette complète Sorcière rouge dans la campagne VID’MY",
            fit: "cover",
            position: "72% center",
          },
        ],
      },
    },
  },
  {
    id: "product-chimera-form",
    slug: "chimera-form",
    kind: "look",
    name: "KOZA",
    lookTitle: "KOZA",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: ["koza-corset"],
    image: "/assets/images/products/goat_dress.png",
    images: [
      {
        src: "/assets/images/products/goat_dress.png",
        alt: "KOZA coat and layered tulle corset",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "KOZA complete look in the VID’MY campaign",
        fit: "cover",
        position: "52% center",
      },
    ],
    price: "€2,570",
    type: "priced",
    description:
      "KOZA brings weight, texture and animal geometry into one silhouette. Vintage cowhide, hand-felted wool and layered tulle turn the body into the imagined skin of a creature.",
    itemName: "KOZA Coat",
    attributes: [
      { label: "Material", value: "Vintage cowhide and hand-felted wool" },
      { label: "Length", value: "Below the knee, above the ankle" },
      { label: "Closure", value: "60 cm black metal zip" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:
        "The long coat moves from black to white through hand-felted wool set against vintage cowhide. A leather corset panel and a 60 cm black metal zip structure the centre. Felted forms in three sizes cover the lower body; each is filled with a light hypoallergenic padding, though the finished coat retains a substantial sculptural weight.",
    },
    translations: {
      fr: {
        name: "KOZA",
        lookTitle: "KOZA",
        collectionLine: "VID’MY — 2027",
        price: "2 570 €",
        type: "priced",
        description:
          "KOZA réunit poids, texture et géométrie animale dans une seule silhouette. Cuir de vache vintage, laine feutrée à la main et couches de tulle transforment le corps en peau de créature imaginaire.",
        itemName: "Manteau KOZA",
        attributes: [
          { label: "Matière", value: "Cuir de vache vintage et laine feutrée à la main" },
          { label: "Longueur", value: "Sous le genou, au-dessus de la cheville" },
          { label: "Fermeture", value: "Zip en métal noir de 60 cm" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details:
            "Ce long manteau passe du noir au blanc grâce à une laine feutrée à la main associée à du cuir de vache vintage. Un empiècement corseté en cuir et un zip noir en métal de 60 cm structurent le centre. Des volumes feutrés de trois tailles couvrent le bas du vêtement ; chacun renferme un rembourrage hypoallergénique léger, même si la pièce conserve un poids sculptural marqué.",
        },
        images: [
          {
            src: "/assets/images/products/goat_dress.png",
            alt: "Manteau KOZA et corset en tulle superposé",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Silhouette complète KOZA dans la campagne VID’MY",
            fit: "cover",
            position: "52% center",
          },
        ],
      },
    },
  },
  {
    id: "product-ivory-bloom",
    slug: "ivory-bloom",
    kind: "look",
    name: "Vaza",
    lookTitle: "Vaza",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: ["vaza-pink-denim-jacket"],
    image: "/assets/images/products/vase_dress.png",
    images: [
      {
        src: "/assets/images/products/vase_dress.png",
        alt: "Vaza hand-felted wool dress",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "Vaza dress with the cropped pink denim jacket",
        fit: "cover",
        position: "12% center",
      },
    ],
    price: "€4,500",
    type: "priced",
    description:
      "Vaza begins with an impossible proportion: wool felted by hand into the rounded body of a vessel. A cropped pink denim jacket repeats that volume through its sleeves, giving the look both softness and structure.",
    itemName: "Vaza Dress",
    attributes: [
      { label: "Material", value: "Hand-felted wool" },
      { label: "Structure", value: "Reinforced mesh and internal boning" },
      { label: "Embroidery", value: "Hand-worked in red and pink thread" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:
        "Every textile section of the dress is felted by hand. Reinforced mesh and internal boning hold its rounded vase form, while a large cutwork-style embroidery is worked by hand in red and pink thread. The deep neckline, straps and interior edges are finished by hand with applied ribbon; a hook-and-eye style fastening closes the back.",
    },
    translations: {
      fr: {
        name: "Vaza",
        lookTitle: "Vaza",
        collectionLine: "VID’MY — 2027",
        price: "4 500 €",
        type: "priced",
        description:
          "Vaza part d’une proportion presque impossible : une laine feutrée à la main jusqu’à former le corps arrondi d’un vase. Une courte veste en denim rose reprend ce volume dans les manches et donne à la silhouette autant de douceur que de structure.",
        itemName: "Robe Vaza",
        attributes: [
          { label: "Matière", value: "Laine feutrée à la main" },
          { label: "Structure", value: "Résille renforcée et baleines intérieures" },
          { label: "Broderie", value: "Réalisée à la main en fils rouge et rose" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details:
            "Chaque partie textile de la robe est feutrée à la main. Une résille renforcée et des baleines intérieures maintiennent sa forme arrondie, tandis qu’une grande broderie ajourée est travaillée à la main avec des fils rouge et rose. Le décolleté profond, les bretelles et les bords intérieurs sont finis à la main par un ruban appliqué ; une fermeture de type agrafes ferme le dos.",
        },
        images: [
          {
            src: "/assets/images/products/vase_dress.png",
            alt: "Robe Vaza en laine feutrée à la main",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Robe Vaza portée avec la veste courte en denim rose",
            fit: "cover",
            position: "12% center",
          },
        ],
      },
    },
  },
  {
    id: "product-blood-current",
    slug: "blood-current",
    kind: "look",
    name: "Black Witch",
    lookTitle: "Black Witch",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: ["black-witch-felted-skirt"],
    image: "/assets/images/products/red_witch_dress.png",
    images: [
      {
        src: "/assets/images/products/red_witch_dress.png",
        alt: "Black Witch sculpted cherry jacket",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "Black Witch jacket and long felted skirt",
        fit: "cover",
        position: "34% center",
      },
    ],
    price: "€1,450",
    type: "priced",
    description:
      "Black Witch holds the body between two opposing lines: a sharply fitted jacket that blooms around the hips, and a long felted skirt weighted with dark, irregular volume.",
    itemName: "Black Witch Sculpted Jacket",
    attributes: [
      { label: "Material", value: "Wool and cashmere, black silk lining" },
      { label: "Structure", value: "Internal frame shaping the hips" },
      { label: "Hardware", value: "Red metal front and sleeve zips" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:
        "The dark cherry jacket is closely fitted through the torso, then held away from the body by an internal frame that creates a clean circular volume at the hips. Dropped shoulders lead into sleeves that widen towards the cuff. A red metal zip closes the front, while a second zip on each sleeve can be opened from cuff to upper arm. The tailored collar is reinforced and the interior is lined in black silk.",
    },
    translations: {
      fr: {
        name: "Sorcière noire",
        lookTitle: "Sorcière noire",
        collectionLine: "VID’MY — 2027",
        price: "1 450 €",
        type: "priced",
        description:
          "Sorcière noire maintient le corps entre deux lignes opposées : une veste très ajustée qui s’épanouit autour des hanches, et une longue jupe feutrée chargée d’un volume sombre et irrégulier.",
        itemName: "Veste sculptée Sorcière noire",
        attributes: [
          { label: "Matière", value: "Laine et cachemire, doublure en soie noire" },
          { label: "Structure", value: "Armature intérieure dessinant les hanches" },
          { label: "Métallerie", value: "Zips rouges en métal devant et aux manches" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details:
            "Cette veste cerise sombre épouse étroitement le buste, puis s’éloigne du corps grâce à une armature intérieure qui dessine un volume circulaire net autour des hanches. Les épaules tombantes se prolongent par des manches évasées vers le poignet. Un zip rouge en métal ferme le devant ; un second zip sur chaque manche peut s’ouvrir du poignet jusqu’au haut du bras. Le col tailleur est renforcé et l’intérieur doublé de soie noire.",
        },
        images: [
          {
            src: "/assets/images/products/red_witch_dress.png",
            alt: "Veste cerise sculptée Sorcière noire",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Veste Sorcière noire et longue jupe feutrée",
            fit: "cover",
            position: "34% center",
          },
        ],
      },
    },
  },
  {
    id: "product-nocturne-creature",
    slug: "nocturne-creature",
    kind: "look",
    name: "The Cat",
    lookTitle: "The Cat",
    collectionLine: "VID’MY — 2027",
    relatedPieceSlugs: ["le-chat-felted-hood", "le-chat-paw-trousers"],
    image: "/assets/images/products/cat_dress.png",
    images: [
      {
        src: "/assets/images/products/cat_dress.png",
        alt: "The Cat sculptural organdy top, felted hood and trousers",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "The Cat complete look in the VID’MY campaign",
        fit: "cover",
        position: "90% center",
      },
    ],
    price: "€1,200",
    type: "priced",
    description:
      "The Cat turns a familiar animal shape into an uneasy second skin. Layers of black cotton organdy shift around the torso, while a felted hood and paw-shaped trousers complete the silhouette.",
    itemName: "The Cat Sculptural Organdy Top",
    attributes: [
      { label: "Material", value: "Black cotton organdy" },
      { label: "Silhouette", value: "Layered, oversized upper body" },
      { label: "Construction", value: "Dimensional strips assembled for movement" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:
        "Layers of black cotton organdy are cut and assembled into a dense surface that moves between fur, feathers and shadow. The volume wraps the torso and arms while keeping the waist visible, creating the central shape of The Cat look.",
    },
    translations: {
      fr: {
        name: "Le Chat",
        lookTitle: "Le Chat",
        collectionLine: "VID’MY — 2027",
        price: "1 200 €",
        type: "priced",
        description:
          "Le Chat transforme une forme animale familière en seconde peau troublante. Des couches d’organdi de coton noir bougent autour du buste, tandis qu’une cagoule feutrée et un pantalon aux pattes de chat complètent la silhouette.",
        itemName: "Top sculptural Le Chat en organdi",
        attributes: [
          { label: "Matière", value: "Organdi de coton noir" },
          { label: "Silhouette", value: "Haut du corps superposé et oversize" },
          { label: "Construction", value: "Bandes en volume assemblées pour accompagner le mouvement" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details:
            "Des couches d’organdi de coton noir sont découpées puis assemblées en une surface dense, entre fourrure, plumes et ombre. Le volume enveloppe le buste et les bras tout en laissant la taille visible : c’est la forme centrale du look Le Chat.",
        },
        images: [
          {
            src: "/assets/images/products/cat_dress.png",
            alt: "Top sculptural en organdi, cagoule feutrée et pantalon Le Chat",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Silhouette complète Le Chat dans la campagne VID’MY",
            fit: "cover",
            position: "90% center",
          },
        ],
      },
    },
  },

  // Red Witch pieces
  {
    id: "piece-horned-red-top",
    slug: "horned-red-top",
    kind: "piece",
    name: "Horned Red Top",
    collectionLine: "RED WITCH — VID’MY 2027",
    image: RED_DETAIL_IMAGE,
    imagePosition: "center",
    images: [
      {
        src: RED_DETAIL_IMAGE,
        alt: "Horned Red Top sculptural front detail",
        fit: "cover",
        position: "center",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "Horned Red Top worn as part of the Red Witch look",
        fit: "cover",
        position: "72% center",
      },
    ],
    price: "€480",
    type: "priced",
    description:
      "A close-fitting red jersey top interrupted by soft horns that travel from the chest to the waist, then curl out towards the hips. The gesture is protective, anatomical and slightly unruly.",
    attributes: [
      { label: "Material", value: "Red jersey and hypoallergenic filling" },
      { label: "Neckline", value: "Deep front, small opening at the back" },
      { label: "Detail", value: "Padded sculptural horns" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:
        "The padded forms are built directly onto the jersey body. They begin at the chest, follow the stomach and waist, then divide into curled points near the hips. A lightweight hypoallergenic filling gives them volume without making the top rigid.",
    },
    translations: {
      fr: {
        name: "Top rouge à cornes sculptées",
        collectionLine: "SORCIÈRE ROUGE — VID’MY 2027",
        price: "480 €",
        type: "priced",
        description:
          "Un top ajusté en jersey rouge traversé de cornes souples qui descendent de la poitrine vers la taille avant de s’enrouler autour des hanches. Le geste est protecteur, anatomique et légèrement indocile.",
        attributes: [
          { label: "Matière", value: "Jersey rouge et rembourrage hypoallergénique" },
          { label: "Encolure", value: "Décolleté profond devant, petite ouverture au dos" },
          { label: "Détail", value: "Cornes sculpturales rembourrées" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details:
            "Les formes rembourrées sont construites directement sur le corps en jersey. Elles partent de la poitrine, suivent le ventre et la taille, puis se divisent en pointes recourbées près des hanches. Un rembourrage hypoallergénique léger leur donne du volume sans rigidifier le top.",
        },
        images: [
          {
            src: RED_DETAIL_IMAGE,
            alt: "Détail devant du top rouge à cornes sculptées",
            fit: "cover",
            position: "center",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Top rouge porté dans le look Sorcière rouge",
            fit: "cover",
            position: "72% center",
          },
        ],
      },
    },
  },
  {
    id: "piece-red-jersey-skirt",
    slug: "red-jersey-skirt",
    kind: "piece",
    name: "Red Jersey Skirt",
    collectionLine: "RED WITCH — VID’MY 2027",
    image: CAMPAIGN_IMAGE,
    imagePosition: "69% 68%",
    relatedImageScale: 3.2,
    images: [
      {
        src: CAMPAIGN_IMAGE,
        alt: "Red Jersey Skirt worn in the Red Witch look",
        fit: "cover",
        position: "72% 58%",
      },
    ],
    price: "€320",
    type: "priced",
    description:
      "A clean knee-length jersey skirt designed to steady the more theatrical pieces of Red Witch. Its narrow line is broken only by a slit at the back.",
    attributes: [
      { label: "Material", value: "Red jersey" },
      { label: "Length", value: "Knee length" },
      { label: "Fit", value: "Straight, close to the body" },
      { label: "Detail", value: "Back slit" },
    ],
    accordions: {
      details:
        "The skirt keeps the red jersey set precise and wearable. It has no padded horn details, allowing the top and cape to carry the volume, and finishes with a back slit for ease of movement.",
    },
    translations: {
      fr: {
        name: "Jupe rouge en jersey",
        collectionLine: "SORCIÈRE ROUGE — VID’MY 2027",
        price: "320 €",
        type: "priced",
        description:
          "Une jupe nette en jersey, longueur genou, pensée pour stabiliser les pièces plus théâtrales de Sorcière rouge. Sa ligne étroite n’est interrompue que par une fente au dos.",
        attributes: [
          { label: "Matière", value: "Jersey rouge" },
          { label: "Longueur", value: "Au genou" },
          { label: "Coupe", value: "Droite et près du corps" },
          { label: "Détail", value: "Fente au dos" },
        ],
        accordions: {
          details:
            "La jupe donne à l’ensemble en jersey rouge une ligne précise et facile à porter. Sans cornes rembourrées, elle laisse le volume au top et à la cape, puis se termine par une fente au dos pour accompagner le mouvement.",
        },
        images: [
          {
            src: CAMPAIGN_IMAGE,
            alt: "Jupe rouge en jersey portée dans le look Sorcière rouge",
            fit: "cover",
            position: "72% 58%",
          },
        ],
      },
    },
  },
  {
    id: "piece-red-silk-veiled-hood",
    slug: "red-silk-veiled-hood",
    kind: "piece",
    name: "Red Silk Veiled Hood",
    collectionLine: "RED WITCH — VID’MY 2027",
    image: "/assets/images/products/vampire_dress.png",
    imagePosition: "70% top",
    images: [
      {
        src: "/assets/images/products/vampire_dress.png",
        alt: "Red silk hood with a veil covering the eyes",
        fit: "cover",
        position: "70% top",
      },
    ],
    price: "€260",
    type: "priced",
    description:
      "A silk hood that sits between a cagoule and a mask. A central opening reveals the line of the nose while the eyes remain behind a red veil.",
    attributes: [
      { label: "Material", value: "Red silk veil" },
      { label: "Form", value: "Close hood with central face opening" },
      { label: "Visibility", value: "Eyes softly veiled" },
      { label: "Closure", value: "Discrete fastenings" },
    ],
    accordions: {
      details:
        "The hood frames the head closely and parts at the centre of the face. Its construction keeps the nose visible while laying translucent red silk across the eyes, extending the atmosphere of the cape without repeating its scale.",
    },
    translations: {
      fr: {
        name: "Cagoule voilée en soie rouge",
        collectionLine: "SORCIÈRE ROUGE — VID’MY 2027",
        price: "260 €",
        type: "priced",
        description:
          "Une cagoule de soie à mi-chemin entre capuche et masque. Une ouverture centrale révèle la ligne du nez tandis que les yeux restent derrière un voile rouge.",
        attributes: [
          { label: "Matière", value: "Voile de soie rouge" },
          { label: "Forme", value: "Cagoule près de la tête, ouverte au centre du visage" },
          { label: "Visibilité", value: "Regard adouci par le voile" },
          { label: "Fermeture", value: "Attaches discrètes" },
        ],
        accordions: {
          details:
            "La cagoule encadre étroitement la tête et s’ouvre au centre du visage. Sa construction laisse apparaître le nez tout en posant une soie rouge translucide sur les yeux, prolongeant l’atmosphère de la cape sans en répéter l’ampleur.",
        },
        images: [
          {
            src: "/assets/images/products/vampire_dress.png",
            alt: "Cagoule en soie rouge dont le voile couvre les yeux",
            fit: "cover",
            position: "70% top",
          },
        ],
      },
    },
  },

  // KOZA piece
  {
    id: "piece-koza-corset",
    slug: "koza-corset",
    kind: "piece",
    name: "KOZA Corset",
    collectionLine: "KOZA — VID’MY 2027",
    image: "/assets/images/products/goat_dress.png",
    imagePosition: "center 24%",
    images: [
      {
        src: "/assets/images/products/goat_dress.png",
        alt: "KOZA corset built from layered tulle",
        fit: "cover",
        position: "center 24%",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "KOZA corset worn over the coat",
        fit: "cover",
        position: "52% center",
      },
    ],
    price: "€1,100",
    type: "priced",
    description:
      "A corset that draws a goat’s face across the torso without illustrating it literally. Layers of tulle shift from cream to black, sharpening into eyes, cheekbones and horns.",
    attributes: [
      { label: "Material", value: "Layered tulle, cowhide and black silk lining" },
      { label: "Palette", value: "White, greige-cream, dark grey and black" },
      { label: "Closure", value: "Adjustable lace-up back with eyelets" },
      { label: "Made to Order", value: "Available on request" },
    ],
    accordions: {
      details:
        "Tulle in four tonal shades is layered to build the features of the creature across the front. At the back, three leather corsetry sections on each side support an adjustable eyelet-and-cord lacing. The interior is finished with a black silk lining.",
    },
    translations: {
      fr: {
        name: "Corset KOZA",
        collectionLine: "KOZA — VID’MY 2027",
        price: "1 100 €",
        type: "priced",
        description:
          "Un corset qui dessine un visage de chèvre sur le buste sans jamais l’illustrer littéralement. Des couches de tulle passent du crème au noir et font apparaître yeux, pommettes et cornes.",
        attributes: [
          { label: "Matière", value: "Tulle superposé, cuir de vache et doublure en soie noire" },
          { label: "Palette", value: "Blanc, grège crème, gris foncé et noir" },
          { label: "Fermeture", value: "Laçage dos réglable sur œillets" },
          { label: "Sur commande", value: "Disponible sur demande" },
        ],
        accordions: {
          details:
            "Quatre nuances de tulle se superposent pour construire les traits de la créature sur le devant. Au dos, trois éléments de corseterie en cuir de chaque côté soutiennent un laçage réglable par œillets et cordon. L’intérieur est fini par une doublure en soie noire.",
        },
        images: [
          {
            src: "/assets/images/products/goat_dress.png",
            alt: "Corset KOZA construit en couches de tulle",
            fit: "cover",
            position: "center 24%",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Corset KOZA porté sur le manteau",
            fit: "cover",
            position: "52% center",
          },
        ],
      },
    },
  },

  // Vaza piece
  {
    id: "piece-vaza-pink-denim-jacket",
    slug: "vaza-pink-denim-jacket",
    kind: "piece",
    name: "Vaza Pink Denim Jacket",
    collectionLine: "VAZA — VID’MY 2027",
    image: CAMPAIGN_IMAGE,
    imagePosition: "10% 32%",
    relatedImageScale: 3.6,
    images: [
      {
        src: CAMPAIGN_IMAGE,
        alt: "Cropped pink denim jacket worn over the Vaza dress",
        fit: "cover",
        position: "12% center",
      },
    ],
    price: "€780",
    type: "priced",
    description:
      "A cropped denim jacket that borrows the dress’s rounded logic. Its pale pink body stays compact while the sleeves swell into complex, vessel-like curves.",
    attributes: [
      { label: "Material", value: "Pink denim, pale pink cotton lining" },
      { label: "Collar", value: "Short officer collar" },
      { label: "Closure", value: "Pink front zip" },
      { label: "Pocket", value: "One left interior pocket" },
    ],
    accordions: {
      details:
        "The jacket is cut short and without exterior pockets, keeping the front uninterrupted. Oversized sleeves create the volume of the piece, balanced by a compact officer collar and central pink zip. Inside, a pale pink cotton lining holds one pocket on the left and a machine-embroidered house label.",
    },
    translations: {
      fr: {
        name: "Veste Vaza en denim rose",
        collectionLine: "VAZA — VID’MY 2027",
        price: "780 €",
        type: "priced",
        description:
          "Une veste courte en denim qui reprend la logique arrondie de la robe. Le corps rose pâle reste compact tandis que les manches gonflent en courbes complexes, comme un récipient.",
        attributes: [
          { label: "Matière", value: "Denim rose, doublure en coton rose pâle" },
          { label: "Col", value: "Petit col officier" },
          { label: "Fermeture", value: "Zip rose devant" },
          { label: "Poche", value: "Une poche intérieure à gauche" },
        ],
        accordions: {
          details:
            "La veste est courte et dépourvue de poches extérieures afin de garder un devant net. Les manches oversize construisent tout son volume, équilibré par un petit col officier et un zip rose central. À l’intérieur, la doublure en coton rose pâle accueille une poche à gauche et une étiquette de la maison brodée à la machine.",
        },
        images: [
          {
            src: CAMPAIGN_IMAGE,
            alt: "Veste courte en denim rose portée sur la robe Vaza",
            fit: "cover",
            position: "12% center",
          },
        ],
      },
    },
  },

  // Black Witch piece
  {
    id: "piece-black-witch-felted-skirt",
    slug: "black-witch-felted-skirt",
    kind: "piece",
    name: "Black Witch Felted Skirt",
    collectionLine: "BLACK WITCH — VID’MY 2027",
    image: CAMPAIGN_IMAGE,
    imagePosition: "31% 72%",
    relatedImageScale: 3.6,
    images: [
      {
        src: CAMPAIGN_IMAGE,
        alt: "Long Black Witch skirt with hand-felted volume",
        fit: "cover",
        position: "34% 58%",
      },
    ],
    price: "€1,050",
    type: "priced",
    description:
      "A straight black wool skirt stretched almost to the ankle, then disturbed below the hips by a dense field of elongated felted forms.",
    attributes: [
      { label: "Material", value: "Black wool, hand-felted" },
      { label: "Length", value: "Ankle length" },
      { label: "Silhouette", value: "Long pencil skirt with sculpted hip volume" },
      { label: "Closure", value: "Strong black metal zip at the back" },
    ],
    accordions: {
      details:
        "The base is a long, straight pencil skirt felted by hand in black wool. Below the hips, elongated rolls of felt are gathered into a pronounced three-dimensional band. A full back zip in black metal opens the skirt cleanly for dressing.",
    },
    translations: {
      fr: {
        name: "Jupe feutrée Sorcière noire",
        collectionLine: "SORCIÈRE NOIRE — VID’MY 2027",
        price: "1 050 €",
        type: "priced",
        description:
          "Une jupe droite en laine noire, étirée presque jusqu’à la cheville, puis bousculée sous les hanches par un champ dense de formes feutrées allongées.",
        attributes: [
          { label: "Matière", value: "Laine noire feutrée à la main" },
          { label: "Longueur", value: "À la cheville" },
          { label: "Silhouette", value: "Jupe crayon longue au volume sculpté sur les hanches" },
          { label: "Fermeture", value: "Solide zip noir en métal au dos" },
        ],
        accordions: {
          details:
            "La base est une longue jupe crayon droite, feutrée à la main en laine noire. Sous les hanches, des rouleaux de feutre allongés se rassemblent en une bande tridimensionnelle très marquée. Un zip intégral en métal noir ouvre proprement le dos pour faciliter l’habillage.",
        },
        images: [
          {
            src: CAMPAIGN_IMAGE,
            alt: "Longue jupe Sorcière noire au volume feutré à la main",
            fit: "cover",
            position: "34% 58%",
          },
        ],
      },
    },
  },

  // The Cat pieces
  {
    id: "piece-le-chat-felted-hood",
    slug: "le-chat-felted-hood",
    kind: "piece",
    name: "The Cat Felted Hood",
    collectionLine: "THE CAT — VID’MY 2027",
    image: "/assets/images/products/cat_dress.png",
    imagePosition: "45% 12%",
    relatedImageScale: 1.15,
    images: [
      {
        src: "/assets/images/products/cat_dress.png",
        alt: "Black felted hood with sculpted cat ears",
        fit: "cover",
        position: "45% 12%",
      },
    ],
    price: "€380",
    type: "priced",
    description:
      "A black wool hood felted into a single graphic shape, with a centred face opening and two sharply formed cat ears.",
    attributes: [
      { label: "Material", value: "Black wool, hand-felted" },
      { label: "Detail", value: "Felted cat ears" },
      { label: "Opening", value: "Centred around the face" },
      { label: "Closure", value: "Two metal fastenings at the back" },
    ],
    accordions: {
      details:
        "The hood is felted entirely in black wool, including the ears that rise from its upper edge. A single opening frames the face, while two metal fastenings at the back keep the form close and secure.",
    },
    translations: {
      fr: {
        name: "Cagoule feutrée Le Chat",
        collectionLine: "LE CHAT — VID’MY 2027",
        price: "380 €",
        type: "priced",
        description:
          "Une cagoule en laine noire feutrée en une seule forme graphique, ouverte au centre du visage et prolongée par deux oreilles de chat nettement dessinées.",
        attributes: [
          { label: "Matière", value: "Laine noire feutrée à la main" },
          { label: "Détail", value: "Oreilles de chat feutrées" },
          { label: "Ouverture", value: "Centrée autour du visage" },
          { label: "Fermeture", value: "Deux attaches métalliques au dos" },
        ],
        accordions: {
          details:
            "La cagoule est entièrement feutrée en laine noire, y compris les oreilles qui s’élèvent sur son bord supérieur. Une seule ouverture encadre le visage ; deux attaches métalliques au dos maintiennent la forme près de la tête.",
        },
        images: [
          {
            src: "/assets/images/products/cat_dress.png",
            alt: "Cagoule noire feutrée aux oreilles de chat sculptées",
            fit: "cover",
            position: "45% 12%",
          },
        ],
      },
    },
  },
  {
    id: "piece-le-chat-paw-trousers",
    slug: "le-chat-paw-trousers",
    kind: "piece",
    name: "The Cat Paw Trousers",
    collectionLine: "THE CAT — VID’MY 2027",
    image: "/assets/images/products/cat_dress.png",
    imagePosition: "58% 76%",
    relatedImageScale: 1.12,
    images: [
      {
        src: "/assets/images/products/cat_dress.png",
        alt: "Black felted trousers ending in cat-paw feet",
        fit: "cover",
        position: "58% 76%",
      },
      {
        src: CAMPAIGN_IMAGE,
        alt: "The Cat trousers worn in the complete look",
        fit: "cover",
        position: "90% center",
      },
    ],
    price: "€1,100",
    type: "priced",
    description:
      "Hand-felted black wool trousers that carry the cat motif into function: paw-shaped pockets at the sides, then full paws emerging at the hem.",
    attributes: [
      { label: "Material", value: "Black wool, hand-felted" },
      { label: "Pockets", value: "Handmade side pockets shaped as cat paws" },
      { label: "Closure", value: "Zip fly with metal hook fastenings" },
      { label: "Detail", value: "Felted paw forms at the hem" },
    ],
    accordions: {
      details:
        "The trousers are felted by hand, with the fly and waistband inserted separately for a precise fit. Paw-shaped pockets are built into both sides and larger felted paws finish the legs. A house label is set into the back waistband; metal hooks secure the waist above the fly.",
    },
    translations: {
      fr: {
        name: "Pantalon à pattes Le Chat",
        collectionLine: "LE CHAT — VID’MY 2027",
        price: "1 100 €",
        type: "priced",
        description:
          "Un pantalon en laine noire feutrée à la main qui fait entrer le motif du chat dans la fonction : des poches en forme de pattes sur les côtés, puis de véritables pattes qui apparaissent au bas des jambes.",
        attributes: [
          { label: "Matière", value: "Laine noire feutrée à la main" },
          { label: "Poches", value: "Poches latérales faites main en forme de pattes" },
          { label: "Fermeture", value: "Braguette zippée et agrafes métalliques" },
          { label: "Détail", value: "Pattes feutrées au bas des jambes" },
        ],
        accordions: {
          details:
            "Le pantalon est feutré à la main ; la braguette et la ceinture sont montées séparément pour assurer une coupe précise. Des poches en forme de pattes sont intégrées de chaque côté, et de plus grandes pattes feutrées terminent les jambes. Une étiquette de la maison est insérée dans la ceinture dos ; des agrafes métalliques maintiennent la taille au-dessus de la braguette.",
        },
        images: [
          {
            src: "/assets/images/products/cat_dress.png",
            alt: "Pantalon noir feutré terminé par des pattes de chat",
            fit: "cover",
            position: "58% 76%",
          },
          {
            src: CAMPAIGN_IMAGE,
            alt: "Pantalon Le Chat porté dans la silhouette complète",
            fit: "cover",
            position: "90% center",
          },
        ],
      },
    },
  },
];

export const collectionLooks = products.filter((product) => product.kind === "look");

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsBySlugs(slugs: readonly string[]): Product[] {
  const productsBySlug = new Map(products.map((product) => [product.slug, product]));

  return slugs.flatMap((slug) => {
    const product = productsBySlug.get(slug);
    return product?.kind === "piece" ? [product] : [];
  });
}

export function getProductForLocale(product: Product, locale: string): Product {
  const translation = product.translations?.[locale as "en" | "fr"];
  if (!translation) return product;

  return {
    ...product,
    ...translation,
    images: translation.images ?? product.images,
  };
}
