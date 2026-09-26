import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A0A0A",
          secondary: "#111111",
          elevated: "#161616",
        },
        card: {
          DEFAULT: "#1A1A1A",
          hover: "#222222",
          border: "#2A2A2A",
        },
        gold: {
          50: "#FCF9EE",
          100: "#F9F1D8",
          200: "#F3E4B2",
          300: "#E5C07B",
          400: "#DFBA54",
          500: "#D4AF37", // Primary Gold Accent
          600: "#C59B27",
          700: "#9E7B1A",
          800: "#6F5613",
          900: "#3F310A",
          light: "#E5C07B",
          dark: "#997517",
          metallic: "#D4AF37",
        },
        luxury: {
          charcoal: "#121212",
          obsidian: "#0A0A0A",
          onyx: "#171717",
          border: "#282828",
          muted: "#A0A0A0",
          subtle: "#737373",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.15em",
        editorial: "0.25em",
        tightest: "-0.04em",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E5C07B 0%, #D4AF37 50%, #997517 100%)",
        "gold-gradient-hover": "linear-gradient(135deg, #F3E4B2 0%, #DFBA54 50%, #C59B27 100%)",
        "dark-radial": "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(30, 30, 30, 0.6) 0%, rgba(18, 18, 18, 0.8) 100%)",
        "gold-border-gradient": "linear-gradient(90deg, transparent, #D4AF37, transparent)",
      },
      boxShadow: {
        "gold-sm": "0 0 10px rgba(212, 175, 55, 0.2)",
        "gold-md": "0 0 20px rgba(212, 175, 55, 0.3)",
        "gold-lg": "0 0 35px rgba(212, 175, 55, 0.4)",
        "dark-card": "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite linear",
        "float": "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
