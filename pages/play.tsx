import { Navbar } from "@/components/Navbar";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import { Box, Image, Flex, Grid, Input, Text, Button } from "@chakra-ui/react";

function PlayPage() {
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
              w="16.99%"
              borderRightWidth="2px"
            >
              <Flex justifyContent="space-between">
                <Input
                  placeholder="SEARCH GAMES"
                  w="100%"
                  h="2rem"
                  fontSize="0.75rem"
                  bg={theme.colors.input}
                  my="0.25rem"
                  borderRadius="2px"
                  border={theme.colors.input}
                  fontWeight="500"
                  letterSpacing="1px"
                  color={theme.colors.lightBlue}
                  focusBorderColor={theme.colors.lightBlue}
                  _placeholder={{ color: theme.colors.evenLighterBlue }}
                />
                {/* Add sort dropdown or button here */}
              </Flex>
            </Flex>
            <Flex
              direction="column"
              p="2rem"
              h="100%"
              w="83.01%"
              overflowY="auto"
            >
              <Flex direction="column">
                <Text
                  fontSize="1rem"
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  color={theme.colors.lightBlue}
                >
                  MY GAMES
                </Text>
                <Grid templateColumns="repeat(6, 1fr)" gap={8} mt="0.5rem">
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PLAY</Button>
                  </Box>
                </Grid>
              </Flex>

              <Flex direction="column" mt="3rem">
                <Text
                  fontSize="1rem"
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  color={theme.colors.lightBlue}
                >
                  EXPLORE
                </Text>
                <Grid templateColumns="repeat(6, 1fr)" gap="1rem" mt="0.5rem">
                  <Box w="10rem" h="100%">
                    <Image
                      src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-a0ffbc8c70fd33180b6f1bdb1dfd4eb2"
                      alt="Game"
                    />
                    <Button w="100%">PURCHASE</Button>
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
            h="93vh"
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
        </Box>
      )}
    </>
  );
}

export default PlayPage;
