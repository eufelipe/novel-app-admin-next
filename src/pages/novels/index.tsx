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
} from "@chakra-ui/react";
import { Header } from "@components/Header";
import { Novel } from "@models/novel";
import { RiPencilLine } from "react-icons/ri";

const DATA: Novel[] = [
  {
    id: "1",
    name: "Avenida Brasil",
    date: "12 de maio de 2022",
    photos: ["photo1", "photo2"],
  },
  {
    id: "2",
    name: "Kubanacan",
    date: "12 de maio de 2022",
    photos: [],
  },
];

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box maxWidth={1120} margin="0 auto">
      <Header />

      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal" color="white">
            Novelas
          </Heading>
        </Flex>

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
            {DATA.map((novel, index) => {
              return (
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
                      <Text color="gray.500">{novel.photos?.length ?? 0}</Text>
                    </Td>
                  )}

                  {isWideVersion && (
                    <Td>
                      <Text color="gray.500">{novel?.date}</Text>
                    </Td>
                  )}
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      {isWideVersion ? "Editar" : undefined}
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
