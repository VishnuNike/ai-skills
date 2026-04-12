---
name: create-spec.md
description: |
  Analyze a website and generate a comprehensive functional/visual specification (SPEC.md) using Firecrawl MCP.
  This acts as the "Analyst" phase of a Clean Room Design.
  Use when user asks to: analyze a site, extract requirements, vibe check, generate a blueprint, or create a spec from an existing page.
  Triggers: "analyze this website", "vibe check [url]", "generate spec for [url]", 
  "extract requirements from [url]", "create a blueprint from [url]".
---

# Create Website Spec Skill

Act as the "Analyst" in a Clean Room workflow. Observe a target site using Firecrawl MCP, then translate its aesthetic and functional "Soul" into a text-based requirement list.

## Workflow

Execute these 3 phases in order. **Never skip Phase 2.**

### Phase 1: Observation (The "Dirty" Room)

1. Extract URL from user request
2. Identify section filter if specified (e.g., "hero only", "just the pricing")
3. Scrape using Firecrawl:

```
firecrawl-mcp___firecrawl_scrape:
  url: [TARGET_URL]
  formats: ["markdown", "html"]
  onlyMainContent: true
```

4. If scrape fails, fallback to `firecrawl-mcp___firecrawl_crawl`

5. **Forensic Safety:** Ensure `--no-session-persistence` is used if running via CLI to avoid saving the "dirty" source to local memory.

### Phase 2: Analysis (MANDATORY)

**STOP. Present analysis to user before final spec generation.**

Read [references/analysis-template.md](references/analysis-template.md) and fill out the template with:
- **Visual Intent:** Describe the "vibe" and "colors" (e.g., "Luxury minimalist") instead of listing hex codes.
- **Functional Requirements:** List what the components *do* (e.g., "Sticky navigation with mobile drawer").
- **Metadata Intent:** Describe the SEO goals and keywords found in the `<head>` without copying exact strings.
- **Component Breakdown:** Identify the structure, sequence, and organization of the layout.

Ask user: "Is this functional spec accurate? (y/n or request modifications)"

### Phase 3: Specification Synthesis

After user confirmation, generate a final `SPEC.md` file that serves as the **only** source of truth for the Developer Phase. **Do not generate code.**

Generate the file in this order:
1. **Design System:** Colors (themes, not just hex), Typography (weights and fonts), and Spacing rules.
2. **Metadata Strategy:** Original SEO titles/descriptions based on extracted intent.
3. **Component Specs:** Detailed text descriptions of every section (Hero, Grid, Footer, etc.).
4. **Content Strategy:** Tone of voice and placeholder requirements.

## Spec Standards (Anti-Clone Guardrails)

- **Independent Sizing:** NEVER use arbitrary pixel values like `w-[347px]`. Use standard Tailwind scales.
- **Sanitized Metadata:** Forbid copying of `og:title` or descriptions. Requirements must prompt for original writing.
- **Generic Logic:** Focus on "Industry Standard" patterns (e.g., "Use Shadcn Accordion") to avoid logic fingerprints.
- **No "Canary" Data:** Explicitly check for and strip any proprietary IDs or tracking pixels from the requirement list.

## Image Handling

1. Thematic Inventory: Document the subject matter and mood of all visual slots (e.g., "Slot 1: High-end architecture exterior").
2. Hard Constraint (No Downloads): Never download original files or assets. Never output the original source URLs in the final SPEC.md.


## Note on the "Wall"
This skill is strictly for the **Analyst**. Once the `SPEC.md` is generated, the user should `/clear` context or move to a new workspace to trigger the **Developer** role. Once `SPEC.md` is generated, the user must run `/clear` and `/memory` (to purge context) before moving to the Developer workspace.
