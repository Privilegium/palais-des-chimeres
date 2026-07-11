# 16 — Forms & Inquiry Functionality

## Purpose

This file defines the final v1 behavior for all inquiry/contact forms on the Palais des Chimères website.

The website does not use online payment, cart, checkout, database, CMS, or user accounts in v1. All product orders and contact requests are handled through forms and sent by email.

This file should be treated as the source of truth for form fields, email content, and inquiry source tracking.

---

## Where forms appear

There are two form contexts in v1:

1. **Main Contact Form**
   - Located on the Contact page.
   - Used for general inquiries, collaborations, editorial requests, portfolio/contact messages, and other non-product messages.

2. **Product Inquiry / Order Modal**
   - Opened when the user clicks `Order`, `Commander`, `Personal request`, or `Demande personnalisée` on a product page.
   - Uses the approved modal design from the mockups.
   - Used to request/order a specific product without online payment.

Both forms must use the same visible fields.

---

## Final visible form fields

Use exactly these visible fields for both the Contact page form and the Product Inquiry modal:

```txt
Full name
Email
Phone number
Message
```

Do not add extra visible fields in v1 unless explicitly approved.

Do not show a visible `Inquiry Type` dropdown in the final v1 form unless the user asks to restore it later.

---

## Field behavior

### Full name

- Required.
- Input type: text.
- Suggested internal field name: `fullName`.

### Email

- Required.
- Input type: email.
- Suggested internal field name: `email`.

### Phone number

- Optional, unless the user later decides otherwise.
- Input type: tel.
- Suggested internal field name: `phoneNumber`.

### Message

- Required.
- Textarea.
- Suggested internal field name: `message`.

---

## Source tracking requirement

Every submitted email must clearly indicate where the inquiry came from.

This is critical.

### If the inquiry comes from a product modal

The email must clearly include the product context.

Example source label:

```txt
Inquiry source: Product inquiry — Veil of Becoming
```

The email should also include hidden metadata if available:

```txt
Source type: product_inquiry
Product name: Veil of Becoming
Product slug: veil-of-becoming
Product ID: product-veil-of-becoming
Product type: priced / request
Product price: €2,450 / Price on request
Page URL: https://...
Locale: en / fr
Submitted at: timestamp
```

### If the inquiry comes from the main Contact page form

The email must clearly state that it came from the general website contact form.

Example source label:

```txt
Inquiry source: Main website contact form
```

The email should also include:

```txt
Source type: contact_form
Page URL: https://...
Locale: en / fr
Submitted at: timestamp
```

---

## Email subject rules

Use clear email subjects so product inquiries and general contact messages can be identified directly from the inbox.

### Product inquiry email subject

```txt
[Palais des Chimères] Product inquiry — {Product Name}
```

Example:

```txt
[Palais des Chimères] Product inquiry — Veil of Becoming
```

### Main contact form email subject

```txt
[Palais des Chimères] Website contact form
```

---

## Email body format

The email body should be simple and readable.

Recommended structure:

```txt
New inquiry received

Inquiry source: Product inquiry — Veil of Becoming
Source type: product_inquiry

Customer information:
Full name: ...
Email: ...
Phone number: ...

Message:
...

Product context:
Product name: ...
Product slug: ...
Product ID: ...
Product type: ...
Product price: ...

Technical context:
Page URL: ...
Locale: ...
Submitted at: ...
```

For the main Contact page form, remove the Product context block and use:

```txt
Inquiry source: Main website contact form
Source type: contact_form
```

---

## Implementation recommendation

Use one reusable form component for both form contexts.

Suggested component:

```ts
<InquiryForm context={context} />
```

Suggested context type:

```ts
type InquirySourceContext =
  | {
      sourceType: "product_inquiry";
      sourceLabel: string;
      productId: string;
      productSlug: string;
      productName: string;
      productType: "priced" | "request";
      productPrice?: string;
      pageUrl?: string;
      locale: "en" | "fr";
    }
  | {
      sourceType: "contact_form";
      sourceLabel: "Main website contact form";
      pageUrl?: string;
      locale: "en" | "fr";
    };
```

Suggested visible form values type:

```ts
type InquiryFormValues = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  message: string;
};
```

The form submit handler should combine:

```txt
visible form values + hidden source context
```

and send everything through the email endpoint/server action.

---

## Product modal behavior

When the user clicks the product CTA:

```txt
Order / Commander / Personal request / Demande personnalisée
```

open the inquiry modal and pass product metadata into the form context.

The modal must know which product opened it.

Minimum required hidden product metadata:

```txt
productName
productSlug
sourceType = product_inquiry
sourceLabel = Product inquiry — {Product Name}
```

Recommended additional metadata:

```txt
productId
productType
productPrice
pageUrl
locale
```

---

## Contact page form behavior

When the user submits the Contact page form, use this source context:

```txt
sourceType = contact_form
sourceLabel = Main website contact form
```

The email must not look like a product inquiry.

---

## Success and error states

### Success state

After successful submission, show a refined message in the same visual style:

```txt
Thank you. Your inquiry has been sent.
```

French version example:

```txt
Merci. Votre demande a bien été envoyée.
```

### Error state

If sending fails, show a clear but elegant error message:

```txt
Something went wrong. Please try again or contact us by email.
```

French version example:

```txt
Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
```

---

## Validation rules

Recommended validation:

```txt
Full name: required, minimum 2 characters
Email: required, valid email format
Phone number: optional, allow international characters/spaces/plus sign
Message: required, minimum 10 characters
```

Use accessible labels even if the design visually uses uppercase placeholders.

---

## Anti-spam / security notes

For v1, implement at least basic protection:

- Honeypot field if possible.
- Server-side validation.
- Sanitize submitted values before sending email.
- Do not expose private email API keys in client code.
- Use environment variables for email credentials.
- Optional: simple rate limiting if easy to add.

---

## Email delivery

Recommended options:

- Resend
- SMTP provider
- Any approved email provider that works well with Next.js server actions/API routes

Do not add a database for inquiry storage in v1.

Do not add payment or checkout logic.

---

## Acceptance criteria

The feature is complete only if all of the following are true:

- Contact page form has exactly these visible fields: Full name, Email, Phone number, Message.
- Product inquiry modal has exactly these visible fields: Full name, Email, Phone number, Message.
- Product Order/Personal request CTA opens the modal.
- Product modal submissions include product name in the email.
- Product modal submissions include a clear source label: `Product inquiry — {Product Name}`.
- Contact page submissions include a clear source label: `Main website contact form`.
- Email subject is different for product inquiries and general contact inquiries.
- No cart, checkout, payment, database, auth, or CMS is added for this feature.
- The visual design follows the approved mockups and dark gothic editorial style.
