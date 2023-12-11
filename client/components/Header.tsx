import {
  Box,
  Button,
  Flex,
  Image,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import theme from "@/styles/theme";
import { IoMdTrophy } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { Leaderboard } from "./Leaderboard";

const Header = ({
  onConnect,
  authStatus,
}: {
  onConnect: () => void;
  authStatus: string;
}) => (
  <Flex
    as="header"
    width="100%"
    justifyContent="center"
    alignItems="flex-end"
    minHeight="40px"
    bg={theme.colors.black}
    mt="0rem"
  >
    {/* <Flex justifyContent="flex-end" alignItems="center" flex="2" h="60px">
        <Image
          src="/assets/meteorsmashlogo.svg"
          alt="REX RETRO"
          width="auto"
          height="90px"
        />
      </Flex> */}
    <Flex
      justifyContent="space-between"
      alignItems="center"
      maxWidth="360px"
      width="100%"
    >
      <Flex flex="1" justifyContent="center">
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Box cursor="pointer">
              <MdLeaderboard size="1.75rem" color="white" />
            </Box>
          </PopoverTrigger>
          <PopoverContent
            color="#fff"
            width="360px"
            border="2px solid white"
            borderRadius="0px"
            bg={theme.colors.black}
            height="645px"
            py={3}
            px={5}
            style={{ marginRight: "-119px" }}
          >
            <PopoverCloseButton
              position="absolute"
              top={4}
              right={4}
              fontSize="0.75rem"
            />
            <Leaderboard />
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  </Flex>
);

export default Header;
