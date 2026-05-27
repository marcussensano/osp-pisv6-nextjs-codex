"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  Separator,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  AlertCircle,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  HeartPulse,
  History,
  Home,
  IdCard,
  Mail,
  MapPin,
  RefreshCcw,
  Search,
  Trash2,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { DISPLAY_STATUS_STYLES } from "../theme/design-tokens";

type PlanStatus = "Active" | "Lapsed" | "Pending";
type AccountDetailTab =
  | "Profile"
  | "Contact"
  | "Address"
  | "Employment"
  | "Requests";

type PlanRecord = {
  lpaNo: string;
  status: PlanStatus;
  insured: string;
  plan: string;
  planClass: string;
  contractPrice: string;
  installmentAmount: string;
  effectivityDate: string;
  maturityDate: string;
  payingYears: string;
  insuranceStatus: string;
  branch: string;
  serviceOnly: string;
  agent: string;
  remarks: string;
};

const planholder = {
  id: "PHL-10429",
  initials: "ML",
  name: "Mira L. Santos",
  status: "Insurable",
  nationality: "Filipino",
  age: "42 years, 3 months",
  weight: "61 kg",
  naturalizationDate: "N/A",
  gender: "Female",
  birthDate: "May 12, 1984",
  civilStatus: "Single",
  birthPlace: "Quezon City",
  height: "5'4\"",
};

const plans: PlanRecord[] = [
  {
    lpaNo: "L24058961H",
    status: "Lapsed",
    insured: "Mira L. Santos",
    plan: "St. George",
    planClass: "Regular Account",
    contractPrice: "PHP 51,000",
    installmentAmount: "PHP 10,600",
    effectivityDate: "Apr 5, 2025",
    maturityDate: "Apr 5, 2030",
    payingYears: "5 years",
    insuranceStatus: "Not yet terminated",
    branch: "Zamboanga East",
    serviceOnly: "No",
    agent: "Mark Kevin Lee",
    remarks:
      "Memorial service only reinstatement request is currently under review.",
  },
  {
    lpaNo: "L23103241H",
    status: "Active",
    insured: "Mira L. Santos",
    plan: "St. Anne",
    planClass: "Premium Account",
    contractPrice: "PHP 72,000",
    installmentAmount: "PHP 12,000",
    effectivityDate: "Feb 12, 2024",
    maturityDate: "Feb 12, 2029",
    payingYears: "5 years",
    insuranceStatus: "In force",
    branch: "Zamboanga East",
    serviceOnly: "No",
    agent: "Claire Mendoza",
    remarks: "Account is current with no pending service requests.",
  },
];

const selectedPlan = plans[0];

const accountStats = [
  {
    label: "Total Plans",
    value: "2",
    detail: "1 active, 1 needs action",
    icon: WalletCards,
  },
  {
    label: "Annual Payable",
    value: "PHP 123K",
    detail: "Across active records",
    icon: Banknote,
  },
  {
    label: "Pending Requests",
    value: "0",
    detail: "No active service queue",
    icon: CheckCircle2,
  },
  {
    label: "Coverage Review",
    value: "Open",
    detail: "Lapsed plan requires review",
    icon: AlertCircle,
  },
];

const profileRows = [
  ["Nationality", planholder.nationality],
  ["Naturalization Date", planholder.naturalizationDate],
  ["Date of Birth", planholder.birthDate],
  ["Place of Birth", planholder.birthPlace],
  ["Age", planholder.age],
  ["Gender", planholder.gender],
  ["Civil Status", planholder.civilStatus],
  ["Height", planholder.height],
  ["Weight", planholder.weight],
] as const;

const contactRows = [
  ["Email", "mira.santos@example.com"],
  ["Mobile No.", "0997 864 3822"],
  ["Landline No.", "N/A"],
] as const;

const employmentRows = [
  ["Employer", "Northfield Services"],
  ["TIN", "N/A"],
  ["SSS/GSIS Number", "N/A"],
  ["Source of Fund", "Salary"],
] as const;

const accountDetailTabs: AccountDetailTab[] = [
  "Profile",
  "Contact",
  "Address",
  "Employment",
  "Requests",
];

