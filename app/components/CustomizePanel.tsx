"use client";

import {
  Box,
  Button,
  CloseButton,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  Flex,
  Grid,
  HStack,
  IconButton,
  Portal,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  AlignLeft,
  AlignRight,
  BoxSelect,
  CircleDot,
  Columns3,
  GalleryHorizontalEnd,
  Globe2,
  LayoutDashboard,
  Maximize,
  Monitor,
  Moon,
  PanelLeft,
  Rows3,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import type { CSSProperties } from "react";
import { BRAND_COLORS } from "../theme/design-tokens";

export type PreferenceKey =
  | "theme"
  | "color"
  | "density"
  | "layout"
  | "container"
  | "direction"
  | "language";

export type PreferenceState = Record<PreferenceKey, string>;

type CustomizeOption = {
  label: string;
  value: string;
  icon?: React.ElementType;
  swatch?: string;
};

type CustomizeSectionConfig = {
  title: string;
  preference: PreferenceKey;
  columns?: number;
  options: CustomizeOption[];
};

export const DEFAULT_CUSTOMIZE_PREFERENCES: PreferenceState = {
  theme: "light",
  color: "green",
  density: "spacious",
  layout: "sidebar",
  container: "boxed",
  direction: "ltr",
  language: "english",
};

export const CUSTOMIZE_COLOR_SWATCHES = {
  green: BRAND_COLORS.primaryGreen,
  neutral: "#F2E9E4",
  zinc: "#18181B",
  blue: "#026BA9",
  violet: "#6D5DFB",
  rose: "#FFCEE9",
  orange: "#F7B267",
} as const;

const sections: CustomizeSectionConfig[] = [
  {
    title: "Theme",
    preference: "theme",
    options: [
      { label: "Light", value: "light", icon: Sun },
      { label: "Dark", value: "dark", icon: Moon },
      { label: "System", value: "system", icon: Monitor },
    ],
  },
  {
    title: "Color",
    preference: "color",
    options: [
      {
        label: "Brand Green",
        value: "green",
        swatch: CUSTOMIZE_COLOR_SWATCHES.green,
      },
      {
        label: "Neutral",
        value: "neutral",
        swatch: CUSTOMIZE_COLOR_SWATCHES.neutral,
      },
      { label: "Zinc", value: "zinc", swatch: CUSTOMIZE_COLOR_SWATCHES.zinc },
      { label: "Blue", value: "blue", swatch: CUSTOMIZE_COLOR_SWATCHES.blue },
      {
        label: "Violet",
        value: "violet",
        swatch: CUSTOMIZE_COLOR_SWATCHES.violet,
      },
      { label: "Rose", value: "rose", swatch: CUSTOMIZE_COLOR_SWATCHES.rose },
      {
        label: "Orange",
        value: "orange",
        swatch: CUSTOMIZE_COLOR_SWATCHES.orange,
      },
    ],
  },
  {
    title: "Density",
    preference: "density",
    options: [
      { label: "Compact", value: "compact", icon: Rows3 },
      {
        label: "Comfortable",
        value: "comfortable",
        icon: GalleryHorizontalEnd,
      },
      { label: "Spacious", value: "spacious", icon: Columns3 },
    ],
  },
  {
    title: "Layout",
    preference: "layout",
    columns: 2,
    options: [
      { label: "Sidebar", value: "sidebar", icon: PanelLeft },
      { label: "Top Nav", value: "top-nav", icon: LayoutDashboard },
    ],
  },
  {
    title: "Container",
    preference: "container",
    columns: 2,
    options: [
      { label: "Fluid", value: "fluid", icon: Maximize },
      { label: "Boxed", value: "boxed", icon: BoxSelect },
    ],
  },
  {
    title: "Direction",
    preference: "direction",
    columns: 2,
    options: [
      { label: "LTR", value: "ltr", icon: AlignLeft },
      { label: "RTL", value: "rtl", icon: AlignRight },
    ],
  },
  {
    title: "Language",
    preference: "language",
    columns: 1,
    options: [{ label: "English", value: "english", icon: Globe2 }],
  },
];

export function CustomizePanel({
  preferences,
  onPreferenceChange,
  onReset,
  panelStyle,
}: {
  preferences: PreferenceState;
  onPreferenceChange: (preference: PreferenceKey, value: string) => void;
  onReset: () => void;
  panelStyle?: CSSProperties;
}) {
  return (
    <DrawerRoot placement="end" size="xs">
      <DrawerTrigger asChild>
        <IconButton
          aria-label="Customize dashboard"
          variant="ghost"
          color="brand.accentText"
          transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
          _hover={{ bg: "brand.successBg", transform: "translateY(-1px)" }}
          _active={{ transform: "translateY(0)" }}
        >
          <SlidersHorizontal size={18} />
        </IconButton>
      </DrawerTrigger>

      <Portal>
        <DrawerBackdrop bg="rgba(15, 23, 42, 0.34)" />
        <DrawerPositioner>
          <DrawerContent
            bg="brand.white"
            color="brand.neutralText"
            maxW={{ base: "100vw", sm: "360px" }}
            borderLeft="1px solid"
            borderColor="brand.neutralBorder"
            boxShadow="level4"
            style={panelStyle}
          >
            <DrawerHeader
              px="4"
              py="4"
              borderBottom="1px solid"
              borderColor="brand.neutralBorder"
            >
              <Flex align="flex-start" justify="space-between" gap="3">
                <Box>
                  <DrawerTitle
                    color="brand.neutralText"
                    fontSize="16px"
                    fontWeight="700"
                  >
                    Customize
                  </DrawerTitle>
                  <DrawerDescription
                    color="text.secondary"
                    fontSize="12px"
                    mt="1"
                  >
                    Personalize your dashboard experience.
                  </DrawerDescription>
                </Box>
                <DrawerCloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    color="text.secondary"
                    _hover={{ bg: "brand.subtleBg", color: "brand.accentText" }}
                  />
                </DrawerCloseTrigger>
              </Flex>
            </DrawerHeader>

            <DrawerBody px="4" py="0">
              <VStack align="stretch" gap="0">
                {sections.map((section, index) => (
                  <CustomizeSection
                    key={section.preference}
                    section={section}
                    value={preferences[section.preference]}
                    onChange={(value) =>
                      onPreferenceChange(section.preference, value)
                    }
                    showDivider={index < sections.length - 1}
                  />
                ))}
              </VStack>
            </DrawerBody>

            <DrawerFooter
              px="4"
              py="4"
              borderTop="1px solid"
              borderColor="brand.neutralBorder"
            >
              <Button
                w="100%"
                size="sm"
                variant="outline"
                borderColor="brand.neutralBorder"
                color="brand.neutralText"
                bg="brand.white"
                fontWeight="600"
                onClick={onReset}
                _hover={{
                  bg: "brand.subtleBg",
                  borderColor: "brand.softGreen",
                }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "brand.primaryGreen",
                  outlineOffset: "2px",
                }}
              >
                Reset to Defaults
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </DrawerRoot>
  );
}

