---
target: src/pages/HomePage.tsx
audit_scope: discovery flow after card issue mapping
p0_count: 0
p1_count: 5
p2_count: 5
p3_count: 1
timestamp: 2026-09-12T14-26-02Z
---
# Audit: `src/pages/HomePage.tsx`

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|---|---:|---|
| 1 | Accessibility | 2/4 | Hero autoplay has no explicit pause/play control or reduced-motion branch; carousel edge state is not exposed. |
| 2 | Performance | 2/4 | Hero progress writes React state on every animation frame; homepage can render every catalog section with up to 12 cards each. |
| 3 | Theming | 3/4 | Shared tokens are present, but homepage surfaces still use hard-coded gray/white alpha colors and the primary gradient fails text contrast. |
| 4 | Responsive Design | 3/4 | Rails are touch-scrollable and cards have mobile widths, but mobile loses carousel controls and Continue Watching cards are wide. |
| 5 | Implementation Integrity | 2/4 | Product-specific primitives are coherent, but high-intent progress content is ordered too late, recovery is one-way, and the Continue CTA lands on the wrong tab. |
| **Total** |  | **12/20** | **Acceptable; significant discovery-flow work needed.** |

## Implementation Integrity Verdict

**FAIL for the requested discovery flow.** The implementation has a coherent streaming vocabulary—hero, ranked rail, poster rail, progress-aware landscape card, and shared token classes—but the interaction model does not yet express a deliberate path from “returning viewer” to resume. `Continue Watching` is rendered after the first seven catalog sections (`src/pages/HomePage.tsx:51-86`), is sorted by the current catalog order rather than `updatedAt`, and its `See all` link points to `/my-list` even though that page opens the `favorites` tab by default (`src/pages/MyListPage.tsx:29,119-136`). This is verified product-flow drift, not a cosmetic preference.

The detector found one advisory: `src/components/content/LandscapeCard.tsx:79` uses an 11px literal outside the documented type ramp. No detector finding was treated as a blocker by itself.

## Executive Summary

- Audit Health Score: **12/20** (Acceptable; significant work needed)
- Issues found: **0 P0 / 5 P1 / 5 P2 / 1 P3**
- Highest-risk issues:
  1. Continue Watching is placed after seven rails and its See all action opens Saved/Favorites, not Continue.
  2. Hero autoplay is hover-paused only; keyboard, touch, reduced-motion, and assistive-technology users have no explicit playback control.
  3. Carousel buttons never expose disabled/edge state and mobile hides them entirely.
  4. Catalog failure is cached as a permanent empty state for the session; the homepage offers Browse, not Retry.
  5. White CTA text on the primary/accent gradient measures only **2.03:1 / 1.92:1** against the bright gradient stops, below WCAG AA 4.5:1 for normal text.

## Detailed Findings by Severity

### [P1] Resume content is buried and the “See all” destination is semantically wrong

- **Location:** `src/pages/HomePage.tsx:25-30,51-86`; `src/pages/MyListPage.tsx:29,119-136`
- **Category:** Implementation Integrity / Accessibility
- **Impact:** Returning viewers must scan up to seven recommendation rails before reaching their unfinished titles. Selecting `See all` from Continue Watching sends them to `/my-list`, whose initial tab is `favorites`, requiring another manual tab change. This breaks the shortest high-intent path to playback.
- **WCAG/Standard:** WCAG 2.4.4 Link Purpose; usability principle of recognition and direct task completion.
- **Recommendation:** Render Continue Watching immediately after the hero, before generic discovery rails. Sort by `updatedAt` from the stored watch-progress entries, not by catalog order. Link the section action to `/my-list?tab=continue` and initialize the My List tab from that query parameter, or link directly to a dedicated continue route.
- **Suggested command:** `$impeccable layout`, then `$impeccable clarify`

### [P1] Hero autoplay has no explicit pause/play control or reduced-motion alternative

- **Location:** `src/components/content/HeroBanner.tsx:34-60,66-76,106-110,216-245`
- **Category:** Accessibility
- **Impact:** Autoplay pauses only while a pointer is inside the hero. Keyboard and touch users cannot intentionally pause it; users with motion sensitivity receive the same animated crossfade/scale behavior unless the browser happens to suppress it elsewhere. Slide content can change while a user is reading it.
- **WCAG/Standard:** WCAG 2.2.2 Pause, Stop, Hide; WCAG 2.3.3 Animation from Interactions (AAA guidance); WCAG 2.1.1 Keyboard.
- **Recommendation:** Add a visible 44px Pause/Play button with `aria-pressed` and an accessible label. Pause on focus within the hero and retain pause after manual slide selection. Add a `prefers-reduced-motion` branch that disables autoplay and reduces slide transitions while preserving manual navigation.
- **Suggested command:** `$impeccable animate`, then `$impeccable harden`

