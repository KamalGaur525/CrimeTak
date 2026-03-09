import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E11D2E",
        "primary-dark": "#B91525",
        "text-dark": "#111111",
        "text-gray": "#6B7280",
        "text-light": "#9CA3AF",
        "bg-main": "#F8F9FB",
        "bg-card": "#FFFFFF",
        "bg-sidebar": "#1A1A2E",
        "bg-sidebar-hover": "#252542",
        border: "#E5E7EB",
        "border-light": "#F3F4F6",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Noto Sans", "sans-serif"],
        headline: ["Inter", "Roboto", "sans-serif"],
      },
      fontSize: {
        "headline-xl": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-lg": ["24px", { lineHeight: "1.25", fontWeight: "700" }],
        "headline-md": ["20px", { lineHeight: "1.3", fontWeight: "700" }],
        "headline-sm": ["16px", { lineHeight: "1.35", fontWeight: "600" }],
        "body-md": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        meta: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-hover":
          "0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.06)",
        sidebar: "2px 0 8px rgba(0,0,0,0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
