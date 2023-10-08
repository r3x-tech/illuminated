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
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import userStore from "@/stores/userStore";
import toast from "react-hot-toast";
import { useMagic } from "../contexts/MagicProvider";
// import { useState } from "react";
import { FaCopy } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const {
    loggedIn,
    // username,
    loginType,
    solana_wallet_address,
    userProfilePic,
  } = userStore();
  const router = useRouter();
  const theme = useTheme();
  const { magic } = useMagic();

  //   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleWalletLogout = async () => {
    try {
      return;
    } catch (err) {
      console.error("Failed to logout: ", err);
    }
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(solana_wallet_address);
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

  //   useEffect(() => {
  //     if (isAuthenticated && user && !loggedIn && username.trim() == "") {
  //       userStore.setState({
  //         loggedIn: true,
  //         loginType: "WALLET",
  //         username: user.verifiedCredentials[0].address,
  //         solana_wallet_address: user.verifiedCredentials[0].address,
  //       });
  //       setIsLoginModalOpen(false);
  //       toast.success("Logged in");
  //     }
  //   }, [isAuthenticated, loggedIn, user, username]);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="1rem"
      outline="none"
      bg={theme.colors.background}
      color={theme.colors.lightBlue}
      h="8vh"
    >
      <Heading fontSize="1.5rem" fontWeight="600" letterSpacing="4px">
        LIBERTÉ
      </Heading>
      {loggedIn ? (
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Box></Box>
          </PopoverTrigger>

          <PopoverContent
            bg={theme.colors.black}
            color={theme.colors.white}
            borderColor={theme.colors.white}
            borderRadius="0px"
            borderWidth="2px"
            minW="10rem"
            w="15rem"
            outline="none"
            zIndex={100}
            boxShadow="1px 1px 20px black"
          >
            <VStack spacing={4} padding="1rem" align="flex-start">
              <Flex direction="column" align="flex-start">
                <Flex m="0.75rem" align="center">
                  <Box>
                    <Image
                      src={userProfilePic}
                      alt="User Profile Pic"
                      boxSize="3rem"
                      mr="1rem"
                      cursor="pointer"
                      onClick={() => {
                        router.push("/account");
                      }}
                    />
                  </Box>
                  <Tooltip
                    label="Address"
                    aria-label="Address"
                    bg="black"
                    border="1px solid white"
                  >
                    <Text color="white">
                      {formatUsername(solana_wallet_address)}
                    </Text>
                  </Tooltip>

                  <Tooltip
                    label="Copy"
                    aria-label="Copy"
                    bg="black"
                    border="1px solid white"
                  >
                    <Flex
                      color="white"
                      _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      <FaCopy
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={handleCopyClick}
                      />
                    </Flex>
                  </Tooltip>
                </Flex>

                <Button
                  variant="ghost"
                  onClick={() => {
                    router.push("/mymachines");
                  }}
                  _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  My Racks
                </Button>
                {/* <Button
                                  variant="ghost"
                                  onClick={() => {
                                    router.push("/settings");
                                  }}
                                  _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
                                >
                                  Settings
                                </Button> */}
                <Button
                  as="a"
                  href="https://www.r3x.tech/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  Need Help?
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    try {
                      if (loggedIn && loginType == "SOLANA") {
                        await handleWalletLogout();
                      }
                      if ((await magic?.user.isLoggedIn()) && magic) {
                        await magic?.user.logout();
                      }
                      userStore.setState({
                        loggedIn: false,
                        loginType: "",
                        username: "",
                        solana_wallet_address: "",
                      });
                      router.push("/");
                      toast.success("Logged out");
                    } catch (e) {
                      toast.error("Failed to logout");
                    }
                  }}
                  _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  Logout
                </Button>
              </Flex>
            </VStack>
          </PopoverContent>
        </Popover>
      ) : (
        <>
          <Button
            onClick={() => {}}
            variant="outline"
            borderColor={theme.colors.white}
            border="2px solid white"
            borderRadius="2px"
            color={theme.colors.white}
            fontSize="0.75rem"
            letterSpacing="1px"
            fontWeight="700"
            _hover={{
              color: theme.colors.black,
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.white,
            }}
          >
            LOGIN
          </Button>
        </>
      )}
    </Flex>
  );
};
