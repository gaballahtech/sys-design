# SYS-Design-System

A premium, enterprise-grade Design System comparable to Apple's Human Interface Guidelines and Google Material Design.

## Overview

**SYS-Design-System** is a comprehensive design system built for scalability, accessibility, and consistency across web applications. It includes design tokens, a complete component library, typography, color palettes, and micro-interactions designed to work seamlessly together.

---

## Design Tokens & Visual Foundations

### Color Palette

#### Light Mode

| Color | HEX | HSL | Purpose |
|-------|-----|-----|---------|
| Primary | `#2563EB` | `219 85% 52%` | Primary actions, links |
| Secondary | `#0891B2` | `180 72% 35%` | Secondary actions |
| Accent | `#F59E0B` | `43 95% 55%` | Highlights, warnings |
| Success | `#10B981` | `156 82% 32%` | Positive actions |
| Warning | `#F59E0B` | `43 95% 55%` | Attention items |
| Error | `#EF4444` | `0 72% 52%` | Destructive actions |
| Info | `#3B82F6` | `220 75% 55%` | Informational messages |
| Neutral 50 | `#FAFAFF` | `220 15% 98%` | Backgrounds |
| Neutral 100 | `#F0F2F5` | `215 20% 97%` | Subtle backgrounds |
| Neutral 900 | `#0F172A` | `215 20% 17%` | Primary text |
| Neutral 950 | `#020617` | `215 20% 7%` | Deepest text/background |

#### Dark Mode

| Color | HEX | HSL | Purpose |
|-------|-----|-----|---------|
| Primary | `#3B82F6` | `220 75% 55%` | Primary actions, links |
| Secondary | `#0F766E` | `180 68% 33%` | Secondary actions |
| Accent | `#FBBF24` | `45 95% 57%` | Highlights, warnings |
| Success | `#34D399` | `156 76% 51%` | Positive actions |
| Warning | `#FBBF24` | `45 95% 57%` | Attention items |
| Error | `#F87171` | `0 84% 55%` | Destructive actions |
| Info | `#60A5FA` | `220 70% 65%` | Informational messages |
| Neutral 50 | `#1E293B` | `215 20% 13%` | Backgrounds |
| Neutral 950 | `#F8FAFC` | `215 20% 96%` | Deepest text/background |

#### Color Variables

```css
/* Light mode */
:root {
  --primary: 219 85% 52%;
  --primary-foreground: 0 0% 100%;
  --secondary: 180 72% 35%;
  --success: 156 82% 32%;
  --warning: 43 95% 55%;
  --error: 0 72% 52%;
  --info: 220 75% 55%;
  --background: 0 0% 98%;
  --foreground: 215 20% 17%;
}

/* Dark mode */
.dark {
  --primary: 220 75% 55%;
  --background: 215 20% 12%;
  --foreground: 215 20% 91%;
}
```

### Typography

#### Font Family

- **Primary**: `Inter`, `system-ui`, `-apple-system`, `sans-serif`
- **Serif**: `Georgia`, `serif`
- **Monospace**: `JetBrains Mono`, `monospace`

#### Font Size Hierarchy

| Scale | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `xs` | `0.75rem` | `1rem` | Captions, small text |
| `sm` | `0.875rem` | `1.25rem` | Body text small |
| `base` | `1rem` | `1.5rem` | Body text default |
| `lg` | `1.125rem` | `1.75rem` | Body text large |
| `xl` | `1.25rem` | `1.75rem` | Headings H6 |
| `2xl` | `1.5rem` | `2rem` | Headings H5 |
| `3xl` | `1.875rem` | `2.25rem` | Headings H4 |
| `4xl` | `2.25rem` | `2.5rem` | Headings H3 |
| `5xl` | `3rem` | `1` | Headings H2 |
| `6xl` | `3.75rem` | `1` | Headings H1 |
| `7xl` | `4.5rem` | `1.125rem` | Display headings |
| `8xl` | `6rem` | `1` | Hero headings |
| `9xl` | `8rem` | `1` | Hero headings |

#### Font Weight

| Weight | Value | Usage |
|--------|-------|-------|
| Thin | 100 | Light text |
| Extra Light | 200 | Light text |
| Light | 300 | Light text |
| Normal | 400 | Body text |
| Medium | 500 | Semibold text |
| Semi Bold | 600 | Headings, labels |
| Bold | 700 | Strong emphasis |
| Extra Bold | 800 | Display text |
| Black | 900 | Maximum emphasis |

