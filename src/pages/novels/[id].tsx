import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Button,
  CircularProgress,
  SimpleGrid,
  VStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { api } from "@instances/api";
import { Header } from "../../components/Header";
import { Novel as NovelModel } from "@models/novel";
import { Input } from "@components/Form/input";
import { uploadPhotoToS3 } from "@services/upload-photo-to-s3.service";
import { useSession } from "next-auth/react";
import { UploadButton } from "@components/UploadButton";
import { RiPencilLine } from "react-icons/ri";
import { formatDate } from "@helpers/format-date";

export default function Novel() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const [files, setFiles] = useState<any[]>([]);
  const [uploadingLoading, setUploadingLoading] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const loadNovel = async (): Promise<NovelModel> => {
    const res = await api.get(`/novels/${id}`);
    return res.data;
  };

  const {
    data: novel,
    refetch,
    isLoading,
  } = useQuery(`novel_${id}`, id ? loadNovel : null);

  const handleSave = async () => {
    if (!date || !name) return;

    try {
      setIsLoadingSave(true);

      await api.post("/novels/store", {
        id,
        name,
        author,
        year,
        date,
      });
      refetch();
      setIsEditMode(false);
    } catch (error) {
      setError("Ocorreu um erro ao tentar salvar o registro");
    } finally {
      setIsLoadingSave(false);
    }
  };

  const handleUpload = (items) => {
    setFiles(items);
  };

  const uploadFile = async () => {
    setUploadingLoading(true);

    await uploadPhotoToS3(String(id), files);

    setFiles([]);
    setUploadingLoading(false);
    refetch();
  };

  const handleDeletePhoto = async (photo: string) => {
    await api.delete("/novels/photos/delete", {
      params: {
        photo,
        id,
      },
    });
    refetch();
  };

  useEffect(() => {
    setName(novel?.name);
    setAuthor(novel?.author);
    setYear(novel?.year);
    setDate(novel?.date);
  }, [novel]);

  if (!session) {
    return (
      <Box maxWidth={1120} margin="0 auto">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
            <Heading
              size="lg"
              fontWeight="normal"
              textTransform="capitalize"
              color="white"
            >
              {novel?.name}
            </Heading>
            <Divider my="6" borderColor="gray.700" />

            <Text color="gray.500">
              Faça a autenticação para editar as informações
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  }

  return (
    <Box maxWidth={1120} margin="0 auto">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          {isLoading && <CircularProgress isIndeterminate />}

          {!isLoading && !!novel && (
            <>
              <HStack spacing="8" justifyContent="space-between">
                <>
                  <Heading
                    size="lg"
                    fontWeight="normal"
                    textTransform="capitalize"
                    color="white"
                  >
                    {novel.name}
                  </Heading>
                  {date && (
                    <HStack>
                      <Text color="white" fontSize="sm">
                        Esse game vai ao ar dia:
                      </Text>
                      <Text color="tomato" fontWeight="bold">
                        {formatDate(date)}
                      </Text>
                    </HStack>
                  )}
                </>

                <Button
                  onClick={() => setIsEditMode(!isEditMode)}
                  size="sm"
                  fontSize="sm"
                  colorScheme="cyan"
                  leftIcon={<RiPencilLine fontSize="16" />}
                >
                  Editar
                </Button>
              </HStack>

              <Divider my="6" borderColor="gray.700" />

              {!isEditMode && (
                <HStack spacing="8" justifyContent="space-between">
                  {novel?.author && (
                    <Text fontSize="lg" color="white">
                      Autor: {novel.author}
                    </Text>
                  )}
                  {novel?.year && (
                    <Text fontSize="lg" color="white">
                      Ano: {novel.year}
                    </Text>
                  )}
                </HStack>
              )}

              {isEditMode && (
                <>
                  <Flex mt="8">
                    <HStack spacing="8" width="100%">
                      <SimpleGrid
                        minChildWidth="240px"
                        spacing={["2", "4"]}
                        w="100%"
                        mb="30"
                      >
                        <Input
                          type="name"
                          value={name}
                          name="name"
                          onChange={(event) => setName(event.target.value)}
                          label="Nome da produção:"
                        />
                        <Input
                          type="date"
                          value={date}
                          name="date"
                          onChange={(event) => setDate(event.target.value)}
                          label="Data no jogo:"
                        />
                        <Input
                          type="author"
                          value={author}
                          name="author"
                          onChange={(event) => setAuthor(event.target.value)}
                          label="Autor:"
                        />
                        <Input
                          w="100px"
                          type="year"
                          value={year}
                          name="year"
                          onChange={(event) => setYear(event.target.value)}
                          label="Ano:"
                        />
                      </SimpleGrid>
                    </HStack>
                  </Flex>
                  <Divider my="6" borderColor="gray.700" />

                  <HStack spacing="4" mr="auto">
                    {!!uploadingLoading ? (
                      <>
                        <Spinner size="sm" color="white" />
                        <Text color="white">enviando....</Text>
                      </>
                    ) : (
                      <UploadButton
                        acceptedTypes="image/*"
                        label="Upload fotos"
                        onChange={handleUpload}
                        allowMultiple={true}
                      />
                    )}
                    {files.length > 0 && !uploadingLoading && (
                      <Button colorScheme="pink" onClick={() => uploadFile()}>
                        Enviar uma nova foto
                      </Button>
                    )}
                  </HStack>
                </>
              )}

              <VStack spacing="8" mt="10">
                <SimpleGrid
                  display="flex"
                  minChildWidth="240px"
                  spacing={["6", "8"]}
                >
                  {(novel?.photos ?? []).map((photo, index) => {
                    return (
                      <VStack key={`id-${index}`}>
                        <Image
                          alt="imagem"
                          width="300px"
                          height="186px"
                          src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${photo}`}
                        />

                        {isEditMode && (
                          <Button
                            onClick={() => handleDeletePhoto(photo)}
                            colorScheme="whiteAlpha"
                          >
                            Remover
                          </Button>
                        )}
                      </VStack>
                    );
                  })}
                </SimpleGrid>
              </VStack>

              <Divider my="6" borderColor="gray.700" />

              {!!error && (
                <Text
                  bg="red.400"
                  align="center"
                  mt="2"
                  p="2"
                  borderRadius="5"
                  color="white"
                >
                  {error}
                </Text>
              )}

              {isEditMode && (
                <HStack spacing="4" justifyContent="space-between">
                  <Link href="/novels" passHref>
                    <Button colorScheme="whiteAlpha" variant="ghost">
                      Cancelar
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSave}
                    colorScheme="cyan"
                    isLoading={isLoadingSave}
                  >
                    Salvar
                  </Button>
                </HStack>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
