"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Progress,
  SimpleGrid,
  Stat,
  Text,
} from "@chakra-ui/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  FileText,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "./components/AppShell";

const stats = [
  { label: "Active Planholders", value: "8,426", change: "+4.8%", icon: Users },
  { label: "Pending Requests", value: "138", change: "-12.2%", icon: Clock3 },
  { label: "Plans In Force", value: "10,924", change: "+2.1%", icon: BadgeCheck },
  { label: "Documents Filed", value: "2,318", change: "+9.6%", icon: FileText },
];

const activity = [
  "New planholder record verified",
  "Beneficiary update request reviewed",
  "Statement of account generated",
  "Plan reinstatement queued for approval",
];

const accessCards = [
  {
    title: "Planholder Login",
    detail: "Secure account access for payment history and plan servicing.",
    image: "/images/osp-chakra-reusable-components/login.webp",
  },
  {
    title: "Create Account",
    detail: "Digital onboarding for families starting a St. Peter life plan.",
    image: "/images/osp-chakra-reusable-components/createaccount.jpg",
  },
];

const socialProviders = [
  {
    name: "Google",
    image: "/images/osp-chakra-reusable-components/icons8-google-48.png",
  },
  {
    name: "Meta",
    image: "/images/osp-chakra-reusable-components/icons8-meta-48.png",
  },
  {
    name: "X",
    image: "/images/osp-chakra-reusable-components/icons8-x-48.png",
  },
];

export default function Home() {
  return (
    <AppShell title="Dashboard" eyebrow="Home">
      <Grid gap="5" maxW="1440px">
        <BrandOverview />

        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4">
          {stats.map((item) => {
            const Icon = item.icon;
            const isImprovingReduction = item.change.startsWith("-");
            const TrendIcon = isImprovingReduction ? ArrowDownRight : ArrowUpRight;

            return (
              <Box
                key={item.label}
                bg="brand.white"
                border="1px solid"
                borderColor="brand.neutralBorder"
                borderRadius="md"
                p="5"
                transition="transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "level2",
                  borderColor: "brand.softGreen",
                }}
              >
                <Flex align="flex-start" justify="space-between" gap="4">
                  <Box>
                    <Text color="text.secondary" fontSize="12px" fontWeight="600">
                      {item.label}
                    </Text>
                    <Stat.Root mt="2">
                      <Stat.ValueText color="brand.neutralText" fontSize="28px" fontWeight="700">
                        {item.value}
                      </Stat.ValueText>
                    </Stat.Root>
                  </Box>
                  <Flex align="center" justify="center" w="42px" h="42px" borderRadius="md" bg="brand.successBg" color="brand.accentText">
                    <Icon size={21} />
                  </Flex>
                </Flex>
                <HStack mt="4" color="brand.accentText" fontSize="14px" fontWeight="600">
                  <TrendIcon size={15} />
                  <Text>
                    {item.change} this month
                    {isImprovingReduction ? " (improved)" : ""}
                  </Text>
                </HStack>
              </Box>
            );
          })}
        </SimpleGrid>

        <Grid templateColumns={{ base: "1fr", xl: "1.6fr 1fr" }} gap="4">
          <Box
            bg="brand.white"
            border="1px solid"
            borderColor="brand.neutralBorder"
            borderRadius="md"
            p="5"
            transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
            _hover={{
              boxShadow: "level1",
              borderColor: "brand.softGreen",
            }}
          >
            <Flex align="center" justify="space-between" gap="4" mb="6">
              <Box>
                <Text color="brand.neutralText" fontSize="18px" fontWeight="600">
                  Operations Overview
                </Text>
                <Text color="text.secondary" fontSize="14px">
                  Static demo dashboard for plan management activity.
                </Text>
              </Box>
              <Badge bg="brand.successBg" color="brand.accentText" px="3" py="1" borderRadius="sm">
                Live demo
              </Badge>
            </Flex>
            <Grid gap="5">
              {["Account verification", "Plan servicing", "Request resolution"].map((label, index) => (
                <Box key={label}>
                  <Flex justify="space-between" mb="2">
                    <Text color="brand.accentText" fontSize="14px" fontWeight="600">
                      {label}
                    </Text>
                    <Text color="text.secondary" fontSize="14px" fontWeight="500">
                      {[82, 68, 74][index]}%
                    </Text>
                  </Flex>
                  <Progress.Root value={[82, 68, 74][index]} colorPalette="green" size="sm" borderRadius="999px">
                    <Progress.Track bg="brand.mutedBg">
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              ))}
            </Grid>
          </Box>

          <Box
            bg="brand.white"
            border="1px solid"
            borderColor="brand.neutralBorder"
            borderRadius="md"
            p="5"
            transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
            _hover={{
              boxShadow: "level1",
              borderColor: "brand.softGreen",
            }}
          >
            <Text color="brand.neutralText" fontSize="18px" fontWeight="600">
              Recent Activity
            </Text>
            <Grid gap="4" mt="5">
              {activity.map((item) => (
                <HStack
                  key={item}
                  align="flex-start"
                  gap="3"
                  borderRadius="md"
                  transition="background-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                  _hover={{ bg: "brand.subtleBg", transform: "translateX(2px)" }}
                >
                  <Box mt="1" w="8px" h="8px" borderRadius="full" bg="brand.primaryGreen" />
                  <Box>
                    <Text color="brand.neutralText" fontSize="14px" fontWeight="500">
                      {item}
                    </Text>
                    <Text color="text.muted" fontSize="12px">
                      Today
                    </Text>
                  </Box>
                </HStack>
              ))}
            </Grid>
          </Box>
        </Grid>

        <DigitalAccessPanel />
      </Grid>
    </AppShell>
  );
}

