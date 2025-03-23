import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "70%": { boxShadow: "0 0 0 10px hsl(var(--primary) / 0)" },
          "100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" },
        },
        "neon-border-shine": {
          "0%": { left: "-100%" },
          "50%": { left: "100%" },
          "100%": { left: "100%" },
        },
        "glitch-anim": {
          "0%": { clipPath: "rect(24px, 450px, 36px, 0)" },
          "20%": { clipPath: "rect(10px, 450px, 60px, 0)" },
          "40%": { clipPath: "rect(43px, 450px, 29px, 0)" },
          "60%": { clipPath: "rect(8px, 450px, 62px, 0)" },
          "80%": { clipPath: "rect(51px, 450px, 19px, 0)" },
          "100%": { clipPath: "rect(17px, 450px, 53px, 0)" },
        },
        "glitch-anim2": {
          "0%": { clipPath: "rect(17px, 450px, 53px, 0)" },
          "20%": { clipPath: "rect(51px, 450px, 19px, 0)" },
          "40%": { clipPath: "rect(8px, 450px, 62px, 0)" },
          "60%": { clipPath: "rect(43px, 450px, 29px, 0)" },
          "80%": { clipPath: "rect(10px, 450px, 60px, 0)" },
          "100%": { clipPath: "rect(24px, 450px, 36px, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rotate": "rotate 60s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        "neon-border-shine": "neon-border-shine 3s infinite",
        "glitch-anim": "glitch-anim 5s infinite linear alternate-reverse",
        "glitch-anim2": "glitch-anim2 5s infinite linear alternate-reverse",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config