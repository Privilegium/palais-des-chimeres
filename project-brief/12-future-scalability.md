# 12 — Future Scalability

## Future phases

Possible future additions:

- CMS integration
- Analytics
- Payment provider
- Cart and checkout
- Order database
- Admin dashboard
- Newsletter
- Lookbook archive
- More collections
- Blog / campaign archive

## Required separation in v1

Keep these separate:

- UI components
- content data
- translations
- form logic
- email logic
- routing
- media helpers

## Future CMS strategy

The current static content layer should be replaceable with CMS queries.

Do not structure the project in a way that requires rewriting UI components when adding a CMS.

## Future payment strategy

The inquiry flow should be able to coexist with future payment flow.

Some products may remain request-only forever, while other products may later support direct checkout.

Product model must therefore support both:

```txt
priced product
request-only product
future checkout-enabled product
```
