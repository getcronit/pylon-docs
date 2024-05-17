import {
  baseTheme,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

export const colors = {
  ...baseTheme.colors,
  brand: {
    ...baseTheme.colors.blue,
  },
};

const theme = extendTheme(
  {
    colors,
    styles: {
      global: {},
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
  })
);

export default theme;
