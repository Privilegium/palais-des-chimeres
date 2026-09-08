import type { Locale } from '@/i18n/dictionaries';

export const legalSlugs = ['shipping', 'legal-notice', 'privacy', 'payment', 'terms'] as const;
export type LegalSlug = (typeof legalSlugs)[number];

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: Array<{ label: string; text: string }>;
  bullets?: string[];
  contactLink?: string;
};

export type LegalPageData = {
  title: string;
  subtitle: string;
  sections: LegalSection[];
};

export const legalNavigation: Record<Locale, Array<{ slug: LegalSlug; label: string }>> = {
  en: [
    { slug: 'shipping', label: 'Shipping & Returns' },
    { slug: 'legal-notice', label: 'Legal Notice' },
    { slug: 'privacy', label: 'Privacy Policy' },
    { slug: 'payment', label: 'Payment & Ordering' },
    { slug: 'terms', label: 'Terms' },
  ],
  fr: [
    { slug: 'shipping', label: 'Livraison et retours' },
    { slug: 'legal-notice', label: 'Mentions légales' },
    { slug: 'privacy', label: 'Politique de confidentialité' },
    { slug: 'payment', label: 'Paiement et commande' },
    { slug: 'terms', label: 'Conditions' },
  ],
};

/*
 * These pages intentionally describe a portfolio-only MVP. They must be
 * replaced with the registered seller's details and commercial documents
 * before the first accepted order, deposit, or payment.
 */
