import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import { Box, Text, Grid, Flex } from "@chakra-ui/react";

function CreatePage() {
  const { loggedIn } = userStore();

  return (
    <>
      {loggedIn ? (
        <Box minHeight="100vh">
          <Navbar />
          <Flex
            h="92vh"
            w="100vw"
            bg={theme.colors.background}
            color={theme.colors.lightBlue}
            fontFamily="Montserrat"
            justifyContent="center"
            align="center"
          >
            <Text>CREATE PAGE</Text>
          </Flex>
          <Footer />
        </Box>
      ) : (
        <Box minHeight="100vh">
          <Navbar />
          <Flex
            h="92vh"
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

export default CreatePage;
