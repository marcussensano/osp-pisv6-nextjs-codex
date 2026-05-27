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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/", icon: Gauge },
  { label: "Accounts Summary", href: "/accounts-summary", icon: ShieldCheck },
];

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
  const desktopSidebarWidth = isSidebarCollapsed ? "88px" : "272px";

  return (
    <Box minH="100vh" bg="brand.white" color="brand.neutralText">
      <Sidebar
        display={{ base: "none", lg: "flex" }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((value) => !value)}
      />

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
          <Sidebar isMobile onClose={() => setIsOpen(false)} />
        </Box>
      ) : null}

      <Box
        pl={{ base: "0", lg: desktopSidebarWidth }}
        transition="padding-left var(--motion-standard) var(--motion-ease-standard)"
      >
        <Box
          as="header"
          position="sticky"
          top="0"
          zIndex="20"
          bg="rgba(255, 255, 255, 0.92)"
          borderBottom="1px solid"
          borderColor="brand.neutralBorder"
          backdropFilter="blur(14px)"
        >
          <Flex
            align="center"
            justify="space-between"
            gap="4"
            minH="72px"
            px={{ base: "4", md: "6" }}
          >
            <HStack gap="3" minW="0">
              <IconButton
                aria-label="Open navigation"
                display={{ base: "inline-flex", lg: "none" }}
                variant="ghost"
                color="brand.darkGreen"
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
              <IconButton
                aria-label="Notifications"
                variant="ghost"
                color="brand.darkGreen"
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
                color="brand.primaryGreen"
              >
                <Avatar.Fallback name="Mira Lim" />
              </Avatar.Root>
            </HStack>
          </Flex>

          <Box display={{ base: "block", md: "none" }} px="4" pb="3">
            <HeaderSearch />
          </Box>
        </Box>

        <Box as="main" px={{ base: "4", md: "6" }} py={{ base: "4", md: "6" }}>
          {children}
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

function Sidebar({
  isMobile = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
  display,
}: {
  isMobile?: boolean;
  isCollapsed?: boolean;
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
      left="0"
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
          w="34px"
          h="34px"
          borderRadius="md"
          bg="brand.primaryGreen"
          color="brand.white"
        >
          <ShieldCheck size={20} />
        </Flex>
        <Box
          flex="1"
          display={isCompact ? "none" : "block"}
          opacity={isCompact ? "0" : "1"}
          transition="opacity var(--motion-fast) var(--motion-ease-out)"
        >
          <Text color="brand.darkGreen" fontWeight="700" lineHeight="1.05">
            One St. Peter
          </Text>
          <Text color="text.secondary" fontSize="12px" fontWeight="500">
            Life Plan Operations
          </Text>
        </Box>
        {isMobile ? (
          <IconButton
            aria-label="Close navigation"
            variant="ghost"
            color="brand.darkGreen"
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
            right="-14px"
            top="50%"
            transform="translateY(-50%)"
            zIndex="1"
            bg="brand.white"
            color="brand.darkGreen"
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
                  minH="42px"
                  px={isCompact ? "0" : "3"}
                  borderRadius="8px"
                  bg={isActive ? "brand.primaryGreen" : "transparent"}
                  color={isActive ? "brand.white" : "brand.darkGreen"}
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
