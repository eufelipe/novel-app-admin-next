import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function Search() {
  return (
    <>
      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        margin="0 auto"
        maxWidth={400}
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          placeholder="Buscar por novela"
          variant="unstyled"
          px="4"
          mr="4"
          _placeholder={{ color: "gray.400" }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
    </>
  );
}