const planTabs = [
  { label: "Plan Details", icon: FileText, active: true },
  { label: "Beneficiaries", icon: UsersRound },
  { label: "Statement of Accounts", icon: FileCheck2 },
  { label: "Health Declaration", icon: HeartPulse },
  { label: "Loan", icon: IdCard },
  { label: "Servicing", icon: RefreshCcw },
  { label: "Transfer History", icon: History },
];

export default function AccountsSummaryPage() {
  const [activeAccountTab, setActiveAccountTab] =
    useState<AccountDetailTab>("Profile");

  return (
    <AppShell
      title="Accounts Summary"
      eyebrow={`Home / Planholder / ${planholder.id}`}
    >
      <VStack align="stretch" gap="4" w="100%" maxW="1440px" mx="auto">
        <AccountIdentityBar />

        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="3">
          {accountStats.map((stat) => (
            <MetricCard key={stat.label} {...stat} />
          ))}
        </SimpleGrid>

        <AccountDetailsCard
          activeTab={activeAccountTab}
          onTabChange={setActiveAccountTab}
        />

        <PlanWorkspace />
      </VStack>
    </AppShell>
  );
}

function AccountIdentityBar() {
  return (
    <Box
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      bg="brand.white"
      boxShadow="level1"
      overflow="hidden"
      transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{
        borderColor: "brand.softGreen",
        boxShadow: "level2",
      }}
    >
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap="4"
        px={{ base: "4", md: "5" }}
        py="4"
      >
        <HStack align="center" gap="3" minW="0">
          <Flex
            align="center"
            justify="center"
            w="48px"
            h="48px"
            borderRadius="full"
            bg="brand.primaryGreen"
            color="brand.white"
            fontWeight="700"
            boxShadow="level1"
            flexShrink="0"
          >
            {planholder.initials}
          </Flex>
          <Box minW="0">
            <HStack gap="2" wrap="wrap" mb="1">
              <Badge
                bg="brand.successBg"
                color="brand.primaryGreen"
                borderColor="brand.primaryGreen"
                borderWidth="1px"
                borderRadius="full"
                px="2.5"
              >
                {planholder.status}
              </Badge>
              <Badge
                bg="brand.subtleBg"
                color="brand.neutralText"
                borderColor="brand.neutralBorder"
                borderWidth="1px"
                borderRadius="full"
                px="2.5"
              >
                {planholder.id}
              </Badge>
            </HStack>
            <Text
              as="h2"
              color="brand.neutralText"
              fontSize={{ base: "22px", md: "24px" }}
              lineHeight="1.1"
              fontWeight="700"
            >
              {planholder.name}
            </Text>
            <Text color="text.secondary" fontSize="14px" mt="1">
              Planholder account, contact, employment, requests, and plan
              records.
            </Text>
          </Box>
        </HStack>

        <HStack
          gap="2"
          wrap="wrap"
          w={{ base: "100%", md: "auto" }}
          justify={{ base: "stretch", md: "flex-end" }}
        >
          <Button
            flex={{ base: "1", sm: "unset" }}
            minW={{ base: "0", sm: "92px" }}
            size="sm"
            bg="brand.primaryGreen"
            color="brand.white"
            _hover={{ bg: "brand.darkGreen" }}
            transition="background-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
            _active={{ transform: "translateY(1px)" }}
          >
            <RefreshCcw size={15} />
            Review
          </Button>
          <Button
            flex={{ base: "1", sm: "unset" }}
            minW={{ base: "0", sm: "92px" }}
            size="sm"
            variant="outline"
            borderColor="brand.softGreen"
            color="brand.darkGreen"
            transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
            _hover={{ bg: "brand.successBg", borderColor: "brand.primaryGreen" }}
            _active={{ transform: "translateY(1px)" }}
          >
            <FileText size={15} />
            Export
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ElementType;
}) {
  return (
    <Box
      bg="brand.white"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      p={{ base: "3", md: "3.5" }}
      boxShadow="level1"
      transition="transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{
        transform: "translateY(-2px)",
        borderColor: "brand.softGreen",
        boxShadow: "level2",
      }}
    >
      <Flex align="flex-start" justify="space-between" gap="3">
        <Box minW="0">
          <Text color="text.secondary" fontSize="12px" fontWeight="600">
            {label}
          </Text>
          <Text
            color="brand.neutralText"
            fontSize={{ base: "22px", md: "24px" }}
            fontWeight="700"
            lineHeight="1.05"
            mt="1"
          >
            {value}
          </Text>
        </Box>
        <Flex
          align="center"
          justify="center"
          w="34px"
          h="34px"
          borderRadius="md"
          bg="brand.successBg"
          color="brand.primaryGreen"
          flexShrink="0"
        >
          <Icon size={17} />
        </Flex>
      </Flex>
      <Text color="text.muted" fontSize="12px" mt="2">
        {detail}
      </Text>
    </Box>
  );
}

