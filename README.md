# Muna Kousalya - Portfolio Website

A high-performance, visually striking, interactive, and fully data-driven personal portfolio website built with modern frontend architecture. Designed for performance, smooth micro-interactions, accessibility, and production deployment on Vercel.

---

## 🚀 Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Routing**: React Router v7 (SPA architecture with seamless GSAP curve transitions)
- **Styling**: Tailwind CSS with custom root font scaling
- **Animations**: GSAP (GreenSock) + Framer Motion (Liquid/Wave page wipes, modal spring animations, scroll-triggered reveals)
- **Smooth Scroll**: `@studio-freight/lenis`
- **Database / Backend**: Supabase (PostgreSQL with live fallback to static data)
- **PWA**: `vite-plugin-pwa` with offline caching & install prompt
- **Icons**: `lucide-react`
- **Deployment**: Vercel (Configured with `vercel.json` SPA rewrites & security headers)

---

## 📁 Architecture & Code Organization

```text
src/
├── assets/                 # Images, SVGs, logos, and media files
├── components/             # Reusable modular UI components
│   ├── common/             # Global components (LenisProvider, CurveTransition, SplashScreen, CustomCursor, FadeIn)
│   ├── contact/            # LetsTalkModal, ContactMeButton
│   └── navbar/             # Responsive Navbar with mobile menu & CV action pill
├── data/                   # Fallback data definitions
│   ├── portfolioData.ts    # Centralized export
│   ├── projects.ts         # Portfolio projects list
│   ├── services.ts         # Service cards with action links & modal presets
│   ├── products.ts         # Digital products catalogue
│   ├── skills.ts           # Tech stack & skills matrix
│   ├── education.ts        # Experience & education timeline
│   ├── achievements.ts     # Certifications & achievements with descriptions
│   └── testimonials.ts     # Client testimonials & reviews
├── hooks/                  # Custom React hooks (e.g. useSupabaseData)
├── pages/                  # Route layouts
│   ├── Home/               # HomePage layout
│   ├── Projects/           # Dedicated Projects catalogue page
│   ├── Products/           # Dedicated Products catalogue page
│   ├── Privacy/            # Privacy Policy legal page
│   ├── Terms/              # Terms & Conditions legal page
│   └── Refund/             # Refund Policy legal page
├── routes/                 # Routing configuration (AppRoutes.tsx)
├── sections/               # Home page sections
│   └── home/               # HeroSection, AboutSection, ServicesSection, ProjectsSection,
│                           # SkillsSection, ExperienceEducationSection, CertificationsSection,
│                           # TestimonialsSection, ContactSection
├── utils/                  # Supabase client setup & helper utilities
├── App.tsx                 # Root application wrapper
├── index.css               # Global styling, root typography scaling & scrollbar rules
└── main.tsx                # React entry point with BrowserRouter & PWA registration
```

---

## 🎨 Design & Interaction Highlights

1. **Seamless Page & Section Transitions**:
   - Integrated GSAP liquid & wave SVG curve wipes (`CurveTransition.tsx`).
   - Global link interceptor in `LenisProvider.tsx` catches internal route (`/`) and hash (`#`) links to trigger synchronized wipe animations with zero jarring jumps.
2. **Dynamic Typography Scaling**:
   - Scaled root font size in `src/index.css` (`17.5px` desktop, `17px` mobile) to provide crisp, readable text across all devices and display densities.
3. **Responsive Service Cards**:
   - Uniform 3-button column layout (**Let's Talk**, **View Work**, **Buy Product**) with identical sizing, touch-friendly targets, and hover feedback across mobile and desktop.
4. **PWA Enabled**:
   - Installable on mobile and desktop with service worker caching for near-instant repeat visits.

---

## 📊 Adding and Updating Content

The entire portfolio is **100% data-driven**. You never need to touch complex layout or animation code to update projects, services, or credentials.

### 1. Static Fallback Data
Edit files in `src/data/`:
- `src/data/projects.ts` – Add or edit projects (title, category, tags, image URL, live link).
- `src/data/services.ts` – Update services, descriptions, action links, and default inquiry messages.
- `src/data/products.ts` – Add or edit digital products, prices, and links.
- `src/data/achievements.ts` – Add certification titles, issuers, dates, descriptions, and certificate links.
- `src/data/skills.ts` – Manage skills categories and proficiency tags.

### 2. Live Supabase Data (Optional)
If connected, the site automatically fetches the latest data from your Supabase PostgreSQL instance:
1. Open your Supabase project dashboard.
2. Update or insert rows into the corresponding tables (`projects`, `services`, `products`, `certifications`, `skills`).
3. If Supabase is unreachable or empty, the application will seamlessly fallback to static data with zero downtime.

---

## 🌐 Deployment to Vercel

The portfolio is pre-configured and tested for 1-click Vercel deployment:

1. **Environment Variables**:
   In your Vercel Project Settings > Environment Variables, add:
   - `VITE_SUPABASE_URL` = `<your-supabase-url>`
   - `VITE_SUPABASE_ANON_KEY` = `<your-supabase-anon-key>`
   *(Note: Never expose your service role secret key).*

2. **Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **SPA Rewrites**:
   The included `vercel.json` ensures all deep links (`/projects`, `/products`, `/privacy`, etc.) resolve directly to `index.html` without 404 errors on page refresh.

---

## 🛠️ Development Scripts

- `npm run dev` — Start the local Vite development server with hot module replacement (HMR).
- `npm run build` — Run TypeScript type checking (`tsc`) and compile the optimized production bundle with Rollup / Vite.
- `npm run preview` — Locally preview the built production artifacts.
