import { Flex, Box } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { Search } from "./Search";

export function Header() {
  return (
    <Flex
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      as="header"
    >
      <Logo />
      <Box flex="1">
        <Search />
      </Box>
      <Profile />
    </Flex>
  );
}
