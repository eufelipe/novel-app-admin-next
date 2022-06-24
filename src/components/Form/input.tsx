import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, ...rest }, ref) => {
  return (
    <FormControl>
      {!!label && (
        <FormLabel color="gray.500" htmlFor={name} mb="0">
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="cyan.500"
        bgColor="gray.500"
        color="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.500",
          color: "gray.900",
        }}
        _focus={{
          bgColor: "gray.300",
          color: "gray.900",
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
