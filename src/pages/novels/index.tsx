import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { RiPencilLine } from "react-icons/ri";
import { useInfiniteQuery, useQuery } from "react-query";

import { FormCreateModal } from "@components/FormCreateModal";
import { Header } from "@components/Header";
import { NovelCardList } from "@components/NovelCardList";
import { api } from "@instances/api";
import { Novel } from "@models/novel";
import { NovelQueryResponse } from "@services/load-novels.service";
import { ReportsResponse } from "@services/reports.service";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useCallback } from "react";

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

  const loadReportsFromApi = useCallback(async (): Promise<ReportsResponse> => {
    const response = await api.get<ReportsResponse>(`/novels/dashboard`);
    return response.data;
  }, []);

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

  const { data: reports, isLoading: isLoadingReports } = useQuery(
    "reports",
    loadReportsFromApi
  );

  return (
    <Box maxWidth={1120} margin="0 auto">
      <Header />

      <FormCreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      {reports && (
        <SimpleGrid columns={[2, null, 3]} spacing="20px">
          <Box borderRadius={8} bg="gray.800" p="8" mb="10" mr="10">
            <Flex align="start">
              <VStack>
                <Heading size="lg" fontWeight="normal" color="white" mb="5">
                  Produção de Hoje
                </Heading>

                {reports.today.cover && (
                  <Image
                    width={200}
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${reports.today.cover}`}
                    alt={reports.today.name}
                  />
                )}

                <Heading size="md" fontWeight="normal" color="white">
                  {reports.today.name}
                </Heading>

                <Text fontSize="sm" color="white" mb="5">
                  {reports.today.dateFormatted}
                </Text>
              </VStack>
            </Flex>
          </Box>

          <Box borderRadius={8} bg="gray.800" p="8" mb="10">
            <Flex justify="space-between" align="start">
              <VStack align="start" flex={1}>
                <Heading size="lg" fontWeight="normal" color="white" mb="5">
                  Últimas Produções
                </Heading>

                <NovelCardList novels={reports.latest} />
              </VStack>
            </Flex>
          </Box>

          <Box borderRadius={8} bg="gray.800" p="8" mb="10">
            <Flex justify="space-between" align="start">
              <VStack align="start" flex={1}>
                <Heading size="lg" fontWeight="normal" color="white" mb="5">
                  Próximas Produções
                </Heading>

                <NovelCardList novels={reports.next} />
              </VStack>
            </Flex>
          </Box>
        </SimpleGrid>
      )}

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
