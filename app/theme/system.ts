import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import {
  APP_THEME,
  BRAND_COLORS,
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "./design-tokens";

const themeConfig = defineConfig({
  cssVarsPrefix: "osp",
  globalCss: {
    html: {
      bg: "brand.white",
      color: "brand.neutralText",
    },
    body: {
      bg: "brand.white",
      color: "brand.neutralText",
      fontFamily: "body",
      letterSpacing: "0px",
      fontFeatureSettings: "\"cv02\", \"cv03\", \"cv04\", \"tnum\"",
      fontVariantNumeric: "tabular-nums",
    },
    "button, input, textarea, select": {
      fontFamily: "body",
      fontFeatureSettings: "\"cv02\", \"cv03\", \"cv04\", \"tnum\"",
      fontVariantNumeric: "tabular-nums",
    },
    "*::selection": {
      bg: "brand.lightCyan",
      color: "brand.neutralText",
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: tokenRecord(BRAND_COLORS),
        surface: tokenRecord(APP_THEME.colors.surface),
        text: tokenRecord(APP_THEME.colors.text),
        border: tokenRecord(APP_THEME.colors.border),
      },
      spacing: tokenRecord(STANDARD_SPACING),
      radii: tokenRecord(STANDARD_RADIUS),
      shadows: tokenRecord(STANDARD_SHADOWS),
      fonts: {
        body: { value: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" },
        heading: { value: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" },
        mono: { value: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace" },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: "{colors.brand.white}" },
        fg: { value: "{colors.brand.neutralText}" },
        panel: { value: "{colors.brand.white}" },
        subtle: { value: "{colors.brand.subtleBg}" },
        muted: { value: "{colors.brand.mutedBg}" },
        border: { value: "{colors.brand.neutralBorder}" },
        accent: { value: "{colors.brand.primaryGreen}" },
        accentHover: { value: "{colors.brand.darkGreen}" },
        danger: { value: "{colors.brand.destructiveRed}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, themeConfig);

function tokenRecord<T extends Record<string, string>>(tokens: T) {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [key, { value }]),
  ) as { [K in keyof T]: { value: T[K] } };
}