#### Line Height

| Scale | Value | Usage |
|-------|-------|-------|
| Tight | `1.25rem` | Tight paragraphs |
| Normal | `1.5rem` | Default body |
| Relaxed | `1.75rem` | Large bodies |

### Spacing System (8pt Grid)

| Scale | Value | Multiplier |
|-------|-------|------------|
| `0` | `0` | `0x` |
| `1` | `0.25rem` | `4px` |
| `2` | `0.5rem` | `8px` |
| `3` | `0.75rem` | `12px` |
| `4` | `1rem` | `16px` |
| `5` | `1.5rem` | `24px` |
| `6` | `2rem` | `32px` |
| `8` | `2.5rem` | `40px` |
| `10` | `3.25rem` | `52px` |
| `12` | `4rem` | `64px` |
| `16` | `4.25rem` | `68px` |
| `20` | `5rem` | `80px` |
| `24` | `6rem` | `96px` |
| `32` | `8rem` | `128px` |
| `40` | `10rem` | `160px` |
| `48` | `12rem` | `192px` |
| `64` | `16rem` | `256px` |

### Border Radius

| Scale | Value | Usage |
|-------|-------|-------|
| `none` | `0` | No rounding |
| `sm` | `0.125rem` | `2px` | Inputs, small elements |
| `md` | `0.375rem` | `6px` | Cards, buttons |
| `lg` | `0.5rem` | `8px` | Moderate rounding |
| `xl` | `0.75rem` | `12px` | Large cards |
| `2xl` | `1rem` | `16px` | Pill shapes, avatars |
| `full` | `9999px` | Circular/pill elements |

### Shadows

| Scale | Value | Usage |
|-------|-------|-------|
| `sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Small elevations |
| `md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` | Default cards |
| `lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` | Elevated cards |
| `xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` | Modal, drawers |
| `2xl` | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` | Heavy elevation |
| `inner` | `inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)` | Inner shadows |
| `none` | `0 0 0 transparent` | No shadow |

### Z-Index Stack

| Level | Value | Usage |
|-------|-------|-------|
| `auto` | `auto` | Default |
| `0` | `0` | Base layer |
| `10` | `10` | Minor overlays |
| `20` | `20` | Tooltips, small popovers |
| `30` | `30` | Dropdowns, navigation |
| `40` | `40` | Modals, sidebars |
| `50` | `50` | Global loading, toast notifications |

---

## 📦 Component Library

### Buttons

| Variant | Description |
|---------|-------------|
| `primary` | Solid primary brand color |
| `secondary` | Solid secondary color |
| `outline` | Transparent with border |
| `ghost` | Transparent with text color |
| `destructive` | Red for destructive actions |

| Size | Description |
|------|-------------|
| `sm` | Small, compact |
| `md` | Medium, default |
| `lg` | Large |
| `icon` | Icon-only button |

| States |
|--------|
| `Default` | Base style |
| `Hover` | Background/color change + slight lift |
| `Active` | Pressed state, slight sink |
| `Focus` | Visible focus ring for accessibility |
| `Disabled` | Reduced opacity, pointer-events: none |

**Usage:**

```jsx
<SysButton variant="primary" size="md">
  Primary Action
</SysButton>

<SysButton variant="outline" size="sm">
  Outline Button
</SysButton>

<SysButton disabled>
  Disabled Button
</SysButton>
```

### Inputs

| State | Description |
|-------|-------------|
| `Default` | Base input style |
| `Focus` | Border color change + shadow |
| `Hover` | Border color change |
| `Disabled` | Reduced opacity, different border |
| `Error` | Red border + error shadow |

**Usage:**

```jsx
<SysInput type="text" placeholder="Enter email" error />
<SysInput type="password" placeholder="Enter password" success />
```

### Cards

| Variant | Description |
|---------|-------------|
| `Default` | Basic card with border |
| `Elevated` | Card with box shadow |

| States |
|--------|
| `Hover` | Border color change + shadow on hover |
| `Focus` | Border focus state |

**Usage:**

```jsx
<SysCard elevated>
  <p>Card content with elevation</p>
</SysCard>
```

### Modals

