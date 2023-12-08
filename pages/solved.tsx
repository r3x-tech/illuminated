import { Navbar } from "@/components/Navbar";
import { MysteryListItem } from "@/components/mystery/MysteryListItem";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import {
  Box,
  Flex,
  Grid,
  Stack,
  Text,
  Button,
  Tooltip,
  VStack,
  PopoverContent,
  PopoverTrigger,
  Popover,
  Spinner,
  Image,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdMenu, MdLeaderboard } from "react-icons/md";
import { Mystery } from "@/types/types";
import { mysteries } from "@/stores/sampleMysteries";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import { Leaderboard } from "@/components/Leaderboard";
import { transparentize } from "@chakra-ui/theme-tools";

function PlayPage() {
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

  const [showLoginToast, setShowLoginToast] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    } else {
      setShowLoginToast(true);
    }
  }, [loggedIn, router]);

  useEffect(() => {
    if (showLoginToast) {
      toast.success("Logged in");
      setShowLoginToast(false);
    }
  }, [showLoginToast]);

  return (
    <>
      {loggedIn ? (
        <Box minHeight="100vh">
          {/* <Navbar /> */}
          <Flex
            h="100vh"
            w="100vw"
            bgImage="url('/crimeboard.svg')"
            backgroundSize="cover"
            backgroundPosition="center"
            color={theme.colors.red}
            fontFamily="Montserrat"
            justifyContent="space-between"
            align="center"
          >
            <Flex
              h="83vh"
              w="100vw"
              alignItems="center"
              justifyContent="center"
              borderRadius="4px"
            >
              <Stack
                direction="column"
                w="full"
                maxW="480px"
                spacing="1.5rem"
                maxH="90vh"
                overflowY="auto"
                bg={theme.colors.gray}
                p="1.5rem"
                rounded="4px"
              >
                {/* Top Navigation */}
                <Flex
                  w="100%"
                  justifyContent="space-between"
                  align="center"
                  color="white"
                  borderRadius="4px"
                  bg={theme.colors.lightGray}
                >
                  <Flex h="100%" justifyContent="center" align="center">
                    {loggedIn ? (
                      <Popover placement="bottom-start">
                        <PopoverTrigger>
                          {/* <Button
                            bg={theme.colors.background}
                            py="0.5rem"
                            h="2rem"
                            px="2rem"
                            cursor="pointer"
                            borderColor={theme.colors.ligherBlue}
                            borderWidth="2px"
                            borderRadius="4px"
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
                            {formatUsername(evm_wallet_address)}
                          </Button> */}

                          <Button
                            color={theme.colors.blue}
                            fontSize="2rem"
                            cursor="pointer"
                          >
                            <MdMenu />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          bg={theme.colors.lightGray}
                          color={theme.colors.red}
                          borderRadius="2px"
                          borderWidth="0px"
                          mt="1rem"
                          width="432px"
                          h="600px"
                          outline="none"
                          zIndex={100}
                          boxShadow="1px 1px 20px black"
                        >
                          <VStack spacing={4} p="1rem" w="100%">
                            <Flex direction="column">
                              <Flex
                                align="center"
                                justifyContent="flex-start"
                                pb="1.25rem"
                              >
                                <Box>
                                  <Tooltip
                                    label="Account"
                                    aria-label="Account"
                                    bg={theme.colors.black}
                                  >
                                    <Image
                                      src="/profilePic.png"
                                      alt="User Profile Pic"
                                      width="3rem" // Use width instead of boxSize
                                      height="3rem" // Add height to maintain aspect ratio
                                      ml="-0.25rem" // Use ml for margin-left
                                      mr="1rem" // Use mr for margin-right
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
                                    {formatUsername(evm_wallet_address)}
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
                                borderColor={theme.colors.green}
                                color={theme.colors.green}
                                bg="transparent"
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
                                    <Spinner
                                      color={theme.colors.green}
                                      size="sm"
                                    />
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
                                        userStore.setState({
                                          loggedIn: false,
                                          loginType: "",
                                          username: "",
                                          evm_wallet_address: "",
                                          solana_wallet_address: "",
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
                                  color: theme.colors.green,
                                  borderColor: theme.colors.green,
                                  bg: transparentize(theme.colors.white, 0.05),
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
                          onClick={() => router.push("/")}
                          bg={theme.colors.background}
                          py="0.5rem"
                          h="2rem"
                          px="2rem"
                          cursor="pointer"
                          borderColor={theme.colors.ligherBlue}
                          borderWidth="2px"
                          borderRadius="4px"
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
                  <Box position="relative" w="100%">
                    <Flex justifyContent="center">
                      <Image
                        src="/ilmlogocenter.svg"
                        alt="Illuminated Logo"
                        width={150}
                        height={75}
                      />
                    </Flex>
                  </Box>
                  <Flex h="100%" justifyContent="center" align="center">
                    <Popover placement="bottom-end">
                      <PopoverTrigger>
                        <Button
                          color={theme.colors.blue}
                          fontSize="1.75rem"
                          cursor="pointer"
                        >
                          <MdLeaderboard />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        color="#fff"
                        width="432px"
                        border="transparent"
                        borderRadius="4px"
                        bg={theme.colors.lightGray}
                        height="600px"
                        py={3}
                        px={5}
                        // Adjust the positioning as needed, the values here are just an example
                        style={{ marginLeft: "0", marginTop: "1rem" }}
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
                {mysteries.map((mystery: Mystery, index: number) => (
                  <MysteryListItem key={index} mystery={mystery} />
                ))}
              </Stack>
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
            color={theme.colors.red}
            fontFamily="Montserrat"
            justifyContent="center"
            align="center"
          >
            <Grid>
              <Text>AW SHUCKS, PLEASE LOGIN TO USE ILLUMINATED!</Text>
            </Grid>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default PlayPage;
