import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    blue: "#005EFF",
    red: "#FE502D",
    green: "#FF4A1F",
    black: "#0B0B0B",
    white: "#E8E8E8",
    gray: "#121213",
    lightGray: "#1A1A1D",
    evenLighterGray: "#3B3B3B",
    input: "#121213",
    background: "#0B0B0B",
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "IBM Plex Mono, monospace",
    montserrat: "Montserrat, sans-serif",
    ibm: "IBM Plex Mono, monospace",
  },
  blacks: {
    400: "#2D2D2D",
    500: "#1B1A1A",
    600: "#151414",
    700: "#0D0D0D",
  },
  green: {
    700: "#00BF63",
  },
  red: {
    700: "#FF3131",
  },
});

export default theme;
