"use client";

import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Menu,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  CustomizePanel,
  DEFAULT_CUSTOMIZE_PREFERENCES,
  type PreferenceKey,
  type PreferenceState,
} from "./CustomizePanel";
import { BRAND_COLORS } from "../theme/design-tokens";

const navItems = [
  { label: "Dashboard", href: "/", icon: Gauge },
  { label: "Accounts Summary", href: "/accounts-summary", icon: ShieldCheck },
];

const densityOptions: Record<
  string,
  {
    headerMinH: string;
    headerPx: Record<string, string>;
    mainPx: Record<string, string>;
    mainPy: Record<string, string>;
    navItemMinH: string;
  }
> = {
  compact: {
    headerMinH: "64px",
    headerPx: { base: "3", md: "5" },
    mainPx: { base: "3", md: "5" },
    mainPy: { base: "3", md: "4" },
    navItemMinH: "38px",
  },
  comfortable: {
    headerMinH: "72px",
    headerPx: { base: "4", md: "6" },
    mainPx: { base: "4", md: "6" },
    mainPy: { base: "4", md: "6" },
    navItemMinH: "42px",
  },
  spacious: {
    headerMinH: "80px",
    headerPx: { base: "5", md: "8" },
    mainPx: { base: "5", md: "8" },
    mainPy: { base: "5", md: "8" },
    navItemMinH: "46px",
  },
};

const colorPalettes = {
  green: {
    primary: BRAND_COLORS.primaryGreen,
    hover: BRAND_COLORS.darkGreen,
    soft: BRAND_COLORS.softGreen,
    tint: BRAND_COLORS.successBg,
    darkTint: "rgba(16, 148, 72, 0.18)",
  },
  neutral: {
    primary: "#22223B",
    hover: "#111827",
    soft: "#D1D5DB",
    tint: "#F3F4F6",
    darkTint: "rgba(209, 213, 219, 0.12)",
  },
  zinc: {
    primary: "#18181B",
    hover: "#09090B",
    soft: "#D4D4D8",
    tint: "#F4F4F5",
    darkTint: "rgba(212, 212, 216, 0.12)",
  },
  blue: {
    primary: "#0B82D8",
    hover: "#075985",
    soft: "#BAE6FD",
    tint: "#EFF6FF",
    darkTint: "rgba(11, 130, 216, 0.18)",
  },
  violet: {
    primary: "#6D5DFB",
    hover: "#5046E5",
    soft: "#DDD6FE",
    tint: "#F5F3FF",
    darkTint: "rgba(109, 93, 251, 0.18)",
  },
  rose: {
    primary: "#C43D75",
    hover: "#9F1239",
    soft: "#FBCFE8",
    tint: "#FFF1F2",
    darkTint: "rgba(196, 61, 117, 0.18)",
  },
  orange: {
    primary: "#C8460A",
    hover: "#9A3412",
    soft: "#FED7AA",
    tint: "#FFF7ED",
    darkTint: "rgba(200, 70, 10, 0.18)",
  },
} as const;

function getPreferenceCssVars(
  preferences: PreferenceState,
  effectiveTheme: string,
): CSSProperties {
  const palette =
    colorPalettes[preferences.color as keyof typeof colorPalettes] ??
    colorPalettes.green;
  const dark = effectiveTheme === "dark";

  return {
    "--osp-colors-brand-primary-green": palette.primary,
    "--osp-colors-brand-dark-green": palette.hover,
    "--osp-colors-brand-accent-text": dark ? palette.soft : palette.hover,
    "--osp-colors-brand-soft-green": palette.soft,
    "--osp-colors-brand-success-bg": dark ? palette.darkTint : palette.tint,
    "--osp-colors-brand-selected-surface": dark ? "#111827" : palette.tint,
    "--osp-colors-brand-control-muted-bg": dark ? "#1E293B" : BRAND_COLORS.mutedBg,
    "--osp-colors-brand-danger-surface": dark ? "rgba(191, 31, 47, 0.16)" : BRAND_COLORS.errorBg,
    "--osp-colors-brand-danger-text": dark ? "#FB7185" : BRAND_COLORS.destructiveRed,
    "--osp-colors-brand-white": dark ? "#0F172A" : "#FFFFFF",
    "--osp-colors-brand-neutral-text": dark ? "#F8FAFC" : "#22223B",
    "--osp-colors-brand-neutral-border": dark ? "#1E293B" : "#E5E7EB",
    "--osp-colors-brand-muted-bg": dark ? "#1E293B" : "#F3F4F6",
    "--osp-colors-brand-subtle-bg": dark ? "#111827" : "#F9FAFB",
    "--osp-colors-text-primary": dark ? "#F8FAFC" : "#22223B",
    "--osp-colors-text-secondary": dark ? "#CBD5E1" : "#4B5563",
    "--osp-colors-text-muted": dark ? "#94A3B8" : "#6B7280",
    "--osp-colors-text-brand": palette.hover,
    "--osp-colors-text-inverse": "#FFFFFF",
    "--osp-colors-border-default": dark ? "#1E293B" : "#E5E7EB",
    "--osp-colors-border-brand": palette.soft,
    colorScheme: dark ? "dark" : "light",
  } as CSSProperties;
}

