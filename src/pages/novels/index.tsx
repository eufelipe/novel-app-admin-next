import { Box, Flex, Text } from "@chakra-ui/react";
import { Header } from "@components/Header";

export default function Home() {
  return (
    <Box maxWidth={1120} margin="0 auto">
      <Header />

      <Flex align="center" justify="center">
        <Flex
          width="100%"
          maxWidth={360}
          p="8"
          borderRadius={8}
          flexDir="column"
        >
          <Text ml="4" align="center" color="gray.650">
            Home
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