function AccountDetailsCard({
  activeTab,
  onTabChange,
}: {
  activeTab: AccountDetailTab;
  onTabChange: (tab: AccountDetailTab) => void;
}) {
  return (
    <Box
      bg="brand.white"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      boxShadow="level1"
      overflow="hidden"
      transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{ borderColor: "brand.softGreen", boxShadow: "level2" }}
    >
      <Flex
        align={{ base: "flex-start", lg: "center" }}
        justify="space-between"
        direction={{ base: "column", lg: "row" }}
        gap="3"
        px={{ base: "4", md: "5" }}
        py="4"
        borderBottom="1px solid"
        borderColor="brand.neutralBorder"
      >
        <HStack gap="3">
          <Flex
            align="center"
            justify="center"
            w="34px"
            h="34px"
            borderRadius="md"
            bg="brand.successBg"
            color="brand.primaryGreen"
          >
            <UserRound size={18} />
          </Flex>
          <Box>
            <Text
              as="h3"
              color="brand.neutralText"
              fontSize="16px"
              fontWeight="700"
            >
              Account Details
            </Text>
            <Text color="text.muted" fontSize="12px">
              Consolidated planholder information
            </Text>
          </Box>
        </HStack>

        <Box w={{ base: "100%", lg: "auto" }} overflowX="auto">
          <HStack
            as="div"
            role="tablist"
            gap="1"
            minW="max-content"
            bg="brand.subtleBg"
            border="1px solid"
            borderColor="brand.neutralBorder"
            borderRadius="full"
            p="1"
          >
            {accountDetailTabs.map((tab) => (
              <Button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                size="xs"
                borderRadius="full"
                bg={activeTab === tab ? "brand.primaryGreen" : "transparent"}
                color={activeTab === tab ? "brand.white" : "text.secondary"}
                _hover={{
                  bg: activeTab === tab ? "brand.darkGreen" : "brand.mutedBg",
                }}
                transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                _active={{ transform: "scale(0.98)" }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "brand.primaryGreen",
                  outlineOffset: "2px",
                }}
                onClick={() => onTabChange(tab)}
              >
                {tab}
              </Button>
            ))}
          </HStack>
        </Box>
      </Flex>

      <Box p={{ base: "4", md: "5" }} role="tabpanel">
        <AccountDetailPanel activeTab={activeTab} />
      </Box>
    </Box>
  );
}

function AccountDetailPanel({ activeTab }: { activeTab: AccountDetailTab }) {
  if (activeTab === "Profile") {
    return (
      <DetailTable rows={profileRows} columns={{ base: 1, md: 2, xl: 3 }} />
    );
  }

  if (activeTab === "Contact") {
    return (
      <DetailTable
        rows={contactRows}
        columns={{ base: 1, md: 3 }}
        icon={<Mail size={15} />}
      />
    );
  }

  if (activeTab === "Employment") {
    return (
      <DetailTable
        rows={employmentRows}
        columns={{ base: 1, md: 2, xl: 4 }}
        icon={<BriefcaseBusiness size={15} />}
      />
    );
  }

  if (activeTab === "Requests") {
    return <EmptyState />;
  }

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="3">
      <AddressPanel
        icon={<Home size={18} />}
        title="Home Address"
        tag="Mail / Collect At"
        lines={[
          "Luyahan Barangay Pasonanca",
          "Zamboanga City, Zamboanga del Sur, 7000",
        ]}
      />
      <AddressPanel
        icon={<Building2 size={18} />}
        title="Office Address"
        tag="Not provided"
        empty
      />
    </Grid>
  );
}

