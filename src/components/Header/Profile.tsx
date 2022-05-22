import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center" ml="auto">
      <Box mr="4" textAlign="right">
        <Text color="white">Felipe Rosas</Text>
        <Text color="white" fontSize="small">
          contato@eufelipe.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Felipe Rosas"
        src="https://github.com/eufelipe.png"
      />
    </Flex>
  );
}
