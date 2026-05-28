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
  CheckCircle2,
  FileCheck2,
  FileText,
  HeartPulse,
  History,
  Home,
  IdCard,
  Mail,
  RefreshCcw,
  Search,
  Trash2,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ElementType } from "react";
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

type SummaryMetric = {
  label: string;
  value: string;
  detail: string;
  icon: ElementType;
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

const initialSelectedPlan = plans[0];

const accountStats: SummaryMetric[] = [
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
  { label: "Plan Details", icon: FileText },
  { label: "Beneficiaries", icon: UsersRound },
  { label: "Statement of Accounts", icon: FileCheck2 },
  { label: "Health Declaration", icon: HeartPulse },
  { label: "Loan", icon: IdCard },
  { label: "Servicing", icon: RefreshCcw },
  { label: "Transfer History", icon: History },
] as const;

type PlanTabLabel = (typeof planTabs)[number]["label"];

export default function AccountsSummaryPage() {
  const [activeAccountTab, setActiveAccountTab] =
    useState<AccountDetailTab>("Profile");
  const [selectedPlanNo, setSelectedPlanNo] = useState(
    initialSelectedPlan.lpaNo,
  );
  const selectedPlan =
    plans.find((plan) => plan.lpaNo === selectedPlanNo) ?? initialSelectedPlan;

  return (
    <AppShell
      title="Accounts Summary"
      eyebrow={`Home / Planholder / ${planholder.id}`}
    >
      <VStack
        align="stretch"
        gap={{ base: "4", lg: "5" }}
        w="100%"
        maxW="1440px"
        mx="auto"
      >
        <AccountOverview selectedPlan={selectedPlan} />

        <Grid
          templateColumns={{
            base: "1fr",
            xl: "minmax(0, 0.92fr) minmax(540px, 1.08fr)",
          }}
          alignItems="start"
          gap={{ base: "4", lg: "5" }}
        >
          <VStack align="stretch" gap={{ base: "4", lg: "5" }} minW="0">
            <AccountDetailsPanel
              activeTab={activeAccountTab}
              onTabChange={setActiveAccountTab}
            />
            <PlanPortfolio
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlanNo}
            />
          </VStack>

          <SelectedPlan key={selectedPlan.lpaNo} plan={selectedPlan} />
        </Grid>
      </VStack>
    </AppShell>
  );
}