function DetailTable({
  rows,
  columns,
  icon,
}: {
  rows: readonly (readonly [string, string])[];
  columns: Record<string, number>;
  icon?: React.ReactNode;
}) {
  return (
    <SimpleGrid
      as="dl"
      columns={columns}
      gap="0"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      overflow="hidden"
    >
      {rows.map(([label, value], index) => (
        <Box
          key={label}
          bg={index % 2 === 0 ? "brand.subtleBg" : "brand.white"}
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="brand.neutralBorder"
          borderRightWidth={{ base: "0", md: "1px" }}
          borderRightStyle="solid"
          borderRightColor="brand.neutralBorder"
          p="3"
          minH="64px"
          transition="background-color var(--motion-fast) var(--motion-ease-out)"
          _hover={{ bg: "brand.successBg" }}
        >
          <HStack gap="2" color="text.muted">
            {icon ? <Box color="brand.primaryGreen">{icon}</Box> : null}
            <Text as="dt" fontSize="12px" fontWeight="600">
              {label}
            </Text>
          </HStack>
          <Text
            as="dd"
            color="brand.neutralText"
            fontSize="14px"
            fontWeight="600"
            mt="1"
          >
            {value}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

function AddressPanel({
  icon,
  title,
  tag,
  lines,
  empty = false,
}: {
  icon: React.ReactNode;
  title: string;
  tag: string;
  lines?: string[];
  empty?: boolean;
}) {
  return (
    <Flex
      align="flex-start"
      gap="3"
      minH="104px"
      p="4"
      border="1px solid"
      borderColor={empty ? "brand.neutralBorder" : "brand.softGreen"}
      borderStyle={empty ? "dashed" : "solid"}
      borderRadius="lg"
      bg={empty ? "brand.subtleBg" : "brand.successBg"}
      color={empty ? "text.muted" : "brand.neutralText"}
      transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{
        borderColor: empty ? "brand.softGreen" : "brand.primaryGreen",
      }}
    >
      <Flex
        align="center"
        justify="center"
        w="38px"
        h="38px"
        borderRadius="md"
        bg="brand.white"
        color="brand.primaryGreen"
        flexShrink="0"
      >
        {icon}
      </Flex>
      <Box minW="0">
        <HStack gap="2" wrap="wrap">
          <Text color="brand.darkGreen" fontSize="14px" fontWeight="600">
            {title}
          </Text>
          <Badge
            bg="brand.white"
            color={empty ? "text.muted" : "brand.primaryGreen"}
            borderRadius="full"
            px="2"
          >
            {tag}
          </Badge>
        </HStack>
        {lines?.map((line) => (
          <Text
            key={line}
            color="text.secondary"
            fontSize="14px"
            fontWeight="400"
            mt="1"
          >
            {line}
          </Text>
        ))}
      </Box>
    </Flex>
  );
}

function EmptyState() {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minH="128px"
      textAlign="center"
      bg="brand.subtleBg"
      borderRadius="lg"
      border="1px dashed"
      borderColor="brand.neutralBorder"
      p="5"
      animation="osp-fade-in var(--motion-standard) var(--motion-ease-out)"
    >
      <Flex
        align="center"
        justify="center"
        w="38px"
        h="38px"
        borderRadius="full"
        bg="brand.successBg"
        color="brand.primaryGreen"
        mb="3"
      >
        <BadgeCheck size={20} />
      </Flex>
      <Text color="brand.neutralText" fontSize="14px" fontWeight="600">
        No pending requests
      </Text>
      <Text color="text.muted" fontSize="14px" maxW="280px" mt="1">
        This account has no active service requests or approval items right now.
      </Text>
    </Flex>
  );
}

function PlanWorkspace() {
  return (
    <Box
      bg="brand.white"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      boxShadow="level1"
      overflow="hidden"
      transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{ borderColor: "brand.softGreen", boxShadow: "level2" }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap="3"
        px={{ base: "4", md: "5" }}
        py="4"
        borderBottom="1px solid"
        borderColor="brand.neutralBorder"
      >
        <HStack gap="3">
          <Flex
            align="center"
            justify="center"
            w="34px"
            h="34px"
            borderRadius="md"
            bg="brand.successBg"
            color="brand.primaryGreen"
          >
            <WalletCards size={18} />
          </Flex>
          <Text
            as="h3"
            color="brand.neutralText"
            fontSize="16px"
            fontWeight="700"
          >
            Plan Portfolio
          </Text>
        </HStack>
        <Badge
          bg="brand.successBg"
          color="brand.primaryGreen"
          borderRadius="full"
          px="3"
          py="1"
        >
          {plans.length} records
        </Badge>
      </Flex>

      <Box p={{ base: "4", md: "5" }}>
        <Grid
          templateColumns={{
            base: "1fr",
            xl: "minmax(520px, 0.95fr) minmax(0, 1.4fr)",
          }}
          gap="4"
          alignItems="start"
        >
          <Box>
            <Flex
              align={{ base: "stretch", md: "center" }}
              justify="space-between"
              direction={{ base: "column", md: "row" }}
              gap="3"
              mb="3"
            >
              <Box>
                <Text
                  color="brand.neutralText"
                  fontSize="14px"
                  fontWeight="700"
                >
                  Plans
                </Text>
                <Text color="text.muted" fontSize="12px">
                  Compare records and select a plan to review.
                </Text>
              </Box>
              <PlanSearchInput
                display={{ base: "none", md: "block" }}
                width="260px"
              />
            </Flex>

            <Box display={{ base: "block", md: "none" }} mb="3">
              <PlanSearchInput />
            </Box>

            <Box display={{ base: "none", md: "block" }}>
              <PlanListTable />
            </Box>

            <VStack
              display={{ base: "flex", md: "none" }}
              align="stretch"
              gap="2"
            >
              {plans.map((plan) => (
                <PlanListItem
                  key={plan.lpaNo}
                  plan={plan}
                  active={plan.lpaNo === selectedPlan.lpaNo}
                />
              ))}
            </VStack>
          </Box>

          <SelectedPlan plan={selectedPlan} />
        </Grid>
      </Box>
    </Box>
  );
}

function PlanSearchInput({
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
        aria-label="Search by LPA number"
        h="40px"
        pl="10"
        bg="brand.subtleBg"
        placeholder="Search LPA No."
        borderColor="brand.neutralBorder"
        color="brand.neutralText"
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

function PlanListTable() {
  return (
    <Box
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      overflow="hidden"
    >
      <Grid
        templateColumns="1.15fr 0.95fr 0.7fr 0.9fr 0.85fr"
        gap="0"
        bg="brand.subtleBg"
        borderBottom="1px solid"
        borderColor="brand.neutralBorder"
      >
        {["LPA No.", "Plan", "Status", "Insurance", "Branch"].map((header) => (
          <Text
            key={header}
            color="text.muted"
            fontSize="12px"
            fontWeight="600"
            px="3"
            py="2.5"
          >
            {header}
          </Text>
        ))}
      </Grid>

      {plans.map((plan) => {
        const active = plan.lpaNo === selectedPlan.lpaNo;

        return (
          <Grid
            key={plan.lpaNo}
            as="button"
            templateColumns="1.15fr 0.95fr 0.7fr 0.9fr 0.85fr"
            gap="0"
            w="100%"
            textAlign="left"
            bg={active ? "brand.successBg" : "brand.white"}
            borderBottom="1px solid"
            borderColor="brand.neutralBorder"
            cursor="pointer"
            _last={{ borderBottom: "0" }}
            transition="background-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
            _hover={{ bg: "brand.successBg", transform: "translateX(2px)" }}
            _active={{ transform: "translateX(1px)" }}
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "brand.primaryGreen",
              outlineOffset: "-2px",
            }}
          >
            <Box px="3" py="3">
              <Text color="brand.neutralText" fontSize="14px" fontWeight="600">
                {plan.lpaNo}
              </Text>
              <Text color="text.muted" fontSize="12px">
                {plan.insured}
              </Text>
            </Box>
            <Box px="3" py="3">
              <Text color="brand.neutralText" fontSize="14px" fontWeight="600">
                {plan.plan}
              </Text>
              <Text color="text.muted" fontSize="12px">
                {plan.planClass}
              </Text>
            </Box>
            <Flex align="center" px="3" py="3">
              <PlanBadge status={plan.status} />
            </Flex>
            <Flex align="center" px="3" py="3">
              <Text color="brand.darkGreen" fontSize="12px" fontWeight="600">
                {plan.insuranceStatus}
              </Text>
            </Flex>
            <Flex align="center" px="3" py="3">
              <Text color="text.secondary" fontSize="12px" fontWeight="500">
                {plan.branch}
              </Text>
            </Flex>
          </Grid>
        );
      })}
    </Box>
  );
}

function PlanListItem({
  plan,
  active,
}: {
  plan: PlanRecord;
  active?: boolean;
}) {
  return (
    <Button
      type="button"
      justifyContent="flex-start"
      textAlign="left"
      w="100%"
      h="auto"
      p="0"
      border="1px solid"
      borderColor={active ? "brand.primaryGreen" : "brand.neutralBorder"}
      borderRadius="lg"
      bg={active ? "brand.successBg" : "brand.white"}
      overflow="hidden"
      whiteSpace="normal"
      boxShadow={active ? "level1" : "none"}
      transition="transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), background-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{
        borderColor: "brand.primaryGreen",
        bg: "brand.successBg",
        boxShadow: "level1",
        transform: "translateY(-1px)",
      }}
      _active={{ transform: "translateY(0)" }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "brand.primaryGreen",
        outlineOffset: "2px",
      }}
    >
      <Flex align="stretch" w="100%">
        <Box
          w="4px"
          bg={active ? "brand.primaryGreen" : "brand.neutralBorder"}
          flexShrink="0"
        />
        <Box p="3" flex="1" minW="0">
          <Flex align="flex-start" justify="space-between" gap="3">
            <HStack align="flex-start" gap="3" minW="0">
              <Flex
                align="center"
                justify="center"
                w="32px"
                h="32px"
                borderRadius="md"
                bg="brand.white"
                color="brand.primaryGreen"
                flexShrink="0"
              >
                <FileText size={17} />
              </Flex>
              <Box minW="0">
                <Text
                  color="brand.neutralText"
                  fontSize="14px"
                  fontWeight="600"
                >
                  {plan.lpaNo}
                </Text>
                <Text color="text.secondary" fontSize="12px" mt="0.5">
                  {plan.plan} / {plan.planClass}
                </Text>
              </Box>
            </HStack>
            <PlanBadge status={plan.status} />
          </Flex>
          <HStack gap="2" wrap="wrap" mt="2">
            <Badge
              bg="brand.white"
              color="brand.darkGreen"
              borderColor="brand.neutralBorder"
              borderWidth="1px"
              borderRadius="full"
            >
              {plan.insuranceStatus}
            </Badge>
            <Badge
              bg="brand.white"
              color="text.secondary"
              borderColor="brand.neutralBorder"
              borderWidth="1px"
              borderRadius="full"
            >
              {plan.branch}
            </Badge>
          </HStack>
        </Box>
      </Flex>
    </Button>
  );
}

