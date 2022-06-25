import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

interface FormCreateModalProps {
  onConfirmDelete: () => void;
}

export function DeleteConfirmDialog({ onConfirmDelete }: FormCreateModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();

  const handleConfirmDelete = () => {
    onClose();
    onConfirmDelete();
  };

  return (
    <>
      <Button colorScheme="red" variant="outline" onClick={onOpen}>
        Deletar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Produção
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Você não pode desfazer essa ação depois.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
