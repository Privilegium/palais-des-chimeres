# 08 — Order Inquiry Flow

## Goal

Allow visitors to request/order a piece without online payment.

## Product page flow

```txt
User opens PDP.
User clicks ORDER or PERSONAL REQUEST.
Inquiry modal opens.
Product context is pre-filled as hidden metadata.
User submits form.
Email is sent to the brand owner/designer.
User sees success state.
```

## PDP approved text behavior

Under the main red `ORDER` button, show a subtle low-opacity label such as:

```txt
Inquiry for this piece
```

It should visually explain the button but should not look like a second CTA.

Do not show long explanatory text under the button.

## Inquiry modal fields

Recommended fields:

- Name
- Email
- Phone optional
- Country / city optional
- Preferred size optional
- Inquiry type
- Message
- Hidden product ID
- Hidden product slug
- Hidden product name
- Hidden product type
- Hidden product price if available
- Hidden locale
- Hidden page URL

## Email content

Inquiry email should include:

- Product name
- Product slug
- Product type
- Product price if available
- Customer name
- Customer email
- Phone if provided
- Message
- Timestamp
- Page URL
- Locale

## No payment in v1

Do not implement:

- Stripe Checkout
- Payment links
- Cart
- Checkout
- Order database
