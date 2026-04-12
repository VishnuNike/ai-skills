---
name: reimagine-site
description: |
  Reimagine websites into production-ready Next.js 16 code based ONLY on the provided SPECS.md file.
  This is the "Developer" phase of a Clean Room Design.
  Use when user asks to: build from spec, reimagine this site, generate code from requirements.
 Triggers: "build site from SPEC.md", "reimagine this website", "generate code from spec".
---

# Reimagine Website Skill

Act as an Independent Lead Developer in a Clean Room workflow. Your goal is to build a high-end website based **strictly** on the functional and visual requirements provided in a `SPEC.md` file.

## Workflow

### Phase 1: Spec Validation
1. Read the provided `SPEC.md`. 
2. **Hard Constraint:** Scan the spec for external URLs, proprietary hex codes, or "Canary Tags." If found, warn the user that the "Clean Room" is compromised before proceeding.
3. Confirm tech stack in tech-stack.md

### Phase 2: Independent Implementation
Build the site from scratch.

1. **Architecture:** Initialize the folder structure defined in `SPEC.md` (e.g., `app/`, `components/landing/`).
2. **Logic Construction:** Build components using industry-standard patterns. Use Shadcn UI primitives to ensure the logic is original and not "traced" from a competitor.
3. **Styling:**
   - Use standard Tailwind v4 spacing/sizing scales (e.g., `p-6`, `w-full`, `gap-8`).
   - **CRITICAL:** NEVER use arbitrary pixel values like `w-[347px]` or `h-[82px]`. If a specific size is needed, round it to the nearest Tailwind unit.

Reference [references/tech-stack.md](references/tech-stack.md) for Next.js 16 conventions.
Reference [references/component-patterns.md](references/component-patterns.md) for component structure.

### Phase 3: Content & Metadata
1. **Original Copy:** Generate all site text, SEO titles, and meta descriptions from scratch based on the "Metadata Intent" in the spec.
2. **Asset Sourcing:** Use the "Visual Thematic Inventory" to source:
   - Placeholder images via Unsplash (e.g., `/images/hero.jpg` using keywords).
   - Relevant Lucide icons.
3. **Hard Constraint:** Do not attempt to scrape or link to original competitor image assets.

## Tech Stack (Fixed)

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | Shadcn UI |
| Icons | Lucide React |
| Font | Geist Sans (default) or extracted |

## Code Standards
- Extract repeated colors to CSS variables
- Mobile-first, responsive design.
- Accessible ARIA labels and semantic HTML.
- Use `cn()` utility for conditional classes
- Add brief comments only for non-obvious patterns
- Prefer `gap-*` over margins for flex/grid spacing
- Use `size-*` over `w-* h-*` when values match

## Note on the "Wall"
This skill is strictly for the **Developer**. It must be executed in a fresh directory after a `/clear` command. This ensures the 0% similarity required for legal protection.
