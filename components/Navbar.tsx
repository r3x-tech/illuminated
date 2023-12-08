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
    wallet_address,
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
      await navigator.clipboard.writeText(wallet_address);
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
          color={getTextColor("/play")}
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

      <Flex
        w="13%"
        h="100%"
        justifyContent="flex-end"
        align="center"
        pr="0.75rem"
      >
        {loggedIn ? (
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                bg={theme.colors.background}
                py="0.5rem"
                h="2rem"
                px="2rem"
                cursor="pointer"
                borderColor={theme.colors.ligherBlue}
                borderWidth="2px"
                borderRadius="2px"
                color={theme.colors.ligherBlue}
                fontSize="0.75rem"
                letterSpacing="1px"
                fontWeight="600"
                _hover={{
                  color: theme.colors.background,
                  borderColor: theme.colors.red,
                  bg: theme.colors.red,
                }}
              >
                {formatUsername(wallet_address)}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              bg={theme.colors.background}
              color={theme.colors.red}
              borderColor={theme.colors.red}
              borderRadius="2px"
              borderWidth="2px"
              minW="10rem"
              w="15rem"
              outline="none"
              zIndex={100}
              boxShadow="1px 1px 20px black"
            >
              <VStack spacing={4} p="1rem">
                <Flex direction="column">
                  <Flex align="center" justifyContent="flex-start" pb="1.25rem">
                    <Box>
                      <Tooltip
                        label="Account"
                        aria-label="Account"
                        bg={theme.colors.black}
                      >
                        <Image
                          src="/profilePic.png"
                          alt="User Profile Pic"
                          boxSize="3rem"
                          ml="-0.25rem"
                          mr="1rem"
                          cursor="pointer"
                          onClick={() => {
                            // router.push("/account");
                          }}
                        />
                      </Tooltip>
                    </Box>
                    <Tooltip
                      label="Address"
                      aria-label="Address"
                      bg={theme.colors.black}
                    >
                      <Text color={theme.colors.red}>
                        {formatUsername(wallet_address)}
                      </Text>
                    </Tooltip>

                    <Tooltip
                      label="Copy"
                      aria-label="Copy"
                      bg={theme.colors.black}
                    >
                      <Flex color={theme.colors.red}>
                        <FaCopy
                          style={{
                            marginLeft: "10px",
                            cursor: "pointer",
                            color: theme,
                          }}
                          onClick={handleCopyClick}
                        />
                      </Flex>
                    </Tooltip>
                  </Flex>
                  <Button
                    variant="outline"
                    borderWidth="2px"
                    borderColor={theme.colors.red}
                    bg={theme.colors.background}
                    borderRadius="2px"
                    fontWeight="600"
                    fontSize="0.75rem"
                    w="100%"
                    mb="0.5rem"
                    h="2.5rem"
                    isDisabled={isLogoutInProgress}
                    isLoading={isLogoutInProgress}
                    spinner={
                      <Flex flexDirection="row" align="center">
                        <Spinner color={theme.colors.red} size="sm" />
                      </Flex>
                    }
                    onClick={async () => {
                      setLogoutInProgress(true);
                      try {
                        if (!particle) {
                          console.error("Particle unavailable");
                          throw Error("Particle unavailable");
                        }
                        particle!.auth
                          .logout()
                          .catch((e) => {
                            console.error(e);
                            throw Error(e);
                          })
                          .then(() => {
                            console.log("logout");
                            userStore.setState({
                              loggedIn: false,
                              loginType: "",
                              username: "",
                              wallet_address: "",
                            });
                            router.push("/");
                            toast.success("Logged out");
                          });
                      } catch (e) {
                        toast.error("Failed to logout");
                      }
                      setLogoutInProgress(false);
                    }}
                    _hover={{
                      color: theme.colors.background,
                      borderColor: theme.colors.red,
                      bg: theme.colors.red,
                    }}
                  >
                    LOGOUT
                  </Button>
                </Flex>
              </VStack>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Button
              onClick={() => router.push("/login")}
              bg={theme.colors.background}
              py="0.5rem"
              h="2rem"
              px="2rem"
              cursor="pointer"
              borderColor={theme.colors.ligherBlue}
              borderWidth="2px"
              borderRadius="2px"
              color={theme.colors.ligherBlue}
              fontSize="0.75rem"
              letterSpacing="1px"
              fontWeight="600"
              _hover={{
                color: theme.colors.background,
                borderColor: theme.colors.red,
                bg: theme.colors.red,
              }}
            >
              LOGIN
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