function AccountOverview({ selectedPlan }: { selectedPlan: PlanRecord }) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "minmax(360px, 0.78fr) minmax(0, 1.22fr)",
      }}
      gap={{ base: "3", lg: "4" }}
      alignItems="stretch"
    >
      <Box
        bg="brand.white"
        border="1px solid"
        borderColor="brand.neutralBorder"
        borderRadius="lg"
        boxShadow="level1"
        overflow="hidden"
      >
        <Flex
          align={{ base: "flex-start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          gap="4"
          p={{ base: "4", md: "5" }}
          minH="100%"
        >
          <Flex
            align="center"
            justify="center"
            w="56px"
            h="56px"
            borderRadius="full"
            bg="brand.successBg"
            color="brand.accentText"
            border="1px solid"
            borderColor="brand.softGreen"
            flexShrink="0"
          >
            <UserRound size={26} />
          </Flex>

          <Box flex="1" minW="0">
            <HStack gap="2" wrap="wrap" mb="1.5">
              <Badge
                bg="brand.successBg"
                color="brand.accentText"
                borderColor="brand.primaryGreen"
                borderWidth="1px"
                borderRadius="sm"
                px="2.5"
              >
                {planholder.status}
              </Badge>
              <Badge
                bg="brand.subtleBg"
                color="brand.neutralText"
                borderColor="brand.neutralBorder"
                borderWidth="1px"
                borderRadius="sm"
                px="2.5"
              >
                {planholder.id}
              </Badge>
            </HStack>

            <Text
              as="h2"
              color="brand.neutralText"
              fontSize={{ base: "24px", md: "26px" }}
              fontWeight="700"
              lineHeight="1.12"
            >
              {planholder.name}
            </Text>
            <Text color="text.secondary" fontSize="14px" mt="1">
              Planholder account, requests, and plan records.
            </Text>

            <HStack gap="2" wrap="wrap" mt="4" w={{ base: "100%", sm: "auto" }}>
              <Button
                flex={{ base: "1", sm: "unset" }}
                minW={{ base: "0", sm: "124px" }}
                size="sm"
                bg="brand.primaryGreen"
                color="text.inverse"
                _hover={{ bg: "brand.darkGreen" }}
                _active={{ transform: "translateY(1px)" }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "brand.primaryGreen",
                  outlineOffset: "2px",
                }}
                transition="background-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                onClick={() =>
                  document
                    .getElementById("selected-plan-panel")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                <RefreshCcw size={15} />
                Review{" "}
                {selectedPlan.status === "Lapsed" ? "Lapsed" : "Selected"} Plan
              </Button>
              <Button
                flex={{ base: "1", sm: "unset" }}
                minW={{ base: "0", sm: "112px" }}
                size="sm"
                variant="outline"
                borderColor="brand.softGreen"
                color="brand.accentText"
                bg="brand.white"
                _hover={{
                  bg: "brand.successBg",
                  borderColor: "brand.primaryGreen",
                }}
                _active={{ transform: "translateY(1px)" }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "brand.primaryGreen",
                  outlineOffset: "2px",
                }}
                transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                onClick={() => window.print()}
              >
                <FileText size={15} />
                Export Summary
              </Button>
            </HStack>
          </Box>
        </Flex>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap="0"
        bg="brand.white"
        border="1px solid"
        borderColor="brand.neutralBorder"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="level1"
      >
        {accountStats.map((stat, index) => (
          <MetricTile key={stat.label} stat={stat} index={index} />
        ))}
      </SimpleGrid>
    </Grid>
  );
}

function MetricTile({ stat, index }: { stat: SummaryMetric; index: number }) {
  const Icon = stat.icon;

  return (
    <Flex
      align="center"
      gap="4"
      px={{ base: "4", md: "5" }}
      py={{ base: "4", md: "5" }}
      minH="108px"
      bg={{
        base: index % 2 === 0 ? "brand.subtleBg" : "brand.white",
        md: index === 0 || index === 3 ? "brand.white" : "brand.subtleBg",
      }}
      borderColor="brand.neutralBorder"
    >
      <Flex
        align="center"
        justify="center"
        w="44px"
        h="44px"
        borderRadius="full"
        bg="brand.successBg"
        color="brand.accentText"
        border="1px solid"
        borderColor="brand.softGreen"
        flexShrink="0"
      >
        <Icon size={19} />
      </Flex>

      <Box minW="0" flex="1">
        <Text
          color="text.muted"
          fontSize="13px"
          fontWeight="700"
          lineHeight="1.25"
        >
          {stat.label}
        </Text>

        <Text
          color="brand.neutralText"
          fontSize={{ base: "24px", md: "26px" }}
          fontWeight="800"
          lineHeight="1.1"
          mt="1"
          whiteSpace="nowrap"
        >
          {stat.value}
        </Text>

        <Text color="text.secondary" fontSize="13px" lineHeight="1.45" mt="1">
          {stat.detail}
        </Text>
      </Box>
    </Flex>
  );
}
function AccountDetailsPanel({
  activeTab,
  onTabChange,
}: {
  activeTab: AccountDetailTab;
  onTabChange: (tab: AccountDetailTab) => void;
}) {
  return (
    <SectionPanel
      icon={UserRound}
      title="Account Details"
      description="Consolidated planholder information"
      action={
        <ScrollableTabs label="Account detail sections">
          {accountDetailTabs.map((tab) => (
            <Button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              size="xs"
              borderRadius="sm"
              bg={activeTab === tab ? "brand.primaryGreen" : "transparent"}
              color={activeTab === tab ? "text.inverse" : "text.secondary"}
              _hover={{
                bg: activeTab === tab ? "brand.darkGreen" : "brand.mutedBg",
              }}
              _active={{ transform: "translateY(1px)" }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "brand.primaryGreen",
                outlineOffset: "2px",
              }}
              transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </Button>
          ))}
        </ScrollableTabs>
      }
    >
      <Box role="tabpanel">
        <AccountDetailPanel activeTab={activeTab} />
      </Box>
    </SectionPanel>
  );
}