function BrandOverview() {
  return (
    <Grid
      templateColumns={{ base: "1fr", xl: "minmax(0, 1.05fr) minmax(420px, 0.95fr)" }}
      gap="0"
      bg="brand.white"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="md"
      overflow="hidden"
      boxShadow="level1"
      transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{ borderColor: "brand.softGreen", boxShadow: "level2" }}
    >
      <Flex
        direction="column"
        justify="space-between"
        gap="6"
        p={{ base: "5", md: "6" }}
        minH={{ base: "auto", xl: "310px" }}
      >
        <Box>
          <HStack gap="3" mb="5" wrap="wrap">
            <Box position="relative" w="164px" h="32px">
              <Image
                src="/images/osp-chakra-reusable-components/stpeter-logo.png"
                alt="St. Peter Life Plan and Chapels"
                fill
                sizes="164px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </Box>
            <Badge
              bg="brand.successBg"
              color="brand.accentText"
              borderColor="brand.softGreen"
              borderWidth="1px"
              borderRadius="full"
              px="3"
              py="1"
            >
              Operations command center
            </Badge>
          </HStack>
          <Text
            as="h2"
            color="brand.neutralText"
            fontSize={{ base: "28px", md: "34px" }}
            fontWeight="700"
            lineHeight="1.12"
            maxW="620px"
          >
            Planholder records, servicing queues, and branch activity in one
            workspace.
          </Text>
          <Text color="text.secondary" fontSize={{ base: "14px", md: "15px" }} maxW="620px" mt="3">
            A focused dashboard for monitoring life plan operations, account
            verification, and service requests across active branches.
          </Text>
          <HStack gap="3" mt="5" wrap="wrap">
            <Button
              asChild
              size="sm"
              bg="brand.primaryGreen"
              color="text.inverse"
              _hover={{ bg: "brand.darkGreen" }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "brand.primaryGreen",
                outlineOffset: "2px",
              }}
            >
              <Link href="/accounts-summary">
                Open Accounts Summary
                <ArrowRight size={15} />
              </Link>
            </Button>
            <Text color="text.muted" fontSize="13px" fontWeight="500">
              Start with the lapsed plan that needs review.
            </Text>
          </HStack>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 3 }} gap="3">
          {[
            ["24", "Branches monitored"],
            ["98.4%", "Verification SLA"],
            ["4.7h", "Average turnaround"],
          ].map(([value, label]) => (
            <Box
              key={label}
              bg="brand.subtleBg"
              border="1px solid"
              borderColor="brand.neutralBorder"
              borderRadius="md"
              p="3"
            >
              <Text color="brand.accentText" fontSize="20px" fontWeight="700" lineHeight="1">
                {value}
              </Text>
              <Text color="text.muted" fontSize="12px" fontWeight="600" mt="1">
                {label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>

      <Box
        position="relative"
        minH={{ base: "220px", md: "300px", xl: "100%" }}
        borderTop={{ base: "1px solid", xl: "0" }}
        borderLeft={{ base: "0", xl: "1px solid" }}
        borderColor="brand.neutralBorder"
      >
        <Image
          src="/images/hoabout.jpg"
          alt="St. Peter corporate center exterior"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 560px"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>
    </Grid>
  );
}

function DigitalAccessPanel() {
  return (
    <Box
      bg="brand.white"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="md"
      p="5"
      transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{ boxShadow: "level1", borderColor: "brand.softGreen" }}
    >
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap="4"
        mb="4"
      >
        <Box>
          <Text color="brand.neutralText" fontSize="18px" fontWeight="600">
            Digital Access
          </Text>
          <Text color="text.secondary" fontSize="14px">
            Account entry points used by planholders and new customers.
          </Text>
        </Box>
        <HStack gap="2">
          {socialProviders.map((provider) => (
            <Flex
              key={provider.name}
              align="center"
              justify="center"
              w="38px"
              h="38px"
              border="1px solid"
              borderColor="brand.neutralBorder"
              borderRadius="md"
              bg="brand.subtleBg"
            >
              <Image
                src={provider.image}
                alt={`${provider.name} sign-in option`}
                width={22}
                height={22}
                style={{ width: "22px", height: "22px", objectFit: "contain" }}
              />
            </Flex>
          ))}
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
        {accessCards.map((card) => (
          <Grid
            key={card.title}
            templateColumns={{ base: "1fr", sm: "150px minmax(0, 1fr)" }}
            gap="0"
            border="1px solid"
            borderColor="brand.neutralBorder"
            borderRadius="md"
            overflow="hidden"
            bg="brand.subtleBg"
            transition="transform var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) var(--motion-ease-out)"
            _hover={{
              transform: "translateY(-2px)",
              borderColor: "brand.softGreen",
              boxShadow: "level1",
            }}
          >
            <Box position="relative" minH={{ base: "180px", sm: "150px" }}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 100vw, 150px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>
            <Flex direction="column" justify="center" p="4">
              <Text color="brand.neutralText" fontSize="16px" fontWeight="700">
                {card.title}
              </Text>
              <Text color="text.secondary" fontSize="14px" mt="1">
                {card.detail}
              </Text>
              <HStack color="brand.accentText" fontSize="13px" fontWeight="700" mt="3">
                <ArrowUpRight size={14} />
                <Text>Review channel readiness</Text>
              </HStack>
            </Flex>
          </Grid>
        ))}
      </SimpleGrid>
    </Box>
  );
}
