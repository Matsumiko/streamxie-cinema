---
name: streamXie
description: A cinematic dark streaming catalog for fast movie and series discovery.
colors:
  midnight-slate: "#0f1115"
  midnight-card: "#1d2026"
  signal-teal: "#17d1a0"
  signal-teal-deep: "#1f7a63"
  electric-cyan: "#0bbde0"
  category-movies: "#164e63"
  category-series: "#4c1d95"
  category-anime: "#9a3412"
  category-drama: "#881337"
  category-variety: "#79450b"
  category-foreground: "#ffffff"
  slate-border: "#4b4f57"
  slate-muted: "#34383f"
  text-primary: "#fafafa"
  text-muted: "#c7cad1"
  success-green: "#28bd70"
  warning-amber: "#f2ad0d"
  error-red: "#fa3333"
  info-blue: "#52b8f5"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "0.06em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.16em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "40px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.signal-teal} 0%, {colors.electric-cyan} 100%)"
    textColor: "#0f1115"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 32px"
    height: "52px"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 32px"
    height: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "8px 14px"
  input-search:
    backgroundColor: "{colors.midnight-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  card-media:
    backgroundColor: "{colors.midnight-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
  chip-filter:
    backgroundColor: "rgba(31, 122, 99, 0.3)"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: streamXie

## Overview

**Creative North Star: "The Neon Cinema"**

streamXie is a dark, content-first streaming catalog shaped like a cinema after hours: large artwork carries the atmosphere, while teal and cyan signals guide the next action. The system is cinematic and confident rather than ornamental. Deep slate surfaces let posters, backdrops, ratings, and playback controls remain the visual authority.

The interface uses restrained chrome, compact metadata, and responsive glow to make discovery feel fast without becoming a dashboard. Motion is purposeful: hero transitions, poster hover reveals, carousel movement, and loading states reinforce the sense of a live streaming service. The confirmed guardrail is simple: neon accents are signals, never the background.

**Key Characteristics:**
- Dark, media-first composition with deep slate tonal layering.
- Signal teal and electric cyan reserved for action, focus, progress, and active states.
- Rounded, tactile controls balanced by compact uppercase section labels.
- Responsive rails and touch-sized controls preserve discovery on small screens.

## Colors

The palette pairs Signal Teal and Electric Cyan with a Midnight Slate foundation; status colors remain functional and distinct from the brand accent.

### Primary
- **Signal Teal** ({colors.signal-teal}): Primary action, active navigation, progress, focus, and the leading edge of the brand gradient.
- **Electric Cyan** ({colors.electric-cyan}): Secondary highlight paired with teal in cinematic action gradients and media emphasis.

