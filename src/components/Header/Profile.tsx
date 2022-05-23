import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export function Profile() {
  const { data: session } = useSession();

  const user = session?.session?.user;

  return (
    <Flex align="center" ml="auto">
      <Box mr="4" textAlign="right">
        <Text color="white">{user?.name}</Text>
        <Text color="white" fontSize="small">
          {user?.email}
        </Text>
      </Box>

      <Avatar size="md" name="Felipe Rosas" src={user?.image} />
    </Flex>
  );
}
