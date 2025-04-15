# 🚀 Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, dark/light mode, multilingual support (English and Arabic), and a Formspree-powered contact form.

## ✨ Live Demo

[View the live portfolio](https://haian.me)

## 🌟 Features

- ⚡ **Next.js 15** with App Router for optimal performance
- 🎨 **Theme Switching** between light and dark modes
- 🌐 **Multilingual Support** for English and Arabic with RTL handling
- 📱 **Fully Responsive** design for all device sizes
- ✨ **Smooth Animations** using Anime.js and Framer Motion
- 📝 **Contact Form** powered by Formspree
- 🔍 **SEO Optimized** with proper metadata
- 🎭 **Custom Arabic Typography** with proper font rendering

## 🛠️ Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Anime.js, Framer Motion
- **Form Handling**: Formspree

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/haianibrahim/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create an `.env` file based on `.env.example`
   ```bash
   cp .env.example .env
   ```
   
4. Update the Formspree endpoint in the `.env` file
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-endpoint-here
   ```

5. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📂 Project Structure

```
portfolio/
├── public/          # Static assets
├── src/
│   ├── app/         # App router pages
│   ├── components/  # React components
│   ├── contexts/    # Context providers
│   ├── hooks/       # Custom hooks
│   ├── providers/   # Provider components
│   └── translations/ # Translation files
├── .env.example     # Environment variables example
├── next.config.ts   # Next.js configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## 🔧 Customization

### Theme Colors

Edit the `globals.css` file to change the theme colors:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    /* other color variables */
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* other dark mode color variables */
  }
}
```

### Content

Update the personal information in the respective components:

- `src/components/hero.tsx` - Main hero section
- `src/components/about.tsx` - About section
- `src/components/education.tsx` - Education and experience
- `src/components/projects.tsx` - Portfolio projects
- `src/components/contact.tsx` - Contact information

## 🌙 Theme Toggle

The portfolio includes a custom theme toggle component that switches between light and dark modes:

```tsx
// src/components/theme-toggle.tsx
export function ThemeToggle() {
  // Implementation details
}
```

## 🌐 Language Switching

The site supports multiple languages with a custom language toggle:

```tsx
// src/components/language-toggle.tsx
export function LanguageToggle() {
  // Implementation details
}
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Anime.js](https://animejs.com/)
- [Formspree](https://formspree.io/)

---

<p align="center">Designed and developed with ❤️ by <a href="https://github.com/haianibrahim">Haian Ibrahim</a></p>
