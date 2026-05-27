import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box minH="100vh" bg="brand.white" px={{ base: "4", md: "6" }} py="6">
      <Grid gap="4" maxW="1440px" mx="auto">
        <Box
          className="osp-loading-surface"
          h={{ base: "96px", md: "116px" }}
          borderRadius="lg"
          bg="brand.subtleBg"
          border="1px solid"
          borderColor="brand.neutralBorder"
        />
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Box
              key={index}
              className="osp-loading-surface"
              h="112px"
              borderRadius="lg"
              bg="brand.subtleBg"
              border="1px solid"
              borderColor="brand.neutralBorder"
            />
          ))}
        </SimpleGrid>
        <Flex gap="4" direction={{ base: "column", xl: "row" }}>
          <Box
            className="osp-loading-surface"
            h="360px"
            flex="1"
            borderRadius="lg"
            bg="brand.subtleBg"
            border="1px solid"
            borderColor="brand.neutralBorder"
          />
          <Box
            className="osp-loading-surface"
            h="360px"
            flex="1.4"
            borderRadius="lg"
            bg="brand.subtleBg"
            border="1px solid"
            borderColor="brand.neutralBorder"
          />
        </Flex>
      </Grid>
    </Box>
  );
}
