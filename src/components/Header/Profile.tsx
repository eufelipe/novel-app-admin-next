import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { LoginButton } from "@components/LoginButton";
import { useSession, signOut } from "next-auth/react";

export function Profile() {
  const { data: session } = useSession();

  const user = session?.user;

  if (!user) {
    return (
      <Flex align="center" ml="auto">
        <LoginButton />
      </Flex>
    );
  }

  return (
    <Flex align="center" ml="auto">
      <Box mr="4" textAlign="right">
        <Text color="white">{user?.name}</Text>
        <Text onClick={() => signOut()} as="a" color="white" fontSize="small">
          Sair
        </Text>
      </Box>

      <Avatar size="md" name={user?.name} src={user?.image} />
    </Flex>
  );
}
