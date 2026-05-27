export const RESPONSIVE_LAYOUT_TOKENS = {
  grid: {
    mobile: {
      columns: 4,
      gutter: "16px",
      marginMin: "16px",
      marginMax: "32px",
      minWidth: "320px",
      maxWidth: "768px",
    },
    tablet: {
      columns: 8,
      gutterMin: "16px",
      gutterMax: "24px",
      marginMin: "40px",
      marginMax: "80px",
      contentMinWidth: "600px",
      contentMaxWidth: "940px",
    },
    desktop: {
      columns: 12,
      gutterMin: "16px",
      gutterMax: "32px",
      marginMin: "80px",
      marginMax: "120px",
      contentMinWidth: "1200px",
      contentMaxWidth: "1440px",
    },
  },
  pagePadding: {
    base: "16px",
    md: "24px",
    lg: "32px",
    xl: "64px",
  },
  navigationOffset: {
    base: "16px",
    md: "24px",
    lg: "32px",
    xl: "48px",
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
    mobilePadding: {
      base: "16px",
      md: "20px",
    },
  },
  form: {
    fieldGap: "16px",
    labelValueGapMin: "8px",
    labelValueGapMax: "12px",
    containerMinWidth: "480px",
    containerMaxWidth: "720px",
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

export const PDF_GRID_TOKENS = {
  mobile: {
    columns: 4,
    gutter: "16px",
    marginX: {
      min: "16px",
      max: "24px",
      recommended: "16px",
    },
    marginY: {
      min: "16px",
      max: "24px",
      recommended: "24px",
    },
    screen: {
      min: "320px",
      max: "767px",
    },
    contentWidth: "100%",
  },
  tablet: {
    columns: 8,
    gutter: "24px",
    marginX: {
      min: "32px",
      max: "48px",
      recommended: "40px",
    },
    marginY: {
      min: "24px",
      max: "40px",
      recommended: "32px",
    },
    screen: {
      min: "768px",
      max: "1279px",
    },
    contentWidth: {
      min: "640px",
      max: "960px",
    },
  },
  desktop: {
    columns: 12,
    gutter: {
      min: "24px",
      max: "32px",
    },
    marginX: {
      min: "64px",
      max: "120px",
      recommended: "80px",
    },
    marginY: {
      min: "32px",
      max: "64px",
      recommended: "48px",
    },
    screen: {
      min: "1280px",
    },
    contentWidth: {
      min: "1200px",
      max: "1440px",
    },
  },
} as const;

export const PDF_PAGE_LAYOUT_TOKENS = {
  pagePadding: {
    mobile: {
      min: "16px",
      max: "24px",
    },
    tablet: {
      min: "24px",
      max: "32px",
    },
    desktop: {
      min: "32px",
      max: "64px",
    },
  },
  navigationOffset: {
    mobile: {
      min: "16px",
      max: "24px",
    },
    tablet: {
      min: "24px",
      max: "32px",
    },
    desktop: {
      min: "32px",
      max: "48px",
    },
  },
  contentWidth: {
    mobile: "100%",
    tablet: {
      min: "720px",
      max: "900px",
    },
    desktop: {
      min: "1200px",
      max: "1440px",
    },
  },
} as const;

export const PAGE_PADDING = RESPONSIVE_LAYOUT_TOKENS.pagePadding;
export const SECTION_GAP = RESPONSIVE_LAYOUT_TOKENS.sectionGap;
export const CARD_LAYOUT = RESPONSIVE_LAYOUT_TOKENS.card;
export const FORM_LAYOUT = RESPONSIVE_LAYOUT_TOKENS.form;
export const SEARCH_LAYOUT = RESPONSIVE_LAYOUT_TOKENS.search;
