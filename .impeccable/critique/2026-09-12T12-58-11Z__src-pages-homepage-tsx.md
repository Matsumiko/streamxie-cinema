---
target: src/pages/HomePage.tsx
total_score: 23
max_score: 40
na_heuristics:
p0_count: 0
p1_count: 3
timestamp: 2026-09-12T12-58-11Z
slug: src-pages-homepage-tsx
---
# Critique: `src/pages/HomePage.tsx`

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | Hero progress and slide count are visible, but loaded catalog has no status feedback; carousel controls expose no position or edge state. |
| 2 | Match System / Real World | 3/4 | Poster, rank, play, rating, and genre conventions are familiar; provider/algorithm copy exposes TMDB rather than user benefit. |
| 3 | User Control and Freedom | 3/4 | Details, navigation, keyboard slide arrows, and carousel controls exist; autoplay has no visible pause control and pauses only on mouse hover. |
| 4 | Consistency and Standards | 3/4 | Tokens and interaction styling are cohesive, but ranked cards diverge from poster cards and CTA vocabulary varies between Watch Now, Play, Watch, and Resume. |
| 5 | Error Prevention | 2/4 | Empty state exists, but there is no Retry path and the fallback hero does not offer recovery. |
| 6 | Recognition Rather Than Recall | 3/4 | Labeled navigation, ratings, genres, slide labels, and visible metadata help recognition; poster actions are hidden on hover and titles truncate. |
| 7 | Flexibility and Efficiency of Use | 2/4 | Search, arrows, and hero keyboard navigation help; the long rail sequence has no efficient shortcut or direct filter path. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Hero is polished, but 14+ similarly weighted rails, repeated controls, and overlapping trend taxonomies create choice noise. |
| 9 | Error Recovery | 2/4 | Failure text and Browse escape exist; there is no Retry, actionable diagnostic, or preserved recoverable catalog state. |
| 10 | Help and Documentation | 1/4 | No contextual discovery guidance; only generic footer Streaming Tips. |
| **Total** |  | **23/40** | **Acceptable; significant improvements needed before users are happy.** |

## Design Specificity Verdict

**Authored at the visual layer, category-interchangeable at the discovery layer.** The dark “Neon Cinema” system is coherent and recognizably streamXie: Midnight Slate, teal/cyan action signals, full-bleed artwork, bottom-anchored hero copy, compact metadata, rounded media cards, and DM Sans/Inter all reinforce a cinema-first catalog.

The homepage structure could ship unchanged for almost any streaming product. `HomePage.tsx` renders the first seven catalog sections, inserts Continue Watching only afterward, then renders the remaining sections. In the live desktop view, the hero measured about 972px, the first rail began near y=1020, the page reached about 8,214px, and 16 headings were visible across roughly 14 rails. “Trending Today,” “Trending This Week,” “Trending Movies,” and “Trending Series” repeat the same algorithmic promise instead of expressing a streamXie-specific point of view.

The deterministic target scan was clean: `detect.mjs --json src/pages/HomePage.tsx` returned zero findings. Browser evidence from the rendered app still surfaced broader tree-level patterns: palette/radial spotlight/hero chip matches the documented design and is mostly intentional; a Browse CTA measured 1.9:1 contrast; one metadata sentence was about 88 characters per line; mobile bottom-nav labels are 10px; and Inter was detected as the primary font for most text. These are evidence from the rendered surface, not findings attributed to the clean `HomePage.tsx` CLI scan. SVG/path descendant overlays and the compact bottom-nav labels are false-positive or intentional candidates.

## Overall Impression

The arrival moment works: cinematic artwork, a clear Watch Now action, and strong dark tonal hierarchy make the product feel like a real streaming service. The main opportunity is not more visual polish; it is reducing the homepage from a catalog dump into a confident recommendation route. The current page asks users to scan too many equally weighted rails before they reach personalized or actionable content.

## What's Working

1. **The Neon Cinema language is coherent.** Midnight Slate, teal/cyan action gradients, bottom-anchored hero content, restrained borders, and responsive glow align with the documented system.
2. **The hero earns attention and action.** Artwork, title, rating, year, duration, country, genres, 52px Watch Now/More Info buttons, and slide indicators create a strong first peak.
3. **Media rails are responsive by intent.** Horizontal grouping, scroll snapping, lazy images, alt text, focus-visible rings, and the five-destination mobile nav support discovery across devices.

## Priority Issues

### [P1] Discovery overload and duplicate taxonomy

- **Why it matters:** 14+ repeated rails and overlapping Trending/Popular datasets create high cognitive load, push meaningful content thousands of pixels below the fold, and make the page feel like an algorithmic feed rather than a curated home.
- **Fix:** Curate 3–5 intent-led rails; put Continue Watching first for returning users; give each rail a distinct job (resume, trending, genre, new releases); move the long tail behind Browse. Replace the arbitrary first-seven/rest split with explicit homepage composition.
- **Suggested command:** `$impeccable distill` or `$impeccable layout`

### [P1] Primary poster actions are hover-only

- **Why it matters:** `PosterCard` hides Play, Details, and My List behind `opacity-0/group-hover`. Touch and keyboard users cannot discover those actions, while the title-only link is a weak semantic primary target.
- **Fix:** Make the full card or a persistent Play affordance the primary link; use `focus-within` and a mobile-visible action treatment; keep My List visible or clearly discoverable; ensure the article/card has an accessible name and keyboard path.
- **Suggested command:** `$impeccable audit` or `$impeccable adapt`