### [P1] Carousel edge state is not represented

- **Location:** `src/components/content/ContentCarousel.tsx:19-25,32-49,60-64`
- **Category:** Accessibility / Responsive Design
- **Impact:** Left/right buttons are always enabled even at the corresponding scroll edge, so users get no indication that more content is unavailable. On mobile both buttons are hidden (`hidden sm:flex`), leaving swipe as an undiscoverable interaction and providing no edge affordance. The fixed 480px scroll amount also does not guarantee a useful snap position for varying card widths.
- **WCAG/Standard:** WCAG 1.3.3 Sensory Characteristics; WCAG 4.1.2 Name, Role, Value.
- **Recommendation:** Track `scrollLeft`, `clientWidth`, and `scrollWidth`; disable the left/right button at the edges and expose `aria-disabled`. Add an edge fade or “More” affordance on touch layouts, and scroll by one measured card group or snap position rather than a fixed 480px.
- **Suggested command:** `$impeccable adapt`, then `$impeccable harden`

### [P1] Loading and error recovery are one-way

- **Location:** `src/hooks/useStreamCatalog.ts:21-56,59-75`; `src/pages/HomePage.tsx:40-49`; `src/components/content/HeroBanner.tsx:78-99`
- **Category:** Implementation Integrity / Accessibility
- **Impact:** Homepage loading shows only the hero placeholder; rails have no skeleton structure, so the page shifts from a large empty hero to content with no stable discovery preview. Any failed request is cached as `emptyState`; subsequent mounts reuse the failure and cannot retry. The only action is `Browse`, which does not recover the homepage request.
- **Recommendation:** Keep an explicit `error` state separate from cached successful data, expose a `retry` function that clears the failed cache and refetches, and add a homepage retry CTA. Render a small number of rail/card skeletons during loading. Use an `aria-live="polite"` status for loading/error updates.
- **Suggested command:** `$impeccable harden`, then `$impeccable clarify`

### [P1] Primary CTA text fails contrast on the bright gradient stop

- **Location:** `src/index.css:12-14,54-58`; `src/components/content/HeroBanner.tsx:200-205`; `src/components/common/EmptyState.tsx:20-25`
- **Category:** Accessibility / Theming
- **Impact:** `text-primary-foreground` is white over the `gradient-primary` background. Measured contrast is approximately **2.03:1** against the `hsl(160 80% 45%)` stop and **1.92:1** against the cyan stop, below the **4.5:1** WCAG AA requirement for normal-sized CTA text. Brightness hover does not fix the resting state.
- **WCAG/Standard:** WCAG 1.4.3 Contrast (Minimum).
- **Recommendation:** Use dark text on the bright gradient (`#06110f` or a tokenized dark foreground), darken the gradient stops, or use a solid dark-primary button with a bright border. Recheck both hero and EmptyState CTA states.
- **Suggested command:** `$impeccable colorize`

### [P2] Homepage rail count is unbounded and overloads discovery

- **Location:** `src/pages/HomePage.tsx:51-101`
- **Category:** Responsive Design / Performance
- **Impact:** The first seven sections render up to 12 items each, then every remaining section is rendered without a cap. A catalog response with many sections creates a very long page with repeated headings and weak prioritization; the user must scroll past generic rails before reaching later content.
- **Recommendation:** Define a homepage rail budget: cap visible sections, cap items per section, and expose the rest through Browse or section-specific routes. Put high-intent Continue Watching outside that budget.
- **Suggested command:** `$impeccable distill`, then `$impeccable layout`

### [P2] Continue Watching derives from the current catalog only

- **Location:** `src/pages/HomePage.tsx:25-30`
- **Category:** Implementation Integrity
- **Impact:** Progress entries for titles absent from the current home response disappear from the homepage even though they remain resumable in storage/My List. This makes the return surface unreliable when the catalog rotates or an API response is partial.
- **Recommendation:** Resolve progress IDs against catalog items first, then fetch missing lightweight detail records or provide a stable “Continue Watching” fallback card. Preserve `updatedAt` ordering.
- **Suggested command:** `$impeccable harden`

### [P2] Hero slide changes are not announced to assistive technology

- **Location:** `src/components/content/HeroBanner.tsx:138-245`
- **Category:** Accessibility
- **Impact:** The active title, metadata, and description are replaced inside animated content without a live-region announcement or active-slide state. Screen-reader users may not know that the discovery context changed.
- **Recommendation:** Add a concise `aria-live="polite"` slide status, keep it outside the animated subtree, and mark the active indicator with `aria-current="true"` or an equivalent state.
- **Suggested command:** `$impeccable harden`

