# Analysis Template

Use this template to present analysis in Phase 2. Fill all sections before asking user to confirm.

---

## 🔍 Website Analysis Report

**Source URL**: [url]
**Scrape Status**: ✅ Success / ⚠️ Partial / ❌ Failed (with fallback)

---

### Page Structure

**Sections Detected**:
1. [ ] Header/Navigation
2. [ ] Hero
3. [ ] Features/Benefits
4. [ ] Social Proof/Testimonials
5. [ ] Pricing
6. [ ] FAQ
7. [ ] CTA
8. [ ] Footer

**Layout Pattern**: [single-column / two-column / grid / bento / asymmetric]
**Navigation Type**: [sticky / fixed / relative] + [hamburger mobile / full mobile nav]

---

### Design Tokens Extracted

**Color Strategy**: [Describe the emotional vibe, e.g., "High-contrast editorial" or "Warm organic minimalism"]

| Semantic Slot | Visual Role & Psychological Impact | Suggested Palette Range |
| :--- | :--- | :--- |
| **Primary** | Main brand action color; used for high-intent CTAs. | [e.g., Deep Navy / Forest Green] |
| **Secondary** | Supportive backgrounds; provides depth without competing. | [e.g., Cool Grays / Soft Earth Tones] |
| **Accent** | Sparingly used for badges or icons to draw attention. | [e.g., Burnished Gold / Vibrant Coral] |
| **Background** | The "Canvas"; focus on readability and comfort. | [e.g., Clean White / Slate 950] |
| **Muted/Border** | Subtle separation of sections and low-contrast text. | [e.g., Neutral Translucents / Soft Silvers] |

---

### 📏 Spatial Rhythm & Geometry

**Layout Philosophy**: [e.g., "Airy with significant white space" or "Compact, data-dense grid"]

* **Grid Style**: [e.g., Standard 12-column / Asymmetric bento / Masonry]
* **Spacing Scale**: [Strictly use Tailwind units: e.g., "Loose (gap-12+)" or "Tight (gap-4)"]
* **Corner Treatment**: [e.g., Sharp 90° for modern feel / Soft (rounded-xl) for approachability]
* **Container Max-Width**: [e.g., Standard (max-w-7xl) / Ultra-wide (max-w-[1920px])]

---

### Typography Strategy

**Typographic Persona**: [e.g., "Editorial Luxury" (Serif + Sans) or "Tech Minimalist" (Monospace + Sans)]

| Semantic Slot | Visual Role & Personality | Proposed Scale & Weight |
| :--- | :--- | :--- |
| **Headings (H1/H2)** | The "Voice." Used to establish authority. | [e.g., 2xl to 5xl / Bold or Light] |
| **Subheaders** | Transitional text; connects headers to body. | [e.g., lg to xl / Medium] |
| **Body Text** | The "Workhorse." Must prioritize legibility. | [e.g., base (16px equivalent) / Normal] |
| **Accents/Labels** | Used for navigation, badges, and small caps. | [e.g., xs to sm / Uppercase / Tracking-wide] |

**Typography Rules**:
* **Font Category**: [e.g., Elegant Serif for titles / Geometric Sans for body]
* **Line Height**: [e.g., Relaxed (leading-relaxed) for readability / Tight (leading-tight) for impact]
* **Character Spacing**: [e.g., Standard / Wide (tracking-widest) for luxury labels]

---

### Component Breakdown

| # | Component | Description | Complexity |
|---|-----------|-------------|------------|
| 1 | `Header.tsx` | [description] | Low/Med/High |
| 2 | `Hero.tsx` | [description] | Low/Med/High |
| 3 | `Features.tsx` | [description] | Low/Med/High |
| ... | ... | ... | ... |

---

### 🖼️ Visual Asset Requirements
*Identify the thematic requirements for visual elements. Document the "brief" so the Developer can source original or stock alternatives without accessing copyrighted source files.*

* **Primary Media (Hero/Introduction)**:
    * **Subject**: [Describe subject matter, e.g., Modern luxury mansion exterior]
    * **Vibe**: [Describe tone, e.g., Cinematic, sunset lighting, high-end]
* **Professional Identity imagery**:
    * **Subject**: [e.g., Professional portrait of the Realtor or lead team]
    * **Vibe**: [e.g., Approachable, high-key studio lighting, sophisticated]
* **Atmosphere & Lifestyle visuals**:
    * **Subject**: [e.g., Interior kitchen details, local neighborhood landmarks, or community shots]
    * **Vibe**: [e.g., Warm, "lived-in" luxury, inviting]
* **Iconography & UI Elements**:
    * **Style**: [e.g., Minimalist line icons for property features like beds/baths]
    * **Consistency**: [e.g., Uniform stroke weight matching the primary brand accent color]

---

# SEO & Metadata Intent

Extract the Topics and Aims. Forbid the extraction of verbatim prose.

- **Primary Keyword Themes:** [e.g., "Luxury Properties," "Market Analytics," "Regional Expertise"]
- **Geographic Targets:** [e.g., "Pittsburgh North Hills," "Allegheny County"]
- **Metadata Goal:** [e.g., "Drive high-intent buyer leads via authority positioning"]
- **Brand Voice:** [e.g., "Authoritative yet approachable, local expert tone"]


---

### 📐 Content Architecture & Component Scope
*Define the required "Content Blocks." The Developer will determine the actual file names and organization based on framework best practices.*

1. **Global Navigation**: Brand logo placement, 4-5 link menu, and a high-priority "Contact" CTA.
2. **Primary Hero Section**: High-impact headline area, supporting sub-text, and the Primary Media slot.
3. **Social Proof / Credibility**: A dedicated area for client testimonials, press logos, or "Sold" statistics.
4. **Property/Service Showcase**: A responsive grid layout to display 3-6 items with brief descriptions and "View Detail" triggers.
5. **Educational/Information Section**: A structured area (like an Accordion) for FAQs or neighborhood guides.
6. **Lead Capture / Contact**: A functional form section with fields for Name, Email, and Inquiry details.
7. **Global Footer**: Site-wide navigation links, social media icons, and necessary Realtor licensing/legal disclosures.

---

### Notes & Considerations

- [Any special patterns observed]
- [Animations or interactions to implement]
- [Missing content that needs placeholders]
- [Accessibility considerations]

---

**Is this Specification ready for the Developer Phase? (y/n)**

If modifications needed, specify:
- Sections to skip
- Components to combine/split
- Design token adjustments
