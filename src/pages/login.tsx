import { Flex, Button, Text, Image } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (session) {
    push("/novels");
    return;
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex width="100%" maxWidth={360} p="8" borderRadius={8} flexDir="column">
        <Image src="/logo.png" alt="Novel" />

        <Button
          width="100%"
          type="submit"
          mt="6"
          size="lg"
          onClick={() => signIn("google")}
        >
          <FaGoogle color="#eba417" />
          <Text ml="4" color="gray.650">
            Sign in with Google
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}
