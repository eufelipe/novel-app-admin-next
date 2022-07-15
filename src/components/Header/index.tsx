import { Box, Button, Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { FaGamepad } from "react-icons/fa";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { Search } from "./Search";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Flex
        w="100%"
        maxWidth={1120}
        h="20"
        mx="auto"
        mt="4"
        mb="10"
        px="6"
        align="center"
        as="header"
      >
        <Link href="/novels" passHref>
          <Box as="a">
            <Logo />
          </Box>
        </Link>
        {isWideVersion && (
          <Box flex="1">
            <Search />
          </Box>
        )}

        <Link href="https://novel-app-web.vercel.app" passHref>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="gray"
            mr="20"
            rightIcon={<Icon as={FaGamepad} fontSize="16" />}
          >
            Abrir Game
          </Button>
        </Link>

        <Profile />
      </Flex>

      {!isWideVersion && (
        <Box flex="1" mb="10">
          <Search />
        </Box>
      )}
    </>
  );
}
