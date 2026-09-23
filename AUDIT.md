# Krissen Technologies — Post-launch audit

Audit date: 2026-09-23

## Scope

Reviewed the Git baseline reconstructed from the original export plus confirmed ChatGPT Sites edits, and rendered it at desktop, tablet, and mobile widths. The ChatGPT Sites Library projection reports source version 9 for the deployed Site.

## What is working well

- Clear single H1 and strong hero hierarchy.
- No horizontal overflow at 390px mobile width in the rendered baseline.
- Project cards stack correctly on mobile.
- Mobile navigation opens correctly.
- Inquiry modal opens from the mobile navigation and closes with Escape.
- Mobile dialog fits the viewport and becomes internally scrollable when needed.
- Required inquiry fields are present: name, email, project area, project brief.
- Canonical URL points to `https://krissentechnologies.com/`.
- External project links using new tabs include `rel="noopener"`.
- Footer contact email is a `mailto:` link.
- Images have alt text.
- No duplicate IDs detected.
- Slim scrollbar has a transparent track.

## Priority findings

### P1 — Mobile menu state is not reset when opening the inquiry modal

Opening **Start a project** from the mobile menu opens the modal, but the mobile menu remains expanded behind it. After closing the modal, the menu is still open.

**Fix:** close `#mobile-nav` and reset `aria-expanded="false"` inside `openInquiry()` when the trigger came from the mobile menu, or always collapse it before opening the modal.

### P1 — Modal needs a focus trap / inert background

The modal restores focus and supports Escape, but keyboard focus is not trapped inside the dialog. A keyboard user can potentially tab into page content behind the modal.

**Fix:** implement a focus trap and apply `inert` to the page background while the dialog is open.

### P1 — Production inquiry submission still needs an end-to-end test

The form posts to FormSubmit's AJAX endpoint for `devgupta9@outlook.in`. The UI has success and retry states, but the production mail path was not verifiable in the local audit.

**Fix:** submit one real test from the public domain and confirm delivery, spam handling, success UI, retry state, and one-time FormSubmit activation status.

## SEO / discoverability

### P2 — Add a social preview image

Open Graph title, description, URL, and type are present, but `og:image` is missing. Add a 1200×630 branded preview image and matching Twitter card metadata.

### P2 — Add Organization / WebSite structured data

There is no JSON-LD schema in the current baseline. Add truthful Organization and WebSite schema with the canonical domain, company name, logo, and contact email.

### P2 — Add robots.txt and sitemap.xml

The site is a single-page portfolio, but explicit crawler files make indexing and Search Console setup cleaner.

### P2 — Search indexing is still immature

The custom domain is newly launched and is not yet surfacing reliably in public search. Submit the domain to Google Search Console/Bing Webmaster Tools and request indexing after metadata is final.

## Performance

### P2 — Footer logo PNG is oversized

`assets/krissen-neon-logo.png` is 1983×793 and roughly 400 KB for a relatively small footer rendering.

**Fix:** export an optimized SVG or WebP/AVIF version and declare intrinsic `width` / `height` (or `aspect-ratio`) to minimize transfer size and layout shift.

### P3 — External Google Fonts add a network dependency

The page loads Manrope and DM Sans from Google Fonts.

**Fix:** self-host/subset fonts or use a strong system-font fallback if performance/privacy is a priority.

### P3 — Fixed noise + backdrop blur are visually effective but GPU-heavy

The fixed noise layer and modal backdrop blur should be checked on low-end Android devices.

## Accessibility

### P2 — Add a skip link

Add a keyboard-visible “Skip to main content” link before the header navigation.

### P2 — Improve modal semantics

Add `aria-describedby` for the modal intro text and ensure the first meaningful field receives focus rather than the close button.

### P3 — Verify final contrast with automated tooling

The current palette appears readable, but run WCAG contrast checks on muted text and very small metadata labels against their exact backgrounds.

## Portfolio / credibility

### P2 — Case studies need outcomes, not only descriptions

The project section explains what each product is, but does not yet show measurable outcomes, constraints solved, or engineering decisions.

**Fix:** add concise Problem → Work → Outcome details only where they can be supported factually. Avoid invented metrics.

### P2 — Replace abstract project previews with real screenshots when appropriate

The abstract visuals are coherent with the design system, but real, curated product screenshots would strengthen proof of delivery for House of Banic, SuviOps, and Tato-I.

## Visual / responsive conclusion

The overall design direction is coherent and premium: dark technical foundation, neon accent, strong typographic hierarchy, consistent cards, and a credible engineering-studio tone. Desktop and mobile layouts both render without horizontal overflow in the baseline. The largest immediate UX issue is the mobile navigation state around the inquiry modal; the largest launch-risk item is verifying the inquiry email path end-to-end.