function SelectedPlan({ plan }: { plan: PlanRecord }) {
  return (
    <Box
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      overflow="hidden"
      bg="brand.white"
      transition="box-shadow var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{ borderColor: "brand.softGreen", boxShadow: "level1" }}
    >
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "minmax(220px, 0.85fr) minmax(260px, 1fr) auto",
        }}
        alignItems={{ base: "stretch", lg: "center" }}
        gap={{ base: "3", lg: "4" }}
        p="4"
        bg="linear-gradient(135deg, rgba(240,253,244,0.84), rgba(255,255,255,1))"
      >
        <HStack align="center" gap="3" minW="0">
          <Flex
            align="center"
            justify="center"
            w="40px"
            h="40px"
            borderRadius="md"
            bg="brand.primaryGreen"
            color="brand.white"
            flexShrink="0"
          >
            <FileText size={19} />
          </Flex>
          <Box minW="0">
            <Text
              color="text.muted"
              fontSize="12px"
              fontWeight="600"
              textTransform="uppercase"
            >
              Selected Plan
            </Text>
            <Text
              color="brand.neutralText"
              fontSize={{ base: "20px", md: "22px" }}
              fontWeight="700"
              lineHeight="1.1"
              truncate
            >
              {plan.lpaNo}
            </Text>
          </Box>
        </HStack>

        <HStack
          gap="2"
          w={{ base: "100%", lg: "auto" }}
          justify={{ base: "stretch", lg: "flex-end" }}
        >
          <Button
            flex={{ base: "1", sm: "unset" }}
            minW={{ base: "0", sm: "112px" }}
            size="sm"
            bg="brand.primaryGreen"
            color="brand.white"
            _hover={{ bg: "brand.darkGreen" }}
            transition="background-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
            _active={{ transform: "translateY(1px)" }}
          >
            <RefreshCcw size={15} />
            Reinstate
          </Button>
          <Button
            flex={{ base: "1", sm: "unset" }}
            minW={{ base: "0", sm: "92px" }}
            size="sm"
            variant="outline"
            borderColor="brand.destructiveRed"
            color="brand.destructiveRed"
            bg="brand.white"
            _hover={{ bg: "brand.errorBg" }}
            transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
            _active={{ transform: "translateY(1px)" }}
          >
            <Trash2 size={15} />
            Delete
          </Button>
        </HStack>
      </Grid>

      <Separator borderColor="brand.neutralBorder" />

      <Box px="4" py="3" overflowX="auto">
        <HStack gap="2" minW={{ base: "760px", xl: "auto" }}>
          {planTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <Button
                key={tab.label}
                size="xs"
                variant={tab.active ? "solid" : "ghost"}
                bg={tab.active ? "brand.primaryGreen" : "brand.subtleBg"}
                color={tab.active ? "brand.white" : "text.secondary"}
                borderRadius="full"
                _hover={{
                  bg: tab.active ? "brand.darkGreen" : "brand.mutedBg",
                }}
                transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                _active={{ transform: "scale(0.98)" }}
              >
                <Icon size={13} />
                {tab.label}
              </Button>
            );
          })}
        </HStack>
      </Box>

      <Separator borderColor="brand.neutralBorder" />

      <Box p="4">
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="2.5">
          <InfoTile label="Planholder" value={plan.insured} />
          <InfoTile label="Account Status" value={plan.status} />
          <InfoTile label="Insurance Status" value={plan.insuranceStatus} />
          <InfoTile label="Plan" value={plan.plan} />
          <InfoTile label="Mode" value="Annual" />
          <InfoTile label="Term" value={plan.payingYears} />
          <InfoTile label="Plan Class" value={plan.planClass} />
          <InfoTile label="Account Class" value={plan.planClass} />
          <InfoTile label="Plan Code" value="LISA10" />
          <InfoTile label="Contract Price" value={plan.contractPrice} />
          <InfoTile label="Installment Amount" value={plan.installmentAmount} />
          <InfoTile label="Total Annual Payable" value={plan.contractPrice} />
          <InfoTile
            label="Effectivity Date"
            value={plan.effectivityDate}
            icon={<CalendarDays size={15} />}
          />
          <InfoTile
            label="Maturity Date"
            value={plan.maturityDate}
            icon={<Clock3 size={15} />}
          />
          <InfoTile
            label="Branch"
            value={plan.branch}
            icon={<MapPin size={15} />}
          />
          <InfoTile
            label="Sales Agent"
            value={plan.agent}
            icon={<UserRound size={15} />}
          />
          <InfoTile label="Service Only" value={plan.serviceOnly} />
        </SimpleGrid>

        <Box mt="4">
          <Text color="text.muted" fontSize="12px" fontWeight="600" mb="2">
            Remarks
          </Text>
          <Textarea
            readOnly
            value={plan.remarks}
            minH="76px"
            bg="brand.subtleBg"
            borderColor="brand.neutralBorder"
            color="brand.neutralText"
            resize="vertical"
          />
        </Box>
      </Box>
    </Box>
  );
}

function InfoTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <Box
      bg="brand.subtleBg"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="md"
      p="3"
      transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out)"
      _hover={{
        bg: "brand.white",
        borderColor: "brand.softGreen",
      }}
    >
      <HStack gap="2" color="text.muted">
        {icon ? <Box color="brand.primaryGreen">{icon}</Box> : null}
        <Text fontSize="12px" fontWeight="600">
          {label}
        </Text>
      </HStack>
      <Text color="brand.neutralText" fontSize="14px" fontWeight="600" mt="1">
        {value}
      </Text>
    </Box>
  );
}

function PlanBadge({ status }: { status: PlanStatus }) {
  const styles = {
    Active: DISPLAY_STATUS_STYLES.approved,
    Lapsed: DISPLAY_STATUS_STYLES.pending,
    Pending: DISPLAY_STATUS_STYLES.fallback,
  }[status];

  return (
    <Badge
      bg={styles.bg}
      color={styles.color}
      borderColor={styles.borderColor}
      borderWidth={styles.borderWidth}
      borderRadius="full"
      px="2.5"
      py="0.5"
      fontWeight={styles.fontWeight}
    >
      {status}
    </Badge>
  );
}