function AccountDetailPanel({ activeTab }: { activeTab: AccountDetailTab }) {
  if (activeTab === "Profile") {
    return (
      <DetailTable rows={profileRows} columns={{ base: 1, md: 2, "2xl": 3 }} />
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
        columns={{ base: 1, md: 2, "2xl": 4 }}
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
      borderRadius="md"
      overflow="hidden"
      bg="brand.white"
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
            {icon ? <Box color="brand.accentText">{icon}</Box> : null}
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
      minH="112px"
      p="4"
      border="1px solid"
      borderColor={empty ? "brand.neutralBorder" : "brand.softGreen"}
      borderStyle={empty ? "dashed" : "solid"}
      borderRadius="md"
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
        color="brand.accentText"
        flexShrink="0"
      >
        {icon}
      </Flex>
      <Box minW="0">
        <HStack gap="2" wrap="wrap">
          <Text color="brand.accentText" fontSize="14px" fontWeight="700">
            {title}
          </Text>
          <Badge
            bg="brand.white"
            color={empty ? "text.muted" : "brand.accentText"}
            borderRadius="sm"
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
      minH="140px"
      textAlign="center"
      bg="brand.subtleBg"
      borderRadius="md"
      border="1px dashed"
      borderColor="brand.neutralBorder"
      p="5"
      animation="osp-fade-in var(--motion-standard) var(--motion-ease-out)"
    >
      <Flex
        align="center"
        justify="center"
        w="40px"
        h="40px"
        borderRadius="full"
        bg="brand.successBg"
        color="brand.accentText"
        mb="3"
      >
        <BadgeCheck size={20} />
      </Flex>
      <Text color="brand.neutralText" fontSize="14px" fontWeight="700">
        No pending requests
      </Text>
      <Text color="text.muted" fontSize="14px" maxW="280px" mt="1">
        This account has no active service requests or approval items right now.
      </Text>
    </Flex>
  );
}

function PlanPortfolio({
  selectedPlan,
  onSelectPlan,
}: {
  selectedPlan: PlanRecord;
  onSelectPlan: (lpaNo: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visiblePlans = useMemo(
    () =>
      plans.filter((plan) =>
        [
          plan.lpaNo,
          plan.insured,
          plan.plan,
          plan.planClass,
          plan.status,
          plan.branch,
          plan.agent,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  return (
    <SectionPanel
      icon={WalletCards}
      title="Plan Portfolio"
      description="Compare records and select a plan to review"
      action={
        <Badge
          bg="brand.successBg"
          color="brand.accentText"
          borderColor="brand.softGreen"
          borderWidth="1px"
          borderRadius="sm"
          px="3"
          py="1"
        >
          {plans.length} records
        </Badge>
      }
    >
      <Flex
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap="3"
        mb="3"
      >
        <Box>
          <Text color="brand.neutralText" fontSize="14px" fontWeight="700">
            Plans
          </Text>
          <Text color="text.muted" fontSize="12px">
            Search by LPA number, name, plan, branch, or agent.
          </Text>
        </Box>
        <PlanSearchInput
          width={{ base: "100%", md: "290px" }}
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </Flex>

      <Box display={{ base: "none", md: "block" }}>
        <PlanListTable
          plans={visiblePlans}
          selectedPlanNo={selectedPlan.lpaNo}
          searchQuery={searchQuery}
          onSelectPlan={onSelectPlan}
          onClearSearch={() => setSearchQuery("")}
        />
      </Box>

      <VStack display={{ base: "flex", md: "none" }} align="stretch" gap="2">
        {visiblePlans.length > 0 ? (
          visiblePlans.map((plan) => (
            <PlanListItem
              key={plan.lpaNo}
              plan={plan}
              active={plan.lpaNo === selectedPlan.lpaNo}
              onSelect={() => onSelectPlan(plan.lpaNo)}
            />
          ))
        ) : (
          <PlanSearchEmptyState
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
          />
        )}
      </VStack>
    </SectionPanel>
  );
}

function PlanSearchInput({
  width = "100%",
  value,
  onChange,
}: {
  width?: Record<string, string> | string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Box position="relative" w={width}>
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        h="40px"
        pl="10"
        bg="brand.subtleBg"
        placeholder="Search LPA, name, plan, branch..."
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

function PlanListTable({
  plans,
  selectedPlanNo,
  searchQuery,
  onSelectPlan,
  onClearSearch,
}: {
  plans: PlanRecord[];
  selectedPlanNo: string;
  searchQuery: string;
  onSelectPlan: (lpaNo: string) => void;
  onClearSearch: () => void;
}) {
  return (
    <Box
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="md"
      overflow="hidden"
    >
      <Grid
        templateColumns="1.1fr 0.95fr 0.7fr 0.95fr 0.85fr"
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
            fontWeight="700"
            px="3"
            py="2.5"
          >
            {header}
          </Text>
        ))}
      </Grid>

      {plans.length > 0 ? (
        plans.map((plan) => {
          const active = plan.lpaNo === selectedPlanNo;

          return (
            <Grid
              key={plan.lpaNo}
              as="button"
              aria-pressed={active}
              aria-label={`Review plan ${plan.lpaNo}`}
              templateColumns="1.1fr 0.95fr 0.7fr 0.95fr 0.85fr"
              gap="0"
              w="100%"
              position="relative"
              textAlign="left"
              bg={active ? "brand.successBg" : "brand.white"}
              borderBottom="1px solid"
              borderColor="brand.neutralBorder"
              cursor="pointer"
              _before={{
                content: '""',
                position: "absolute",
                left: "0",
                top: "0",
                bottom: "0",
                width: active ? "4px" : "0",
                bg: "brand.primaryGreen",
                transition: "width var(--motion-fast) var(--motion-ease-out)",
              }}
              _last={{ borderBottom: "0" }}
              transition="background-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
              _hover={{ bg: "brand.successBg", transform: "translateX(2px)" }}
              _active={{ transform: "translateX(1px)" }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "brand.primaryGreen",
                outlineOffset: "-2px",
              }}
              onClick={() => onSelectPlan(plan.lpaNo)}
            >
              <Box px="3" py="3" pl={active ? "4" : "3"}>
                <Text
                  color="brand.neutralText"
                  fontSize="14px"
                  fontWeight="700"
                >
                  {plan.lpaNo}
                </Text>
                <Text color="text.muted" fontSize="12px">
                  {plan.insured}
                </Text>
              </Box>
              <Box px="3" py="3">
                <Text
                  color="brand.neutralText"
                  fontSize="14px"
                  fontWeight="600"
                >
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
                <Text color="brand.accentText" fontSize="12px" fontWeight="700">
                  {plan.insuranceStatus}
                </Text>
              </Flex>
              <Flex align="center" px="3" py="3">
                <Text color="text.secondary" fontSize="12px" fontWeight="600">
                  {plan.branch}
                </Text>
              </Flex>
            </Grid>
          );
        })
      ) : (
        <PlanSearchEmptyState
          searchQuery={searchQuery}
          onClearSearch={onClearSearch}
        />
      )}
    </Box>
  );
}

function PlanSearchEmptyState({
  searchQuery,
  onClearSearch,
}: {
  searchQuery: string;
  onClearSearch: () => void;
}) {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minH="164px"
      p="5"
      bg="brand.subtleBg"
      textAlign="center"
    >
      <Flex
        align="center"
        justify="center"
        w="38px"
        h="38px"
        borderRadius="full"
        bg="brand.white"
        color="brand.accentText"
        border="1px solid"
        borderColor="brand.neutralBorder"
        mb="3"
      >
        <Search size={18} />
      </Flex>
      <Text color="brand.neutralText" fontSize="14px" fontWeight="700">
        No plans match &quot;{searchQuery.trim()}&quot;
      </Text>
      <Text color="text.muted" fontSize="13px" maxW="300px" mt="1">
        Try a different LPA number, plan name, branch, or planholder name.
      </Text>
      <Button
        type="button"
        size="sm"
        variant="outline"
        borderColor="brand.softGreen"
        color="brand.accentText"
        bg="brand.white"
        mt="4"
        onClick={onClearSearch}
        _hover={{ bg: "brand.successBg", borderColor: "brand.primaryGreen" }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "brand.primaryGreen",
          outlineOffset: "2px",
        }}
      >
        Clear Search
      </Button>
    </Flex>
  );
}

function PlanListItem({
  plan,
  active,
  onSelect,
}: {
  plan: PlanRecord;
  active?: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      type="button"
      aria-pressed={active}
      aria-label={`Review plan ${plan.lpaNo}`}
      justifyContent="flex-start"
      textAlign="left"
      w="100%"
      h="auto"
      p="0"
      border="1px solid"
      borderColor={active ? "brand.primaryGreen" : "brand.neutralBorder"}
      borderRadius="md"
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
      onClick={onSelect}
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
                color="brand.accentText"
                flexShrink="0"
              >
                <FileText size={17} />
              </Flex>
              <Box minW="0">
                <Text
                  color="brand.neutralText"
                  fontSize="14px"
                  fontWeight="700"
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
              color="brand.accentText"
              borderColor="brand.neutralBorder"
              borderWidth="1px"
              borderRadius="sm"
            >
              {plan.insuranceStatus}
            </Badge>
            <Badge
              bg="brand.white"
              color="text.secondary"
              borderColor="brand.neutralBorder"
              borderWidth="1px"
              borderRadius="sm"
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
  const [activePlanTab, setActivePlanTab] =
    useState<PlanTabLabel>("Plan Details");
  const [actionNotice, setActionNotice] = useState("");

  return (
    <Box
      id="selected-plan-panel"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      overflow="hidden"
      bg="brand.white"
      boxShadow="level1"
      minW="0"
    >
      <Box
        p={{ base: "4", md: "5" }}
        bg="brand.selectedSurface"
        borderBottom="1px solid"
        borderColor="brand.neutralBorder"
      >
        <Grid
          templateColumns={{ base: "1fr", md: "minmax(0, 1fr) auto" }}
          alignItems={{ base: "stretch", md: "center" }}
          gap="4"
        >
          <HStack align="center" gap="3" minW="0">
            <Flex
              align="center"
              justify="center"
              w="42px"
              h="42px"
              borderRadius="md"
              bg="brand.primaryGreen"
              color="text.inverse"
              flexShrink="0"
            >
              <FileText size={20} />
            </Flex>
            <Box minW="0">
              <HStack gap="2" wrap="wrap" mb="1">
                <Text
                  color="brand.accentText"
                  fontSize="12px"
                  fontWeight="700"
                  textTransform="uppercase"
                >
                  Selected Plan
                </Text>
                <PlanBadge status={plan.status} />
              </HStack>
              <Text
                color="brand.neutralText"
                fontSize={{ base: "24px", md: "26px" }}
                fontWeight="700"
                lineHeight="1.1"
                truncate
              >
                {plan.lpaNo}
              </Text>
              <Text color="text.secondary" fontSize="13px" mt="1">
                {plan.plan} / {plan.planClass} / {plan.branch}
              </Text>
            </Box>
          </HStack>

          <HStack
            gap="2"
            w={{ base: "100%", md: "auto" }}
            justify={{ base: "stretch", md: "flex-end" }}
          >
            <Button
              flex={{ base: "1", sm: "unset" }}
              minW={{ base: "0", sm: "112px" }}
              size="sm"
              bg="brand.primaryGreen"
              color="text.inverse"
              _hover={{ bg: "brand.darkGreen" }}
              transition="background-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
              _active={{ transform: "translateY(1px)" }}
              onClick={() =>
                setActionNotice(
                  `Reinstatement review started for ${plan.lpaNo}. Confirm eligibility before saving changes.`,
                )
              }
            >
              <RefreshCcw size={15} />
              Reinstate
            </Button>
            <Button
              flex={{ base: "1", sm: "unset" }}
              minW={{ base: "0", sm: "92px" }}
              size="sm"
              variant="outline"
              borderColor="brand.dangerText"
              color="brand.dangerText"
              bg="brand.white"
              _hover={{ bg: "brand.dangerSurface" }}
              transition="background-color var(--motion-fast) var(--motion-ease-out), border-color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
              _active={{ transform: "translateY(1px)" }}
              onClick={() => {
                if (
                  window.confirm(
                    `Delete plan ${plan.lpaNo}? This action needs approval.`,
                  )
                ) {
                  setActionNotice(
                    `Delete request prepared for ${plan.lpaNo}. Approval is required before the record is removed.`,
                  );
                }
              }}
            >
              <Trash2 size={15} />
              Delete
            </Button>
          </HStack>
        </Grid>

        {actionNotice ? (
          <Box
            mt="4"
            p="3"
            bg="brand.white"
            border="1px solid"
            borderColor="brand.softGreen"
            borderRadius="md"
            color="brand.accentText"
            fontSize="13px"
            fontWeight="700"
            role="status"
          >
            {actionNotice}
          </Box>
        ) : null}
      </Box>

      <Box px={{ base: "4", md: "5" }} py="3" overflowX="auto">
        <HStack
          role="tablist"
          aria-label="Plan record sections"
          gap="2"
          minW={{ base: "760px", "2xl": "auto" }}
        >
          {planTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activePlanTab === tab.label;

            return (
              <Button
                key={tab.label}
                role="tab"
                aria-selected={active}
                size="xs"
                variant={active ? "solid" : "ghost"}
                bg={active ? "brand.primaryGreen" : "brand.controlMutedBg"}
                color={active ? "text.inverse" : "text.secondary"}
                borderRadius="sm"
                _hover={{
                  bg: active ? "brand.darkGreen" : "brand.successBg",
                  color: active ? "text.inverse" : "brand.accentText",
                }}
                transition="background-color var(--motion-fast) var(--motion-ease-out), color var(--motion-fast) var(--motion-ease-out), transform var(--motion-fast) var(--motion-ease-out)"
                _active={{ transform: "translateY(1px)" }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "brand.primaryGreen",
                  outlineOffset: "2px",
                }}
                onClick={() => setActivePlanTab(tab.label)}
              >
                <Icon size={13} />
                {tab.label}
              </Button>
            );
          })}
        </HStack>
      </Box>

      <Separator borderColor="brand.neutralBorder" />

      <Box p={{ base: "4", md: "5" }} role="tabpanel">
        {activePlanTab === "Plan Details" ? (
          <>
            <PlanSummaryList
              rows={[
                ["Planholder", plan.insured],
                ["Account Status", plan.status],
                ["Insurance Status", plan.insuranceStatus],
                ["Plan", plan.plan],
                ["Mode", "Annual"],
                ["Term", plan.payingYears],
                ["Plan Class", plan.planClass],
                ["Account Class", plan.planClass],
                ["Plan Code", "LISA10"],
                ["Contract Price", plan.contractPrice],
                ["Installment Amount", plan.installmentAmount],
                ["Total Annual Payable", plan.contractPrice],
                ["Effectivity Date", plan.effectivityDate],
                ["Maturity Date", plan.maturityDate],
                ["Branch", plan.branch],
                ["Sales Agent", plan.agent],
                ["Service Only", plan.serviceOnly],
              ]}
            />

            <Box mt="4">
              <Text color="text.muted" fontSize="12px" fontWeight="700" mb="2">
                Remarks
              </Text>
              <Textarea
                readOnly
                aria-label="Plan remarks"
                value={plan.remarks}
                minH="76px"
                bg="brand.subtleBg"
                borderColor="brand.neutralBorder"
                color="brand.neutralText"
                resize="vertical"
              />
            </Box>
          </>
        ) : (
          <PlanTabEmptyState tab={activePlanTab} plan={plan} />
        )}
      </Box>
    </Box>
  );
}

