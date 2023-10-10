// pages/games/[gameId].tsx
import { Navbar } from "@/components/Navbar";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { useEffect, useState } from 'react';

const GamePage = () => {
  const router = useRouter();
  const { loggedIn } = userStore();

  const { gameId } = router.query; // Get gameId from the URL

  // State to store game data
  //   const [gameData, setGameData] = useState(null);

  const gameData = {
    gameId: gameId,
    title: "Test Game",
    description:
      "The best test game that was ever created to test liberte and all game networks world wide. It is truly increadible and amazing",
  };

  //   useEffect(() => {
  //     // Fetch game data based on gameId
  //     if (gameId) {
  //       // Replace this with your actual API endpoint
  //       fetch(`/api/games/${gameId}`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setGameData(data);
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching game data:', error);
  //         });
  //     }
  //   }, [gameId]);

  if (!gameData) {
    // Loading state or error handling can be added here
    return <div>Loading...</div>;
  }

  // Render the game data on the page
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
              px="2rem"
              py="1.5rem"
              h="100%"
              w="100%"
              overflowY="auto"
            >
              <div>
                <h1>{gameData.title}</h1>
                <p>{gameData.description}</p>
                {/* Add more game details here */}
              </div>
              <Flex direction="column"></Flex>
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
};

export default GamePage;
