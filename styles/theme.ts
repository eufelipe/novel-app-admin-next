import { extendTheme } from "@chakra-ui/react";

const styles = {
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};

export const theme = extendTheme(styles);
