import { Button, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export function LoginButton() {
  return (
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
  );
}
