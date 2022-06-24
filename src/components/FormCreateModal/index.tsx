import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Input } from "@components/Form/input";
import { useRouter } from "next/router";
import { api } from "@instances/api";

interface FormCreateModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function FormCreateModal({
  isOpen = false,
  onOpen,
  onClose,
}: FormCreateModalProps) {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name) return;

    try {
      setIsLoading(true);
      const { data } = await api.post("/novels/create", {
        name,
        author,
        year,
        date,
      });

      const id = data.id;

      push(`/novels/${id}`);
    } catch (error) {
      setError("Ocorreu um erro ao tentar salvar o registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar novo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="name"
              label="Nome:"
              isRequired
              value={name}
              _hover={{
                bgColor: "gray.500",
                color: "gray.900",
              }}
              onChange={(event) => setName(event.target.value)}
            />

            <Input
              name="author"
              label="Autor:"
              isRequired
              value={author}
              _hover={{
                bgColor: "gray.500",
                color: "gray.900",
              }}
              onChange={(event) => setAuthor(event.target.value)}
            />
            <HStack spacing="24px">
              <Input
                name="date"
                label="Data:"
                type="date"
                isRequired
                value={date}
                _hover={{
                  bgColor: "gray.500",
                  color: "gray.900",
                }}
                onChange={(event) => setDate(event.target.value)}
              />
              <Input
                name="year"
                label="Ano:"
                isRequired
                value={year}
                _hover={{
                  bgColor: "gray.500",
                  color: "gray.900",
                }}
                onChange={(event) => setYear(event.target.value)}
              />
            </HStack>

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
          </ModalBody>

          <Divider mt="5" />
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              disabled={!name}
              colorScheme="cyan"
              isLoading={isLoading}
              variant="solid"
              onClick={handleSave}
            >
              Cadastrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
