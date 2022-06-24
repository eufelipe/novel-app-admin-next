import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  Icon,
  useBreakpointValue,
  CircularProgress,
  useDisclosure,
} from "@chakra-ui/react";

import { RiPencilLine } from "react-icons/ri";
import { useInfiniteQuery } from "react-query";

import { Header } from "@components/Header";
import { api } from "@instances/api";
import { Novel } from "@models/novel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { NovelQueryResponse } from "@services/load-novels.service";
import { useCallback } from "react";
import React from "react";
import { FormCreateModal } from "@components/FormCreateModal";

export default function Home() {
  const { data: session } = useSession();

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const loadNovelsFromApi = useCallback(
    async (nextPage): Promise<{ results: Novel[]; nextPage: number }> => {
      const response = await api.get<NovelQueryResponse>(
        `/novels?after=${nextPage?.pageParam}`
      );
      const results = response.data?.results;
      return { results, nextPage: response.data.after };
    },
    []
  );

  const {
    data: novels,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery("posts", loadNovelsFromApi, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  return (
    <Box maxWidth={1120} margin="0 auto">
      <Header />

      <FormCreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal" color="white">
            Novelas
          </Heading>

          {!!session && (
            <Button
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              onClick={onToggle}
              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
            >
              Criar novo
            </Button>
          )}
        </Flex>

        {isLoading && <CircularProgress isIndeterminate />}

        {!isLoading && (
          <Table colorScheme="whiteAlpha.100">
            <Thead>
              <Tr>
                <Th>Novela</Th>
                {isWideVersion && <Th>Fotos</Th>}
                {isWideVersion && <Th>Data</Th>}
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {novels?.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group?.results?.map((novel, index) => (
                    <Tr key={novel.id}>
                      <Td px={["4", "4", "6"]}>
                        <Box>
                          <Text
                            textTransform="capitalize"
                            fontWeight="bold"
                            color="gray.500"
                          >
                            {novel.name}
                          </Text>
                          {!isWideVersion && (
                            <>
                              <Text fontSize="12" color="gray.500">
                                {novel?.date}
                              </Text>

                              {novel.photos?.length && (
                                <Text fontSize="12" color="gray.500">
                                  fotos: {novel.photos?.length ?? 0}
                                </Text>
                              )}
                            </>
                          )}
                        </Box>
                      </Td>

                      {isWideVersion && (
                        <Td>
                          <Text color="gray.500">
                            {novel.photos?.length ?? 0}
                          </Text>
                        </Td>
                      )}

                      {isWideVersion && (
                        <Td>
                          <Text color="gray.500">{novel?.date}</Text>
                        </Td>
                      )}
                      <Td>
                        <Link href={`/novels/${novel.id}`} passHref>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="cyan"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            {isWideVersion ? "Editar" : undefined}
                          </Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        )}

        {isError && (
          <Flex
            mb="8"
            p="4"
            justify="space-between"
            align="center"
            bg="red.900"
            borderRadius={8}
          >
            <Text fontSize="12" color="white">
              Ocorreu um erro
            </Text>
          </Flex>
        )}

        {!isLoading && (
          <Flex p="8" align="center" mt="20" justify="center">
            <Button
              size="sm"
              fontSize="sm"
              colorScheme="gray.900"
              isLoading={!isLoading && isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              carregar mais..
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
