# 00 — Project Overview

## Project

Palais des Chimères — a dark gothic editorial fashion website for an emerging fashion designer / fashion graduate collection.

## Goal

Create a high-end, atmospheric, fashion-forward website that presents:

- the brand world
- the designer
- the collection
- individual pieces
- a fashion film
- contact and collaboration channels
- inquiry-based product ordering
- legal / informational pages

The site should feel like a fashion house archive, editorial portfolio, and boutique catalogue — not a standard e-commerce store.

## Current MVP

The website is **not** a payment-enabled shop in v1. It is an editorial catalogue with inquiry/order forms.

### Included in v1

- Home
- Collection / PLP
- Product Detail / PDP
- Fashion Film
- About
- Contact
- Legal / Text pages
- FR/EN structure
- Inquiry forms sent by email
- Static typed content

### Excluded from v1

- Online payments
- Cart
- Checkout
- CMS
- Database
- Auth / accounts
- Admin dashboard
- Heavy self-hosted videos

## Main CTA logic

Priced products:

- Show price.
- CTA: `Order` / `Commander`.
- Button opens an inquiry modal.

Request-only products:

- Do not show price.
- CTA: `Personal request` / `Demande personnalisée`.
- Button opens an inquiry modal.

## Languages

- French
- English

The architecture must allow translations from the beginning, even if content is hardcoded in v1.
