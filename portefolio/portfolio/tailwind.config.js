export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle 4s ease-in-out infinite',
        'twinkle-fast': 'twinkle 2s ease-in-out infinite',
        'shooting-star': 'shooting-star 4s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'orbit-slow': 'orbit 60s linear infinite',
        'orbit-medium': 'orbit 45s linear infinite',
        'orbit-fast': 'orbit 30s linear infinite',
        'rotate-planet': 'rotate-planet 20s linear infinite',
        'depth-float': 'depth-float 8s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        'shooting-star': {
          '0%': {
            transform: 'translateX(0) translateY(0) rotate(-45deg)',
            opacity: '1',
          },
          '70%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(300px) translateY(300px) rotate(-45deg)',
            opacity: '0',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)',
          },
          '50%': {
            transform: 'translateY(-20px) translateX(10px)',
          },
        },
        orbit: {
          '0%': {
            transform: 'rotate(0deg) translateX(100px) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(100px) rotate(-360deg)',
          },
        },
        'rotate-planet': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'depth-float': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translateY(-30px) scale(1.05)',
            opacity: '0.8',
          },
        },
      },
    },
  },
  plugins: [],
};
