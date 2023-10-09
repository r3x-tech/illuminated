import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import { Box, Image, Text, Grid, Flex, Button, Input } from "@chakra-ui/react";

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
            justifyContent="spacebetween"
            align="center"
          >
            <Flex
              direction="column"
              p="1rem"
              h="100%"
              w="17%"
              borderRightWidth="2px"
            >
              <Flex
                direction="column"
                justifyContent="space-between"
                mt="0.75rem"
              >
                <Input
                  placeholder="SEARCH CATALOG"
                  w="100%"
                  h="2rem"
                  fontSize="0.75rem"
                  bg={theme.colors.input}
                  borderRadius="2px"
                  border={theme.colors.input}
                  fontWeight="500"
                  letterSpacing="1px"
                  color={theme.colors.lightBlue}
                  focusBorderColor={theme.colors.lightBlue}
                  _placeholder={{ color: theme.colors.evenLighterBlue }}
                />
                {/* <Flex justifyContent="space-between" mt="1rem">
                  <Text fontSize="0.75rem" cursor="pointer">
                    FILTER
                  </Text>
                  <Text fontSize="0.75rem" cursor="pointer">
                    SORT
                  </Text>
                </Flex> */}
              </Flex>
            </Flex>
            <Flex
              direction="column"
              px="2rem"
              py="1.5rem"
              h="100%"
              w="83%"
              overflowY="auto"
            >
              <Flex
                flexDirection="row"
                w="100%"
                mt="0.25rem"
                mb="2rem"
                gap="1rem"
              >
                <Button
                  variant="outline"
                  borderColor={theme.colors.lightBlue}
                  border="2px solid"
                  borderRadius="2px"
                  color={theme.colors.lightBlue}
                  width="100%"
                  fontSize="0.75rem"
                  fontWeight="700"
                  _hover={{
                    color: theme.colors.background,
                    backgroundColor: theme.colors.lightBlue,
                    borderColor: theme.colors.lightBlue,
                  }}
                >
                  NEW GAME +
                </Button>
                <Button
                  variant="outline"
                  borderColor={theme.colors.lightBlue}
                  border="2px solid"
                  borderRadius="2px"
                  color={theme.colors.lightBlue}
                  width="100%"
                  fontSize="0.75rem"
                  fontWeight="700"
                  _hover={{
                    color: theme.colors.background,
                    backgroundColor: theme.colors.lightBlue,
                    borderColor: theme.colors.lightBlue,
                  }}
                >
                  NEW MODULE +
                </Button>
              </Flex>
              <Flex direction="column">
                <Text
                  fontSize="1rem"
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  color={theme.colors.lightBlue}
                >
                  MY CATALOG
                </Text>
                <Grid templateColumns="repeat(6, 1fr)" gap={8} mt="1rem">
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                      borderRadius="2px"
                    />
                    <Button
                      w="100%"
                      borderWidth="2px"
                      borderRadius="2px"
                      mt="1rem"
                      bg={theme.colors.lightBlue}
                      borderColor={theme.colors.lightBlue}
                      color={theme.colors.background}
                      fontFamily={theme.fonts.heading}
                    >
                      PLAY
                    </Button>
                  </Box>
                </Grid>
              </Flex>
            </Flex>
          </Flex>
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