### Secondary
- **Deep Signal Teal** ({colors.signal-teal-deep}): Muted selected surfaces, secondary tags, and low-intensity accent backgrounds.
- **Slate Blue** (#26313d): Supporting cool tone for secondary gradient surfaces and media contrast.

### Tertiary
- **Success Green** ({colors.success-green}): Completion and finished-watch states.
- **Warning Amber** ({colors.warning-amber}): Ratings and cautionary status.
- **Info Blue** ({colors.info-blue}): Informational status only.
- **Error Red** ({colors.error-red}): Destructive and error feedback only.

### Neutral
- **Midnight Slate** ({colors.midnight-slate}): Global page background and the darkest cinematic overlay.
- **Midnight Card** ({colors.midnight-card}): Cards, popovers, fields, and raised content surfaces.
- **Slate Border** ({colors.slate-border}): Default strokes and separators.
- **Slate Muted** ({colors.slate-muted}): Muted fills, skeletons, and low-contrast controls.
- **Primary White** ({colors.text-primary}): Headings, primary content, and high-emphasis controls.
- **Muted White** ({colors.text-muted}): Supporting copy, metadata, and quiet navigation states.
### Category Tokens
- **Movies Slate** ({colors.category-movies}): Opaque cool-slate badge background for movie cards.
- **Series Violet** ({colors.category-series}): Opaque violet badge background for series cards.
- **Anime Ember** ({colors.category-anime}): Opaque ember badge background for anime cards.
- **Drama Berry** ({colors.category-drama}): Opaque berry badge background for drama cards.
- **Variety Ochre** ({colors.category-variety}): Opaque ochre badge background for variety cards.
- **Category White** ({colors.category-foreground}): Shared badge text foreground.

All category badge variants use an opaque surface so contrast is independent of poster artwork. White text measures at least 7:1 against the five category backgrounds.

### Named Rules
**The Signal, Not Spray Rule.** Teal and cyan identify an action or state; they do not fill large portions of a screen for decoration.

## Typography

**Display Font:** DM Sans (with sans-serif)
**Body Font:** Inter (with sans-serif)
**Label/Mono Font:** IBM Plex Mono (with monospace), used for technical or streaming status readouts.

**Character:** DM Sans gives titles and section heads a modern, confident geometry. Inter keeps metadata, descriptions, forms, and navigation compact and readable across dense media surfaces.

### Hierarchy
- **Display** (500, clamp(2.25rem, 6vw, 4.5rem), 1.05): Large hero titles; uppercase with deliberate tracking.
- **Headline** (500, clamp(1.25rem, 2vw, 1.5rem), 1.2): Section headings and detail-page anchors; uppercase with wide tracking.
- **Title** (500, 1rem, 1.35): Poster titles, card titles, and focused content labels.
- **Body** (400, 1rem, 1.5): Descriptions, legal copy, and explanatory content; keep long text near 65–75ch where possible.
- **Label** (500, 0.75rem, 0.16em, uppercase): Categories, badges, section metadata, and compact system cues.

### Named Rules
**The Wide Label Rule.** Uppercase tracking belongs to short labels and section heads; never apply it to paragraphs or long titles.

## Layout

The system uses a fluid centered container capped at 1440px. Horizontal padding is 16px by default, 24px from the small breakpoint, and 48px from the medium breakpoint. Desktop navigation centers the primary links between the brand and utility actions; mobile replaces it with a full-width bottom navigation and a collapsible top menu.

Content is organized into generous vertical sections (typically 32–40px), horizontal media rails, and responsive grids. Poster rails use 16px gaps and snap-friendly scrolling; browse filters move from a single column to two and then three columns at larger widths. Hero content is bottom-anchored inside a 90vh cinematic frame, while detail and catalog content remains aligned to the shared container.

## Elevation & Depth

The system is tonal with responsive glow. Surfaces are primarily flat: Midnight Slate separates the page from Midnight Card, and borders establish structure. Shadows are quiet at rest and appear around navigation, dialogs, and active media interactions. Teal glow is a state response for hover, focus, progress, and primary actions—not a permanent ambient effect.

### Shadow Vocabulary
- **Navigation lift** (`0 1px 0 rgba(0, 0, 0, 0.05)`): Subtle separation once the fixed header leaves the transparent hero state.
- **Media hover glow** (`0 0 0 1px rgba(23, 209, 160, 0.4), 0 8px 32px rgba(23, 209, 160, 0.12)`): Responsive emphasis on interactive cards.
- **Dialog lift** (`0 10px 30px rgba(0, 0, 0, 0.24)`): Focused overlay content above the page.

### Named Rules
**The Flat-at-Rest Rule.** A card should read through tonal contrast and a border before it reads through a shadow.

## Shapes

The form language is gently rounded and tactile: 6px for compact primitives, 8px for fields and small controls, 12px for cards and action buttons, and 16px for large media containers. Pills are reserved for tags, filters, and status badges. Media is clipped to its container with consistent rounded corners; circular silhouettes are reserved for avatars and icon actions.

Borders are thin and quiet by default, becoming Signal Teal on hover or focus. Controls maintain at least 40px of height in desktop utility areas and 44px touch targets on mobile. Avoid sharp ornamental geometry; the artwork and cinematic overlays provide the drama.

## Components

### Buttons
- **Shape:** Rounded tactile controls (12px for primary actions; 6px for compact library buttons).
- **Primary:** Signal Teal-to-Electric Cyan gradient, white text, medium weight, and generous 32px horizontal padding; hero actions are 52px high.
- **Hover / Focus:** Increase brightness and/or teal glow; focus uses a 2px Signal Teal ring with a 2px offset. Motion stays short and responsive.
- **Secondary / Ghost / Tertiary:** Secondary actions use translucent white over imagery with a quiet border; ghost actions remain transparent until hover.

### Chips
- **Style:** Pill silhouette (999px), thin border, and a Deep Signal Teal translucent fill for selected or semantic tags.
- **State:** Unselected chips use a Midnight Card surface and muted text; selected, hovered, or linked chips shift border and text toward Signal Teal.

### Cards / Containers
- **Corner Style:** 12px for media cards and content containers; 16px for prominent large surfaces.
- **Background:** Midnight Card over Midnight Slate; media placeholders use a dark cinematic gradient with a restrained teal radial highlight.
- **Shadow Strategy:** Flat at rest; media cards gain a responsive teal outline and soft glow on hover.
- **Border:** 1px Slate Border by default, Signal Teal at interactive emphasis.
- **Internal Padding:** 12–16px for compact cards, 24px for panels, and 32px for larger detail surfaces.

### Inputs / Fields
- **Style:** 36px compact search fields and 8px radius, with Midnight Card/Input fill and a Slate Border stroke.
- **Focus:** Remove the default browser outline in favor of the shared Signal Teal focus ring; active borders may shift to the primary accent.
- **Error / Disabled:** Use Error Red for validation, reduced opacity and disabled cursor behavior for unavailable controls.

### Navigation
- **Style:** Fixed, dark, and restrained. The header is transparent over the unscrolled home hero, then becomes a translucent Midnight Slate bar with border and blur.
- **Typography:** Inter, 14px, medium weight; active links use Signal Teal, inactive links use Muted White.
- **States:** Browse dropdowns use Midnight Card, rounded 12px corners, a thin border, and a quiet lift; active categories use a low-intensity teal fill.
- **Mobile treatment:** A 60px bottom rail provides five touch-sized destinations; the top menu expands beneath the header.

### Hero Banner
The signature surface: full-bleed artwork, layered dark overlays, bottom-anchored copy, compact genre pills, metadata, and a gradient Watch Now action. Slides transition with a restrained fade/scale movement and expose progress indicators for orientation.

### Streaming Loader
The loading state uses nested rotating rings and a cycling status ticker. Its teal, mint, and pale-green tones are intentionally softer than the primary action gradient so loading communicates activity without competing with content.

## Do's and Don'ts

### Do:
- **Do** keep Midnight Slate as the dominant canvas and let media artwork provide most visual variety.
- **Do** use Signal Teal for active navigation, primary actions, focus, progress, and meaningful hover feedback.
- **Do** use responsive media rails, 16px gaps, and touch targets of at least 44px on mobile.
- **Do** preserve the DM Sans / Inter pairing and the uppercase, tracked treatment for short labels and section headings.
- **Do** use borders and tonal layering before shadows to establish hierarchy.

### Don't:
- **Don't** turn teal or cyan into large neon backgrounds or apply glow to every surface.
- **Don't** introduce a generic light SaaS dashboard treatment or white card grid that competes with the cinema-first identity.
- **Don't** use wide uppercase tracking for body copy, long titles, or user-entered text.
- **Don't** make shadows persistent and heavy when a tonal surface or border communicates the layer.
- **Don't** replace media-led composition with dense technical chrome or decorative controls.
