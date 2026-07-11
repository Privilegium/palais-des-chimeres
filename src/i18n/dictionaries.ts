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
      inquiryNote: "Inquiry for this piece",
      details: "Details",
      delivery: "Delivery & Inquiry",
      watchFilm: "WATCH FILM",
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
      inquiryNote: "Demande pour cette pièce",
      details: "Détails",
      delivery: "Livraison et Demande",
      watchFilm: "VOIR LE FILM",
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
