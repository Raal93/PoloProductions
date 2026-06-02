# Project instructions

## Project overview

This is a premium cinematic wedding filmmaker website for a Polish wedding videographer.

The website should feel:

- premium
- cinematic
- minimal
- elegant
- editorial
- modern
- fast
- image/video-focused

The project is built with:

- Astro
- React
- TypeScript
- plain CSS
- Sanity CMS later
- Vimeo embeds later

Do not use:

- Tailwind
- styled-components
- Atomic Design
- Next.js
- unnecessary state management libraries
- unnecessary animation libraries unless explicitly requested

## Current phase

We are starting with a static frontend version.

For now:

- use mock data
- do not connect Sanity yet
- do not create backend code
- do not add authentication
- do not upload or manage real media files
- do not introduce CMS logic until requested

Sanity will be added later after the layout and pages are working.

## Architecture

Use this project structure:

src/
pages/
layouts/
components/
react/
data/
lib/
styles/

Rules:

- `pages/` contains Astro route files.
- `layouts/` contains page layouts.
- `components/` contains mostly static Astro components.
- `react/` contains interactive React components only.
- `data/` contains temporary mock data.
- `lib/` contains integrations and utilities.
- `styles/` contains global CSS, reset, variables and shared styles.

Do not use Atomic Design folders like:

- atoms
- molecules
- organisms
- templates

Use pragmatic names based on real website sections and features.

## Astro rules

Prefer Astro components for static content:

- hero sections
- text sections
- offer sections
- about sections
- testimonials
- footer
- headers
- film cards when they do not need interactivity

Use React only when needed for interactivity:

- gallery modal
- image lightbox
- video modal
- filters
- interactive sliders
- complex forms

Do not turn the entire website into a React app.

When using React components in Astro, use client directives intentionally:

- `client:visible` for below-the-fold interactive components
- `client:load` only when the interaction is needed immediately

## TypeScript rules

Use TypeScript for:

- props
- mock data
- CMS data types later
- utility functions

Avoid `any`.

If a temporary type is needed, create a clear type and improve it later.

Example:

```ts
export type FilmProject = {
  title: string;
  slug: string;
  location: string;
  excerpt: string;
  coverImage: string;
  vimeoUrl?: string;
  featured?: boolean;
};
CSS rules

Use plain CSS.

Global files:

src/styles/reset.css
src/styles/variables.css
src/styles/global.css

Use CSS variables for:

colors
typography
spacing
border radius
transitions
layout widths

Do not use inline styles unless there is a strong reason.

Prefer readable class names.

Good:

.hero
.hero__content
.featured-films
.film-card
.section-header

Bad:

.box1
.wrapper2
.thing
.container-container
Design system direction

Use CSS variables like:

:root {
  --color-bg: #0d0d0d;
  --color-surface: #151515;
  --color-text: #f5f1e8;
  --color-muted: #a8a096;
  --color-accent: #c6a46a;

  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-serif: Georgia, "Times New Roman", serif;

  --space-section: clamp(4rem, 8vw, 8rem);
  --container-width: 1120px;

  --radius-md: 16px;
  --transition-base: 180ms ease;
}

The visual style should be cinematic and premium, but avoid overcomplicated effects.

Media rules

Do not store large real videos in the repository.

Later:

videos will be embedded from Vimeo
images will come from Sanity/CDN

For now:

use placeholder images
keep mock assets small
do not add large media files to the repo
Page structure

Initial pages:

/
Homepage
/portfolio
List of film projects
/portfolio/[slug]
Single film project page
/oferta
Offer page
/o-mnie
About page
/kontakt
Contact page
Initial homepage sections

Create the homepage with these sections:

Hero
Featured Films
About / cinematic approach
Process
Testimonials
Contact CTA

Use mock data first.

Code quality

Before making large changes:

explain the plan briefly
keep changes focused
do not rewrite unrelated files

After changes:

run npm run build
fix TypeScript or build errors
summarize what changed
Workflow with the user

The user is learning.

When making changes:

prefer simple solutions
avoid clever abstractions
explain important decisions briefly
do not over-engineer
do not introduce new tools without asking
Important preferences

The user prefers:

React
TypeScript
plain CSS
pragmatic project structure
no Atomic Design
no styled-components in this project
no Tailwind in this project

The user wants to understand the code, not just receive generated files.
```