| State | Description |
|-------|-------------|
| `Open` | Modal visible with animation |
| `Closed` | Modal hidden with animation |
| `Focus` | Focus trap + keyboard navigation |

**Usage:**

```jsx
<SysModal isOpen={isOpen} onClose={handleClose}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</SysModal>
```

### Navbar

| Feature | Description |
|---------|-------------|
| `Sticky` | Fixed at top of viewport |
| `Responsive` | Collapses to mobile menu on small screens |
| `Dark Mode` | Auto-dark mode support |

**Usage:**

```jsx
<SysNavbar
  logo={<SysLogo />}
  links={[
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
  ]}
  actions={<SysButton variant="secondary">Login</SysButton>}
/>
```

### Sidebar

| Feature | Description |
|---------|-------------|
| `Fixed` | Sticks to left side of viewport |
| `Collapsible` | Collapses to icon-only mode |
| `Mobile` | Full-screen slide-in on mobile |

**Usage:**

```jsx
<SysSidebar isOpen={isOpen} navItems={navItems} />
```

### Tables

| Feature | Description |
|---------|-------------|
| `Hover` | Row background on hover |
| `Selection` | Row selection with checkbox |
| `Focus` | Row focus for keyboard navigation |

**Usage:**

```jsx
<SysTable
  columns={columns}
  data={data}
  selectable
/>
```

### Badges

| Variant | Description |
|---------|-------------|
| `primary` | Primary brand color |
| `secondary` | Secondary color |
| `success` | Green for success states |
| `warning` | Amber for warnings |
| `error` | Red for errors |
| `info` | Blue for info messages |

**Usage:**

```jsx
<SysBadge variant="success">Success</SysBadge>
<SysBadge variant="warning">Warning</SysBadge>
```

### Tabs

| State | Description |
|-------|-------------|
| `Default` | Tab navigation with selection |
| `Selected` | Active tab styling |
| `Hover` | Hover state on tabs |
| `Disabled` | Disabled tab styling |

**Usage:**

```jsx
<SysTabs defaultValue="1">
  <TabsList>
    <TabsTrigger value="1">Tab 1</TabsTrigger>
    <TabsTrigger value="2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="1">Tab Panel 1</TabsContent>
</SysTabs>
```

---

## Icons & Micro-Interactions

### Icon Library Integration

**Recommended**: Lucide React or Tabler Icons

```bash
# Install Lucide React
npm install lucide-react

# Or Tabler Icons
npm install @tabler/icons-react
```

**Usage with Lucide:**

```jsx
import { Home, Settings, Users } from "lucide-react";

<SysBadge variant="primary">
  <Home className="w-4 h-4" />
  Dashboard
</SysBadge>
```

### Motion & Animation

#### Transition Durations

| Duration | Value | Usage |
|----------|-------|-------|
| `fast` | `150ms` | Quick interactions |
| `default` | `200ms` | Default transitions |
| `slow` | `300ms` | Complex animations |
| `modal` | `250ms` | Modal open/close |

#### Easing Curves

| Curve | Cubic-Bezier | Description |
|-------|--------------|-------------|
| `Default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease-out |
| `Ease In` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating |
| `Ease Out` | `cubic-bezier(0.4, 0, 0, 1)` | Decelerating |
| `Ease In Out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Both directions |

#### Standard CSS Transition

```css
.example-element {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.2s;
}
```

#### Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

#### Animation Usage

```jsx
<div className="animate-fade-in">Content fades in</div>
<div className="animate-slide-up">Content slides up</div>
```

#### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation & Code Artifacts

### Tailwind CSS Configuration

**File**: `tailwind.config.js`

```javascript
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sys: {
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          // ... other colors
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        // ...
      },
      transitionProperty: {
        DEFAULT: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### CSS Variables (globals.css)

**File**: `src/styles/globals.css`

```css
:root {
  --primary: 219 85% 52%;
  --primary-foreground: 0 0% 100%;
  --secondary: 180 72% 35%;
  --success: 156 82% 32%;
  --warning: 43 95% 55%;
  --error: 0 72% 52%;
  --info: 220 75% 55%;
  --background: 0 0% 98%;
  --foreground: 215 20% 17%;
  --card: 0 0% 98%;
  --border: 215 20% 88%;
  --input: 0 0% 98%;
  --ring: 215 20% 51%;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  --shadow-none: 0 0 0 transparent;
}

