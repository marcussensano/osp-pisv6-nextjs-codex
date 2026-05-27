"use client";

import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

type Accent = "magenta" | "green" | "orange" | "red" | "violet";

type Order = {
  customer: string;
  email: string;
  initials: string;
  orderId: string;
  product: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled";
  amount: string;
  accent: Accent;
};

type Activity = {
  title: string;
  detail: string;
  time: string;
  icon: IconName;
  accent: Accent;
};

type NavItem = {
  label: string;
  icon: IconName;
  active?: boolean;
  count?: string;
};

type IconName =
  | "analytics"
  | "apps"
  | "bell"
  | "box"
  | "chart"
  | "chat"
  | "chevron"
  | "commerce"
  | "customers"
  | "eye"
  | "goal"
  | "invoice"
  | "logout"
  | "mail"
  | "menu"
  | "moon"
  | "orders"
  | "palette"
  | "plus"
  | "search"
  | "star"
  | "userPlus"
  | "wallet";

const colors = {
  bg: "#050506",
  sidebar: "#080809",
  card: "#151516",
  cardAlt: "#101011",
  line: "#252528",
  muted: "#777b85",
  subtle: "#9a9eaa",
  text: "#f4f5f8",
  magenta: "#c4328c",
  green: "#10c68d",
  orange: "#f59e0b",
  red: "#ff2d55",
  violet: "#8b3fe8",
};

const accentMap: Record<Accent, string> = {
  magenta: colors.magenta,
  green: colors.green,
  orange: colors.orange,
  red: colors.red,
  violet: colors.violet,
};

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Analytics", icon: "analytics" as IconName, active: true },
      { label: "eCommerce", icon: "commerce" as IconName },
      { label: "CRM", icon: "customers" as IconName },
      { label: "SaaS", icon: "apps" as IconName },
      { label: "Charts", icon: "chart" as IconName },
    ],
  },
  {
    title: "Commerce",
    items: [
      { label: "Orders", icon: "orders" as IconName, count: "12" },
      { label: "Products", icon: "box" as IconName },
      { label: "Customers", icon: "customers" as IconName },
      { label: "Invoices", icon: "invoice" as IconName },
    ],
  },
  {
    title: "Apps",
    items: [
      { label: "Mail", icon: "mail" as IconName },
      { label: "Chat", icon: "chat" as IconName },
    ],
  },
];

const kpis = [
  {
    label: "Total Revenue",
    value: "$48,295",
    trend: "+12.5%",
    tone: "magenta" as Accent,
    icon: "wallet" as IconName,
    points: [18, 22, 17, 24, 20, 26, 29, 25, 32, 28, 35, 38],
  },
  {
    label: "Active Users",
    value: "2,847",
    trend: "+8.2%",
    tone: "green" as Accent,
    icon: "customers" as IconName,
    points: [14, 18, 16, 22, 20, 27, 23, 31, 28, 35, 32, 38],
  },
  {
    label: "Total Orders",
    value: "1,432",
    trend: "-3.1%",
    tone: "orange" as Accent,
    icon: "orders" as IconName,
    points: [30, 34, 39, 32, 24, 28, 20, 25, 22, 19, 24, 21],
    negative: true,
  },
  {
    label: "Page Views",
    value: "284K",
    trend: "+24.7%",
    tone: "violet" as Accent,
    icon: "eye" as IconName,
    points: [15, 17, 16, 20, 22, 21, 24, 26, 27, 30, 33, 37],
  },
];

const orders: Order[] = [
  {
    customer: "Emma Wilson",
    email: "emma@example.com",
    initials: "EW",
    orderId: "ORD-7891",
    product: "Pro Dashboard License",
    status: "Completed",
    amount: "$299.00",
    accent: "magenta",
  },
  {
    customer: "James Chen",
    email: "james@company.io",
    initials: "JC",
    orderId: "ORD-7890",
    product: "Team Plan Upgrade",
    status: "Processing",
    amount: "$599.00",
    accent: "green",
  },
  {
    customer: "Sofia Garcia",
    email: "sofia@startup.co",
    initials: "SG",
    orderId: "ORD-7889",
    product: "Enterprise License",
    status: "Completed",
    amount: "$1,499.00",
    accent: "orange",
  },
  {
    customer: "Alex Thompson",
    email: "alex@dev.com",
    initials: "AT",
    orderId: "ORD-7888",
    product: "Single License",
    status: "Pending",
    amount: "$79.00",
    accent: "violet",
  },
  {
    customer: "Maria Santos",
    email: "maria@agency.co",
    initials: "MS",
    orderId: "ORD-7887",
    product: "Pro Dashboard License",
    status: "Completed",
    amount: "$299.00",
    accent: "red",
  },
  {
    customer: "David Kim",
    email: "david@tech.io",
    initials: "DK",
    orderId: "ORD-7886",
    product: "Team Plan Upgrade",
    status: "Cancelled",
    amount: "$599.00",
    accent: "magenta",
  },
];

