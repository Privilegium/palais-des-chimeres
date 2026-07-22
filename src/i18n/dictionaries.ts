export const dictionaries = {
  en: {
    nav: {
      home: "HOME",
      collection: "COLLECTION",
      film: "FILM",
      about: "ABOUT",
      contact: "CONTACT",
    },
    common: {
      personalRequest: "Personal request",
      order: "ORDER",
      details: "Details",
      delivery: "Delivery & Inquiry",
      watchFilm: "WATCH FILM",
      informationAvailable: "Information available upon request.",
      viewImage: "View image",
      previousImage: "Previous image",
      nextImage: "Next image",
      image: "Image",
      closeImage: "Close full screen image",
      deliveryLegal: "Made-to-order pieces are normally produced within 4–8 weeks. Production timing and shipping costs are confirmed in writing before the order is accepted. Worldwide shipping is available; customs duties and local taxes may apply. For eligible standard items, EU consumers generally have a 14-day right of withdrawal from delivery. Bespoke or clearly personalised pieces may be excluded where the legal exception applies.",
      deliveryPolicy: "See Shipping & Returns",
      piecesInThisLook: "PIECES IN THIS LOOK",
      viewRestOfLook: "DISCOVER THE REST OF THIS LOOK",
    },
    form: {
      fullName: "Full name",
      email: "Email",
      phoneNumber: "Phone number",
      message: "Message",
      send: "SEND",
      success: "Thank you. Your inquiry has been sent.",
      error: "Something went wrong. Please try again or contact us by email.",
    }
  },
  fr: {
    nav: {
      home: "ACCUEIL",
      collection: "COLLECTION",
      film: "FILM",
      about: "À PROPOS",
      contact: "CONTACT",
    },
    common: {
      personalRequest: "Demande personnalisée",
      order: "COMMANDER",
      details: "Détails",
      delivery: "Livraison et Demande",
      watchFilm: "VOIR LE FILM",
      informationAvailable: "Informations disponibles sur demande.",
      viewImage: "Voir l’image",
      previousImage: "Image précédente",
      nextImage: "Image suivante",
      image: "Image",
      closeImage: "Fermer l’image en plein écran",
      deliveryLegal: "Les pièces réalisées sur commande sont généralement produites sous 4 à 8 semaines. Le délai de production et les frais de livraison sont confirmés par écrit avant l’acceptation de la commande. Une expédition internationale est possible ; des droits de douane et taxes locales peuvent s’appliquer. Pour les articles standard éligibles, les consommateurs de l’Union européenne disposent en principe d’un droit de rétractation de 14 jours à compter de la livraison. Les pièces sur mesure ou clairement personnalisées peuvent en être exclues lorsque l’exception légale s’applique.",
      deliveryPolicy: "Voir Livraison et retours",
      piecesInThisLook: "PIÈCES DE CE LOOK",
      viewRestOfLook: "DÉCOUVRIR LE RESTE DU LOOK",
    },
    form: {
      fullName: "Nom complet",
      email: "Email",
      phoneNumber: "Numéro de téléphone",
      message: "Message",
      send: "ENVOYER",
      success: "Merci. Votre demande a bien été envoyée.",
      error: "Une erreur est survenue. Veuillez réessayer ou nous contacter par email.",
    }
  }
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];

export function hasLocale(locale: string): locale is Locale {
  return locale in dictionaries;
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries.en;
}
