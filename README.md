# Portfolio Website

A modern, responsive portfolio website built with Angular 17 and Tailwind CSS, featuring smooth animations, dark theme, and dynamic content loading from a backend API.

## 🚀 Features

- **Modern Design** - Sleek dark theme with gradient backgrounds
- **Fully Responsive** - Works seamlessly on all devices
- **Smooth Animations** - Scroll-triggered reveal animations
- **Dynamic Content** - Data loaded from backend API
- **Social Integration** - GitHub, LinkedIn, Instagram, CodeChef links with icons
- **Project Showcase** - Display projects with tech stacks and links
- **Experience Timeline** - Professional work history
- **Skills Display** - Technical skills showcase
- **Contact Section** - Contact information and social links
- **Dynamic Favicon** - Customizable favicon through admin panel
- **SEO Friendly** - Optimized for search engines
- **Back to Top Button** - Smooth scrolling navigation

## 🛠️ Tech Stack

- **Angular 17+** with standalone components
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **RxJS** - Reactive data handling
- **Angular Router** - Navigation
- **HttpClient** - API communication
- **Intersection Observer** - Scroll animations

## 📋 Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+
- Backend API running (Portfolio-backend)

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/RagingScout95/Portfolio-frontend.git
cd Portfolio-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Update `src/environments/environment.ts` for development:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

Update `src/environments/environment.prod.ts` for production:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

## 🚀 Running the Application

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200`

### Production Build

```bash
npm run build
# or
ng build --configuration production
```

Build artifacts will be in the `dist/` directory.

## 📚 Sections

### Hero Section
- Name and role
- Tagline
- Profile photo
- Social media links
- CTA buttons

### About Section
- Personal bio
- Education background
- Technical skills
- Current job information

### Experience Section
- Timeline-style work history
- Job roles and companies
- Detailed descriptions
- Date ranges

### Projects Section
- Project cards with images
- Technology stacks
- GitHub/Live/Demo links
- Project descriptions

### Contact Section
- Contact information
- Social media links
- Quick links

## 🎨 Customization

### Theme Colors

Modify colors in Tailwind configuration (`tailwind.config.js`):

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Customize colors
      }
    }
  }
}
```

### API Endpoint

Change the API URL in environment files to connect to your backend.

### Content

All content is managed through the admin dashboard. Update content there and it will reflect automatically.

## 📁 Project Structure

```
src/app/portfolio/
├── portfolio-page/        # Main container
├── components/
│   ├── navbar/           # Sticky navigation
│   ├── hero/             # Hero section
│   ├── about/            # About section
│   ├── experience/       # Experience section
│   │   └── experience-item/
│   ├── projects/         # Projects section
│   │   └── project-card/
│   ├── contact/          # Contact section
│   └── ui/               # Reusable components
│       ├── button/
│       ├── social-icon/
│       └── back-to-top/
├── services/
│   └── portfolio-data.service.ts
├── models/
│   └── portfolio.models.ts
├── directives/
│   └── reveal-on-scroll.directive.ts
└── constants/
    └── theme.constants.ts
```

## 🔧 Features in Detail

### Scroll Animations
Components reveal as you scroll using the `RevealOnScrollDirective`:
- Fade in effect
- Slide up animation
- Intersection Observer API

### Social Icons
Automatic icon detection for:
- GitHub
- LinkedIn
- Instagram
- CodeChef
- Custom fallback for others

### Dynamic Favicon
Favicon is loaded from the backend and updated automatically based on admin configuration.

### Responsive Navigation
- Sticky navbar
- Active section highlighting
- Smooth scroll to sections
- Mobile-friendly

## 📱 Responsive Design

Optimized breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1919px
- **Large Desktop**: 1920px+

## 🧪 Testing

```bash
# Run unit tests
ng test

# Run e2e tests
ng e2e
```

## 🚢 Deployment

### Netlify

```bash
ng build --configuration production
```

Create `netlify.toml`:
```toml
[build]
  command = "ng build --configuration production"
  publish = "dist/portfolio/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

```bash
ng build --configuration production
# Deploy using Vercel CLI or GitHub integration
```

### GitHub Pages

```bash
ng build --configuration production --base-href "/your-repo/"
# Deploy dist/ folder to gh-pages branch
```

### Traditional Hosting

```bash
ng build --configuration production
# Upload dist/portfolio/browser/ to your web server
```

## 🎯 Performance Optimizations

- **Lazy Loading** - Optimized bundle size
- **AOT Compilation** - Ahead-of-time compilation
- **Tree Shaking** - Remove unused code
- **Minification** - Compressed assets
- **Image Optimization** - Proper image sizing
- **CDN Ready** - Static asset deployment

## 🔧 Development

### Generate Components

```bash
ng generate component portfolio/components/new-component
```

### Generate Services

```bash
ng generate service portfolio/services/new-service
```

### Serve with Custom Port

```bash
ng serve --port 4300
```

## 📝 Data Source

The portfolio pulls data from the backend API:
- Profile information
- Projects
- Experience
- Skills
- Education
- Social links
- Current job

All content is managed through the admin dashboard.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Cannot load data
- Verify backend is running
- Check API URL in environment files
- Check browser console for errors
- Verify CORS settings in backend

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .angular
npm install
```

### Animations not working
- Check if Intersection Observer is supported
- Verify directive is imported correctly
- Check browser console for errors

### Favicon not updating
- Clear browser cache
- Check favicon URL in backend
- Verify URL is accessible

## 🎨 Design Credits

- Dark theme with gradient backgrounds
- Custom animations and transitions
- Responsive grid layouts
- Modern card designs

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Angular and Tailwind CSS
