/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'throw': 'throw 0.6s ease-out forwards',
        'bounce-in': 'bounceIn 0.4s ease-out',
        'crumple': 'crumple 0.3s ease-in-out',
        'paper-plane': 'paperPlane 0.8s ease-out',
        'scroll-unfold': 'scrollUnfold 0.5s ease-out',
        'shatter': 'shatter 0.4s ease-out',
        'unfold': 'unfold 0.3s ease-out',
        'fold-back': 'foldBack 0.3s ease-in',
        'delete-fade': 'deleteFade 0.3s ease-out forwards',
      },
      keyframes: {
        throw: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'translateY(-80px) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        crumple: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8) rotate(-5deg)' },
        },
        paperPlane: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(100px) rotate(45deg)', opacity: '0' },
        },
        scrollUnfold: {
          '0%': { transform: 'scaleY(0.3)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        shatter: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(var(--shatter-x, 0))', opacity: '0' },
        },
        unfold: {
          '0%': { transform: 'scaleY(0.6)', opacity: '0.7' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        foldBack: {
          '0%': { transform: 'scaleY(1)', opacity: '1' },
          '100%': { transform: 'scaleY(0.6)', opacity: '0.7' },
        },
        deleteFade: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
