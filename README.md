# 🚀 Edo's Cloud & DevOps Portfolio

> Built like infrastructure. Deployed like infrastructure. **Is** infrastructure.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PORTFOLIO INFRA                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────────────┐     │
│   │  GitHub  │───▶│  GitHub  │───▶│     Vercel       │     │
│   │   Repo   │    │  Actions │    │  (Edge Network)  │     │
│   └──────────┘    └──────────┘    └──────────────────┘     │
│                         │                    │              │
│                    ┌────▼────┐         ┌─────▼─────┐       │
│                    │  Lint   │         │  CDN Edge │       │
│                    │  Build  │         │  (Global) │       │
│                    │  Test   │         └───────────┘       │
│                    └─────────┘                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Fonts | JetBrains Mono + IBM Plex Sans |
| CI/CD | GitHub Actions |
| Hosting | Vercel (Edge Network) |
| DNS | Vercel DNS / Custom domain |

## Getting Started

```bash
# Clone
git clone https://github.com/edothecreator/portfolio.git
cd portfolio

# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Start production
npm start
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Main page orchestrator
│   │   └── globals.css         # Tailwind + custom animations
│   └── components/
│       ├── BootSequence.tsx     # Terminal boot animation
│       ├── Hero.tsx             # Hero + ASCII architecture
│       ├── SkillsMatrix.tsx     # Skills dashboard panels
│       ├── Projects.tsx         # Deployment cards
│       ├── CertPipeline.tsx     # Cert pipeline visualization
│       ├── Terminal.tsx         # Interactive terminal
│       └── Contact.tsx          # SSH-themed contact
├── public/
│   └── resume.pdf              # Downloadable CV
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
└── README.md                   # You are here
```

## Deployment

### Automatic (CI/CD)
Every push to `main` triggers:
1. **Lint** — ESLint checks
2. **Build** — Next.js production build
3. **Deploy** — Vercel production deployment

### Manual
```bash
npx vercel --prod
```

### Required Secrets (GitHub)
- `VERCEL_TOKEN` — Vercel API token
- `VERCEL_ORG_ID` — Vercel organization ID
- `VERCEL_PROJECT_ID` — Vercel project ID

## Performance Targets

- Lighthouse Performance: ≥ 90
- Lighthouse Accessibility: ≥ 95
- Lighthouse Best Practices: ≥ 95
- Lighthouse SEO: ≥ 95
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## Design Decisions

- **Dark mode only** — no toggle. This is a terminal.
- **Monospace-first typography** — every heading is a command.
- **Status indicators** — honest self-assessment (ACTIVE/LEARNING/PLANNED).
- **Interactive terminal** — functional command input, not decoration.
- **Reduced motion support** — respects `prefers-reduced-motion`.
- **Mobile-first** — works on every screen size.

## Author

**Mohamed "Edo" ELKHANFAF**  
Cloud & DevOps Engineer  
[GitHub](https://github.com/edothecreator) · [LinkedIn](https://linkedin.com/in/mohamed-el-khanfaf) · [Email](mailto:mohamedelkhanfaf0@gmail.com)

---

```
$ terraform apply -auto-approve
```
