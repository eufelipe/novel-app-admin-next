import { Divider, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Novel } from "@models/novel";

import { TbMoodEmpty } from "react-icons/tb";

interface NovelCardListProps {
  novels: Novel[];
}

export function NovelCardList({ novels }: NovelCardListProps) {
  if (!novels.length)
    return (
      <Stack w="100%" pt="20" placeContent="center">
        <VStack spacing={4} align="center" justify="center">
          <TbMoodEmpty color="white" opacity={0.1} size={80} />
          <Text color="white">Nenhum registro encontrado</Text>
        </VStack>
      </Stack>
    );

  return (
    <>
      {novels.map((item) => (
        <>
          <Stack
            key={item.id}
            flexDir="row"
            spacing="10px"
            justify="center"
            align="center"
            pb="2"
          >
            <Image
              width="20"
              mr="5"
              alt={item.name}
              src={
                item.cover &&
                `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${item.cover}`
              }
            />
            <VStack align="start">
              <Text
                fontSize="large"
                color="white"
                textTransform="capitalize"
                lineHeight={1}
              >
                {item.name}
              </Text>
              <Text fontSize="small" color="white" lineHeight={1}>
                {item.dateFormatted}
              </Text>
            </VStack>
          </Stack>

          <Divider borderColor="gray.700" />
        </>
      ))}
    </>
  );
}
