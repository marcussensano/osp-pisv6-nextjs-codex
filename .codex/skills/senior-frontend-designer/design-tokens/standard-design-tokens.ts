import {
  PDF_GRID_TOKENS,
  PDF_PAGE_LAYOUT_TOKENS,
  RESPONSIVE_LAYOUT_TOKENS,
} from "./layout-tokens";

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
  formFieldGap: RESPONSIVE_LAYOUT_TOKENS.form.fieldGap,
  labelValueGap: RESPONSIVE_LAYOUT_TOKENS.form.labelValueGapMin,
} as const;

export const STANDARD_RESPONSIVE_SPACING = {
  small: {
    mobile: "8px",
    tablet: "8px-12px",
    desktop: "8px-16px",
    usage: "Icon gap, label spacing",
  },
  medium: {
    mobile: "16px",
    tablet: "16px-20px",
    desktop: "16px-24px",
    usage: "Input padding, card spacing",
  },
  large: {
    mobile: "24px",
    tablet: "24px-32px",
    desktop: "24px-40px",
    usage: "Container padding",
  },
  section: {
    mobile: "32px",
    tablet: "40px-56px",
    desktop: "48px-64px",
    usage: "Section-to-section spacing",
  },
} as const;

export const STANDARD_TYPOGRAPHY = {
  fontFamily: {
    pdf: "Calibri",
    repoDefault: "Open Sans",
  },
  h1: {
    fontSize: {
      desktop: "48px",
      tablet: "40px",
      mobile: "32px",
    },
    lineHeight: "1.1-1.2",
    letterSpacing: "0px",
    fontWeight: "700",
  },
  h2: {
    fontSize: {
      desktop: "36px",
      tablet: "32px",
      mobile: "28px",
    },
    lineHeight: "1.1-1.2",
    letterSpacing: "0px",
    fontWeight: "600",
  },
  h3: {
    fontSize: {
      desktop: "28px",
      tablet: "24px",
      mobile: "22px",
    },
    lineHeight: "1.2-1.3",
    letterSpacing: "0px",
    fontWeight: "600",
  },
  h4: {
    fontSize: {
      desktop: "22px",
      tablet: "20px",
      mobile: "18px",
    },
    lineHeight: "1.2-1.3",
    letterSpacing: "0px",
    fontWeight: "500",
  },
  body: {
    fontSize: {
      desktop: "16px",
      tablet: "15px",
      mobile: "14px",
    },
    lineHeight: "1.5-1.7",
    letterSpacing: "0px",
    fontWeight: "400",
  },
  caption: {
    fontSize: {
      desktop: "12px",
      tablet: "12px",
      mobile: "12px",
    },
    lineHeight: "1.4-1.6",
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

export const STANDARD_OUTLINES = {
  none: "0px",
  hairline: "1px",
  focus: "2px",
  thick: "3px-4px",
} as const;

export const STANDARD_SHADOWS = {
  level1: "0px 2px 8px rgba(0,0,0,0.06)",
  level2: "0px 4px 12px rgba(0,0,0,0.08)",
  level3: "0px 8px 24px rgba(0,0,0,0.10)",
  level4: "0px 12px 32px rgba(0,0,0,0.12)",
} as const;

export const STANDARD_CARD_ELEVATION_TOKENS = {
  default: {
    shadow: STANDARD_SHADOWS.level1,
    usage: "Standard cards, list items",
  },
  hoverInteractive: {
    shadow: STANDARD_SHADOWS.level2,
    usage: "Hover state, clickable cards",
  },
  highlighted: {
    shadow: STANDARD_SHADOWS.level3,
    usage: "Featured cards",
  },
  modalFloating: {
    shadow: STANDARD_SHADOWS.level4,
    usage: "Dialogs, overlays",
  },
} as const;

export const STANDARD_TRANSITIONS = {
  hover: "150ms ease-out",
  focus: "150ms ease-out",
  standard: "200ms ease-out",
} as const;

export const STANDARD_SIZES = {
  iconButton: {
    sm: "32px",
    md: "40px",
    lg: "48px",
  },
  button: {
    sm: {
      height: "32px",
      minWidth: "72px",
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "20px",
      lineHeightByViewport: {
        mobile: "16px",
        tablet: "18px",
        desktop: "20px",
      },
      letterSpacing: "0.5px",
    },
    md: {
      height: "40px",
      minWidth: "96px",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "20px",
      lineHeightByViewport: {
        mobile: "20px",
        tablet: "22px",
        desktop: "24px",
      },
      letterSpacing: "0.5px",
    },
    lg: {
      height: "48px",
      minWidth: "112px",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "24px",
      lineHeightByViewport: {
        mobile: "24px",
        tablet: "26px",
        desktop: "28px",
      },
      letterSpacing: "1px",
    },
    xl: {
      height: "56px",
      minWidth: "128px",
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "28px",
      lineHeightByViewport: {
        mobile: "28px",
        tablet: "30px",
        desktop: "32px",
      },
      letterSpacing: "1px",
    },
  },
  searchInput: {
    height: "40px",
    maxHeight: "48px",
    desktopMinWidth: "240px",
    desktopMaxWidth: "320px",
    iconSize: "16px",
  },
  table: {
    dragColumnWidth: "32px",
    selectionColumnWidth: "40px",
    actionsColumnWidth: "44px",
    rowActionWidth: "32px",
    headerHeight: "40px",
  },
  card: {
    sm: "320px",
    md: "480px",
    lg: "800px",
    mobilePadding: RESPONSIVE_LAYOUT_TOKENS.card.padding.base,
    desktopPadding: RESPONSIVE_LAYOUT_TOKENS.card.padding.md,
  },
  modal: {
    minWidth: "320px",
    maxWidth: "480px",
    minHeight: "120px",
    maxHeight: "280px",
  },
  reportImage: {
    logoWidth: "250px",
    logoHeight: "150px",
  },
} as const;

export const STANDARD_SHAPE_SIZES = {
  roundedRectangleButton: {
    radius: {
      sm: STANDARD_RADIUS.sm,
      md: STANDARD_RADIUS.md,
      lg: STANDARD_RADIUS.xl,
    },
    height: {
      sm: "32px-36px",
      md: "40px-48px",
      lg: "56px",
    },
    width: {
      sm: "64px",
      md: "88px",
      lg: "120px",
      xl: "140px",
      full: "100%",
    },
  },
  card: {
    radius: {
      sm: STANDARD_RADIUS.md,
      md: STANDARD_RADIUS.lg,
      lg: "16px-20px",
    },
    width: {
      sm: "280px-320px",
      md: "360px-480px",
      lg: "600px-800px",
    },
  },
  container: {
    radius: {
      sm: "4px-6px",
      md: "8px-12px",
      lg: "16px-20px",
    },
  },
  profileImage: {
    radius: STANDARD_RADIUS.circle,
    size: {
      sm: "24px-32px",
      md: "40px-48px",
      lg: "64px-80px",
      xl: "96px-128px",
    },
  },
  indicator: {
    radius: STANDARD_RADIUS.circle,
    size: {
      sm: "6px-8px",
      md: "10px-12px",
      lg: "16px-24px",
    },
  },
} as const;

export const STANDARD_BUTTON_STYLES = {
  sm: {
    h: STANDARD_SIZES.button.sm.height,
    minW: STANDARD_SIZES.button.sm.minWidth,
    px: STANDARD_SPACING.sm,
    borderRadius: STANDARD_RADIUS.md,
    fontSize: STANDARD_SIZES.button.sm.fontSize,
    fontWeight: STANDARD_SIZES.button.sm.fontWeight,
    lineHeight: STANDARD_SIZES.button.sm.lineHeight,
  },
  md: {
    h: STANDARD_SIZES.button.md.height,
    minW: STANDARD_SIZES.button.md.minWidth,
    px: STANDARD_SPACING.sm,
    borderRadius: STANDARD_RADIUS.md,
    fontSize: STANDARD_SIZES.button.md.fontSize,
    fontWeight: STANDARD_SIZES.button.md.fontWeight,
    lineHeight: STANDARD_SIZES.button.md.lineHeight,
  },
  lg: {
    h: STANDARD_SIZES.button.lg.height,
    minW: STANDARD_SIZES.button.lg.minWidth,
    px: STANDARD_SPACING.md,
    borderRadius: STANDARD_RADIUS.md,
    fontSize: STANDARD_SIZES.button.lg.fontSize,
    fontWeight: STANDARD_SIZES.button.lg.fontWeight,
    lineHeight: STANDARD_SIZES.button.lg.lineHeight,
  },
  xl: {
    h: STANDARD_SIZES.button.xl.height,
    minW: STANDARD_SIZES.button.xl.minWidth,
    px: STANDARD_SPACING.md,
    borderRadius: STANDARD_RADIUS.lg,
    fontSize: STANDARD_SIZES.button.xl.fontSize,
    fontWeight: STANDARD_SIZES.button.xl.fontWeight,
    lineHeight: STANDARD_SIZES.button.xl.lineHeight,
  },
} as const;

export const STANDARD_ICON_BUTTON_STYLES = {
  sm: {
    boxSize: STANDARD_SIZES.iconButton.sm,
    minW: STANDARD_SIZES.iconButton.sm,
    borderRadius: STANDARD_RADIUS.md,
  },
  md: {
    boxSize: STANDARD_SIZES.iconButton.md,
    minW: STANDARD_SIZES.iconButton.md,
    borderRadius: STANDARD_RADIUS.md,
  },
} as const;

export const STANDARD_NAVIGATION_TOKENS = {
  navbarHeight: {
    desktop: "64px-72px",
    tablet: "56px-64px",
    mobile: "48px-56px",
  },
  rectangleLogo: {
    desktop: {
      width: "120px-150px",
      height: "40px-48px",
    },
    tablet: {
      width: "100px-120px",
      height: "36px-44px",
    },
    mobile: {
      width: "60px-100px",
      height: "28px-36px",
    },
  },
  squareLogo: {
    desktop: "32px-40px",
    tablet: "28px-36px",
    mobile: "24px-32px",
  },
  brand: {
    fontSize: "18px-24px",
    fontWeight: "600-700",
  },
  link: {
    fontSize: {
      desktop: "14px-16px",
      mobile: "12px-14px",
    },
    fontWeight: {
      default: "400-500",
      active: "500-600",
    },
  },
} as const;

export const STANDARD_MESSAGE_TOKENS = {
  modal: {
    minHeight: STANDARD_SIZES.modal.minHeight,
    maxHeight: STANDARD_SIZES.modal.maxHeight,
    minWidth: STANDARD_SIZES.modal.minWidth,
    maxWidth: STANDARD_SIZES.modal.maxWidth,
  },
  icon: {
    size: "24px-32px",
    marginRight: "12px-16px",
  },
  title: {
    fontSize: "16px-18px",
    fontWeight: "600-700",
    characterRange: "40-60",
  },
  description: {
    fontSize: "14px-16px",
    fontWeight: "400",
    characterRangePerLine: "90-120",
  },
  button: {
    fontSize: "14px",
    fontWeight: "500-600",
    characterRange: "10-12",
  },
} as const;

export const STANDARD_IMAGE_TOKENS = {
  background: {
    width: "1920px",
    height: "1080px",
    aspectRatio: "16:9",
  },
  hero: {
    width: "1280px",
    height: "720px",
    aspectRatio: "16:9",
  },
  lightbox: {
    width: "1100px",
    height: "800px",
    aspectRatio: "16:9",
  },
  blog: {
    width: "1200px",
    height: "630px",
    aspectRatio: "3:2",
  },
  rectangleLogo: {
    width: "250px",
    height: "150px",
    aspectRatio: "3:2",
  },
  squareLogo: {
    width: "100px",
    height: "100px",
    aspectRatio: "1:1",
  },
  favicon: {
    width: "48px",
    height: "48px",
    aspectRatio: "1:1",
  },
  socialIcon: {
    width: "32px",
    height: "32px",
    aspectRatio: "1:1",
  },
  formats: {
    photo: "JPEG",
    transparent: "PNG",
    iconOrLogo: "SVG",
    generalWeb: "WEBP",
  },
} as const;

export const STANDARD_REPORT_TOKENS = {
  orientation: {
    portrait: "portrait",
    landscape: "landscape",
  },
  header: {
    left: "St. Peter Life Plan logo, head office line, branch address",
    right: "Report name, generated date, generated time",
  },
  body: {
    width: "100%",
    sectionTitlePlacement: "Below header",
  },
  footer: {
    signatures: ["Prepared by", "Verified by", "Noted by"],
    versionText: "SYSTEM Version X.X.XX",
    pageText: "Page X of Y",
  },
} as const;

export const STANDARD_PROGRESS_TOKENS = {
  desktopStepper: {
    layout: "horizontal",
    activeState: "emphasized",
    completeState: "visible",
    futureState: "muted",
  },
  mobileStepper: {
    layout: "compact",
    currentStepFormat: "1/3",
  },
  statuses: ["In Progress", "On Hold", "Success", "Error/Failed"],
} as const;

export const STANDARD_EMPTY_STATE_TOKENS = {
  layout: "centered",
  elements: ["icon", "title", "description", "optional primary action"],
  titleFontWeight: "700",
  descriptionFontWeight: "400",
  titles: [
    "No Results Found",
    "No Records Available",
    "Nothing to Display",
    "Your List Is Empty",
  ],
} as const;

export const STANDARD_ACCORDION_TOKENS = {
  triggerHeight: "40px-48px",
  contentPadding: "16px-24px",
  borderWidth: STANDARD_OUTLINES.hairline,
  borderRadius: STANDARD_RADIUS.md,
  iconPlacement: "right",
  mobileWidth: "100%",
} as const;

export const STANDARD_FORMAT_RULES = {
  date: "MM/DD/YYYY",
  monthYear: "MM/YYYY",
  mobileNumber: {
    prefix: "+63",
    digitsAfterPrefix: 10,
    numbersOnly: true,
    errorText: "Please enter a valid 10-digit mobile number",
  },
  addressOrder: [
    "Province",
    "City/Municipality",
    "District",
    "Barangay",
    "Zip Code",
    "Street",
    "House/Unit No.",
  ],
  suffixName: {
    format: "FIRST NAME, SUFFIX",
    example: "JUAN MIGUEL, JR.",
  },
  displayDetails: {
    left: "Caption/Title",
    right: "Value/Details",
  },
  links: {
    address: "Waze/Maps directions when workflow expects directions",
    contact: "Call link when workflow expects call behavior",
  },
} as const;

export const STANDARD_GENERIC_WORDS = {
  navigationActions: [
    "Home",
    "Dashboard",
    "Menu",
    "Overview",
    "Search",
    "Explore",
    "Categories",
    "Activity",
    "History",
    "Notifications",
    "Profile",
    "Settings",
    "Help",
    "Support",
    "More",
  ],
  formActions: [
    "Add",
    "Create",
    "Edit",
    "Update",
    "Save",
    "Submit",
    "Cancel",
    "Delete",
    "Remove",
    "Confirm",
    "Continue",
    "Back",
    "Next",
    "Close",
    "Retry",
    "Refresh",
    "Apply",
    "Reset",
    "Download",
    "Upload",
    "Share",
    "View",
  ],
  dataDisplay: [
    "Name",
    "Description",
    "Details",
    "Type",
    "Category",
    "Status",
    "Date",
    "Start Date",
    "End Date",
    "Amount",
    "Quantity",
    "Address",
    "Contact Number",
    "Email",
    "Notes",
    "Remarks",
    "Required",
    "Optional",
    "Total",
    "Summary",
    "Result",
    "Value",
    "Count",
    "Information",
    "Records",
    "List",
    "Table",
    "Recent",
    "Latest",
    "Preview",
  ],
  statuses: [
    "Active",
    "Inactive",
    "Pending",
    "Processing",
    "Approved",
    "Rejected",
    "Completed",
    "Failed",
    "Cancelled",
    "Expired",
    "Draft",
    "Published",
    "Archived",
  ],
  feedback: [
    "Success",
    "Error",
    "Warning",
    "Loading",
    "No Data Available",
    "Something Went Wrong",
    "Changes Saved",
    "Try Again",
    "Action Completed",
    "Connection Lost",
    "Syncing",
  ],
  authentication: [
    "Sign In",
    "Sign Out",
    "Register",
    "Forgot Password",
    "Verify",
    "Continue as Guest",
    "Remember Me",
  ],
  emptyState: [
    "No Results Found",
    "No Records Available",
    "Start by Adding a New Item",
    "Nothing to Display",
    "Your List Is Empty",
  ],
} as const;

export const STANDARD_DESIGN_TOKENS = {
  colors: "See brand-colors.ts",
  layout: {
    responsive: RESPONSIVE_LAYOUT_TOKENS,
    pdfGrid: PDF_GRID_TOKENS,
    pdfPage: PDF_PAGE_LAYOUT_TOKENS,
  },
  spacing: STANDARD_SPACING,
  responsiveSpacing: STANDARD_RESPONSIVE_SPACING,
  typography: STANDARD_TYPOGRAPHY,
  radius: STANDARD_RADIUS,
  outlines: STANDARD_OUTLINES,
  shadows: STANDARD_SHADOWS,
  cardElevation: STANDARD_CARD_ELEVATION_TOKENS,
  transitions: STANDARD_TRANSITIONS,
  sizes: STANDARD_SIZES,
  shapes: STANDARD_SHAPE_SIZES,
  navigation: STANDARD_NAVIGATION_TOKENS,
  messages: STANDARD_MESSAGE_TOKENS,
  images: STANDARD_IMAGE_TOKENS,
  reports: STANDARD_REPORT_TOKENS,
  progress: STANDARD_PROGRESS_TOKENS,
  emptyState: STANDARD_EMPTY_STATE_TOKENS,
  accordion: STANDARD_ACCORDION_TOKENS,
  formats: STANDARD_FORMAT_RULES,
  words: STANDARD_GENERIC_WORDS,
} as const;