const activities: Activity[] = [
  {
    title: "New order placed",
    detail: "Emma Wilson purchased Pro Dashboard License",
    time: "2 min ago",
    icon: "orders",
    accent: "magenta",
  },
  {
    title: "New customer registered",
    detail: "James Chen created an account",
    time: "15 min ago",
    icon: "userPlus",
    accent: "green",
  },
  {
    title: "5-star review received",
    detail: "\"Amazing template, exactly what I needed!\"",
    time: "1 hour ago",
    icon: "star",
    accent: "red",
  },
  {
    title: "Payment received",
    detail: "$1,499 from Sofia Garcia",
    time: "2 hours ago",
    icon: "wallet",
    accent: "orange",
  },
  {
    title: "Support ticket resolved",
    detail: "Ticket #4521 marked as resolved",
    time: "3 hours ago",
    icon: "chat",
    accent: "violet",
  },
  {
    title: "New order placed",
    detail: "Alex Thompson purchased Single License",
    time: "5 hours ago",
    icon: "orders",
    accent: "magenta",
  },
];

const chartData = [18, 22, 20, 29, 32, 30, 37, 39, 42, 41, 45, 49];

const trafficSources = [
  { label: "Direct", value: "35%", color: colors.magenta },
  { label: "Organic", value: "28%", color: colors.green },
  { label: "Referral", value: "22%", color: colors.orange },
  { label: "Social", value: "15%", color: colors.red },
];

