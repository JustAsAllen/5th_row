---
name: client-project
description: Use when the user is working on a client project — building a website for a paying client, taking client requirements, delivering a site, or setting up a professional workflow. Trigger keywords: client, client project, client work, client website, paid work, freelance, deliver to client, requirements.
---

# Client Project Workflow

Use this workflow for professional client website work to make clients happy and get paid fast.

## Phase 1: Discovery & Requirements (Before Coding)

### Sign-Up Form Checklist
- [ ] Client name & business name
- [ ] What they sell / their service
- [ ] Target audience
- [ ] 3 desired pages minimum
- [ ] Brand colors or existing logo
- [ ] 2-3 reference websites they like
- [ ] Contact info to display
- [ ] Do they need booking/payment/signup?

### Scope Definition
Define EXACTLY what will be delivered:
- Pages list (Home, About, Services, Contact, etc.)
- Features (forms, booking, cart, chat)
- Responsive (mobile + desktop always)
- SEO basics
- Hosting + domain setup
- Revisions allowed (typically 2 rounds)

## Phase 2: Proposal Template

```
PRICE BREAKDOWN
- Website design & build: $XXX
- Responsive for all devices: Included
- Contact form: Included
- Basic SEO: Included
- Domain + hosting setup: $XXX/year (pass-through)
- Maintenance (optional): $XXX/month

TIMELINE (2-3 weeks)
- Week 1: Design + first draft
- Week 2: Feedback round 1 + revisions
- Week 3: Polish + launch

PAYMENT
- 50% upfront, 50% on launch
- Revisions beyond 2 rounds: $XX/hour
```

## Phase 3: Build Fast With opencode

Use these prompts with opencode:

```
"Create a website for [business] with:
Pages: Home, About, Services, Contact
Home sections: hero, services, about preview, testimonials, CTA, footer
Style: clean, premium, [primary color: #XXXXXX]
Include a working contact form"
```

Iterate with:
```
"Make the hero more impactful"
"Change the color to match our brand"
"Add a services section with 4 cards"
"Fix the contact form to send emails"
```

## Phase 4: Quality Checklist Before Delivery
- [ ] `npx tsc --noEmit` passes (typecheck — the highest-signal check)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Works on mobile (375px) + desktop (1280px)
- [ ] All links work
- [ ] Images optimized (use next/image)
- [ ] Contact form actually sends
- [ ] Security headers + Supabase RLS enforced (see 5th_row hardened patterns)
- [ ] Favicon + page titles set
- [ ] Deployed to a live URL (Vercel)
- [ ] Custom domain (if client provided)

## Phase 5: Client Handoff
- Send: live URL, admin access, how-to-edit guide (1 page)
- Follow up for social proof: "Could you leave a Google review?"
- Offer maintenance plan: monthly updates, backups, changes

## Pro Tips
- Use reference sites the client loves (send to opencode: "make it like this")
- Under-promise, over-deliver
- Always demo a mobile version at the end
- Record a 1-min walkthrough video for the client
- Collect testimonials for your own portfolio