export const BRAND_COLORS = {
  primaryGreen: "#109448",
  darkGreen: "#006838",
  accentText: "#006838",
  softGreen: "#92DDBF",
  pastelPeaGreen: "#ACD6A6",
  seafoamGreen: "#92DDBF",
  lightCyan: "#D3EDEE",
  successBg: "#F0FDF4",
  warningBg: "#FFF7ED",
  warningText: "#F1592B",
  warningBorder: "#F4845F",
  errorBg: "#FEF2F2",
  destructiveRed: "#BF1F2F",
  errorRed: "#EF4444",
  neutralText: "#22223B",
  neutralBorder: "#E5E7EB",
  mutedBg: "#F3F4F6",
  subtleBg: "#F9FAFB",
  white: "#FFFFFF",
  black: "#000000",
  grey: "#808080",
  ashWhite: "#ECECEC",
  gold: "#CBA135",
  brightGold: "#FFD026",
  paleGold: "#FFF48E",
} as const;

export const SEMANTIC_SURFACE_COLORS = {
  light: {
    bg: BRAND_COLORS.white,
    subtle: BRAND_COLORS.subtleBg,
    muted: BRAND_COLORS.mutedBg,
    emphasized: BRAND_COLORS.neutralBorder,
    inverted: BRAND_COLORS.black,
    panel: BRAND_COLORS.white,
    error: BRAND_COLORS.errorBg,
    warning: BRAND_COLORS.warningBg,
    success: BRAND_COLORS.successBg,
    info: "#EFF6FF",
  },
  dark: {
    bg: BRAND_COLORS.black,
    subtle: "#030712",
    muted: "#111827",
    emphasized: "#1F2937",
    inverted: BRAND_COLORS.white,
    panel: "#030712",
    error: "#450A0A",
    warning: "#431407",
    success: "#052E16",
    info: "#172554",
  },
} as const;

export const RESPONSIVE_LAYOUT_TOKENS = {
  pagePadding: {
    base: "16px",
    md: "24px",
    lg: "32px",
    xl: "64px",
  },
  sectionGap: {
    base: "32px",
    md: "48px",
    lg: "64px",
  },
  card: {
    gap: {
      base: "16px",
      md: "24px",
    },
    padding: {
      base: "16px",
      md: "24px",
    },
  },
  search: {
    width: {
      base: "100%",
      mdMin: "240px",
      mdMax: "320px",
    },
    heightMin: "40px",
    heightMax: "48px",
  },
} as const;

export const STANDARD_SPACING = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "32px",
  xl: "48px",
  section: "64px",
  pageMobile: RESPONSIVE_LAYOUT_TOKENS.pagePadding.base,
  pageTablet: RESPONSIVE_LAYOUT_TOKENS.pagePadding.md,
  pageDesktop: RESPONSIVE_LAYOUT_TOKENS.pagePadding.lg,
  pageDesktopMax: RESPONSIVE_LAYOUT_TOKENS.pagePadding.xl,
  cardGap: RESPONSIVE_LAYOUT_TOKENS.card.gap.base,
} as const;

export const STANDARD_TYPOGRAPHY = {
  fontFamily: {
    pdf: "Calibri",
    repoDefault: "Inter",
  },
  h1: {
    fontSize: { desktop: "48px", tablet: "40px", mobile: "32px" },
    lineHeight: "1.15",
    letterSpacing: "0px",
    fontWeight: "700",
  },
  body: {
    fontSize: { desktop: "16px", tablet: "15px", mobile: "14px" },
    lineHeight: "1.6",
    letterSpacing: "0px",
    fontWeight: "400",
  },
  caption: {
    fontSize: { desktop: "12px", tablet: "12px", mobile: "12px" },
    lineHeight: "1.5",
    letterSpacing: "0px",
    fontWeight: "400",
  },
} as const;

export const STANDARD_RADIUS = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
  circle: "50%",
} as const;

export const STANDARD_SHADOWS = {
  level1: "0px 2px 8px rgba(0,0,0,0.06)",
  level2: "0px 4px 12px rgba(0,0,0,0.08)",
  level3: "0px 8px 24px rgba(0,0,0,0.10)",
  level4: "0px 12px 32px rgba(0,0,0,0.12)",
} as const;

export const STANDARD_SIZES = {
  iconButton: {
    sm: "32px",
    md: "40px",
    lg: "48px",
  },
  searchInput: {
    height: "40px",
    maxHeight: "48px",
    desktopMinWidth: "240px",
    desktopMaxWidth: "320px",
    iconSize: "16px",
  },
} as const;

export const DISPLAY_STATUS_STYLES = {
  approved: {
    bg: BRAND_COLORS.successBg,
    color: BRAND_COLORS.primaryGreen,
    borderColor: BRAND_COLORS.primaryGreen,
    borderWidth: "1px",
    fontWeight: "700",
  },
  pending: {
    bg: BRAND_COLORS.warningBg,
    color: BRAND_COLORS.warningText,
    borderColor: BRAND_COLORS.warningBorder,
    borderWidth: "1px",
    fontWeight: "700",
  },
  denied: {
    bg: BRAND_COLORS.errorBg,
    color: BRAND_COLORS.destructiveRed,
    borderColor: BRAND_COLORS.destructiveRed,
    borderWidth: "1px",
    fontWeight: "700",
  },
  fallback: {
    bg: BRAND_COLORS.mutedBg,
    color: BRAND_COLORS.neutralText,
    borderColor: BRAND_COLORS.neutralBorder,
    borderWidth: "1px",
    fontWeight: "700",
  },
} as const;

export const APP_THEME = {
  colors: {
    brand: BRAND_COLORS,
    surface: SEMANTIC_SURFACE_COLORS.light,
    text: {
      primary: BRAND_COLORS.neutralText,
      secondary: "#4B5563",
      muted: "#6B7280",
      inverse: BRAND_COLORS.white,
      brand: BRAND_COLORS.darkGreen,
    },
    border: {
      default: BRAND_COLORS.neutralBorder,
      brand: BRAND_COLORS.softGreen,
      warning: BRAND_COLORS.warningBorder,
      danger: BRAND_COLORS.destructiveRed,
    },
  },
  spacing: STANDARD_SPACING,
  radius: STANDARD_RADIUS,
  shadows: STANDARD_SHADOWS,
  sizes: STANDARD_SIZES,
  status: DISPLAY_STATUS_STYLES,
} as const;