export function AppShell({
  children,
  title,
  eyebrow,
}: {
  children: React.ReactNode;
  title: string;
  eyebrow?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [preferences, setPreferences] = useState<PreferenceState>(
    DEFAULT_CUSTOMIZE_PREFERENCES,
  );
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const isTopNav = preferences.layout === "top-nav";
  const isRtl = preferences.direction === "rtl";
  const effectiveTheme =
    preferences.theme === "system" ? systemTheme : preferences.theme;
  const density = densityOptions[preferences.density] ?? densityOptions.spacious;
  const desktopSidebarWidth = isSidebarCollapsed ? "88px" : "272px";
  const desktopOffset = isTopNav ? "0" : desktopSidebarWidth;
  const shellStyle = useMemo(
    () => getPreferenceCssVars(preferences, effectiveTheme),
    [preferences, effectiveTheme],
  );
  const contentOffsetProps = isRtl
    ? { pr: { base: "0", lg: desktopOffset } }
    : { pl: { base: "0", lg: desktopOffset } };
  const containerMaxW =
    preferences.container === "boxed" ? "1440px" : "none";

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () =>
      setSystemTheme(media.matches ? "dark" : "light");

    syncSystemTheme();
    media.addEventListener("change", syncSystemTheme);

    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  function updatePreference(preference: PreferenceKey, value: string) {
    // TODO: Persist these preferences once global user settings are available.
    setPreferences((current) => ({ ...current, [preference]: value }));
  }

  return (
    <Box
      minH="100vh"
      bg="brand.white"
      color="brand.neutralText"
      data-app-theme={effectiveTheme}
      data-app-density={preferences.density}
      dir={preferences.direction}
      style={shellStyle}
      transition="background-color var(--motion-standard) var(--motion-ease-standard), color var(--motion-standard) var(--motion-ease-standard)"
    >
      {!isTopNav ? (
        <Sidebar
          display={{ base: "none", lg: "flex" }}
          isCollapsed={isSidebarCollapsed}
          isRtl={isRtl}
          navItemMinH={density.navItemMinH}
          onToggleCollapse={() => setIsSidebarCollapsed((value) => !value)}
        />
      ) : null}

      {isOpen ? (
        <Box
          display={{ base: "block", lg: "none" }}
          position="fixed"
          inset="0"
          zIndex="50"
          animation="osp-fade-in var(--motion-standard) var(--motion-ease-out)"
        >
          <Box
            position="absolute"
            inset="0"
            bg="rgba(15, 23, 42, 0.42)"
            onClick={() => setIsOpen(false)}
          />
          <Sidebar
            isMobile
            isRtl={isRtl}
            navItemMinH={density.navItemMinH}
            onClose={() => setIsOpen(false)}
          />
        </Box>
      ) : null}

      <Box
        {...contentOffsetProps}
        transition="padding-left var(--motion-standard) var(--motion-ease-standard), padding-right var(--motion-standard) var(--motion-ease-standard)"
      >
        <Box
          as="header"
          position="sticky"
          top="0"
          zIndex="20"
          bg={
            effectiveTheme === "dark"
              ? "rgba(15, 23, 42, 0.92)"
              : "rgba(255, 255, 255, 0.92)"
          }
          borderBottom="1px solid"
          borderColor="brand.neutralBorder"
          backdropFilter="blur(14px)"
        >
          <Flex
            align="center"
            justify="space-between"
            gap="4"
            minH={density.headerMinH}
            maxW={containerMaxW}
            mx={preferences.container === "boxed" ? "auto" : "0"}
            px={density.headerPx}
          >
            <HStack gap="3" minW="0">
              <IconButton
                aria-label="Open navigation"
                display={{ base: "inline-flex", lg: "none" }}
                variant="ghost"
                color="brand.accentText"
                onClick={() => setIsOpen(true)}
                transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                _hover={{
                  bg: "brand.successBg",
                  transform: "translateY(-1px)",
                }}
                _active={{ transform: "translateY(0)" }}
              >
                <Menu size={20} />
              </IconButton>
              <Box minW="0">
                {eyebrow ? (
                  <Text color="text.secondary" fontSize="12px" fontWeight="600">
                    {eyebrow}
                  </Text>
                ) : null}
                <Text
                  as="h1"
                  color="brand.neutralText"
                  fontSize={{ base: "18px", md: "22px" }}
                  fontWeight="700"
                >
                  {title}
                </Text>
              </Box>
            </HStack>

            <HStack gap="3">
              <HeaderSearch
                display={{ base: "none", md: "block" }}
                width="min(34vw, 360px)"
              />
              <CustomizePanel
                preferences={preferences}
                panelStyle={shellStyle}
                onPreferenceChange={updatePreference}
                onReset={() => setPreferences(DEFAULT_CUSTOMIZE_PREFERENCES)}
              />
              <IconButton
                aria-label="Notifications"
                variant="ghost"
                color="brand.accentText"
                transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                _hover={{
                  bg: "brand.successBg",
                  transform: "translateY(-1px)",
                }}
                _active={{ transform: "translateY(0)" }}
              >
                <Bell size={18} />
              </IconButton>
              <Avatar.Root
                size="sm"
                bg="brand.successBg"
                color="brand.accentText"
              >
                <Avatar.Fallback name="Mira Lim" />
              </Avatar.Root>
            </HStack>
          </Flex>

          <Box display={{ base: "block", md: "none" }} px="4" pb="3">
            <HeaderSearch />
          </Box>
          {isTopNav ? <TopNavigation maxW={containerMaxW} /> : null}
        </Box>

        <Box as="main" px={density.mainPx} py={density.mainPy}>
          <Box
            w="100%"
            maxW={containerMaxW}
            mx={preferences.container === "boxed" ? "auto" : "0"}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function HeaderSearch({
  display,
  width = "100%",
}: {
  display?: Record<string, string> | string;
  width?: Record<string, string> | string;
}) {
  return (
    <Box position="relative" display={display} w={width}>
      <Box
        position="absolute"
        left="3"
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        color="text.muted"
        pointerEvents="none"
      >
        <Search size={16} />
      </Box>
      <Input
        aria-label="Search by LPA number or name"
        h="38px"
        pl="9"
        bg="brand.subtleBg"
        borderColor="brand.neutralBorder"
        color="brand.neutralText"
        placeholder="Search by LPA No. or name..."
        _placeholder={{ color: "text.muted" }}
        _focus={{
          borderColor: "brand.primaryGreen",
          boxShadow: "0 0 0 1px var(--osp-colors-brand-primary-green)",
        }}
        transition="border-color var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) var(--motion-ease-out), background-color var(--motion-fast) var(--motion-ease-out)"
      />
    </Box>
  );
}

function TopNavigation({ maxW }: { maxW: string }) {
  const pathname = usePathname();

  return (
    <Box
      display={{ base: "none", lg: "block" }}
      borderTop="1px solid"
      borderColor="brand.neutralBorder"
    >
      <HStack
        gap="2"
        px={{ base: "4", md: "6" }}
        py="2"
        maxW={maxW}
        mx={maxW === "none" ? "0" : "auto"}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <HStack
                gap="2"
                minH="38px"
                px="3"
                borderRadius="8px"
                bg={isActive ? "brand.primaryGreen" : "transparent"}
                color={isActive ? "text.inverse" : "brand.accentText"}
                fontSize="14px"
                fontWeight="600"
                transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                _hover={{
                  bg: isActive ? "brand.darkGreen" : "brand.successBg",
                  transform: "translateY(-1px)",
                }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "brand.primaryGreen",
                  outlineOffset: "2px",
                }}
              >
                <Icon size={17} />
                <Text>{item.label}</Text>
              </HStack>
            </Link>
          );
        })}
      </HStack>
    </Box>
  );
}

