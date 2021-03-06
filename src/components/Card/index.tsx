import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Novel } from "@models/novel";
import Link from "next/link";
import { RiPencilLine } from "react-icons/ri";

import { TbMoodEmpty } from "react-icons/tb";

interface CardProps {
  novel: Novel;
}

export function Card({ novel }: CardProps) {
  if (!novel)
    return (
      <Stack w="100%" pt="20" placeContent="center">
        <VStack spacing={4} align="center" justify="center">
          <TbMoodEmpty color="white" opacity={0.1} size={80} />
          <Text textAlign="center" color="white">
            Nenhuma <strong>novela/série</strong> cadastrada pra hoje!
          </Text>
        </VStack>
      </Stack>
    );

  return (
    <Flex align="start">
      <VStack flex={1} align="flex-start">
        <Heading size="lg" fontWeight="normal" color="white" mb="5">
          Produção de Hoje
        </Heading>

        {novel.cover && (
          <Box ml="3" position="relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${novel.cover}`}
              alt={novel.name}
            />

            <Badge
              ml="1"
              colorScheme="green"
              position="absolute"
              top="3"
              left="-2"
            >
              Fotos: {novel.photos.length}
            </Badge>
          </Box>
        )}

        <Heading size="lg" fontWeight="normal" color="white">
          {novel.name}
        </Heading>

        <Text fontSize="sm" color="white" mb="5">
          {novel.dateFormatted}
        </Text>
        <Text fontSize="sm" color="white" mb="5">
          {novel.author} - {novel.year}
        </Text>

        <Link href={`/novels/${novel.id}`} passHref>
          <Button
            as="a"
            size="md"
            fontSize="sm"
            colorScheme="cyan"
            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
          >
            Editar produção
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
}
