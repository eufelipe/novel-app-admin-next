import { Flex, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex width="100%" maxWidth={360} p="8" borderRadius={8} flexDir="column">
        <Text ml="4" align="center" color="gray.650">
          Home
        </Text>
      </Flex>
    </Flex>
  );
}
