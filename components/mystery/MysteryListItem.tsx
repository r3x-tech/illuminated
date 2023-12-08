import { Box, Flex, Text, Button, Image, Stack } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";

import theme from "@/styles/theme";
import toast from "react-hot-toast";
import userStore from "@/stores/userStore";
import { Mystery, Puzzle } from "@/types/types";
import { transparentize } from "@chakra-ui/theme-tools";

// Assuming you have these types defined somewhere
// type Puzzle = {
//   name: string;
//   status: "completed" | "uncompleted";
// };

// type Mystery = {
//   title: string;
//   description: string;
//   imageSrc: string;
//   puzzles: Puzzle[];
// };

export const MysteryListItem = ({ mystery }: { mystery: Mystery }) => {
  const {
    loggedIn,
    loginType,
    username,
    evm_wallet_address,
    user_info,
    particle,
    ethersProvider,
    ethersSigner,
  } = userStore();

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText("https://illuminated.r3x.tech/");
      toast.success("Copied Link");
    } catch (err) {
      console.error("Failed to copy address: ", err);
      toast.error("Failed to copy address");
    }
  };

  return (
    <Flex
      direction="column"
      bg={theme.colors.lightGray}
      p="1.25rem"
      borderRadius="4px"
    >
      <Flex justifyContent="space-between">
        <Flex mb="1.5rem">
          <Text
            fontSize="0.75rem"
            fontWeight="bold"
            color={theme.colors.white}
            mr="0.5rem"
          >
            REWARD:
          </Text>
          <Text fontSize="0.75rem" fontWeight="bold" color={theme.colors.green}>
            {mystery.reward}XP
          </Text>
        </Flex>
        <Flex
          h="100%"
          alignItems="center"
          cursor="pointer"
          onClick={async () => {
            let add = "play";
            try {
              await navigator.clipboard.writeText(
                `https://illuminated.r3x.tech/${add}`
              );
              toast.success("Copied share link");
            } catch (err) {
              console.error("Failed to copy share link: ", err);
              toast.error("Failed to copy share link");
            }
          }}
        >
          <Text fontSize="0.75rem" fontWeight="800" color="white" mr="0.25rem">
            SHARE
          </Text>
          <IoMdShareAlt color="white" />
        </Flex>
      </Flex>
      {/* Row for Image, Title and Description */}
      <Flex>
        <Box flexShrink={0}>
          <Image
            src={mystery.imageSrc}
            alt={mystery.title}
            boxSize="150px"
            objectFit="cover"
            borderRadius="sm"
          />
        </Box>
        <Stack direction="column" ml="1.25rem" spacing={3}>
          <Text fontSize="1rem" fontWeight="bold" color={theme.colors.red}>
            {mystery.title}
          </Text>
          <Text fontSize="0.75rem" color="white">
            {mystery.description}
          </Text>
        </Stack>
      </Flex>

      {/* Row for Puzzles */}
      <Stack direction="column" mt={4} spacing="1.25rem" mb="0.25rem">
        {mystery.puzzles.map((puzzle: Puzzle, index: number) => (
          <Button
            borderRadius="1px"
            borderWidth="2px"
            borderColor={
              puzzle.status === "completed"
                ? theme.colors.evenLighterGray
                : theme.colors.blue
            }
            fontSize="0.75rem"
            key={index}
            isDisabled={puzzle.status === "completed"}
            rightIcon={
              puzzle.status === "completed" ? (
                <Flex justifyContent="center" align="center">
                  <Text color={theme.colors.white} mr={2} fontSize="0.7rem">
                    COMPLETED
                  </Text>

                  <MdCheckCircle color={theme.colors.green} fontSize="1rem" />
                </Flex>
              ) : (
                <Text color={theme.colors.white} fontSize="0.7rem">
                  START &gt;
                </Text>
              )
            }
            color={
              puzzle.status === "completed"
                ? theme.colors.white
                : theme.colors.red
            }
            variant="ghost"
            justifyContent="space-between"
            _hover={
              puzzle.status === "completed"
                ? {
                    color: theme.colors.white,
                    borderColor: theme.colors.evenLighterGray,
                  }
                : {
                    color: theme.colors.red,
                    borderColor: theme.colors.blue,
                    bg: transparentize(theme.colors.white, 0.05),
                  }
            }
            onClick={() => {}}
          >
            {puzzle.name}
          </Button>
        ))}
      </Stack>
    </Flex>
  );
};