function CustomizeSection({
  section,
  value,
  onChange,
  showDivider,
}: {
  section: CustomizeSectionConfig;
  value: string;
  onChange: (value: string) => void;
  showDivider?: boolean;
}) {
  return (
    <Box py="4">
      <Text color="brand.neutralText" fontSize="12px" fontWeight="700" mb="3">
        {section.title}
      </Text>
      <Grid
        role="radiogroup"
        aria-label={section.title}
        templateColumns={`repeat(${section.columns ?? 3}, minmax(0, 1fr))`}
        gap="2"
      >
        {section.options.map((option) => (
          <CustomizeOptionCard
            key={option.value}
            option={option}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
          />
        ))}
      </Grid>
      {showDivider ? (
        <Separator mt="4" borderColor="brand.neutralBorder" />
      ) : null}
    </Box>
  );
}

function CustomizeOptionCard({
  option,
  selected,
  onSelect,
}: {
  option: CustomizeOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = option.icon ?? CircleDot;

  return (
    <Flex
      as="button"
      role="radio"
      aria-checked={selected}
      align="center"
      justify="center"
      direction="column"
      gap="1.5"
      minH="64px"
      px="2"
      py="3"
      border="1px solid"
      borderColor={selected ? "brand.primaryGreen" : "brand.neutralBorder"}
      borderRadius="md"
      bg={selected ? "brand.successBg" : "brand.white"}
      color={selected ? "brand.accentText" : "text.secondary"}
      cursor="pointer"
      textAlign="center"
      transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
      _hover={{
        bg: selected ? "brand.successBg" : "brand.subtleBg",
        borderColor: selected ? "brand.primaryGreen" : "brand.softGreen",
        transform: "translateY(-1px)",
      }}
      _active={{ transform: "translateY(0)" }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "brand.primaryGreen",
        outlineOffset: "2px",
      }}
      onClick={onSelect}
    >
      {option.swatch ? (
        <Box
          w="18px"
          h="18px"
          borderRadius="full"
          bg={option.swatch}
          border="2px solid"
          borderColor={selected ? "text.inverse" : "transparent"}
          boxShadow={
            selected
              ? "0 0 0 2px var(--osp-colors-brand-primary-green)"
              : "none"
          }
        />
      ) : (
        <Icon size={18} />
      )}
      <HStack gap="1" justify="center">
        <Text fontSize="12px" fontWeight={selected ? "700" : "500"}>
          {option.label}
        </Text>
      </HStack>
    </Flex>
  );
}
