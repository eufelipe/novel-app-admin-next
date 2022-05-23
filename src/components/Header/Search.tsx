import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import { api } from "@instances/api";
import { ListItem } from "@components/Search/ListItem";

let filterTimeout;

export function Search() {
  const { push } = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [filteredNovels, setFilteredNovels] = useState([]);

  const searchNovels = async (term: string): Promise<any> => {
    const response = await api.get("/game/search", { params: { term } });
    setFilteredNovels(response.data);
  };

  const handleSearch = async (term) => {
    clearTimeout(filterTimeout);
    if (!term) return setFilteredNovels([]);

    filterTimeout = setTimeout(async () => {
      await searchNovels(term);
    }, 500);
  };

  const onSelect = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined,
    id: string
  ) => {
    event.preventDefault();
    setFilteredNovels([]);
    push(`/novels/${id}`);
  };

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
        borderColor="gray.700"
        borderWidth="2px"
        borderRadius="full"
      >
        <Input
          onChange={(event) => handleSearch(event.target.value)}
          ref={searchInputRef}
          color="gray.50"
          placeholder="Buscar por novela"
          variant="unstyled"
          px="4"
          mr="4"
          _placeholder={{ color: "gray.400" }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
      {filteredNovels && filteredNovels.length > 0 && (
        <Flex
          flexDirection="column"
          color="gray.200"
          position="absolute"
          ml="200px"
          mt="0"
          minHeight="200px"
          py="1"
          zIndex={999}
          borderRadius="5"
        >
          <Box py="2" bg="gray.500" borderRadius="5">
            {filteredNovels.map((item, index) => (
              <ListItem key={`id_${index}`} {...item} onSelect={onSelect} />
            ))}
          </Box>
        </Flex>
      )}
    </>
  );
}
