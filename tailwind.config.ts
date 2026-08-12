import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desk: "var(--desk)",
        paper: {
          DEFAULT: "var(--paper)",
          elev: "var(--paper-elev)",
          tan: "var(--paper-tan)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
          hover: "var(--ink-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          20: "var(--accent-20)",
          40: "var(--accent-40)",
          65: "var(--accent-65)",
        },
        rule: {
          subtle: "var(--rule-subtle)",
          DEFAULT: "var(--rule)",
        },
        subtle: "var(--bg-subtle)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        title: ["clamp(1.25rem, 2.6vh, 1.75rem)", { lineHeight: "1.2" }],
        lede: ["clamp(0.9375rem, 1.85vh, 1.0625rem)", { lineHeight: "1.6" }],
        body: ["clamp(0.875rem, 1.7vh, 1rem)", { lineHeight: "1.6" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      spacing: {
        "v-xs": "clamp(4px, 0.6vh, 8px)",
        "v-sm": "clamp(8px, 1.2vh, 14px)",
        "v-md": "clamp(12px, 2.2vh, 24px)",
        "v-lg": "clamp(18px, 3.6vh, 40px)",
        "row-y": "clamp(6px, 1.15vh, 13px)",
        panel: "var(--panel-inset)",
        dock: "var(--dock-height)",
      },
      maxWidth: {
        column: "680px",
        prose: "560px",
      },
      boxShadow: {
        card: "0 0 0 1px var(--rule-subtle), var(--shadow-inset), var(--shadow-card)",
        "card-hover":
          "0 0 0 1px var(--rule), var(--shadow-inset), var(--shadow-card-hover)",
        hairline: "0 0 0 1px var(--rule-subtle)",
        focus: "0 0 0 1px var(--accent-65)",
      },
      backgroundImage: {
        "desk-vignette":
          "radial-gradient(120% 80% at 50% -20%, #ffffff0f, #ffffff00 55%), radial-gradient(100% 100% at 50% 120%, var(--desk-edge), transparent 60%)",
        "rule-fade":
          "linear-gradient(to right, transparent, var(--rule) 12%, var(--rule) 88%, transparent)",
        underline: "linear-gradient(var(--accent-40), var(--accent-40))",
      },
      transitionTimingFunction: {
        settle: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "word-settle": {
          from: { opacity: "0", transform: "translateY(0.34em)", filter: "blur(3px)" },
          to: { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        "word-settle": "word-settle 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        rise: "rise 0.55s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
