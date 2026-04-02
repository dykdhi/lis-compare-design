
# Copilot CLI Prompt — Build Overall Page Layout Only (No Control Details)

## Goal
Scaffold a responsive web page that matches the *overall* layout from the following design:
- **Top App Bar** spanning full width
- **Two-panel body**
  - **Left Controls Panel** (fixed width)
  - **Right Data Panel** (flexible width)
    - Contains a **Map placeholder** (simple `<div>` placeholder)
- **Do not** implement any specific controls, charts, legends, sliders, or map logic—layout only.

## Tech Assumptions
Use **React + TypeScript** with **Tailwind** for layout primitives (AppBar, Box, Paper, Divider). If you prefer a different stack, keep the same layout structure and class names.

---

## Copilot CLI Instruction (paste into Copilot CLI)
Create a new React + TypeScript page/component in `App.tsx` that renders:

### 1) Full-width Top App Bar
- Height ~56–64px
- Contains:
  - Left: app name/title (e.g., “Long Island Sound …” or “Compare Report”)
  - Right: placeholder area for icons/user menu (empty is fine)
- The AppBar must remain at the top and not scroll away (sticky/fixed is OK).

### 2) Main Content Area (below App Bar)
- Occupies the remaining viewport height: `calc(100vh - appBarHeight)`
- Uses a **two-column layout**:

#### Left Controls Panel
- Fixed width: **360–420px** (pick 380px as a default)
- Full height of the content area
- Visual separation:
  - Right border or Divider
  - Subtle background (e.g., light gray) and/or Paper elevation
- Include only:
  - A panel header row (text placeholder like “Controls”)
  - An empty content container (no actual controls)

#### Right Data Panel
- Flexible width: takes all remaining space
- Full height of the content area
- Internal layout:
  - Optional page title row centered at top (e.g., “Compare Report”) OR rely on AppBar title
  - Primary content region is a **Map Placeholder**
    - A `<div>` or tailwind Box that fills available space
    - Style: light background, border, and centered text “Map Placeholder”
    - No real map library; no tiles; no interactions

### 3) Responsiveness
- Desktop (≥ 1024px): show both panels side-by-side.
- Tablet/smaller:
  - Left panel collapses to a drawer OR stacks above the right panel (choose **stack** for simplicity)
  - Ensure nothing overflows vertically; allow scrolling inside panels if content grows.

### 4) Implementation Details
- Use tailwind components that are close to:
  - `AppBar`, `Toolbar`, `Typography`, `Box`, `Paper`, `Divider`
- Use CSS/Flexbox:
  - Outer container: column (AppBar + body)
  - Body container: row (left + right) on desktop; column on small screens
- Add minimal, clean styling only for layout (padding, borders, background colors).
- No business logic, no mock data, no charts, no form fields.

---

## Acceptance Criteria
- Page renders with: **AppBar on top**, **left fixed panel**, **right flexible panel**.
- Right panel contains a **single map placeholder div** filling most of the space.
- No detailed controls or widgets—placeholders only.
- Layout stays within viewport height and behaves reasonably on smaller screens.

---

## Suggested File Output
- `src/App.tsx`

Build only this layout.
