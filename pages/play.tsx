import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";

function PlayPage() {
  const { loggedIn } = userStore();

  return (
    <>
      {loggedIn ? (
        <Box minHeight="100vh">
          <Navbar />
          <Flex
            h="85vh"
            w="100vw"
            bg={theme.colors.background}
            color={theme.colors.lightBlue}
            fontFamily="Montserrat"
            justifyContent="center"
            align="center"
          >
            <Text>PLAY PAGE</Text>
          </Flex>
          <Footer />
        </Box>
      ) : (
        <Box minHeight="100vh">
          <Navbar />
          <Flex
            h="85vh"
            w="100vw"
            bg={theme.colors.background}
            color={theme.colors.lightBlue}
            fontFamily="Montserrat"
            justifyContent="center"
            align="center"
          >
            <Grid>
              <Text>AW SHUCKS, PLEASE LOGIN TO USE LIBERTE!</Text>
            </Grid>
          </Flex>
          <Footer />
        </Box>
      )}
    </>
  );
}

export default PlayPage;
