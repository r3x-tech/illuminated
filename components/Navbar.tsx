import {
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  VStack,
  Button,
  useTheme,
  Image,
  Box,
  Tooltip,
  Heading,
  Spinner,
} from "@chakra-ui/react";
// import { useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import userStore from "@/stores/userStore";
import toast from "react-hot-toast";
// import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
import { useParticle } from "@/contexts/ParticleContextProvider";

export const Navbar: React.FC = () => {
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
  const router = useRouter();
  const { pathname } = useRouter();
  const theme = useTheme();
  const [isLogoutInProgress, setLogoutInProgress] = useState(false);

  const getTextColor = (route: string) => {
    if (pathname.includes(route)) {
      return theme.colors.lighterBlue;
    }
    return theme.colors.evenLighterBlue;
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(evm_wallet_address);
      toast.success("Copied Address");
    } catch (err) {
      console.error("Failed to copy address: ", err);
      toast.error("Failed to copy address");
    }
  };

  const formatUsername = (name: string) => {
    if (name.length <= 6 || name == "") {
      return name;
    }
    return `${name.substring(0, 2)}...${name.substring(name.length - 4)}`;
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg={theme.colors.background}
      color={theme.colors.red}
      h="8vh"
      borderBottomWidth="2px"
      // borderTopWidth="2px"
    >
      <Flex
        borderRightWidth="2px"
        w="17%"
        h="100%"
        justifyContent="center"
        align="center"
        p="1rem"
      >
        <Heading fontSize="1.5rem" fontWeight="600" letterSpacing="4px">
          ILLUMINATED
        </Heading>
      </Flex>

      <Flex
        w="70%"
        h="100%"
        justifyContent="start"
        align="center"
        py="1rem"
        px="2rem"
        gap="3rem"
      >
        <Text
          cursor="pointer"
          fontSize="1rem"
          fontWeight="600"
          fontFamily={theme.fonts.heading}
          color={theme.colors.blue}
          onClick={() => router.push("/play")}
        >
          PLAY
        </Text>
        {/* <Text
          cursor="pointer"
          fontSize="1rem"
          fontWeight="600"
          fontFamily={theme.fonts.heading}
          color={getTextColor("/network")}
          onClick={() => {}}

        >
          THE NETWORK
        </Text> */}
      </Flex>
    </Flex>
  );
};
