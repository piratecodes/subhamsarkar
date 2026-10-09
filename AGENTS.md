<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Stitch Component Styling Rule

Whenever we import components from Stitch, do not add custom CSS variables for spacing, typography, shadows, or radiuses to `globals.css`. Always map them to native Tailwind V4 utility classes directly in the JSX.

Only colors should be written inside `globals.css` as per requirements. Note that all the design system colors are already defined in `globals.css` inside the `@theme inline` block.

# Background Color Application Rule

If there is a global background color for the application, first define it in `globals.css` (e.g. `--color-background`) and then apply it directly to the layout (`layout.js`) using utility classes like `bg-background`. Do not redundantly apply background color utility classes to every individual section or page unless a specific, different background color is needed for that section.

# Project Structure and Component Rules

1. **Global Components**: The `Navbar` and `Footer` components must be created once within the `components/` directory and imported where needed. Do not recreate them for every page.
2. **Page-Specific Components**: For every page, create a separate folder inside `components/` named after that page (e.g., `components/landing/`). Each section of that page must be placed in a separate file within its respective folder. The sections will then be imported and connected inside the main page file.
3. **Headless UI**: Use `@headlessui/react` for any interactive components that require accessibility and state management, such as dropdowns, comboboxes, popups, modals, etc.
4. **Layout Containers**: Use the `.container` class for every section, but do *not* add the `mx-auto` tag along with it. also don't use `.max-w-[1440px] .mx-auto` insted use `.container` for all the sections.
5. **Admin Route**: A `(sudo)` route group must be created for the admin panel, which will be used for managing the website (e.g., posting blogs, changing contact details).
6. **Reference Code**: When provided with reference code or designs, do not blindly copy and paste. Treat them as conceptual ideas and implement them strictly according to these project rules and design system guidelines.
7. **Font Management**: Text fonts (Inter, Space Grotesk) must be instantiated directly inside `layout.jsx` using `next/font/google` and injected into the `<body>` classname as CSS variables so they can be accessed globally via Tailwind utility classes. However, icon fonts (like Material Symbols) cannot be loaded via `next/font/google` due to Next.js compilation limits with Google's variable axes. Icon fonts must be loaded via standard `<link>` tags in the `<head>` of `layout.jsx`. Do not `export` fonts from `layout.jsx`, and do not import font variables into individual components.
8. **Icon Usage**: Do not use `material-symbols-outlined`. Instead, always use `lucide-react` for standard UI icons and `react-icons` for social media or brand icons.
