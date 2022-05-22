import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";
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
        <Logo />
        {isWideVersion && (
          <Box flex="1">
            <Search />
          </Box>
        )}

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