function Sidebar({
  isMobile = false,
  isCollapsed = false,
  isRtl = false,
  navItemMinH = "42px",
  onClose,
  onToggleCollapse,
  display,
}: {
  isMobile?: boolean;
  isCollapsed?: boolean;
  isRtl?: boolean;
  navItemMinH?: string;
  onClose?: () => void;
  onToggleCollapse?: () => void;
  display?: Record<string, string> | string;
}) {
  const pathname = usePathname();
  const isCompact = isCollapsed && !isMobile;

  return (
    <Flex
      as="aside"
      position="fixed"
      left={isRtl ? "auto" : "0"}
      right={isRtl ? "0" : "auto"}
      top="0"
      bottom="0"
      zIndex={isMobile ? "60" : "30"}
      display={display ?? "flex"}
      direction="column"
      w={isCompact ? "88px" : "272px"}
      maxW="86vw"
      bg="brand.white"
      borderRight="1px solid"
      borderColor="brand.neutralBorder"
      boxShadow={isMobile ? "0 24px 70px rgba(15, 23, 42, 0.24)" : "none"}
      transition="width var(--motion-standard) var(--motion-ease-standard), box-shadow var(--motion-standard) var(--motion-ease-standard)"
      animation={
        isMobile
          ? "osp-drawer-in var(--motion-standard) var(--motion-ease-out)"
          : undefined
      }
    >
      <HStack
        position="relative"
        h="72px"
        px={isCompact ? "0" : "4"}
        borderBottom="1px solid"
        borderColor="brand.neutralBorder"
        gap="3"
        justify={isCompact ? "center" : "flex-start"}
      >
        <Flex
          align="center"
          justify="center"
          w="38px"
          h="38px"
          borderRadius="md"
          bg="brand.white"
          border="1px solid"
          borderColor="brand.neutralBorder"
          overflow="hidden"
          flexShrink="0"
        >
          <Image
            src="/images/logo/icon.png"
            alt="St. Peter"
            width={34}
            height={34}
            priority
            style={{ width: "34px", height: "34px", objectFit: "contain" }}
          />
        </Flex>
        <Box
          flex="1"
          display={isCompact ? "none" : "block"}
          opacity={isCompact ? "0" : "1"}
          transition="opacity var(--motion-fast) var(--motion-ease-out)"
        >
          <Box position="relative" w="150px" h="30px" mb="0.5">
            <Image
              src="/images/osp-chakra-reusable-components/stpeter-logo.png"
              alt="St. Peter Life Plan and Chapels"
              fill
              sizes="150px"
              style={{ objectFit: "contain", objectPosition: "left center" }}
            />
          </Box>
          <Text color="text.secondary" fontSize="12px" fontWeight="500">
            Life Plan Operations
          </Text>
        </Box>
        {isMobile ? (
          <IconButton
            aria-label="Close navigation"
            variant="ghost"
            color="brand.accentText"
            onClick={onClose}
            transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out)"
            _hover={{ bg: "brand.successBg" }}
          >
            <X size={18} />
          </IconButton>
        ) : null}
        {!isMobile ? (
          <IconButton
            aria-label={isCompact ? "Expand sidebar" : "Collapse sidebar"}
            size="xs"
            position="absolute"
            right={isRtl ? "auto" : "-14px"}
            left={isRtl ? "-14px" : "auto"}
            top="50%"
            transform="translateY(-50%)"
            zIndex="1"
            bg="brand.white"
            color="brand.accentText"
            border="1px solid"
            borderColor="brand.neutralBorder"
            borderRadius="full"
            boxShadow="level1"
            onClick={onToggleCollapse}
            transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
            _hover={{
              bg: "brand.successBg",
              borderColor: "brand.softGreen",
              transform: "translateY(-50%) scale(1.04)",
            }}
            _active={{ transform: "translateY(-50%) scale(0.98)" }}
            >
            {isCompact ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </IconButton>
        ) : null}
      </HStack>

      <Box px={isCompact ? "2" : "3"} py="5">
        <Text
          px="3"
          mb="2"
          color="text.muted"
          fontSize="12px"
          fontWeight="600"
          textTransform="uppercase"
          display={isCompact ? "none" : "block"}
        >
          Menu
        </Text>
        <VStack align="stretch" gap="1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-label={item.label}
                style={{ textDecoration: "none" }}
              >
                <Flex
                  align="center"
                  justify={isCompact ? "center" : "flex-start"}
                  gap="3"
                  minH={navItemMinH}
                  px={isCompact ? "0" : "3"}
                  borderRadius="8px"
                  bg={isActive ? "brand.primaryGreen" : "transparent"}
                  color={isActive ? "text.inverse" : "brand.accentText"}
                  fontSize="14px"
                  fontWeight="600"
                  transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) var(--motion-ease-out)"
                  boxShadow={
                    isActive ? "inset 0 0 0 1px rgba(255,255,255,0.18)" : "none"
                  }
                  _hover={{
                    bg: isActive ? "brand.darkGreen" : "brand.successBg",
                    transform: isCompact ? "scale(1.03)" : "translateX(2px)",
                  }}
                  _active={{
                    transform: isCompact ? "scale(0.99)" : "translateX(1px)",
                  }}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "brand.primaryGreen",
                    outlineOffset: "2px",
                  }}
                >
                  <Icon size={18} />
                  <Text display={isCompact ? "none" : "block"}>
                    {item.label}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
}
