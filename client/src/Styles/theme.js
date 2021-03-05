import { extendTheme } from "@chakra-ui/react";
import NavLink from "./Components/NavLink";

/* Cosmic Cobalt: https://coolors.co/30328a */
const theme = extendTheme({
  colors: {
    brand: {
      100: "#A9AAE1",
      200: "#8688D5",
      300: "#6465C8",
      400: "#3C3EAA",
      500: "#363799",
      600: "#30328A",
      700: "#26276B",
      800: "#1B1C4E",
      900: "#0E0E27",
    },
  },
  components: {
    NavLink,
  },
});

export default theme;
