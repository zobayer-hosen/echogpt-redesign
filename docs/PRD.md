# EchoGPT Redesign — PRD

**Date:** 29 Sep 2026 · **Stack:** Next.js · **Context:** AppifyDevs Frontend Internship assignment

---

## 1. Overview

One Next.js 15 (App Router) + TypeScript project delivers all three parts of the brief as routes: a marketing landing page at `/`, the redesigned chat app at `/chat`, and an interactive Chrome-extension concept at `/extension`. Everything shares one design system, one theme (dark/light) and one mock data layer, so the three surfaces look and feel like one product.

**Product.** [EchoGPT](https://echogpt.live) is AppifyDevs' multi-model AI chat product. The [Chrome extension](https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj) (v1.0.5, updated Sep 22 2026) adds a Chrome side panel for multi-model chat, page summaries, explaining selected text, Google sign-in and a Ctrl/Cmd+Shift+E shortcut.

**Goal of this submission.** Show frontend architecture, clean reusable code, strong UI/UX, full responsiveness, accessibility and performance within the deadline.

**Success criteria**

- All mandatory items in the brief are implemented and traceable (Section 2).
- Live on Vercel; Lighthouse Performance, Accessibility, Best Practices and SEO each 90+ on the landing page.
- Works from 360 px to 1920 px wide with no horizontal scroll.
- Every interactive element reachable and usable by keyboard, with visible focus.
- README covers overview, setup, tech, assumptions and extra features.

---

## 2. Requirement traceability

Every line of the AppifyDevs brief maps to a feature ID below; tick each box before submitting.

| Brief requirement | Type | Covered by |
| --- | --- | --- |
| Analyze existing web app interface | Must | Section 4 audit, README "UX decisions" |
| Improve overall UI/UX of web app | Must | A-01 to A-13 |
| Modern, responsive, user-friendly web app | Must | A-01, NFR-R1 to R4 |
| Accessibility, usability, performance focus | Must | NFR-A1 to A7, NFR-P1 to P7 |
| Additional features / UI improvements | Optional | A-08 compare, A-09 prompt library, A-11 command palette |
| Landing: Hero | Must | B-01 |
| Landing: Features | Must | B-02 |
| Landing: AI Models | Must | B-03 |
| Landing: Screenshots / Product preview | Must | B-04 |
| Landing: Why Choose EchoGPT | Must | B-05 |
| Landing: Pricing | Optional | B-06 |
| Landing: FAQ | Must | B-07 |
| Landing: Testimonials | Optional | B-08 |
| Landing: Call-to-Action | Must | B-09 |
| Landing: Footer | Must | B-10 |
| Landing drives install / use | Must | B-00 nav CTA, B-01, B-09 |
| Extension: Popup UI | Must | C-01 |
| Extension: Navigation | Must | C-02 |
| Extension: Prompt input experience | Must | C-03 |
| Extension: AI model selection | Must | C-04 |
| Extension: Conversation history | Must | C-05 |
| Extension: Quick actions | Must | C-06 |
| Extension: Settings page | Must | C-07 |
| Extension: Visual consistency | Must | Shared design system (Section 9) |
| Extension: New ideas / workflows | Optional | C-08 page-context chip, C-09 side panel mode, C-10 onboarding |
| React / Next.js / modern framework | Must | Next.js 15 App Router |
| Clean, maintainable, reusable code | Must | NFR-Q1 to Q6 |
| Responsive desktop, tablet, mobile | Must | NFR-R1 to R4 |
| Modern best practices | Must | ESLint, Prettier, strict TS, Server Components |
| Performance and loading speed | Must | NFR-P1 to P7 |
| Good folder structure | Must | Section 9 |
| Bonus: Dark/light mode | Bonus | NFR-T1 (next-themes) |
| Bonus: Framer Motion animations | Bonus | NFR-M1 to M3 |
| Bonus: WCAG accessibility | Bonus | NFR-A1 to A7 |
| Bonus: TypeScript | Bonus | Strict mode throughout |
| Bonus: Reusable UI components | Bonus | `components/ui` (shadcn/ui) + `components/shared` |
| Bonus: Attention to detail | Bonus | Empty, loading, error states; favicon; OG image; 404 |
| Deliverable: GitHub repository | Must | Public repo, clean commits |
| Deliverable: Live demo | Must | Vercel |
| Deliverable: Figma file | Optional | Skipped or quick frames if time allows |
| Deliverable: README (5 parts) | Must | Section 10 outline |

---

## 3. Users & personas

Three personas, taken from the extension's own listed use cases, drive every design choice.

| Persona | Main job | Needs from the redesign |
| --- | --- | --- |
| Student / researcher | Summarize articles, understand hard concepts | Fast summaries, explain-selection, saved history, free tier |
| Professional | Draft and improve writing, digest reports | Model choice per task, prompt templates, compare answers, keyboard speed |
| Everyday browser | Quick answers without a new tab | One-click popup, zero setup, clear pricing, mobile-friendly web app |

---

## 4. Current-state UX audit

The biggest gaps are discoverability and first impression: the site ships almost no server-rendered content and the extension exposes technical settings to end users. Rows marked "verify" could not be checked from the page source; confirm them in the live app and screenshot before/after for the README.

| # | Surface | Finding | Evidence | Fix in redesign |
| --- | --- | --- | --- | --- |
| 1 | Web | Initial HTML holds only the logo and name; content is client-rendered | Page source of echogpt.live | Server-rendered landing page (B-*), SSG |
| 2 | Web | Generic meta description; OG image is the favicon SVG | `og:image: /favicon.svg` | Per-route metadata, 1200x630 OG image |
| 3 | Web | No public explanation of models, pricing or FAQ before sign-in | Only the app shell is served | Full landing page at `/` |
| 4 | Web | Chat layout, empty state, model switcher clarity | verify | A-02, A-04, A-05 |
| 5 | Web | Mobile sidebar and composer behaviour | verify | A-01, NFR-R3 |
| 6 | Web | Keyboard focus, contrast, ARIA labels on icon buttons | verify | NFR-A1 to A7 |
| 7 | Extension | "Configure your API endpoint" is shown as a user setting | Store listing | Move under Settings > Advanced (C-07) |
| 8 | Extension | Quick actions limited to summarize and explain | Store listing | C-06: six actions + custom |
| 9 | Extension | Compare responses is mentioned but has no dedicated view | Store listing | A-08 / C-04 compare mode |
| 10 | Extension | 123 users, 7 ratings: low awareness | Store listing | Landing page CTAs point to the store (B-09) |

---

## 5. Part A — Web app redesign (`/chat`)

A three-zone layout (sidebar, conversation, optional right panel) with a mocked streaming AI reply; P0 items are core scope, P1 items are enhancements.

| ID | Feature | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| A-01 | Responsive app shell | Sidebar fixed at ≥1024 px, collapsible to icons at 768–1023 px, slide-over drawer under 768 px; composer stays pinned above the mobile keyboard | P0 |
| A-02 | Conversation sidebar | New chat button; search box; chats grouped Today / Yesterday / Previous 7 days / Older; pin, rename, delete via menu | P0 |
| A-03 | Message thread | User and assistant bubbles; Markdown + code blocks with syntax highlight and copy; model badge on each reply; timestamps on hover | P0 |
| A-04 | Model selector | Dropdown in header showing name, provider, speed/quality tags and "Pro" lock; choice saved per conversation | P0 |
| A-05 | Empty state | Greeting + 4 suggested prompt cards that fill the composer on click | P0 |
| A-06 | Composer | Auto-growing textarea (max 8 lines); Enter sends, Shift+Enter new line; attach button (UI only); character counter; send / stop toggle | P0 |
| A-07 | Streaming + states | Word-by-word mock streaming, typing indicator, stop generating, regenerate, error state with retry | P0 |
| A-08 | Compare mode | Send one prompt to 2 models; answers side by side (stacked on mobile) | P1 |
| A-09 | Prompt library | Saved templates with categories; insert into composer | P1 |
| A-10 | Message actions | Copy, regenerate, like/dislike, share (copy link) | P0 |
| A-11 | Command palette | Ctrl/Cmd+K: new chat, switch model, search chats, toggle theme | P1 |
| A-12 | Settings modal | Theme, default model, font size, clear history | P1 |
| A-13 | Persistence | Conversations and settings saved to localStorage via Zustand persist | P0 |

---

## 6. Part B — Landing page (`/`)

One statically generated page whose single job is to get visitors to click "Add to Chrome" or "Start chatting". Sections appear in this order; each has an `id` for anchor navigation.

| ID | Section | Content & behaviour | Priority |
| --- | --- | --- | --- |
| B-00 | Navbar | Logo; links Features, Models, Pricing, FAQ (smooth scroll); theme toggle; "Open app" + "Add to Chrome"; sticky with blur; hamburger sheet on mobile | P0 |
| B-01 | Hero | Headline (e.g. "Every top AI model. One sidebar."), subtext, 2 CTAs, trust line (Chrome Web Store rating), animated product mock | P0 |
| B-02 | Features | 6 cards: multi-model chat, summarize page, explain selection, compare answers, prompt library, privacy-first; icon + title + 1 line | P0 |
| B-03 | AI Models | Grid or tabs of models (e.g. GPT, Claude, Gemini, Llama, Mistral, DeepSeek) with "best for" tag; data from `lib/data/models.ts` | P0 |
| B-04 | Product preview | Tabbed preview: Web app / Extension popup / Side panel; real screenshots of your own build, `next/image`, lazy loaded | P0 |
| B-05 | Why choose EchoGPT | 3–4 benefit blocks or a comparison table vs using separate AI sites | P0 |
| B-06 | Pricing | Free / Pro / Team cards; monthly-yearly toggle; highlighted plan | P1 |
| B-07 | FAQ | 6–8 questions in an accessible accordion (Radix); FAQPage JSON-LD | P0 |
| B-08 | Testimonials | 3–6 cards or marquee; clearly placeholder names, marked as sample content | P1 |
| B-09 | Final CTA | Full-width band, one headline, "Add to Chrome — it's free" linking to the store listing | P0 |
| B-10 | Footer | Logo, product / company / legal link columns, socials, copyright, "Made by AppifyDevs" | P0 |

SEO: title, description, Open Graph and Twitter cards, `sitemap.ts`, `robots.ts`, JSON-LD `SoftwareApplication`.

---

## 7. Part C — Chrome extension concept (`/extension`)

The concept runs in the browser as an interactive prototype: a fake browser window with a demo article, the 380 x 600 px popup, and a side-panel mode, all built from the same components as `/chat`. A real MV3 build is out of scope ("concept" in the brief).

| ID | Feature | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| C-01 | Popup UI | 380 x 600 px frame; header (logo, model pill, open-in-side-panel, settings); body; bottom tab bar | P0 |
| C-02 | Navigation | Bottom tabs: Chat · Actions · History · Settings; arrow-key support, `aria-current` on active tab | P0 |
| C-03 | Prompt input | Auto-grow textarea; "/" opens saved prompts; page-context toggle chip; Enter to send; shortcut hint Ctrl/Cmd+Shift+E | P0 |
| C-04 | Model selection | Compact searchable list with provider icon, speed/quality tags, favorites pinned on top; optional "compare 2" switch | P0 |
| C-05 | Conversation history | Searchable list grouped by date; shows page title/favicon the chat came from; swipe or menu to delete; "open in web app" | P0 |
| C-06 | Quick actions | Grid: Summarize page, Explain selection, Translate, Rewrite / improve, Key points, Reply to email; plus "Create custom action" | P0 |
| C-07 | Settings page | Account (avatar, plan, sign out); default model; theme; language; page-context default; shortcut display; Privacy (clear history); Advanced (API endpoint) collapsed | P0 |
| C-08 | Page-context chip | Chip above the input shows which page/selection is attached; click to remove | P1 |
| C-09 | Side-panel mode | Toggle expands the popup into a full-height panel beside the demo page | P1 |
| C-10 | Onboarding | 3-step first-run card: pick model, try a quick action, pin the extension | P1 |

Visual consistency: same tokens, typography, icons (lucide-react) and components as the web app; only density changes (smaller paddings in the popup).

---

## 8. Non-functional requirements

These apply to all three routes and are what the evaluators will test by resizing, tabbing and running Lighthouse.

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-R1 | Responsive | Breakpoints: mobile < 640, tablet 640–1023, desktop ≥ 1024 px (Tailwind `sm`/`md`/`lg`) |
| NFR-R2 | Responsive | Test at 360, 768, 1024, 1440 px; no horizontal scroll; touch targets ≥ 44 x 44 px |
| NFR-R3 | Responsive | Use `100dvh` for the chat shell so mobile browser bars don't hide the composer |
| NFR-R4 | Responsive | Fluid type with `clamp()` for hero headings |
| NFR-A1 | Accessibility | Semantic landmarks: `header`, `nav`, `main`, `footer`; one `h1` per page; skip-to-content link |
| NFR-A2 | Accessibility | WCAG 2.2 AA contrast (4.5:1 text, 3:1 UI) in both themes |
| NFR-A3 | Accessibility | Full keyboard use; visible `focus-visible` ring; focus trapped in dialogs and returned on close |
| NFR-A4 | Accessibility | `aria-label` on every icon-only button; `aria-live="polite"` on streaming replies |
| NFR-A5 | Accessibility | Respect `prefers-reduced-motion` (disable Framer Motion transforms) |
| NFR-A6 | Accessibility | Form inputs have labels; errors announced |
| NFR-A7 | Accessibility | Alt text on all images; decorative images `alt=""` |
| NFR-P1 | Performance | Landing page statically generated; Server Components by default, `"use client"` only where state is needed |
| NFR-P2 | Performance | `next/image` (AVIF/WebP, sizes, lazy) and `next/font` (no layout shift) |
| NFR-P3 | Performance | Dynamic import for heavy parts: Markdown renderer, code highlighter, command palette |
| NFR-P4 | Performance | Targets: LCP < 2.5 s, CLS < 0.1, INP < 200 ms; Lighthouse 90+ |
| NFR-P5 | Performance | Long chat lists virtualized or paginated past 100 messages |
| NFR-P6 | Performance | Tree-shaken icons (lucide-react named imports); no unused libraries |
| NFR-P7 | Performance | Vercel Analytics / Speed Insights to show real numbers in README |
| NFR-T1 | Theming | Dark / light / system via `next-themes`; CSS variables; no flash on load |
| NFR-M1 | Motion | Framer Motion: section reveal on scroll, message enter, drawer and dialog transitions |
| NFR-M2 | Motion | Durations 150–300 ms; animate only `transform` and `opacity` |
| NFR-M3 | Motion | `LazyMotion` + `domAnimation` to keep bundle small |
| NFR-Q1 | Code quality | TypeScript `strict`; no `any` |
| NFR-Q2 | Code quality | ESLint (next/core-web-vitals) + Prettier + import sorting |
| NFR-Q3 | Code quality | Small components (< 150 lines), one responsibility each; props typed |
| NFR-Q4 | Code quality | Content and mock data in `lib/data`, never hard-coded in JSX |
| NFR-Q5 | Code quality | Conventional commits, meaningful messages, no secrets committed |
| NFR-Q6 | Code quality | Loading, empty and error states for every async view; custom 404 |

---

## 9. Tech stack & architecture

No backend: a typed mock service layer stands in for the API, so swapping in the real EchoGPT API later only touches `lib/services`.

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 15, App Router, React 19 | Required; SSG for landing, client islands for chat |
| Language | TypeScript (strict) | Bonus item; safer refactors |
| Styling | Tailwind CSS v4 + CSS variables | Fast, consistent tokens for both themes |
| UI primitives | shadcn/ui (Radix) | Accessible dialogs, dropdowns, accordion, tabs out of the box |
| Icons | lucide-react | Tree-shakeable |
| Animation | Framer Motion (`motion`) | Bonus item |
| State | Zustand + `persist` | Tiny, no boilerplate, localStorage persistence |
| Theme | next-themes | Dark / light / system without flash |
| Markdown | react-markdown + remark-gfm + rehype-highlight | Rich AI replies with code blocks |
| Forms | react-hook-form + zod | Settings and prompt-library forms |
| Quality | ESLint, Prettier | Best practices |
| Deploy | Vercel | Required live demo |

**Routes**

| Route | Rendering | Purpose |
| --- | --- | --- |
| `/` | Static (SSG) | Landing page |
| `/chat` | Client shell | New conversation |
| `/chat/[id]` | Client shell | Existing conversation |
| `/extension` | Static + client islands | Extension concept prototype |
| `/not-found` | Static | Custom 404 |

**Folder structure**

```
echogpt-redesign/
├─ public/                  # logo, og-image.png, screenshots, model logos
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ layout.tsx       # Navbar + Footer
│  │  │  └─ page.tsx         # landing: composes sections
│  │  ├─ chat/
│  │  │  ├─ layout.tsx       # AppShell: sidebar + main
│  │  │  ├─ page.tsx         # empty state / new chat
│  │  │  └─ [id]/page.tsx
│  │  ├─ extension/page.tsx
│  │  ├─ layout.tsx          # html, fonts, ThemeProvider
│  │  ├─ globals.css         # tokens, themes
│  │  ├─ not-found.tsx
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ ui/                 # button, dialog, dropdown, tabs, accordion...
│  │  ├─ shared/             # Logo, ThemeToggle, ModelSelector, PromptInput, MessageBubble
│  │  ├─ landing/            # Hero, Features, Models, Preview, WhyUs, Pricing, Faq, Testimonials, Cta, Footer
│  │  ├─ chat/               # Sidebar, ChatHeader, MessageList, Composer, EmptyState, CompareView
│  │  └─ extension/          # BrowserFrame, Popup, TabBar, QuickActions, HistoryList, SettingsPanel
│  ├─ hooks/                  # useAutoResize, useHotkeys, useMediaQuery, useStreamingText
│  ├─ lib/
│  │  ├─ data/               # models.ts, features.ts, faq.ts, pricing.ts, testimonials.ts, quick-actions.ts
│  │  ├─ services/           # chat.service.ts (mock streaming), ids, delays
│  │  └─ utils.ts            # cn(), formatDate, groupByDate
│  ├─ store/                  # chat.store.ts, settings.store.ts, prompts.store.ts
│  └─ types/                  # index.ts — shared TypeScript types (Conversation, Message, AIModel...)
├─ README.md
└─ package.json
```

Shared components (`ModelSelector`, `PromptInput`, `MessageBubble`, `ThemeToggle`) are used by both `/chat` and `/extension`; this is the concrete proof of "reusable components" and "visual consistency".

---

## 10. README, assumptions & risks

**README outline** (all five parts the brief asks for)

1. Project overview — what EchoGPT is, the three deliverables, live links to `/`, `/chat`, `/extension`
2. Setup instructions — Node 20+, `npm install`, `npm run dev`, `npm run build`, `npm run lint`
3. Technologies used — table from Section 9
4. Assumptions — list below
5. Additional features implemented — dark/light mode, Framer Motion, command palette, compare mode, prompt library, a11y work, Lighthouse scores
6. Extra: folder structure, UX audit before/after, known limitations

**Assumptions**

- No real backend or AI API: replies are mocked with simulated streaming; the service layer is ready for the real API.
- Authentication is out of scope; a demo user is signed in by default.
- Model names, prices, testimonials and FAQ answers are sample content, labelled as such where they could mislead.
- The extension is a web prototype of the concept, not a packaged MV3 build.
- Data persists in the browser (localStorage) only.
- EchoGPT logo and name are used because the product belongs to the company setting the assignment.

**Risks**

| Risk | Mitigation |
| --- | --- |
| Not enough time for all P1 items | P0 first; list unfinished P1 as "next steps" in README |
| Heavy libraries hurt Lighthouse | Dynamic imports, LazyMotion, `next/image`, check bundle before final push |

---

## 11. Design system & styling guide

All styling uses Tailwind CSS v4 utilities on top of CSS-variable design tokens, all motion uses Framer Motion, and type pairs Soria (display headings only) with Geist Sans (everything else). Follow these rules on every component so the three surfaces stay consistent.

### 11.1 Styling rules (proper CSS)

- Tailwind utilities first; tokens live as CSS variables in `globals.css`; no inline `style={{}}` except dynamic values (e.g. progress width).
- No CSS-in-JS runtime, no `!important`, no hard-coded hex values in components — always a token class (`bg-background`, `text-muted-foreground`).
- Mobile-first: write the base class for mobile, then `sm:` `md:` `lg:` overrides.
- Merge classes with `cn()` (clsx + tailwind-merge); build variants with `class-variance-authority` (`cva`).
- Auto-sort classes with `prettier-plugin-tailwindcss`.
- Arbitrary values (`w-[372px]`) only when no token fits; if used twice, add a token.
- Layout helpers: page container `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`; section spacing `py-20 md:py-28`; card `rounded-2xl border bg-card p-6`.
- CSS Modules only for rare cases Tailwind can't express (complex keyframes, third-party overrides).

### 11.2 Typography

| Role | Font | Where | Rules |
| --- | --- | --- | --- |
| Display | Soria (local file) | Hero H1, section H2, big stat numbers, pricing price | 32 px and up only; `tracking-tight`; `leading-[1.05]`; never bold (single weight) |
| UI / body | Geist Sans (`next/font/google`) | Body, buttons, nav, chat messages, forms, extension popup | 14–18 px; weights 400 / 500 / 600 |
| Code | Geist Mono (`next/font/google`) | Code blocks, shortcuts (`kbd`), model IDs | 13–14 px |

Why Soria only for headings: it is a single-weight, high-contrast Art Nouveau / Didot-style display serif; its hairline strokes break up at small sizes and it has no bold or italic, so body text, buttons and the 380 px extension popup must use Geist Sans.

**Type scale**

| Token | Size | Font |
| --- | --- | --- |
| `text-display` | `clamp(2.75rem, 6vw + 1rem, 5.5rem)` | Soria |
| `text-h2` | `clamp(2rem, 3vw + 1rem, 3.5rem)` | Soria |
| `text-h3` | 1.5rem / 600 | Geist Sans |
| `text-lg` | 1.125rem | Geist Sans |
| `text-base` | 1rem | Geist Sans |
| `text-sm` | 0.875rem | Geist Sans |

**Getting Soria**

1. Download the TTF from one of: [Font Squirrel](https://www.fontsquirrel.com/), [Creative Fabrica — Soria](https://www.creativefabrica.com/product/soria/), or [FontSpace](https://www.fontspace.com/).
2. Put it at `src/app/fonts/Soria.ttf` and keep the license `.txt` from the download next to it.
3. Use the file as downloaded — don't subset, rename glyphs or edit it (next/font accepts TTF directly).
4. Credit "Soria by Dani Bydani" in the README.

License check: download sites all say free for commercial use, but label it differently (SIL OFL 1.1, CC BY-ND, Creative Fabrica commercial license). Read the license file in your download; if it is unclear, switch to Plan B below — it takes one line.

**Font setup (`src/app/fonts.ts`)**

```ts
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

export const soria = localFont({
  src: "./fonts/Soria.ttf",
  variable: "--font-soria",
  weight: "400",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
export const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
```

```tsx
// src/app/layout.tsx
<html lang="en" suppressHydrationWarning
  className={`${soria.variable} ${geistSans.variable} ${geistMono.variable}`}>
  <body className="bg-background font-sans text-foreground antialiased">{children}</body>
</html>
```

**Better or backup font options**

| Option | Pairing | Why pick it |
| --- | --- | --- |
| Recommended | Soria (display) + Geist Sans + Geist Mono | Distinctive, elegant headings; clean modern UI text |
| Plan B (safest) | Instrument Serif (display) + Geist Sans | Free on Google Fonts (OFL), loads via `next/font/google`, similar editorial feel, has italic |
| Plan C (most flexible) | Fraunces (variable serif) + Inter | Variable weights and optical sizes; one serif works at every size |

Plan B swap: replace the `localFont` call with `Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-soria" })` — nothing else changes.

### 11.3 Colour tokens & theme (`src/app/globals.css`)

Warm neutrals suit Soria's editorial look; one violet accent carries every CTA. All pairs meet WCAG AA (4.5:1) in both themes.

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #FAFAF7;
  --foreground: #16161A;
  --card: #FFFFFF;
  --muted: #F1F0EC;
  --muted-foreground: #5E5E66;
  --border: #E6E4DE;
  --primary: #5B4BDB;
  --primary-foreground: #FFFFFF;
  --accent: #F2EEFF;
  --accent-foreground: #3A2FA0;
  --destructive: #D93636;
  --ring: #5B4BDB;
  --radius: 0.75rem;
}

.dark {
  --background: #0E0E12;
  --foreground: #EDEDF0;
  --card: #15151B;
  --muted: #1A1A21;
  --muted-foreground: #A0A0AB;
  --border: #2A2A33;
  --primary: #8B7CFF;
  --primary-foreground: #0E0E12;
  --accent: #221E3A;
  --accent-foreground: #CFC8FF;
  --destructive: #FF6B6B;
  --ring: #8B7CFF;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-ring: var(--ring);
  --font-display: var(--font-soria), Georgia, serif;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
}

@layer base {
  * { @apply border-border; }
  h1, h2 { @apply font-display font-normal tracking-tight; }
  ::selection { @apply bg-primary text-primary-foreground; }
  :focus-visible { @apply outline-2 outline-offset-2 outline-ring; }
  html { scroll-behavior: smooth; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

(The single `!important` above is the accepted exception: the reduced-motion reset must beat every utility.)

### 11.4 Framer Motion rules

- Install `motion` and import from `motion/react`; wrap the app in `LazyMotion features={domAnimation}` and use `m.div`, not `motion.div`, to keep the bundle small.
- Keep all variants in `src/lib/motion.ts` and reuse them; never write one-off animation objects inside components.
- Animate only `opacity` and `transform` (x, y, scale); durations 150–300 ms for UI, up to 600 ms for hero entrance.
- Scroll reveals: `whileInView` with `viewport={{ once: true, amount: 0.2 }}` so sections animate once.
- Call `useReducedMotion()`; when true, drop the y/scale movement and keep only opacity.
- `AnimatePresence` for chat messages, mobile drawer, dialogs, toasts and extension tab switches.
- `layoutId` for the active pill in the model selector, extension tab bar and pricing monthly/yearly toggle.

```ts
// src/lib/motion.ts
import type { Variants } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const messageIn: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease } },
};
```

```tsx
// usage in a landing section
<m.ul variants={stagger} initial="hidden" whileInView="show"
  viewport={{ once: true, amount: 0.2 }} className="grid gap-6 md:grid-cols-3">
  {features.map((f) => (
    <m.li key={f.id} variants={fadeUp}><FeatureCard {...f} /></m.li>
  ))}
</m.ul>
```

**Where motion goes**

| Surface | Animation |
| --- | --- |
| Hero | Headline words fade up in sequence; product mock floats in with slight scale |
| Landing sections | Fade-up + stagger on scroll, once |
| Model grid / pricing | Hover lift (`whileHover={{ y: -4 }}`); active pill with `layoutId` |
| FAQ | Height + opacity on open/close |
| Chat | New messages `messageIn`; typing dots loop; sidebar drawer slides on mobile |
| Extension | Tab content cross-fade; quick-action press `whileTap={{ scale: 0.97 }}` |

### 11.5 Do / don't

| Do | Don't |
| --- | --- |
| Soria at 32 px+ for headlines | Soria for buttons, body, chat text or anything under 32 px |
| Token classes (`bg-primary`) | Hex codes in components |
| One accent colour for CTAs | Several competing gradients |
| Motion that explains (enter, change, focus) | Motion on every element, parallax on mobile |
| Test both themes at every breakpoint | Ship dark mode untested |
