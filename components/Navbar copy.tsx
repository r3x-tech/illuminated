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
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Modal,
  ModalCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaBars,
  FaMap,
  FaPhoneAlt,
  FaGoogle,
  FaEnvelope,
  FaDiscord,
  FaTwitter,
  FaEthereum,
  FaCopy,
} from "react-icons/fa";
import { useRouter } from "next/router";
import userStore from "@/stores/userStore";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
// import { Magic } from "magic-sdk";
// import { OAuthExtension } from "@magic-ext/oauth";
import toast from "react-hot-toast";
import EmailLoginModal from "./modals/EmailLoginModal";
import { useMagic } from "./MagicProvider";

export const Navbar: React.FC = () => {
  const {
    loggedIn,
    username,
    loginType,
    solana_wallet_address,
    userProfilePic,
  } = userStore();
  const router = useRouter();
  const theme = useTheme();
  const { user, isAuthenticated, handleLogOut } = useDynamicContext();
  const { magic } = useMagic();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleMapClick = () => {
    router.push("/");
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

  useEffect(() => {
    if (isAuthenticated && user && !loggedIn && username.trim() == "") {
      userStore.setState({
        loggedIn: true,
        loginType: "WALLET",
        username: user.verifiedCredentials[0].address,
        solana_wallet_address: user.verifiedCredentials[0].address,
      });
      setIsLoginModalOpen(false);
      toast.success("Logged in");
    }
  }, [isAuthenticated, loggedIn, user, username]);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="1rem"
      outline="none"
    >
      {loggedIn ? (
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Box>
              <FaBars
                size="1.5rem"
                cursor="pointer"
                style={{ outline: "none" }}
              />
            </Box>
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
                      if (isAuthenticated) {
                        await handleLogOut();
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
            onClick={openLoginModal}
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
          <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} isCentered>
            <ModalOverlay style={{ backdropFilter: "blur(3px)" }} />
            <ModalContent
              bg="black"
              color="white"
              border="2px solid white"
              borderRadius="2px"
              py="1rem"
            >
              <ModalHeader fontWeight="800" my="0" py="0">
                LOGIN
              </ModalHeader>
              <ModalBody>
                {/* <Flex flexDirection="row" w="100%" mt="0rem" gap="1rem">
                  <Button
                    leftIcon={
                      <Image
                        src="/googleLogo.webp"
                        alt="Google Logo"
                        boxSize="1rem"
                      />
                    }
                    variant="outline"
                    borderColor={theme.colors.white}
                    border="2px solid white"
                    borderRadius="2px"
                    color={theme.colors.white}
                    width="100%"
                    fontSize="0.75rem"
                    mb="1rem"
                    fontWeight="700"
                    _hover={{
                      color: theme.colors.black,
                      backgroundColor: theme.colors.white,
                      borderColor: theme.colors.white,
                    }}
                  >
                    GOOGLE
                  </Button>
                  <Button
                    leftIcon={<FaDiscord size="1rem" color="#5666E2" />}
                    variant="outline"
                    borderColor={theme.colors.white}
                    border="2px solid white"
                    borderRadius="2px"
                    color={theme.colors.white}
                    width="100%"
                    fontSize="0.75rem"
                    mb="1rem"
                    fontWeight="700"
                    _hover={{
                      color: theme.colors.black,
                      backgroundColor: theme.colors.white,
                      borderColor: theme.colors.white,
                    }}
                  >
                    DISCORD
                  </Button>
                  <Button
                    leftIcon={<FaTwitter size="1rem" color="#1DA1F1" />}
                    variant="outline"
                    borderColor={theme.colors.white}
                    border="2px solid white"
                    borderRadius="2px"
                    color={theme.colors.white}
                    width="100%"
                    fontSize="0.75rem"
                    mb="1rem"
                    fontWeight="700"
                    _hover={{
                      color: theme.colors.black,
                      backgroundColor: theme.colors.white,
                      borderColor: theme.colors.white,
                    }}
                  >
                    TWITTER
                  </Button>
                </Flex> */}
                <EmailLoginModal
                  isLoginModalOpen={isLoginModalOpen}
                  setIsLoginModalOpen={setIsLoginModalOpen}
                />
                {/* 
                <Button
                  leftIcon={<FaPhoneAlt size="1rem" />}
                  variant="outline"
                  borderColor={theme.colors.white}
                  border="2px solid white"
                  borderRadius="2px"
                  color={theme.colors.white}
                  width="100%"
                  fontSize="0.75rem"
                  mb="1rem"
                  fontWeight="700"
                  _hover={{
                    color: theme.colors.black,
                    backgroundColor: theme.colors.white,
                    borderColor: theme.colors.white,
                  }}
                >
                  PHONE
                </Button> */}
                <DynamicWidget
                  innerButtonComponent={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Image
                        src="/solLogo.svg"
                        alt="Solana Logo"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.5rem",
                        }}
                      />
                      <p>SOLANA</p>
                    </div>
                  }
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}

      <Text
        fontSize="1.5rem"
        fontFamily="Montserrat"
        fontWeight="900"
        // fontStyle="italic"
        letterSpacing="4px"
      >
        RACKS
      </Text>

      <FaMap size="1.5rem" cursor="pointer" onClick={handleMapClick} />
    </Flex>
  );
};