const goals = [
  {
    label: "Monthly Revenue",
    value: "48,295",
    target: "Target: 55,000",
    percent: 88,
    color: colors.magenta,
  },
  {
    label: "New Customers",
    value: "847",
    target: "Target: 1,000",
    percent: 85,
    color: colors.green,
  },
  {
    label: "Conversion Rate",
    value: "3.8",
    target: "Target: 5",
    percent: 76,
    color: colors.orange,
  },
];

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState("Revenue");

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
          <Flex align="center" gap="3">
            <Circle
              size="36px"
              bg={accentMap[row.original.accent]}
              color={colors.text}
              fontSize="12px"
              fontWeight="800"
            >
              {row.original.initials}
            </Circle>
            <Box>
              <Text color={colors.text} fontWeight="750" lineHeight="1.2">
                {row.original.customer}
              </Text>
              <Text color={colors.muted} fontSize="12px">
                {row.original.email}
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        accessorKey: "orderId",
        header: "Order ID",
        cell: (info) => (
          <Text color={colors.muted} fontFamily="var(--font-dashboard-mono)">
            {info.getValue<string>()}
          </Text>
        ),
      },
      {
        accessorKey: "product",
        header: "Product",
        cell: (info) => (
          <Text color={colors.text} fontWeight="650">
            {info.getValue<string>()}
          </Text>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue<Order["status"]>()} />,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => (
          <Text color={colors.text} fontWeight="800" textAlign="right">
            {info.getValue<string>()}
          </Text>
        ),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box minH="100vh" bg={colors.bg} color={colors.text}>
      <Sidebar />

      {mobileNavOpen ? (
        <Box
          display={{ base: "block", lg: "none" }}
          position="fixed"
          inset="0"
          zIndex="40"
        >
          <Box
            position="absolute"
            inset="0"
            bg="rgba(0, 0, 0, 0.64)"
            onClick={() => setMobileNavOpen(false)}
          />
          <Box position="relative" w="280px" h="100%">
            <Sidebar isMobile onClose={() => setMobileNavOpen(false)} />
          </Box>
        </Box>
      ) : null}

      <Box ml={{ base: "0", lg: "256px" }}>
        <PageHeader onMenuClick={() => setMobileNavOpen(true)} />

        <Box
          as="main"
          px={{ base: "4", md: "6", xl: "8" }}
          py={{ base: "5", md: "6" }}
          maxW="1680px"
          mx="auto"
        >
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }}
            gap="4"
          >
            {kpis.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </Grid>

          <Grid templateColumns={{ base: "1fr", xl: "2.1fr 1fr" }} gap="4" mt="5">
            <Panel minH={{ base: "420px", lg: "560px" }}>
              <Flex
                align={{ base: "flex-start", sm: "center" }}
                justify="space-between"
                gap="4"
                direction={{ base: "column", sm: "row" }}
              >
                <Box>
                  <Heading as="h2" size="md" color={colors.text}>
                    Overview
                  </Heading>
                  <Text color={colors.muted} fontSize="sm">
                    Monthly performance for the current year
                  </Text>
                </Box>
                <Flex
                  bg={colors.cardAlt}
                  border="1px solid"
                  borderColor={colors.line}
                  borderRadius="10px"
                  p="1"
                >
                  {["Revenue", "Orders", "Profit"].map((tab) => (
                    <Button
                      key={tab}
                      type="button"
                      minW="78px"
                      h="34px"
                      px="3"
                      bg={activeChartTab === tab ? "#050506" : "transparent"}
                      color={activeChartTab === tab ? colors.text : colors.muted}
                      borderRadius="8px"
                      fontSize="12px"
                      fontWeight="750"
                      onClick={() => setActiveChartTab(tab)}
                      _hover={{ bg: activeChartTab === tab ? "#050506" : "#1c1c1f" }}
                    >
                      {tab}
                    </Button>
                  ))}
                </Flex>
              </Flex>

              <RevenueChart />
            </Panel>

            <Grid gap="4">
              <Panel>
                <Heading as="h2" size="md" color={colors.text}>
                  Traffic Sources
                </Heading>
                <Text color={colors.muted} fontSize="sm" mt="1">
                  Where your visitors come from
                </Text>
                <Flex align="center" gap={{ base: "6", sm: "8" }} mt="8">
                  <DonutChart />
                  <Box flex="1">
                    {trafficSources.map((source) => (
                      <Flex
                        key={source.label}
                        align="center"
                        justify="space-between"
                        gap="4"
                        mb="4"
                        _last={{ mb: "0" }}
                      >
                        <Flex align="center" gap="3">
                          <Circle size="10px" bg={source.color} />
                          <Text color={colors.subtle} fontSize="sm">
                            {source.label}
                          </Text>
                        </Flex>
                        <Text color={colors.text} fontSize="sm" fontWeight="800">
                          {source.value}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                </Flex>
              </Panel>

              <Panel>
                <Heading as="h2" size="md" color={colors.text}>
                  Monthly Goals
                </Heading>
                <Text color={colors.muted} fontSize="sm" mt="1">
                  Track progress toward targets
                </Text>
                <Grid gap="6" mt="7">
                  {goals.map((goal) => (
                    <GoalBar key={goal.label} {...goal} />
                  ))}
                </Grid>
              </Panel>
            </Grid>
          </Grid>

          <Grid templateColumns={{ base: "1fr", xl: "2.1fr 1fr" }} gap="4" mt="5">
            <Panel>
              <SectionHeader
                title="Recent Orders"
                caption="Latest transactions from your store"
              />
              <Box display={{ base: "none", md: "block" }} overflowX="auto">
                <Box as="table" w="100%" borderCollapse="collapse" minW="760px">
                  <Box as="thead">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <Box as="tr" key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <Box
                            as="th"
                            key={header.id}
                            py="4"
                            pr="5"
                            borderBottom="1px solid"
                            borderColor={colors.line}
                            color={colors.muted}
                            fontSize="12px"
                            fontWeight="800"
                            textAlign={header.column.id === "amount" ? "right" : "left"}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                  <Box as="tbody">
                    {table.getRowModel().rows.map((row) => (
                      <Box as="tr" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <Box
                            as="td"
                            key={cell.id}
                            py="4"
                            pr="5"
                            borderBottom="1px solid"
                            borderColor="#1f2023"
                            verticalAlign="middle"
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Grid display={{ base: "grid", md: "none" }} gap="3" mt="5">
                {orders.map((order) => (
                  <Box
                    key={order.orderId}
                    p="4"
                    border="1px solid"
                    borderColor={colors.line}
                    borderRadius="10px"
                    bg="#101012"
                  >
                    <Flex align="center" justify="space-between" gap="4">
                      <Flex align="center" gap="3">
                        <Circle
                          size="36px"
                          bg={accentMap[order.accent]}
                          color={colors.text}
                          fontSize="12px"
                          fontWeight="800"
                        >
                          {order.initials}
                        </Circle>
                        <Box>
                          <Text color={colors.text} fontWeight="800">
                            {order.customer}
                          </Text>
                          <Text color={colors.muted} fontSize="12px">
                            {order.orderId}
                          </Text>
                        </Box>
                      </Flex>
                      <StatusBadge status={order.status} />
                    </Flex>
                    <Flex align="center" justify="space-between" gap="4" mt="4">
                      <Text color={colors.subtle} fontSize="sm">
                        {order.product}
                      </Text>
                      <Text color={colors.text} fontWeight="800">
                        {order.amount}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </Grid>
            </Panel>

            <Panel>
              <SectionHeader
                title="Recent Activity"
                caption="Latest events from your store"
              />
              <Grid gap="5" mt="6">
                {activities.map((activity) => (
                  <Flex key={`${activity.title}-${activity.time}`} gap="4">
                    <Circle
                      size="38px"
                      bg={`${accentMap[activity.accent]}22`}
                      color={accentMap[activity.accent]}
                      flexShrink="0"
                    >
                      <DashboardIcon name={activity.icon} size={18} />
                    </Circle>
                    <Box>
                      <Text color={colors.text} fontWeight="800">
                        {activity.title}
                      </Text>
                      <Text color={colors.muted} fontSize="13px" lineHeight="1.45">
                        {activity.detail}
                      </Text>
                      <Text color="#5e626b" fontSize="12px" mt="1">
                        {activity.time}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Grid>
            </Panel>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

function Sidebar({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <Flex
      as="aside"
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      zIndex={isMobile ? "50" : "20"}
      display={isMobile ? "flex" : { base: "none", lg: "flex" }}
      w="256px"
      bg={colors.sidebar}
      borderRight="1px solid"
      borderColor={colors.line}
      direction="column"
    >
      <Flex align="center" gap="3" px="4" h="84px" borderBottom="1px solid" borderColor={colors.line}>
        <Circle size="34px" bg="#17181b" border="1px solid" borderColor="#34363b">
          <DashboardIcon name="chevron" size={18} />
        </Circle>
        <Box>
          <Text color={colors.text} fontWeight="900" lineHeight="1">
            Zenith
          </Text>
          <Text
            color={colors.muted}
            fontSize="10px"
            fontWeight="800"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            Dashboard
          </Text>
        </Box>
        {isMobile ? (
          <Button
            aria-label="Close navigation"
            ml="auto"
            minW="34px"
            h="34px"
            p="0"
            bg="transparent"
            color={colors.muted}
            onClick={onClose}
          >
            <DashboardIcon name="chevron" size={18} />
          </Button>
        ) : null}
      </Flex>

      <Button
        aria-label="Collapse sidebar"
        display={{ base: "none", lg: "flex" }}
        position="absolute"
        right="-14px"
        top="100px"
        minW="28px"
        h="28px"
        p="0"
        borderRadius="999px"
        bg="#101012"
        border="1px solid"
        borderColor={colors.line}
        color={colors.muted}
        _hover={{ bg: "#17181b", color: colors.text }}
      >
        <DashboardIcon name="chevron" size={15} />
      </Button>

      <Box flex="1" overflowY="auto" px="3" py="5">
        {navGroups.map((group) => (
          <Box key={group.title} mb="5">
            <Flex align="center" justify="space-between" px="2" mb="2">
              <Text
                color={colors.muted}
                fontSize="11px"
                fontWeight="900"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                {group.title}
              </Text>
              <DashboardIcon name="chevron" size={13} color={colors.muted} />
            </Flex>
            <Grid gap="1">
              {group.items.map((item) => (
                <Flex
                  as="button"
                  key={item.label}
                  align="center"
                  gap="3"
                  w="100%"
                  h="38px"
                  px="3"
                  borderRadius="9px"
                  bg={item.active ? "#171719" : "transparent"}
                  color={item.active ? colors.text : colors.subtle}
                  fontWeight="750"
                  textAlign="left"
                  cursor="pointer"
                  _hover={{ bg: "#171719", color: colors.text }}
                >
                  <DashboardIcon name={item.icon} size={18} />
                  <Text fontSize="14px" flex="1">
                    {item.label}
                  </Text>
                  {item.count ? (
                    <Text color="#4b4f58" fontSize="11px">
                      {item.count}
                    </Text>
                  ) : null}
                </Flex>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>

      <Flex
        align="center"
        gap="3"
        px="4"
        py="4"
        borderTop="1px solid"
        borderColor={colors.line}
      >
        <Circle size="34px" bg="#17181b" color={colors.text} fontSize="12px" fontWeight="900">
          AS
        </Circle>
        <Box flex="1" minW="0">
          <Text color={colors.text} fontWeight="800" lineHeight="1.1">
            Aigars S.
          </Text>
          <Text color={colors.muted} fontSize="12px">
            Admin
          </Text>
        </Box>
        <Button
          aria-label="Log out"
          minW="34px"
          h="34px"
          p="0"
          bg="transparent"
          color={colors.muted}
          _hover={{ color: colors.text, bg: "#171719" }}
        >
          <DashboardIcon name="logout" size={17} />
        </Button>
      </Flex>
    </Flex>
  );
}

function PageHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <Flex
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      align="center"
      justify="space-between"
      gap="4"
      minH="84px"
      px={{ base: "4", md: "6", xl: "8" }}
      bg="rgba(5, 5, 6, 0.88)"
      borderBottom="1px solid"
      borderColor={colors.line}
      backdropFilter="blur(18px)"
    >
      <Flex align="center" gap="4" flex="1" minW="0">
        <Button
          aria-label="Open navigation"
          display={{ base: "flex", lg: "none" }}
          minW="40px"
          h="40px"
          p="0"
          bg={colors.card}
          color={colors.text}
          border="1px solid"
          borderColor={colors.line}
          onClick={onMenuClick}
        >
          <DashboardIcon name="menu" size={19} />
        </Button>
        <Box minW={{ base: "auto", md: "170px" }}>
          <Heading
            as="h1"
            color={colors.text}
            fontSize={{ base: "24px", md: "30px" }}
            lineHeight="1"
          >
            Dashboard
          </Heading>
        </Box>
        <Box position="relative" display={{ base: "none", md: "block" }} w="min(100%, 360px)">
          <Box position="absolute" left="4" top="50%" transform="translateY(-50%)" color={colors.muted}>
            <DashboardIcon name="search" size={18} />
          </Box>
          <Input
            aria-label="Search dashboard"
            h="42px"
            pl="11"
            pr="14"
            bg="#101012"
            border="1px solid"
            borderColor={colors.line}
            borderRadius="10px"
            color={colors.text}
            placeholder="Search anything..."
            _placeholder={{ color: "#535761" }}
            _focus={{ borderColor: colors.magenta, boxShadow: `0 0 0 1px ${colors.magenta}` }}
          />
          <Text
            position="absolute"
            right="4"
            top="50%"
            transform="translateY(-50%)"
            color="#4f535c"
            fontSize="11px"
            border="1px solid"
            borderColor="#26282e"
            borderRadius="6px"
            px="1.5"
          >
            ⌘K
          </Text>
        </Box>
      </Flex>

      <Flex align="center" gap={{ base: "2", md: "3" }}>
        <Button
          h="40px"
          px="4"
          bg="#151518"
          color={colors.text}
          border="1px solid"
          borderColor={colors.line}
          borderRadius="10px"
          fontWeight="800"
          fontSize="14px"
          _hover={{ bg: "#1c1c20" }}
        >
          <DashboardIcon name="plus" size={17} />
          <Text as="span" ml="2" display={{ base: "none", sm: "inline" }}>
            New Order
          </Text>
        </Button>
        <Flex display={{ base: "none", md: "flex" }} align="center" gap="1" pl="3" borderLeft="1px solid" borderColor={colors.line}>
          <HeaderIcon label="Toggle theme" icon="moon" />
          <HeaderIcon label="Customize dashboard" icon="palette" />
          <Box position="relative">
            <HeaderIcon label="Notifications" icon="bell" />
            <Circle size="7px" bg={colors.red} position="absolute" top="7px" right="8px" />
          </Box>
        </Flex>
        <Circle size="36px" bg="transparent" color={colors.muted} fontSize="12px" fontWeight="800">
          AS
        </Circle>
      </Flex>
    </Flex>
  );
}

function HeaderIcon({ label, icon }: { label: string; icon: IconName }) {
  return (
    <Button
      aria-label={label}
      title={label}
      minW="36px"
      h="36px"
      p="0"
      bg="transparent"
      color={colors.muted}
      borderRadius="9px"
      _hover={{ bg: "#17181b", color: colors.text }}
    >
      <DashboardIcon name={icon} size={18} />
    </Button>
  );
}

function Panel({
  children,
  ...props
}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <Box
      bg={colors.card}
      border="1px solid"
      borderColor={colors.line}
      borderRadius="12px"
      p={{ base: "5", md: "6" }}
      overflow="hidden"
      {...props}
    >
      {children}
    </Box>
  );
}

function SectionHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <Flex align="flex-start" justify="space-between" gap="4">
      <Box>
        <Heading as="h2" size="md" color={colors.text}>
          {title}
        </Heading>
        <Text color={colors.muted} fontSize="sm" mt="1">
          {caption}
        </Text>
      </Box>
      <Text color="#383b42" fontSize="12px" fontWeight="800">
        View all
      </Text>
    </Flex>
  );
}

function KpiCard({
  label,
  value,
  trend,
  tone,
  icon,
  points,
  negative,
}: (typeof kpis)[number]) {
  const accent = accentMap[tone];

  return (
    <Box
      position="relative"
      minH="154px"
      bg={colors.card}
      border="1px solid"
      borderColor={colors.line}
      borderRadius="12px"
      p="5"
      overflow="hidden"
    >
      <Flex align="flex-start" justify="space-between" gap="4">
        <Box>
          <Text color={colors.muted} fontSize="13px" fontWeight="700">
            {label}
          </Text>
          <Text color={colors.text} fontSize="27px" fontWeight="950" mt="1">
            {value}
          </Text>
          <Flex align="center" gap="2" mt="2">
            <Text color={negative ? colors.red : colors.green} fontSize="13px" fontWeight="850">
              {negative ? "↘" : "↗"} {trend}
            </Text>
            <Text color={colors.muted} fontSize="12px">
              vs last month
            </Text>
          </Flex>
        </Box>
        <Circle size="42px" bg={`${accent}1f`} color={accent}>
          <DashboardIcon name={icon} size={21} />
        </Circle>
      </Flex>
      <Box position="absolute" left="0" right="0" bottom="0" h="56px">
        <Sparkline points={points} color={accent} />
      </Box>
    </Box>
  );
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 42 - ((point - min) / (max - min || 1)) * 26;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,56 ${coords} 100,56`;

  return (
    <svg viewBox="0 0 100 56" width="100%" height="100%" preserveAspectRatio="none">
      <polygon points={area} fill={color} opacity="0.16" />
      <polyline points={coords} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function RevenueChart() {
  const max = 60;
  const points = chartData
    .map((point, index) => {
      const x = 8 + (index / (chartData.length - 1)) * 88;
      const y = 88 - (point / max) * 74;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `8,88 ${points} 96,88`;
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <Box mt="7" h={{ base: "300px", md: "410px" }} position="relative">
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
        {[14, 32, 50, 68, 86].map((y) => (
          <line
            key={y}
            x1="8"
            x2="96"
            y1={y}
            y2={y}
            stroke="#252528"
            strokeDasharray="1.4 2.6"
            strokeWidth="0.3"
          />
        ))}
        <polygon points={area} fill={colors.magenta} opacity="0.14" />
        <polyline
          points={points}
          fill="none"
          stroke={colors.magenta}
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {["$60k", "$45k", "$30k", "$15k", "$0k"].map((label, index) => (
        <Text
          key={label}
          position="absolute"
          left="2"
          top={`${index * 22}%`}
          color={colors.muted}
          fontSize="12px"
          transform="translateY(-50%)"
        >
          {label}
        </Text>
      ))}
      <Grid
        position="absolute"
        left="8%"
        right="4%"
        bottom="0"
        templateColumns="repeat(12, 1fr)"
        gap="0"
      >
        {labels.map((label) => (
          <Text key={label} textAlign="center" color={colors.muted} fontSize="12px">
            {label}
          </Text>
        ))}
      </Grid>
    </Box>
  );
}

function DonutChart() {
  const segments = [
    { value: 35, color: colors.magenta },
    { value: 28, color: colors.green },
    { value: 22, color: colors.orange },
    { value: 15, color: colors.red },
  ];
  let offset = 0;

  return (
    <Box position="relative" w={{ base: "126px", sm: "150px" }} h={{ base: "126px", sm: "150px" }} flexShrink="0">
      <svg viewBox="0 0 42 42" width="100%" height="100%">
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#242428" strokeWidth="7" />
        {segments.map((segment) => {
          const dash = `${segment.value} ${100 - segment.value}`;
          const rotation = offset * 3.6 - 90;
          offset += segment.value;
          return (
            <circle
              key={segment.color}
              cx="21"
              cy="21"
              r="15.9"
              fill="none"
              stroke={segment.color}
              strokeDasharray={dash}
              strokeWidth="7"
              strokeLinecap="butt"
              transform={`rotate(${rotation} 21 21)`}
            />
          );
        })}
      </svg>
      <Flex position="absolute" inset="0" align="center" justify="center" direction="column">
        <Text color={colors.text} fontSize="21px" fontWeight="950">
          284K
        </Text>
        <Text color={colors.muted} fontSize="11px">
          Visits
        </Text>
      </Flex>
    </Box>
  );
}

function GoalBar({
  label,
  value,
  target,
  percent,
  color,
}: {
  label: string;
  value: string;
  target: string;
  percent: number;
  color: string;
}) {
  return (
    <Box>
      <Flex justify="space-between" gap="4">
        <Text color={colors.text} fontSize="13px" fontWeight="800">
          {label}
        </Text>
        <Text color={colors.muted} fontSize="13px" fontWeight="800">
          {percent}%
        </Text>
      </Flex>
      <Box h="8px" bg="#252528" borderRadius="999px" overflow="hidden" mt="3">
        <Box h="100%" w={`${percent}%`} bg={color} borderRadius="inherit" />
      </Box>
      <Flex justify="space-between" gap="4" mt="2">
        <Text color={colors.muted} fontSize="12px">
          {value}
        </Text>
        <Text color={colors.muted} fontSize="12px">
          {target}
        </Text>
      </Flex>
    </Box>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles = {
    Completed: { bg: "#2aa945", color: "#07120a" },
    Processing: { bg: "#23262c", color: colors.text },
    Pending: { bg: colors.orange, color: "#170d00" },
    Cancelled: { bg: colors.red, color: colors.text },
  }[status];

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      minW="86px"
      h="26px"
      px="3"
      borderRadius="8px"
      bg={styles.bg}
      color={styles.color}
      fontSize="12px"
      fontWeight="900"
    >
      {status}
    </Box>
  );
}

function DashboardIcon({
  name,
  size = 20,
  color = "currentColor",
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    analytics: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16V9" />
        <path d="M12 16V6" />
        <path d="M16 16v-4" />
      </>
    ),
    apps: (
      <>
        <path d="M5 14l4-9" />
        <path d="M15 5h4l-4 9h4" />
        <path d="M4 20c4-4 8-4 12 0" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
    box: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </>
    ),
    chart: (
      <>
        <path d="M3 18l6-6 4 4 8-9" />
        <path d="M21 21H3" />
      </>
    ),
    chat: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      </>
    ),
    chevron: <path d="m15 18-6-6 6-6" />,
    commerce: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    customers: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    goal: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    invoice: (
      <>
        <path d="M6 2h9l3 3v17H6Z" />
        <path d="M14 2v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 3v18" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
    moon: <path d="M21 12.8A8 8 0 1 1 11.2 3 6 6 0 0 0 21 12.8Z" />,
    orders: (
      <>
        <path d="M6 6h15l-2 9H8L6 6Z" />
        <path d="M6 6 5 3H3" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </>
    ),
    palette: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="8" cy="10" r="1" />
        <circle cx="12" cy="7" r="1" />
        <circle cx="16" cy="10" r="1" />
        <path d="M15 16h.01" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" />,
    userPlus: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6" />
        <path d="M22 11h-6" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 7h16v12H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14" />
        <path d="M16 12h4" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
