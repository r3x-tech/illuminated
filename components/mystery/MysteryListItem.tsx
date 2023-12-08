import { Box, Flex, Text, Button, Image, Stack } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import userStore from "@/stores/userStore";

// Assuming you have these types defined somewhere
type Puzzle = {
  name: string;
  status: "completed" | "uncompleted";
};

type Mystery = {
  title: string;
  description: string;
  imageSrc: string;
  puzzles: Puzzle[];
};

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
    <Flex direction="column" justifyContent="space-between">
      <Flex>
        <Stack direction="column" ml={4} spacing={3}>
          <Text fontSize="xl" fontWeight="bold" color={theme.colors.red}>
            REWARD: {mystery.title}
          </Text>
          <Text
            fontSize="sm"
            color="white"
            cursor="pointer"
            onClick={() => handleCopyClick}
          >
            SHARE LINK
          </Text>
        </Stack>
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
        <Stack direction="column" ml={4} spacing={3}>
          <Text fontSize="xl" fontWeight="bold" color={theme.colors.red}>
            {mystery.title}
          </Text>
          <Text fontSize="sm" color="white">
            {mystery.description}
          </Text>
        </Stack>
      </Flex>

      {/* Row for Puzzles */}
      <Stack direction="column" mt={4} spacing={3}>
        {mystery.puzzles.map((puzzle: Puzzle, index: number) => (
          <Button
            key={index}
            isDisabled={puzzle.status === "completed"}
            rightIcon={
              puzzle.status === "completed" ? (
                <MdCheckCircle color="green.500" />
              ) : undefined
            }
            variant="ghost"
            justifyContent="space-between"
          >
            {puzzle.name}
          </Button>
        ))}
      </Stack>
    </Flex>
  );
};
