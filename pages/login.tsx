// import EmailLoginModal from "@/components/EmailLoginModal";
import {
  Button,
  Flex,
  Stack,
  Text,
  Spinner,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { FaDiscord, FaTwitter } from "react-icons/fa";
import { RPCError, RPCErrorCode } from "magic-sdk";
import { useMagic } from "@/contexts/MagicProvider";
import theme from "@/styles/theme";
import userStore from "@/stores/userStore";
import toast from "react-hot-toast";
import { WalletMultiButton } from "@/components/WalletMultiButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

function LoginPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const { magic } = useMagic();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();

  const { username, loggedIn } = userStore();

  useEffect(() => {
    if (connection && publicKey && !loggedIn) {
      console.log("public key: ", publicKey);
      console.log("signTransaction: ", signTransaction);
      console.log("signAllTransactions: ", signAllTransactions);

      userStore.setState({
        loggedIn: true,
        loginType: "SOLANA",
        username: publicKey.toString(),
        solana_wallet_address: publicKey.toString(),
      });
    }
  }, [
    connection,
    loggedIn,
    publicKey,
    router,
    signAllTransactions,
    signTransaction,
  ]);

  const handleLogin = async () => {
    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
    }

    console.log("running");

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      console.log("email error");
      setEmailError(true);
    } else {
      try {
        setLoginInProgress(true);
        setEmailError(false);
        console.log("magic: ", magic);

        const account = await magic?.auth.loginWithEmailOTP({
          email,
          showUI: true,
        });

        if (account) {
          const metadata = await magic?.user.getInfo();
          userStore.setState({
            loggedIn: true,
            loginType: "EMAIL",
            username: metadata?.email || "",
            solana_wallet_address: metadata?.publicAddress || "",
          });
          setEmail("");
        } else {
          console.log("no account");
        }
      } catch (e) {
        console.log("login error: " + JSON.stringify(e));
        if (e instanceof RPCError) {
          switch (e.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              toast.error(`${e.message}`);
              break;
            default:
              toast.error("Something went wrong. Please try again");
          }
        }
      } finally {
        setLoginInProgress(false);
      }
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      bg={theme.colors.background}
    >
      <Flex
        direction="column"
        alignItems="center"
        fontFamily="Montserrat"
        p="1rem"
        minWidth="22rem"
      >
        <Flex justifyContent="center">
          <Heading
            fontSize="1.75rem"
            letterSpacing="0.25rem"
            fontWeight="400"
            color={theme.colors.lightBlue}
            mb="1rem"
          >
            LIBERTÉ
          </Heading>
        </Flex>
        <Flex
          w="100%"
          // borderColor={theme.colors.white}
          // border="2px solid white"
          // borderRadius="2px"
        >
          <Stack spacing={4} w="100%">
            {/* <Flex
          flexDirection="row"
          w="100%"
          mt="0rem"
          justifyContent="center"
        >
          <Text fontWeight="600" my="0" py="0">
            LOGIN
          </Text>
        </Flex> */}

            {/* <Flex flexDirection="row" w="100%" mt="1rem" gap="1rem">
              <Button
                leftIcon={
                  <Image
                    src="/googleLogo.webp"
                    alt="Google Logo"
                    boxSize="1rem"
                  />
                }
                variant="outline"
                borderColor={theme.colors.lightBlue}
                border="2px solid"
                borderRadius="2px"
                color={theme.colors.lightBlue}
                width="100%"
                fontSize="0.75rem"
                fontWeight="700"
                _hover={{
                  color: theme.colors.background,
                  backgroundColor: theme.colors.lightBlue,
                  borderColor: theme.colors.lightBlue,
                }}
              >
                GOOGLE
              </Button>
              <Button
                leftIcon={<FaDiscord size="1rem" color="#5666E2" />}
                variant="outline"
                borderColor={theme.colors.lightBlue}
                border="2px solid"
                borderRadius="2px"
                color={theme.colors.lightBlue}
                width="100%"
                fontSize="0.75rem"
                fontWeight="700"
                _hover={{
                  color: theme.colors.background,
                  backgroundColor: theme.colors.lightBlue,
                  borderColor: theme.colors.lightBlue,
                }}
              >
                DISCORD
              </Button>
              <Button
                leftIcon={<FaTwitter size="1rem" color="#1DA1F1" />}
                variant="outline"
                borderColor={theme.colors.lightBlue}
                border="2px solid"
                borderRadius="2px"
                color={theme.colors.lightBlue}
                width="100%"
                fontSize="0.75rem"
                fontWeight="700"
                _hover={{
                  color: theme.colors.background,
                  backgroundColor: theme.colors.lightBlue,
                  borderColor: theme.colors.lightBlue,
                }}
              >
                TWITTER
              </Button>
            </Flex> */}

            <Flex flexDirection="column" mt="1rem">
              <Input
                bg={theme.colors.input}
                w="100%"
                mb="1rem"
                borderRadius="2px"
                border={theme.colors.input}
                fontWeight="500"
                fontSize="0.7rem"
                letterSpacing="1px"
                color={theme.colors.white}
                focusBorderColor={theme.colors.lightBlue}
                _placeholder={{ color: theme.colors.darkerGray }}
                isDisabled={isLoginInProgress}
                onChange={(e) => {
                  if (emailError) setEmailError(false);
                  setEmail(e.target.value);
                }}
                placeholder={
                  username.length > 0 ? "Already logged in" : "EMAIL ADDRESS"
                }
                value={email}
                isInvalid={emailError}
                errorBorderColor="red.300"
              />

              {emailError && <span className="error">Enter a valid email</span>}

              <Button
                bg={theme.colors.lightBlue}
                color={theme.colors.background}
                borderRadius="2px"
                letterSpacing="0.25px"
                fontSize="0.75rem"
                fontWeight="600"
                w="100%"
                isDisabled={
                  isLoginInProgress ||
                  (username.length > 0 ? false : email.length === 0)
                }
                onClick={() => handleLogin()}
                isLoading={isLoginInProgress}
                spinner={
                  <Flex flexDirection="row" align="center">
                    <Spinner color="black" />
                    <Text ml={3}>LOGGING IN</Text>
                  </Flex>
                }
              >
                LOGIN W/ EMAIL
              </Button>
            </Flex>
            <Flex w="100%" justifyContent="center">
              <Text
                fontWeight="600"
                fontSize="0.75rem"
                color={theme.colors.lightBlue}
                py="0"
              >
                OR{" "}
              </Text>
            </Flex>

            <WalletMultiButton />

            {/* <EmailLoginModal
              isLoginModalOpen={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            /> */}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
