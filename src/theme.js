import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif",

  headings: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif",
    fontWeight: "600",
  },

  primaryColor: "githubBlue",
  primaryShade: 5,

  black: "#0d1117",
  white: "#f0f6fc",

  defaultRadius: "md",

  colors: {
    // GitHub's "Accent" blue scale (used for links, primary buttons, focus rings)
    githubBlue: [
      "#ddf4ff",
      "#b6e3ff",
      "#80ccff",
      "#54aeff",
      "#388bfd",
      "#1f6feb", // primaryShade — matches GitHub's default button blue
      "#1158c7",
      "#0d419d",
      "#0c2d6b",
      "#051d4d",
    ],

    // Neutral gray scale — used for badges/tags/metadata, NOT blue.
    // GitHub reserves blue for links & primary actions only.
    dark: [
      "#f0f6fc",
      "#c9d1d9",
      "#b1bac4",
      "#8b949e",
      "#6e7681",
      "#484f58",
      "#30363d", // neutral badge background
      "#21262d", // panel / row hover
      "#161b22", // sidebar / card background
      "#0d1117", // true GitHub bg — neutral blue-black, not navy
    ],

    // GitHub success green
    green: [
      "#dafbe1",
      "#aceebb",
      "#6fdd8b",
      "#4ac26b",
      "#2da44e",
      "#3fb950",
      "#238636",
      "#196c2e",
      "#0f5323",
      "#033a16",
    ],

    // GitHub danger red
    red: [
      "#ffebe9",
      "#ffcecb",
      "#ffaba8",
      "#ff8182",
      "#fa4549",
      "#f85149",
      "#cf222e",
      "#a40e26",
      "#82071e",
      "#5a0009",
    ],

    // GitHub warning yellow
    yellow: [
      "#fff8c5",
      "#fae17d",
      "#eac54f",
      "#d4a72c",
      "#bf8700",
      "#d29922",
      "#9a6700",
      "#7d4e00",
      "#633c01",
      "#4d2d00",
    ],
  },

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
  },

  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(10),
    xl: rem(12),
  },

  shadows: {
    xs: "none",
    sm: "none",
    md: "none",
    lg: "0 8px 24px rgba(1,4,9,.35)",
  },

  components: {
    Table: {
      styles: {
        th: {
          borderBottom: "1px solid #21262d",
          color: "#c9d1d9",
        },
        td: {
          borderBottom: "1px solid #21262d",
        },
      },
    },
    Badge: {
      defaultProps: {
        color: "dark",
        variant: "light",
      },
      styles: {
        root: {
          backgroundColor: "#30363d",
          color: "#c9d1d9",
        },
      },
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: "#161b22",
          border: "1px solid #30363d",
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          "&[data-active]": {
            backgroundColor: "#161b22",
            borderLeft: "2px solid #1f6feb",
          },
        },
      },
    },
  },

  other: {
    bg: "#0d1117",
    panel: "#161b22",
    panelHover: "#1f242d",
    elevated: "#21262d",

    border: "#30363d",
    borderMuted: "#21262d",

    text: "#f0f6fc",
    textSecondary: "#c9d1d9",
    textMuted: "#8b949e",

    accent: "#58a6ff",
    success: "#3fb950",
    warning: "#d29922",
    danger: "#f85149",
  },
});