/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(0, 0%, 98%)',
        accent: 'hsl(170, 60%, 45%)',
        border: 'hsl(0, 0%, 85%)',
        primary: 'hsl(230, 80%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        textPrimary: 'hsl(0, 0%, 15%)',
        textSecondary: 'hsl(0, 0%, 45%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
      },
      spacing: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 5px 20px hsla(0, 0%, 0%, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}