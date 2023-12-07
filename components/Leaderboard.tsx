import React, { useState, useEffect } from "react";
import { Box, Text, List, ListItem, Flex } from "@chakra-ui/react";
import { getLeaderboard, Score } from "../utils/getLeaderboard";
import theme from "@/styles/theme";

export function Leaderboard() {
  const [topScores, setTopScores] = useState<Score[]>([]);

  useEffect(() => {
    getLeaderboard().then((scores: Score[]) => setTopScores(scores));
  }, []);

  return (
    <>
      <Text
        color="white"
        fontSize="21px"
        fontWeight="700"
        width="100%"
        textAlign="start"
      >
        LEADERBOARDS
      </Text>
      <List mt="4rem" width="100%">
        {topScores.length > 0 ? (
          topScores.map((score: Score, index: number) => (
            <Flex key={index} align="center" mb="12px" height="40px">
              <Text
                fontSize="18px"
                fontWeight="800"
                fontFamily="Montserrat"
                color="white"
                width="2ch"
              >
                {index + 1}
              </Text>
              <Box width="100%" ml={1} p={3} backgroundColor="#1A1A1D">
                <Flex justifyContent="space-between" width="100%">
                  <Text fontSize="14px" color="white">
                    {score.user.slice(0, 3) + "..." + score.user.slice(-5)}
                  </Text>
                  <Text fontSize="14px" color="white">
                    {score.score}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))
        ) : (
          <Text color="#fbfbfb" textAlign="start" my="10px" fontSize="0.8rem">
            NO SAVED SCORES FOUND
          </Text>
        )}
      </List>
    </>
  );
}
