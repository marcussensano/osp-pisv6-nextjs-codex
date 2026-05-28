"use client";

import {
  Badge,
  Box,
  Flex,
  Grid,
  HStack,
  Progress,
  SimpleGrid,
  Stat,
  Text,
} from "@chakra-ui/react";
import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  FileText,
  Users,
} from "lucide-react";
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

export default function Home() {
  return (
    <AppShell title="Dashboard" eyebrow="Home">
      <Grid gap="5" maxW="1440px">
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4">
          {stats.map((item) => {
            const Icon = item.icon;

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
                  <ArrowUpRight size={15} />
                  <Text>{item.change} this month</Text>
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
      </Grid>
    </AppShell>
  );
}