### [P1] Hero dominates the first viewport and removes control from autoplay

- **Why it matters:** The hero is about 972px on desktop and about 663px on a 390px mobile viewport. Six slides, two CTAs, four metadata dimensions, genres, and autoplay compete with the first browse action. Autoplay cannot be paused by keyboard or touch through a visible control.
- **Fix:** Reduce hero height responsively (roughly 60–70vh); add an explicit Pause/Play and labeled Next control; reduce indicators to a readable, announced control group; provide a visible Browse/search escape; respect `prefers-reduced-motion`.
- **Suggested command:** `$impeccable adapt` or `$impeccable animate`

### [P2] Provider-centric and inconsistent language

- **Why it matters:** “TMDB titles moving fastest” describes the data source, not the user's benefit. The UI mixes Watch Now, Play, Watch, and Resume, while page metadata is Indonesian and most interface labels are English. This weakens comprehension and product voice.
- **Fix:** Use one user-facing CTA vocabulary; remove TMDB from primary discovery chrome unless it is necessary context; choose a consistent language strategy for nav, section labels, metadata, and fallback copy.
- **Suggested command:** `$impeccable clarify`

### [P2] Recovery, status, and contrast gaps

- **Why it matters:** Empty/failure states offer Browse but no Retry or actionable recovery. Carousel arrows have no disabled edge state. Browser evidence found a Browse CTA at 1.9:1 contrast and an approximately 88-character metadata line, both reducing clarity in real rendering.
- **Fix:** Add Retry and error-specific copy; preserve layout with loading skeletons; disable or announce carousel edges; raise Browse contrast to at least 4.5:1; split long metadata into readable chunks or shorten it.
- **Suggested command:** `$impeccable harden` or `$impeccable audit`

## Cognitive Load Assessment

**7/8 checklist failures — high load.**

- **Single focus — Fail:** Hero combines artwork, four metadata dimensions, two CTAs, genres, six slide controls, and autoplay; every rail below competes equally.
- **Chunking — Fail:** 14+ sections with up to 12 cards each; the implementation split is structural, not user-centered.
- **Grouping — Pass:** Each rail is visually grouped with heading, subtitle, controls, and snap-scrolling content.
- **Visual hierarchy — Fail:** Repeated heading/arrow/See all treatment makes every rail look equally important.
- **One thing at a time — Fail:** A card exposes Play, Details, My List, and a title link once hovered.
- **Minimal choices — Fail:** Hero has two CTAs, four genres, and six slide choices; each rail has 12 titles plus three header controls.
- **Working memory — Fail:** Users compare overlapping Trending and Popular promises and must remember which rail they were scanning.
- **Progressive disclosure — Fail:** The full catalog is rendered as a long sequence instead of revealing a small recommendation path and deferring the long tail to Browse.

Decision points exceeding four visible choices: six hero slides; up to 12 titles per rail; three rail controls; five Browse categories; 14+ homepage rail destinations.

## Emotional Journey

- **Arrival / peak:** Full-bleed artwork, dark overlays, and immediate Watch Now create a strong cinematic first impression.
- **First valley:** A 90vh hero delays browsing, especially on mobile; autoplay can break attachment before users act.
- **Second valley:** Repeated rails flatten hierarchy and turn discovery into endurance scanning.
- **Return hook:** Continue Watching is useful but appears after the first seven sections instead of rewarding returning users early.
- **End state:** The page ends as an endless catalog rather than a satisfying, personalized next step.
- **Reassurance gap:** Loading/failure copy exists, but there is no Retry, no visible pause control, and no clear recovery route.

## Persona Red Flags

**Alex (Power User):** Finding a title and reaching Play is slowed by 14+ rails and up to 12 cards per rail. There are no card-level keyboard shortcuts. Global arrow keys can change the hero silently when focus is outside an input. Carousel arrows move a fixed 480px and do not communicate position or edges.

**Jordan (First-Timer):** The first view is a large hero with six visual slide indicators before the catalog. “TMDB,” rating, country, tags, and “More Info” assume context. Play, Details, and My List are hidden until hover, and there is no explicit start-browsing cue or contextual help.

**Taylor (Content Browser):** Wants to scan by genre/type but gets repeated rails instead of a direct browse/filter path in the main body. Trend labels overlap, titles truncate to one line, and persistent actions are absent on touch.

## Minor Observations

- Section subtitles truncate via CSS, which can hide useful context.
- Hero arrow-key handling excludes inputs but not every editable/content-focused target.
- Poster hover scale can overlap adjacent rail content.
- Rank cards expose a link on the title rather than the whole card.
- Some rendered items show 0.0 ratings, which reads as missing data rather than a meaningful score.
- Desktop overflow is intentional but has no obvious scroll cue beyond arrow controls.

## Questions to Consider

- What if the homepage were a 30-second route to one confident choice instead of a 14-rail catalog?
- Which signal should win for returning users: Continue Watching or trending?
- Can Play, Details, and My List be discoverable without hover?
- Does TMDB need to appear in user-facing discovery chrome?
- Should hero autoplay be opt-in rather than the default?
