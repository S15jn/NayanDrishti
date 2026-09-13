/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4ff",
          100: "#d9e7ff",
          200: "#bcd4ff",
          300: "#8cb5ff",
          400: "#568cff",
          500: "#2f66ff",
          600: "#1f4de6",
          700: "#193ec0",
          800: "#1b369b",
          900: "#1d337a",
        },

        success: {
          50: "#ecfdf3",
          500: "#22c55e",
          600: "#16a34a",
        },

        warning: {
          50: "#fff8eb",
          500: "#f59e0b",
          600: "#d97706",
        },

        danger: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },

        clinic: {
          bg: "#f8fafc",
          card: "#ffffff",
          border: "#e2e8f0",
        },
      },

      borderRadius: {
        "4xl": "2rem",
      },

      boxShadow: {
        soft:
          "0 2px 12px rgba(15,23,42,0.08)",

        card:
          "0 10px 25px rgba(15,23,42,0.08)",

        floating:
          "0 15px 35px rgba(15,23,42,0.15)",

        glass:
          "0 8px 32px rgba(31,38,135,0.15)",
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.35s ease-out",
        pulseSoft: "pulseSoft 2s infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        pulseSoft: {
          "0%,100%": {
            opacity: "1",
          },

          "50%": {
            opacity: ".65",
          },
        },
      },

      backdropBlur: {
        xs: "2px",
      },

      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },

  plugins: [],
};