function PlanTabEmptyState({
  tab,
  plan,
}: {
  tab: PlanTabLabel;
  plan: PlanRecord;
}) {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minH="220px"
      textAlign="center"
      bg="brand.subtleBg"
      border="1px dashed"
      borderColor="brand.neutralBorder"
      borderRadius="md"
      p="6"
    >
      <Flex
        align="center"
        justify="center"
        w="42px"
        h="42px"
        borderRadius="full"
        bg="brand.successBg"
        color="brand.accentText"
        mb="3"
      >
        <FileText size={20} />
      </Flex>
      <Text color="brand.neutralText" fontSize="15px" fontWeight="700">
        No {tab.toLowerCase()} records shown
      </Text>
      <Text color="text.muted" fontSize="14px" maxW="360px" mt="1">
        {plan.lpaNo} is selected. Use Plan Details for the current summary, or
        check back when this section has records to review.
      </Text>
    </Flex>
  );
}

function PlanSummaryList({ rows }: { rows: [string, string][] }) {
  return (
    <Box
      as="dl"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="md"
      overflow="hidden"
      bg="brand.white"
    >
      {rows.map(([label, value], index) => (
        <Grid
          key={label}
          templateColumns={{
            base: "minmax(112px, 0.9fr) minmax(0, 1.1fr)",
            sm: "minmax(180px, 0.68fr) minmax(0, 1.32fr)",
          }}
          gap="3"
          alignItems="center"
          minH="42px"
          px="4"
          py="2.5"
          bg={index % 2 === 0 ? "brand.subtleBg" : "brand.white"}
          borderBottom={index === rows.length - 1 ? "0" : "1px solid"}
          borderColor="brand.neutralBorder"
          transition="background-color var(--motion-fast) var(--motion-ease-out)"
          _hover={{ bg: "brand.successBg" }}
        >
          <Text as="dt" color="text.muted" fontSize="13px" fontWeight="700">
            {label}
          </Text>
          <Text
            as="dd"
            color="brand.neutralText"
            fontSize="14px"
            fontWeight="600"
            textAlign="right"
            overflowWrap="anywhere"
          >
            {value}
          </Text>
        </Grid>
      ))}
    </Box>
  );
}