### [P2] Hero image loading is not explicitly prioritized

- **Location:** `src/components/content/HeroBanner.tsx:121-126`
- **Category:** Performance
- **Impact:** The above-the-fold hero image has no `loading`, `fetchPriority`, or decoding hint, while the component can switch through six slides. On a cold load, the main visual and CTA can wait behind default image scheduling.
- **Recommendation:** Mark the active hero image `fetchPriority="high"` and `decoding="async"`; keep subsequent slide assets lazy or preload only the next slide after the first paint.
- **Suggested command:** `$impeccable optimize`

### [P2] Hero progress causes per-frame React renders

- **Location:** `src/components/content/HeroBanner.tsx:44-56`
- **Category:** Performance
- **Impact:** `setProgress(pct)` runs on every `requestAnimationFrame`, rerendering the full hero content and indicators around 60 times per second. On lower-end devices this competes with the backdrop transition and interactive CTA rendering.
- **Recommendation:** Drive the progress bar with a ref/CSS custom property or a narrowly scoped progress component; use React state only when the slide changes or when pause/resume state changes.
- **Suggested command:** `$impeccable optimize`

### [P2] Mobile rails lack a visible continuation cue

- **Location:** `src/components/content/ContentCarousel.tsx:32-49,60-64`
- **Category:** Responsive Design
- **Impact:** The scrollbar is hidden and arrow controls disappear below `sm`; users may not recognize that a row continues horizontally, especially when the first card fills most of the viewport.
- **Recommendation:** Preserve a partial next-card peek, add a subtle edge fade, or retain a compact labeled control on touch layouts. Keep the scrollbar hidden only if another continuation cue exists.
- **Suggested command:** `$impeccable adapt`

### [P3] Continue card subtitle uses an off-ramp 11px type size

- **Location:** `src/components/content/LandscapeCard.tsx:79`
- **Category:** Theming / Implementation Integrity
- **Impact:** The episode subtitle is slightly inconsistent with the documented type ramp and can become hard to read on mobile. This is polish, not a blocking issue.
- **Recommendation:** Replace `text-[11px]` with the nearest documented token, or document the 11px metadata step if it is intentional.
- **Suggested command:** `$impeccable typeset`

## Patterns & Systemic Issues

- **Control state is under-modeled:** Hero and carousel both provide interaction controls without representing paused, active, disabled, or edge state consistently.
- **Recovery is under-modeled:** Catalog loading/error has only boolean loading plus cached empty fallback; no retry transition exists.
- **High-intent content is treated as another rail:** Continue Watching should be a primary return path, not appended after generic catalog sections.
- **Token drift at content boundaries:** Shared tokens exist, but gray/white alpha literals remain in hero/card overlays and a bright gradient is paired with white CTA text.

## Positive Findings

- `HomePage` keeps catalog loading/error concerns in `useStreamCatalog` instead of duplicating fetch logic.
- `Continue Watching` filters out near-complete entries (`< 98%`) and limits the visible list to eight items, avoiding a completed-watch dump.
- Card links have meaningful labels (`Play ${item.title}`), poster/backdrop images use item-specific alt text, and global focus-visible outlines are defined in `src/index.css:118-124`.
- Rail items use `scrollSnapAlign: start`; cards use `shrink-0` and mobile/desktop widths, which prevents card compression in the horizontal layout.
- Hero slide indicators have individual labels and 40px interactive height, and the primary/secondary CTA targets are at least 52px tall.
- The design token layer is mature enough to support fixes without introducing a second visual system.

## Recommended Actions

1. **[P1] `$impeccable layout`**: Move Continue Watching directly below the hero, cap homepage rail count, and route its action directly to the Continue tab.
2. **[P1] `$impeccable harden`**: Add explicit hero pause/play, focus pause, reduced-motion behavior, slide announcements, carousel edge states, and catalog retry.
3. **[P1] `$impeccable colorize`**: Fix primary CTA foreground/background contrast and recheck hero plus empty-state buttons.
4. **[P2] `$impeccable optimize`**: Remove per-frame hero React renders and prioritize only the active hero image.
5. **[P2] `$impeccable adapt`**: Add mobile rail continuation cues and measured snap-aware scrolling.
6. **[P3] `$impeccable typeset`**: Normalize the Continue Watching subtitle size.
7. **Final: `$impeccable polish`**: Recheck the complete homepage after behavior and contrast fixes.
