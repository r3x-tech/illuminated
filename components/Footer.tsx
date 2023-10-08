import theme from "@/styles/theme";
import { Box } from "@chakra-ui/react";

export const Footer = () => (
  <Box
    textAlign="center"
    bg={theme.colors.background}
    color={theme.colors.lightBlue}
    padding="1rem 0rem"
    fontFamily="Montserrat"
    fontSize="0.6rem"
    fontWeight="500"
    h="7vh"
    display="flex"
    justifyContent="center"
    alignItems="flex-end"
  >
    2023 LIBERTÉ. All rights reserved.
  </Box>
);