function SectionPanel({
  icon: Icon,
  title,
  description,
  action,
  children,
}: {
  icon: ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box
      bg="brand.white"
      border="1px solid"
      borderColor="brand.neutralBorder"
      borderRadius="lg"
      boxShadow="level1"
      overflow="hidden"
      minW="0"
    >
      <Flex
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap="3"
        px={{ base: "4", md: "5" }}
        py="4"
        borderBottom="1px solid"
        borderColor="brand.neutralBorder"
      >
        <HStack gap="3" minW="0">
          <Flex
            align="center"
            justify="center"
            w="34px"
            h="34px"
            borderRadius="md"
            bg="brand.successBg"
            color="brand.accentText"
            flexShrink="0"
          >
            <Icon size={18} />
          </Flex>
          <Box minW="0">
            <Text
              as="h3"
              color="brand.neutralText"
              fontSize="16px"
              fontWeight="700"
              lineHeight="1.2"
            >
              {title}
            </Text>
            <Text color="text.muted" fontSize="12px" mt="0.5">
              {description}
            </Text>
          </Box>
        </HStack>
        {action ? <Box minW="0">{action}</Box> : null}
      </Flex>

      <Box p={{ base: "4", md: "5" }}>{children}</Box>
    </Box>
  );
}

function ScrollableTabs({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box w={{ base: "100%", md: "auto" }} overflowX="auto">
      <HStack
        as="div"
        role="tablist"
        aria-label={label}
        gap="1"
        minW="max-content"
        bg="brand.subtleBg"
        border="1px solid"
        borderColor="brand.neutralBorder"
        borderRadius="md"
        p="1"
      >
        {children}
      </HStack>
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
      borderRadius="sm"
      px="2.5"
      py="0.5"
      fontWeight={styles.fontWeight}
    >
      {status}
    </Badge>
  );
}