const legalContent: Record<Locale, Record<LegalSlug, LegalPageData>> = {
  en: {
    shipping: {
      title: 'Shipping & Returns',
      subtitle: 'Pre-launch information: Palais des Chimères is currently a portfolio and does not accept orders or payments.',
      sections: [
        {
          id: 'current-status',
          heading: '01.  Current status',
          paragraphs: [
            'No order, deposit, payment, shipment, or return is currently accepted through this website. Product prices and production or delivery estimates are indicative portfolio references only; they are not an offer to sell.',
          ],
        },
        {
          id: 'future-delivery',
          heading: '02.  If sales open',
          paragraphs: [
            'Before any sale is opened, the creator will establish the appropriate business status and publish an updated legal notice, terms of sale, payment information, and consumer-mediator details. A future written order confirmation will state the applicable production period, delivery date or period, delivery cost, and any customs duties or local taxes.',
          ],
        },
        {
          id: 'future-returns',
          heading: '03.  Future returns and guarantees',
          paragraphs: [
            'For an eligible standard distance sale, consumers in the European Union generally have a 14-day right of withdrawal from receipt of the goods. The withdrawal exception for goods made to the consumer’s specifications or clearly personalised applies only where the legal conditions are met and the customer is informed before the order. Mandatory legal guarantees remain applicable to future sales.',
          ],
        },
        {
          id: 'questions',
          heading: '04.  Information requests',
          paragraphs: ['You may contact the creator to discuss a piece or a project. A message is informational only and does not create an order or a sales contract.'],
          contactLink: 'Contact us',
        },
      ],
    },
    'legal-notice': {
      title: 'Legal Notice',
      subtitle: 'Pre-launch legal information for the Palais des Chimères portfolio website.',
      sections: [
        {
          id: 'publisher',
          heading: '01.  Portfolio publisher',
          paragraphs: [
            'Brand and portfolio: Palais des Chimères',
            'Creator and portfolio publisher: Diana Vyshnevetska',
            'Contact email: contact@palaisdeschimeres.com',
            'At the date of publication, this website is presented as a personal and educational portfolio. It does not currently accept orders, deposits, payments, or conclude sales contracts.',
          ],
        },
        {
          id: 'commercial-status',
          heading: '02.  Commercial status',
          paragraphs: [
            'No registered commercial seller is currently represented on this website. Displayed prices are indicative portfolio references and are not binding offers. If the creator decides to sell a piece, the appropriate activity will be registered and this notice will be updated before the first order or payment with the required legal identity, business address, registration numbers, VAT status where applicable, publication director, and consumer-mediator details.',
          ],
        },
        {
          id: 'hosting',
          heading: '03.  Hosting',
          paragraphs: ['This website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States.'],
        },
        {
          id: 'ip',
          heading: '04.  Intellectual property',
          paragraphs: ['Unless otherwise stated, the texts, images, graphics, films, logos, and designs published on this website are owned by or licensed to Palais des Chimères. Reproduction, representation, adaptation, or distribution requires prior written permission, subject to mandatory legal exceptions.'],
        },
        {
          id: 'updates',
          heading: '05.  Updates',
          paragraphs: ['This notice will be revised before any commercial launch. Portfolio content, indicative prices, and technical features may also change without notice.'],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How personal data is handled when you contact the Palais des Chimères portfolio.',
      sections: [
        {
          id: 'controller',
          heading: '01.  Data controller',
          paragraphs: ['For messages submitted through this portfolio, the data controller is Diana Vyshnevetska, creator of Palais des Chimères. Privacy requests can be sent to contact@palaisdeschimeres.com. This policy will be updated with the registered seller’s details before any commercial activity begins.'],
        },
        {
          id: 'data-collected',
          heading: '02.  Data we collect',
          paragraphs: ['When you submit an inquiry or contact the creator, the site may collect:'],
          bullets: ['Full name', 'Email address', 'Phone number, if provided', 'Message and information about the requested piece or project', 'Page URL, locale, and limited technical information needed to handle the request securely'],
        },
        {
          id: 'purpose',
          heading: '03.  Purpose and legal basis',
          paragraphs: ['Data is used to answer an information request, discuss a possible project, protect the forms and website, and comply with legal obligations where applicable. The legal basis is normally the steps requested by the person contacting the creator, the creator’s legitimate interest in answering and securing the portfolio, or consent where consent is specifically requested. The data is not sold or used for unrelated marketing.'],
        },
        {
          id: 'recipients',
          heading: '04.  Service providers and transfers',
          paragraphs: ['Data may be processed by providers needed to host the website, deliver email, or protect the inquiry forms. Vercel hosts the website and may process technical data. The film player is loaded from YouTube only when a visitor starts the film. Any transfer outside the European Economic Area must be covered by an appropriate legal safeguard.'],
        },
        {
          id: 'retention',
          heading: '05.  Retention',
          paragraphs: ['Inquiry data is kept only for as long as reasonably necessary to answer the request, manage a possible relationship, protect the website, or handle a legal issue. If the request ends without a relationship, it is normally deleted within 12 months of the last contact unless a longer period is necessary for security or legal reasons. This schedule will be reviewed before commercial launch.'],
        },
        {
          id: 'rights',
          heading: '06.  Your rights',
          paragraphs: ['Depending on the circumstances, you may request access, rectification, erasure, restriction, portability, or object to processing. You may withdraw consent where processing is based on consent. Email contact@palaisdeschimeres.com to exercise your rights; identity verification may be requested. You may also lodge a complaint with the French data-protection authority, the CNIL.'],
          contactLink: 'Contact us to exercise your rights',
        },
        {
          id: 'cookies',
          heading: '07.  Cookies and similar technologies',
          paragraphs: ['The MVP is intended to use only technically necessary storage and no advertising or non-essential analytics cookies. If non-essential trackers are added, they will require prior consent where required and this policy will be updated. Starting the embedded YouTube film may involve processing by YouTube under its own policies.'],
        },
      ],
    },
    payment: {
      title: 'Payment & Ordering',
      subtitle: 'The portfolio is not currently open for orders, deposits, or payments.',
      sections: [
        {
          id: 'current-status',
          heading: '01.  No current ordering',
          paragraphs: ['This website has no checkout and does not currently accept an order, deposit, payment, or binding sales commitment. The inquiry form is for information and project discussions only.'],
        },
        {
          id: 'indicative-prices',
          heading: '02.  Indicative prices',
          paragraphs: ['A price displayed next to a piece is an indicative portfolio reference. It may change, may exclude future delivery or taxes, and does not create an offer, invoice, or obligation to sell. Pieces without a price are not available for instant purchase; a future quote would depend on materials, complexity, measurements, and timing.'],
        },
        {
          id: 'information-request',
          heading: '03.  Information requests',
          paragraphs: ['A visitor may send a non-binding message about a piece or project. A reply is not an order confirmation and no money should be sent through or in response to the portfolio while this pre-launch status applies.'],
          contactLink: 'Contact us',
        },
        {
          id: 'future-sales',
          heading: '04.  Before sales open',
          paragraphs: ['Before accepting the first order or payment, the creator will register the appropriate activity through the French formalities portal, confirm the business address and tax status, and publish updated legal notices, terms of sale, delivery and returns information, payment terms, and consumer-mediator details.'],
        },
      ],
    },
    terms: {
      title: 'Terms',
      subtitle: 'Terms for using a pre-launch portfolio website.',
      sections: [
        {
          id: 'purpose',
          heading: '01.  Purpose of the website',
          paragraphs: ['Palais des Chimères is currently a personal and educational portfolio presenting fashion and jewellery work. Content, availability, and indicative prices may change as the collection develops.'],
        },
        {
          id: 'no-sale',
          heading: '02.  No sale through the MVP',
          paragraphs: ['The website currently accepts no order, deposit, payment, or binding sales commitment. Sending an inquiry, receiving a reply, or viewing a price does not create an offer, an accepted order, or a sales contract.'],
        },
        {
          id: 'pricing',
          heading: '03.  Indicative pricing',
          paragraphs: ['Displayed prices are non-binding references for the portfolio. They are not invoices or payment requests and do not establish that a registered business is currently selling the piece.'],
        },
        {
          id: 'ip',
          heading: '04.  Intellectual property',
          paragraphs: ['Unless otherwise stated, the texts, images, films, graphics, logos, and designs are owned by or licensed to Palais des Chimères. They may not be copied, adapted, or redistributed without prior written permission, subject to mandatory legal exceptions.'],
        },
        {
          id: 'future-sales',
          heading: '05.  Future commercial activity',
          paragraphs: ['If sales are opened, the creator will first complete the required registration and publish the commercial terms applicable to orders. Any future consumer sale will be governed by the written order confirmation and mandatory French and EU consumer rules, including applicable withdrawal rights, exceptions, guarantees, delivery information, and mediation requirements.'],
        },
        {
          id: 'law',
          heading: '06.  Applicable law',
          paragraphs: ['French law governs use of this website, subject to any mandatory protection that applies to a visitor under their country of residence. While the site remains portfolio-only, no consumer-sales mediation process is applicable.'],
        },
      ],
    },
  },
  fr: {
    shipping: {
      title: 'Livraison et retours',
      subtitle: 'Information de pré-lancement : Palais des Chimères est actuellement un portfolio et n’accepte ni commandes ni paiements.',
      sections: [
        { id: 'current-status', heading: '01.  Situation actuelle', paragraphs: ['Aucune commande, aucun acompte, paiement, expédition ou retour n’est actuellement accepté via ce site. Les prix ainsi que les estimations de production ou de livraison sont uniquement des références indicatives du portfolio ; ils ne constituent pas une offre de vente.'] },
        { id: 'future-delivery', heading: '02.  En cas d’ouverture des ventes', paragraphs: ['Avant toute ouverture des ventes, la créatrice établira le statut professionnel approprié et publiera des mentions légales, conditions de vente, informations de paiement et coordonnées du médiateur de la consommation mises à jour. Une confirmation écrite précisera le délai de production, la date ou le délai de livraison, les frais de livraison ainsi que les éventuels droits de douane et taxes locales.'] },
        { id: 'future-returns', heading: '03.  Retours et garanties à venir', paragraphs: ['Pour une vente à distance standard éligible, les consommateurs de l’Union européenne disposent en principe d’un droit de rétractation de 14 jours à compter de la réception du bien. L’exception applicable aux biens confectionnés selon les spécifications du consommateur ou clairement personnalisés ne s’applique que si ses conditions légales sont réunies et si le client en est informé avant la commande. Les garanties légales impératives resteront applicables aux ventes futures.'] },
        { id: 'questions', heading: '04.  Demande d’information', paragraphs: ['Vous pouvez contacter la créatrice pour échanger sur une pièce ou un projet. Un message est uniquement informatif et ne crée ni commande ni contrat de vente.'], contactLink: 'Nous contacter' },
      ],
    },
    'legal-notice': {
      title: 'Mentions légales',
      subtitle: 'Informations légales de pré-lancement du portfolio Palais des Chimères.',
      sections: [
        { id: 'publisher', heading: '01.  Éditrice du portfolio', paragraphs: ['Marque et portfolio : Palais des Chimères', 'Créatrice et éditrice du portfolio : Diana Vyshnevetska', 'Email de contact : contact@palaisdeschimeres.com', 'À la date de publication, ce site est présenté comme un portfolio personnel et pédagogique. Il n’accepte actuellement ni commandes, ni acomptes, ni paiements et ne conclut aucun contrat de vente.'] },
        { id: 'commercial-status', heading: '02.  Situation commerciale', paragraphs: ['Aucun vendeur professionnel immatriculé n’est actuellement présenté sur ce site. Les prix affichés sont des références indicatives du portfolio et ne constituent pas des offres fermes. Si la créatrice décide de vendre une pièce, elle accomplira les formalités correspondant à l’activité et mettra à jour ces mentions avant la première commande ou le premier paiement avec l’identité légale, l’adresse professionnelle, les numéros d’immatriculation, le régime de TVA le cas échéant, la directrice de publication et les coordonnées du médiateur de la consommation.'] },
        { id: 'hosting', heading: '03.  Hébergement', paragraphs: ['Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.'] },
        { id: 'ip', heading: '04.  Propriété intellectuelle', paragraphs: ['Sauf indication contraire, les textes, images, graphismes, films, logos et designs publiés sur ce site appartiennent à Palais des Chimères ou sont utilisés avec autorisation. Toute reproduction, représentation, adaptation ou diffusion nécessite une autorisation écrite préalable, sous réserve des exceptions légales impératives.'] },
        { id: 'updates', heading: '05.  Mise à jour', paragraphs: ['Ces mentions seront révisées avant toute mise en vente. Le contenu du portfolio, les prix indicatifs et les fonctionnalités techniques peuvent également évoluer.'] },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      subtitle: 'La manière dont les données personnelles sont traitées lorsque vous contactez le portfolio Palais des Chimères.',
      sections: [
        { id: 'controller', heading: '01.  Responsable du traitement', paragraphs: ['Pour les messages envoyés via ce portfolio, le responsable du traitement est Diana Vyshnevetska, créatrice de Palais des Chimères. Les demandes relatives à la vie privée peuvent être envoyées à contact@palaisdeschimeres.com. La présente politique sera mise à jour avec les coordonnées du vendeur immatriculé avant toute activité commerciale.'] },
        { id: 'data-collected', heading: '02.  Données collectées', paragraphs: ['Lorsque vous envoyez une demande ou contactez la créatrice, le site peut collecter :'], bullets: ['Nom complet', 'Adresse email', 'Numéro de téléphone, s’il est fourni', 'Message et informations relatives à la pièce ou au projet', 'URL de la page, langue choisie et informations techniques limitées nécessaires à la sécurité du traitement'] },
        { id: 'purpose', heading: '03.  Finalités et base légale', paragraphs: ['Les données servent à répondre à une demande d’information, échanger sur un projet éventuel, protéger les formulaires et le site, et respecter les obligations légales lorsque celles-ci s’appliquent. La base légale est généralement les démarches demandées par la personne qui contacte la créatrice, l’intérêt légitime de répondre et de sécuriser le portfolio, ou le consentement lorsqu’il est expressément demandé. Les données ne sont ni vendues ni utilisées pour une prospection étrangère à la demande.'] },
        { id: 'recipients', heading: '04.  Prestataires et transferts', paragraphs: ['Les données peuvent être traitées par les prestataires nécessaires à l’hébergement, à l’envoi des emails, au fonctionnement et à la sécurité des formulaires. Vercel héberge le site et peut traiter des données techniques. Le lecteur vidéo est chargé depuis YouTube uniquement lorsque la personne lance le film. Tout transfert hors Espace économique européen doit être encadré par une garantie juridique appropriée.'] },
        { id: 'retention', heading: '05.  Durée de conservation', paragraphs: ['Les données d’une demande sont conservées uniquement pendant la durée raisonnablement nécessaire pour y répondre, gérer une relation éventuelle, protéger le site ou traiter une question juridique. Si la demande ne débouche sur aucune relation, elle est normalement supprimée dans les 12 mois suivant le dernier contact, sauf nécessité de sécurité ou obligation légale. Cette durée sera réexaminée avant l’ouverture des ventes.'] },
        { id: 'rights', heading: '06.  Vos droits', paragraphs: ['Selon les conditions applicables, vous pouvez demander l’accès, la rectification, l’effacement, la limitation, la portabilité ou vous opposer au traitement. Vous pouvez retirer votre consentement lorsqu’il constitue la base du traitement. Écrivez à contact@palaisdeschimeres.com ; une vérification d’identité peut être demandée. Vous pouvez également saisir la CNIL.'], contactLink: 'Nous contacter pour exercer vos droits' },
        { id: 'cookies', heading: '07.  Cookies et traceurs', paragraphs: ['Le MVP est conçu pour n’utiliser que les stockages techniquement nécessaires, sans cookie publicitaire ni mesure d’audience non essentielle. Si des traceurs non essentiels sont ajoutés, ils feront l’objet d’un consentement préalable lorsque celui-ci est requis et la présente politique sera mise à jour. Le lancement du film YouTube peut entraîner un traitement par YouTube selon ses propres politiques.'] },
      ],
    },
    payment: {
      title: 'Paiement et commande',
      subtitle: 'Le portfolio n’est actuellement ouvert ni aux commandes, ni aux acomptes, ni aux paiements.',
      sections: [
        { id: 'current-status', heading: '01.  Aucune commande actuellement', paragraphs: ['Le site ne comporte aucun paiement en ligne et n’accepte actuellement ni commande, ni acompte, ni paiement, ni engagement de vente ferme. Le formulaire sert uniquement aux demandes d’information et aux échanges sur un projet.'] },
        { id: 'indicative-prices', heading: '02.  Prix indicatifs', paragraphs: ['Le prix affiché à côté d’une pièce est une référence indicative du portfolio. Il peut évoluer, exclure les frais de livraison ou taxes futurs et ne constitue ni une offre, ni une facture, ni une obligation de vendre. Les pièces sans prix ne sont pas disponibles à l’achat instantané ; un éventuel devis dépendrait des matières, de la complexité, des mesures et du calendrier.'] },
        { id: 'information-request', heading: '03.  Demandes d’information', paragraphs: ['Un visiteur peut envoyer un message non contraignant au sujet d’une pièce ou d’un projet. Une réponse ne constitue pas une confirmation de commande et aucun paiement ne doit être envoyé via le portfolio pendant cette phase de pré-lancement.'], contactLink: 'Nous contacter' },
        { id: 'future-sales', heading: '04.  Avant l’ouverture des ventes', paragraphs: ['Avant d’accepter la première commande ou le premier paiement, la créatrice accomplira les formalités correspondant à l’activité via le guichet unique français, confirmera l’adresse professionnelle et le régime fiscal, puis publiera les mentions légales, conditions de vente, modalités de livraison et de retour, conditions de paiement et coordonnées du médiateur de la consommation.'] },
      ],
    },
    terms: {
      title: 'Conditions',
      subtitle: 'Conditions d’utilisation d’un site portfolio en phase de pré-lancement.',
      sections: [
        { id: 'purpose', heading: '01.  Objet du site', paragraphs: ['Palais des Chimères est actuellement un portfolio personnel et pédagogique présentant des créations de mode et de joaillerie. Le contenu, les disponibilités et les prix indicatifs peuvent évoluer au fur et à mesure du développement de la collection.'] },
        { id: 'no-sale', heading: '02.  Aucune vente via le MVP', paragraphs: ['Le site n’accepte actuellement ni commande, ni acompte, ni paiement, ni engagement de vente ferme. L’envoi d’une demande, la réception d’une réponse ou l’affichage d’un prix ne crée ni offre, ni commande acceptée, ni contrat de vente.'] },
        { id: 'pricing', heading: '03.  Prix indicatifs', paragraphs: ['Les prix affichés sont des références non contractuelles du portfolio. Ils ne constituent ni une facture ni une demande de paiement et ne signifient pas qu’une entreprise immatriculée vend actuellement la pièce.'] },
        { id: 'ip', heading: '04.  Propriété intellectuelle', paragraphs: ['Sauf indication contraire, les textes, images, films, graphismes, logos et designs appartiennent à Palais des Chimères ou sont utilisés avec autorisation. Ils ne peuvent être copiés, adaptés ou redistribués sans autorisation écrite préalable, sous réserve des exceptions légales impératives.'] },
        { id: 'future-sales', heading: '05.  Activité commerciale future', paragraphs: ['Si les ventes sont ouvertes, la créatrice accomplira d’abord les formalités nécessaires et publiera les conditions commerciales applicables. Toute vente future à un consommateur sera régie par la confirmation écrite de commande et les règles impératives françaises et européennes, notamment celles relatives à la rétractation, aux exceptions, aux garanties, à la livraison et à la médiation.'] },
        { id: 'law', heading: '06.  Droit applicable', paragraphs: ['Le droit français régit l’utilisation de ce site, sous réserve des protections impératives dont bénéficie un visiteur selon son pays de résidence. Tant que le site reste un portfolio, aucune procédure de médiation de la consommation liée à une vente n’est applicable.'] },
      ],
    },
  },
};

export function getLegalContent(locale: string, slug: string): LegalPageData | undefined {
  const language = (locale === 'fr' ? 'fr' : 'en') as Locale;
  if (!legalSlugs.includes(slug as LegalSlug)) return undefined;
  return legalContent[language][slug as LegalSlug];
}
