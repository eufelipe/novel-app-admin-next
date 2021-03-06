import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

type ListItemProps = {
  id: string;
  name: string;
  onSelect: (event: any, id: string) => void;
};

export function ListItem({ id, name, onSelect }: ListItemProps) {
  return (
    <Link href={`/novels/${id}`}>
      <Box
        bg="gray.500"
        w="350px"
        display="flex"
        p="4"
        _hover={{
          bgColor: "gray.400",
        }}
      >
        <Text
          as="a"
          onClick={(event) => onSelect(event, id)}
          textTransform="capitalize"
          fontWeight="bold"
          color="gray.900"
        >
          {name}
        </Text>
      </Box>
    </Link>
  );
}
