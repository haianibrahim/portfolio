# 🚀 Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, dark/light mode, multilingual support (English and Arabic), an AI-powered chatbot, and a Formspree-powered contact form.

## ✨ Live Demo

<a href="https://haian.me" target="_blank">View the live portfolio</a>

## 🌟 Features

- ⚡ **Next.js 15** with App Router for optimal performance
- 🤖 **AI-Powered Chatbot** with OpenAI integration and multilingual support
- 🎨 **Theme Switching** between light and dark modes
- 🌐 **Multilingual Support** for English and Arabic with RTL handling
- 📱 **Fully Responsive** design for all device sizes
- ✨ **Smooth Animations** using Anime.js and Framer Motion
- 📝 **Contact Form** powered by Formspree
- 🔒 **Security-First AI** with multi-layer protection against abuse
- 🔍 **SEO Optimized** with proper metadata
- 🎭 **Custom Arabic Typography** with proper font rendering

## 🛠️ Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-3.5-turbo
- **Markdown**: React Markdown
- **Icons**: React Icons
- **Animations**: Anime.js, Framer Motion
- **Form Handling**: Formspree

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- OpenAI API key (for AI chatbot)

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

3. Create a `.env.local` file in your project root
   ```env
   # OpenAI API Configuration (required for AI chatbot)
   OPENAI_API_KEY=your_openai_api_key_here

   # Contact Form Configuration (optional)
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🤖 AI Chatbot Features

The portfolio includes an intelligent AI assistant that provides information about the portfolio owner's professional background:

### 🔒 Security & Protection
- **Multi-layer filtering** with 75+ forbidden patterns
- **Bilingual protection** (English and Arabic)
- **Portfolio-only responses** - no general AI assistance
- **Cost optimization** with token limits and smart caching
- **Creative bypass prevention** against spoken language attempts

### 💬 User Experience
- **Floating chat button** with smooth animations
- **Markdown support** for formatted responses
- **Multilingual interface** matching website language
- **Theme-aware design** for light/dark modes
- **Mobile-optimized** chat interface

### 🛡️ Automatic Rejection
The AI automatically rejects questions about:
- General programming tutorials
- Technology explanations  
- Learning resources or advice
- Career guidance
- Code examples or best practices

## 📂 Project Structure

```
portfolio/
├── public/          # Static assets
├── src/
│   ├── app/
│   │   └── api/
│   │       └── chatbot/  # AI chatbot API endpoint
│   │   ├── components/
│   │   │   ├── chatbot.tsx   # AI chatbot component
│   │   │   └── ...          # Other components
│   │   ├── contexts/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── providers/      # Provider components
│   │   └── translations/   # Translation files
│   ├── .env.local          # Environment variables (create this)
│   ├── next.config.ts      # Next.js configuration
│   └── tailwind.config.ts  # Tailwind CSS configuration
```

## 🔧 Customization

### AI Chatbot Configuration

The AI chatbot is configured in `src/app/api/chatbot/route.ts`. You can customize:

- **Portfolio context** - Update the `PORTFOLIO_CONTEXT` constant with your information
- **Forbidden patterns** - Add/modify patterns in `FORBIDDEN_PATTERNS` array
- **Response validation** - Adjust keywords in `REQUIRED_HAIAN_KEYWORDS`
- **OpenAI settings** - Modify temperature, max_tokens, etc.

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
- `src/app/api/chatbot/route.ts` - AI chatbot knowledge base

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
- [OpenAI](https://openai.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Anime.js](https://animejs.com/)
- [Formspree](https://formspree.io/)

---

<p align="center">Designed and developed with ❤️ by <a href="https://github.com/haianibrahim">Haian Ibrahim</a></p>