.dark {
  --primary: 220 75% 55%;
  --background: 215 20% 12%;
  --foreground: 215 20% 91%;
  --card: 215 20% 18%;
  --border: 215 20% 31%;
  --input: 215 20% 31%;
}
```

### React Component Examples

#### Button Component

```jsx
import { SysButton } from "@/components/button";

export function ActionButtons() {
  return (
    <div className="gap-4">
      <SysButton variant="primary" size="md">
        Primary Action
      </SysButton>
      
      <SysButton variant="secondary" size="md">
        Secondary
      </SysButton>
      
      <SysButton variant="outline" size="sm">
        Outline
      </SysButton>
      
      <SysButton variant="ghost" size="sm">
        Ghost
      </SysButton>
      
      <SysButton disabled>
        Disabled
      </SysButton>
    </div>
  );
}
```

#### Input Component

```jsx
import { SysInput } from "@/components/input";

export function ContactForm() {
  return (
    <form>
      <SysInput
        type="email"
        placeholder="Enter your email"
        error
        required
      />
      <SysInput
        type="password"
        placeholder="Enter your password"
        success
      />
      <button type="submit" className="sys-btn sys-btn--primary">
        Submit
      </button>
    </form>
  );
}
```

#### Card Component

```jsx
import { SysCard } from "@/components/card";

export function FeatureCard() {
  return (
    <SysCard elevated>
      <h3 className="sys-card-title">Feature Title</h3>
      <p className="sys-card-description">
        Description of the feature with some context.
      </p>
    </SysCard>
  );
}
```

#### Table Component

```jsx
import { SysTable } from "@/components/table";

export function UserTable() {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
  ];

  const data = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  return <SysTable columns={columns} data={data} selectable />;
}
```

#### Modal Component

```jsx
import { SysModal } from "@/components/modal";

export function UserProfile() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <SysButton variant="primary" onClick={() => setIsOpen(true)}>
        Open Profile
      </SysButton>
      
      <SysModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>User Profile</h2>
        <p>User details go here</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </SysModal>
    </>
  );
}
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Max Width | Usage |
|------------|-----------|-----------|-------|
| `sm` | `640px` | — | Small phones |
| `md` | `768px` | `1023px` | Tablets |
| `lg` | `1024px` | `1279px` | Laptops |
| `xl` | `1280px` | `1535px` | Desktops |
| `2xl` | `1536px` | — | Large desktops |

**Usage in Tailwind:**

```jsx
<div className="sm:p-4 md:p-6 lg:p-8">
  Content with responsive padding
</div>

<button className="md:block hidden">Desktop only</button>
```

---

## ♿ Accessibility

### Focus States

All interactive elements include visible focus states:

```css
:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

### Color Contrast

- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text (18pt+) and UI components
- Focus ring provides 3:1 contrast against surrounding colors

### Keyboard Navigation

- `Tab` key navigates through interactive elements in order
- `Enter`/Space activates buttons and links
- `Escape` closes modals and dismisses popovers
- Arrow keys navigate within groups (tabs, selections)

### ARIA Roles

- Modals use `role="dialog"` with `aria-modal="true"`
- Landmarks properly labeled
- Live regions for dynamic content updates

---

## 🌓 Dark Mode

SYS-Design-System supports both light and dark modes:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"], // or "media" or "class"
};
```

**Implementation:**

```html
<html class="dark">
  <!-- Or programmatically -->
  <body className={isDarkMode ? "dark" : ""}>
</html>
```

Color tokens automatically switch based on the `dark` class selector.

---

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd sys-design-system

# Install dependencies
npm install

# Or with yarn
yarn install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

```jsx
import { SysButton, SysInput, SysCard } from "@/components";
import { designTokens } from "@/tokens";

export function Example() {
  return (
    <SysCard elevated>
      <SysInput placeholder="Start typing..." />
      <SysButton variant="primary">Submit</SysButton>
    </SysCard>
  );
}
```

---

## 📄 License

This design system is proprietary and intended for internal use within SYS initiatives. All rights reserved.

## Contributing

1. Follow the established design tokens and component patterns
2. Maintain accessibility standards (WCAG 2.1 AA)
3. Test components in both light and dark modes
4. Submit pull requests with clear descriptions
5. Run the design token validation script before merging

---

**SYS-Design-System v1.0.0**
*Built for the SYS ecosystem*