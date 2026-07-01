import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: "#FAFAF8",
        surface: "#FFFFFF",
        surfaceMuted: "#F4F3F1",
        line: "#E8E6E1",
        lineStrong: "#D8D5CE",
        ink: "#15171C",
        inkMuted: "#6B7280",
        inkFaint: "#9CA3AF",
        signal: "#E85D2C",
        signalSoft: "#FDEBE2",
        trust: "#0F9E8E",
        trustSoft: "#E3F5F2",
        warn: "#C8862B",
        warnSoft: "#FBF0DE",
        indigo: "#4A46E0",
        indigoSoft: "#ECEBFC",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(21,23,28,0.04), 0 1px 1px rgba(21,23,28,0.03)",
        raised: "0 8px 24px rgba(21,23,28,0.08), 0 2px 6px rgba(21,23,28,0.04)",
        panel: "0 20px 60px rgba(21,23,28,0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
