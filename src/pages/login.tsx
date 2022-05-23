import { Flex, Image } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoginButton } from "@components/LoginButton";

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

        <LoginButton />
      </Flex>
    </Flex>
  );
}
