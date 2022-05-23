import React, { useState } from "react";
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

export default function Novel() {
  const [date, setDate] = useState<string>();
  const [file, setFile] = useState<any>();
  const [uploadingLoading, setUploadingLoading] = useState(false);

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
    if (!date) return;
    await api.post("/novels/store", {
      id,
      date,
    });
    refetch();
  };

  const handleUpload = (data) => {
    setFile(data.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingLoading(true);
    await uploadPhotoToS3(String(id), file);
    setFile(null);
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

  return (
    <Box maxWidth={1120} margin="0 auto">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          {isLoading && <CircularProgress isIndeterminate />}

          {!isLoading && !!novel && (
            <>
              <Heading
                size="lg"
                fontWeight="normal"
                textTransform="capitalize"
                color="white"
              >
                {novel.name}
              </Heading>

              <Divider my="6" borderColor="gray.700" />

              <Flex mt="8">
                {/* {novel?.photos.length > 4 && ( */}
                <HStack spacing="8" width="80%">
                  <SimpleGrid
                    minChildWidth="240px"
                    spacing={["6", "8"]}
                    w="100%"
                    mb="30"
                  >
                    <Input
                      w="240px"
                      type="date"
                      name="game_date"
                      onChange={(event) => setDate(event.target.value)}
                      label="Data no jogo:"
                    />
                  </SimpleGrid>
                </HStack>
                {/* )} */}

                <HStack spacing="4" mr="auto">
                  {!!uploadingLoading ? (
                    <Text>uploading....</Text>
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e)}
                      accept="image/jpeg"
                    />
                  )}

                  {file && (
                    <Button colorScheme="pink" onClick={() => uploadFile()}>
                      Enviar uma nova foto
                    </Button>
                  )}
                </HStack>
              </Flex>

              <VStack spacing="8">
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

                        <Button
                          onClick={() => handleDeletePhoto(photo)}
                          colorScheme="whiteAlpha"
                        >
                          Remover
                        </Button>
                      </VStack>
                    );
                  })}
                </SimpleGrid>
              </VStack>

              <Divider my="6" borderColor="gray.700" />

              <Flex mt="8" justify="flex-end">
                <HStack spacing="4">
                  <Link href="/novels" passHref>
                    <Button colorScheme="whiteAlpha">Cancelar</Button>
                  </Link>
                  <Button onClick={handleSave} colorScheme="cyan">
                    Salvar
                  </Button>
                </HStack>
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

Novel.auth = true;
