# 🎓 Global Tuition, Local Austerity

A data-driven explainer website for EDPOL 210 showing how U.S. public universities rely on international & non-resident tuition to offset state funding cuts.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📚 Project Structure

### Pages
- **`/`** - Home page with thesis statement and visual explainer
- **`/explore`** - Interactive data visualizations and analysis tools
- **`/reflection`** - 2-page print-ready essay (academic reflection)
- **`/references`** - Complete bibliography with course and external sources

### Key Features
- 📊 **Interactive Charts** - Trend analysis with Recharts
- 🗺️ **State Map Visualization** - Shows funding cuts by state
- 💰 **Revenue Calculator** - Calculate tuition revenue impact
- ⚖️ **Pro/Con Analysis** - Balanced perspective presentation
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG compliant with keyboard navigation

## 🎨 Design System

- **Colors**: Blue-to-purple gradients with glass-morphism effects
- **Typography**: System fonts with Tailwind Typography plugin
- **Animations**: Framer Motion for smooth transitions
- **Components**: Reusable glass cards, gradient text, animated buttons

## 📊 Data Sources

Edit JSON files in `src/data/`:
- `trends.json` - Historical funding and enrollment data
- `institutions.json` - Campus-specific data
- `references.json` - Bibliography entries
- `footnotes.json` - Citation mappings

## 🏆 Rubric Alignment

✅ **Topic & Stance** - Clear thesis on home page  
✅ **Problem Definition** - Data-driven analysis on explore page  
✅ **Multiple Viewpoints** - Pro/Con arguments and equity perspectives  
✅ **7+ Sources** - 8 references including 2 course materials  
✅ **2-Page Reflection** - Complete essay with all required sections  
✅ **Professional Design** - Modern, accessible, and engaging UI

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + Custom gradients
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Emoji icons for visual interest

## 📝 Development

```bash
# Type checking
npm run tsc --noEmit

# Linting
npm run lint

# Production build
npm run build
```

## 🌐 Deployment

### Quick Deploy to Vercel (Recommended for Grading)

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Deploy with one command**:
```bash
vercel
```
- Follow the prompts (create account if needed)
- Choose "N" for linking to existing project
- Keep all default settings
- Your site will be live at `https://your-project-name.vercel.app`

3. **Alternative: GitHub Integration**
- Push your code to GitHub
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Deploy automatically

### Manual Deployment Options

**Option A: Vercel (Easiest - Free)**
- No configuration needed
- Automatic HTTPS
- Global CDN
- Free custom domain

**Option B: Netlify**
```bash
npm run build
# Drag the 'out' folder to netlify.app
```

**Option C: GitHub Pages**
- Add `output: 'export'` to next.config.ts
- Build and push to gh-pages branch

### Share with Grader
Once deployed, share your public URL:
- Example: `https://global-tuition.vercel.app`
- The site will be publicly accessible
- No login required
- Works on all devices

---

**EDPOL 210 Final Unessay Project | August 2025**
