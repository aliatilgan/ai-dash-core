# SmartDash - Modern SaaS Dashboard

A comprehensive, AI-powered SaaS dashboard built with React, TypeScript, and modern web technologies. Features advanced analytics, CRM functionality, user management, and customizable themes.

## 🚀 Features

### Core Features
- **Modern Dashboard**: Clean, responsive design with real-time data visualization
- **Analytics**: Advanced charts and metrics with Recharts integration
- **CRM System**: Customer management with detailed profiles and interaction tracking
- **AI Insights**: Machine learning-powered business intelligence
- **User Management**: Role-based access control with admin panel
- **Authentication**: Secure login/signup with protected routes

### UI/UX Features
- **Dark/Light Theme**: System-aware theme switching with custom accent colors
- **Customizable Interface**: Multiple density options and personalization
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Code splitting and lazy loading for optimal performance

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons
- **Charts**: Recharts for data visualization
- **State**: React Query, Context API
- **Routing**: React Router DOM with protected routes
- **Theme**: next-themes for theme management
- **Notifications**: Sonner for toast notifications

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd ai-dash-core

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── Layout/         # Layout components
│   ├── Dashboard/      # Dashboard components
│   ├── Analytics/      # Analytics components
│   ├── CRM/           # CRM components
│   ├── Auth/          # Authentication components
│   └── Settings/      # Settings components
├── pages/              # Page components
├── contexts/           # React contexts
├── hooks/             # Custom hooks
├── lib/               # Utilities
└── types/             # TypeScript types
```

## 🔐 Authentication & Roles

- **Admin Users**: Full access including user management
- **Regular Users**: Standard dashboard access
- **Protected Routes**: Role-based route protection
- **Session Management**: Persistent authentication state

## 🎨 Customization

### Theme Options
- **Light/Dark/System**: Automatic theme switching
- **Accent Colors**: 6 predefined color schemes
- **Density**: Compact, Comfortable, Spacious layouts
- **Accessibility**: Reduced motion options

### Adding Features
1. Create components in appropriate directories
2. Add TypeScript interfaces
3. Update routing if needed
4. Test thoroughly

## 📊 Performance

Optimized bundle sizes:
- React vendor: ~288KB (89KB gzipped)
- Chart vendor: ~287KB (64KB gzipped)  
- UI vendor: ~231KB (79KB gzipped)
- Pages: ~67KB (13KB gzipped)

Target Lighthouse scores: 90+ across all metrics

## 🚀 Deployment

```sh
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Development

### Using Lovable
Visit the [Lovable Project](https://lovable.dev/projects/c745e11b-71d3-40f8-a725-f40963a3e22b) for AI-powered development.

### Local Development
Use your preferred IDE with the setup instructions above.

### GitHub Integration
- Direct file editing in GitHub
- GitHub Codespaces support
- Automatic deployment integration
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c745e11b-71d3-40f8-a725-f40963a3e22b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
