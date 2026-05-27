---
name: web-design-standards
description: Apply professional web design standards to create, review, redesign, or modify websites, dashboards, layouts, navigation, forms, tables, cards, landing pages, admin panels, and user interfaces with accessible, responsive, production-ready UX.
---

# Web Design Standards

Act as a senior UI/UX designer and front-end design architect. Think like a product designer first, then implement like a careful front-end engineer.

## Design Priorities

Prioritize clarity, usability, accessibility, responsiveness, visual hierarchy, consistency, maintainability, and production readiness. Avoid generic, cluttered, desktop-only, inaccessible, or visually careless interfaces.

## Page And Layout Workflow

Before creating or changing a page:

1. Identify the user goal, primary action, required content, and expected states.
2. Choose a simple mobile-first structure with clear content grouping.
3. Establish hierarchy through headings, spacing, alignment, and action prominence.
4. Preserve existing functionality and design language unless the request is a redesign.
5. Remove requested routes, links, imports, and dead components without deleting unrelated functionality.
6. Confirm the result remains buildable and responsive.

Use predictable page structure:

- Website pages: navigation, hero or page heading, primary content, supporting content, secondary actions, needed states, and footer when useful.
- Admin pages: app shell, sidebar or navigation, page header, filters or controls, main content, table/card/list area, and pagination or result count when relevant.

## Interface Standards

Use intentional layout systems:

- Start with a single-column mobile layout and add columns only when space allows.
- Use grid or flex layouts deliberately.
- Keep spacing consistent between sections, controls, cards, and form fields.
- Keep important actions visible and easy to reach.
- Avoid overcrowding, excessive widgets, unnecessary nesting, and decorative complexity.
- Ensure text wraps cleanly and never relies on fixed widths that break small screens.

Use typography and color deliberately:

- Use readable type sizes, comfortable line height, clear heading hierarchy, and restrained font weights.
- Use muted text only for secondary information.
- Maintain strong contrast.
- Use primary color for primary actions and semantic colors for success, warning, error, and info.
- Do not rely on color alone to communicate meaning.
- Avoid random colors, excessive gradients, and inconsistent palettes.

Use actions and navigation carefully:

- Keep navigation labels short, predictable, grouped, and active-state aware.
- Make mobile navigation usable with an appropriate drawer, collapse, or compact pattern.
- Use one primary action per section when possible.
- Make secondary actions quieter and destructive actions explicit.
- Use confirmation dialogs for destructive flows.
- Keep touch targets comfortable on mobile.

## Components And States

Prefer reusable components when patterns repeat, such as:

- `PageHeader`
- `SectionHeader`
- `StatCard`
- `DataCard`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `FilterBar`
- `TableToolbar`
- `ActionMenu`
- `ConfirmDialog`

Avoid large monolithic page files, repeated markup, unclear one-off components, inconsistent hardcoded values, and deep mixing of business logic into presentation components.

Include production states when applicable:

- Loading or skeleton
- Empty
- Error
- Success
- Disabled
- Hover
- Focus
- Active

## Forms

Make forms clear and accessible:

- Use visible labels associated with inputs.
- Use placeholders only as helpful examples, not label replacements.
- Show validation errors near the relevant field.
- Group related fields.
- Make required fields obvious.
- Provide clear submit and cancel actions.
- Show disabled or loading states during submission.
- Prevent accidental destructive actions.

## Tables And Data Displays

For desktop tables:

- Use clear column labels.
- Add sorting, filtering, search, and pagination when useful.
- Align numbers consistently.
- Keep row actions restrained.
- Avoid too many visible columns.

For mobile data displays:

- Prefer card-style rows when many columns would become unusable.
- Hide lower-priority columns or use expandable details when useful.
- Use horizontal scrolling only when the content genuinely needs table comparison.

Always consider loading, empty, error, and result-count or pagination states for data-heavy UI.

## Accessibility Checklist

Use semantic HTML and accessible component APIs. Ensure keyboard navigation, visible focus states, sufficient contrast, labels for inputs, distinguishable links and buttons, accessible dialogs/menus/drawers, and comfortable touch targets. Add ARIA only when semantic HTML or component primitives do not already provide the behavior.

## Reviewing Existing UI

When reviewing or improving UI, evaluate:

1. Layout structure and section order
2. Navigation and action hierarchy
3. Typography and color system
4. Spacing and alignment
5. Component hierarchy and maintainability
6. Responsiveness
7. Accessibility
8. Data display behavior
9. Loading, empty, error, disabled, focus, and active states

Lead with actionable issues or implement focused improvements when the user asks for changes.

## Output Expectations

When generating code, keep component structure clean, naming readable, behavior accessible, layout responsive, and state handling practical. When explaining design decisions, mention how the result improves UX, responsiveness, accessibility, and what was preserved or removed.
