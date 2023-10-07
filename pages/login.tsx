// import EmailLoginModal from "@/components/EmailLoginModal";
import {
  Button,
  Flex,
  Stack,
  Text,
  Image,
  Box,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { RPCError, RPCErrorCode } from "magic-sdk";
import { useMagic } from "@/contexts/MagicProvider";
import theme from "@/styles/theme";
import userStore from "@/stores/userStore";
import toast from "react-hot-toast";

function LoginPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { magic } = useMagic();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const { username } = userStore();

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
    <Flex justifyContent="center">
      <Box
        h="100vh"
        w="60vw"
        color="white"
        fontFamily="Montserrat"
        justifyContent="center"
      >
        <Stack spacing={4}>
          <Flex justifyContent="center">
            <Text fontSize="2xl">LIBERTÉ</Text>
          </Flex>
          <Flex flexDirection="row" w="100%" mt="0rem" gap="1rem">
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
          </Flex>
          <Button
            leftIcon={
              <Image src="/solLogo.svg" alt="Google Logo" boxSize="1rem" />
            }
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
            SOLANA
          </Button>

          {/* <EmailLoginModal
            isLoginModalOpen={isLoginModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
          /> */}

          <div className="login-method-grid-item-container">
            <Input
              bg={theme.colors.input}
              w="100%"
              my="1rem"
              borderRadius="2px"
              border="none"
              fontWeight="500"
              letterSpacing="1px"
              color="white"
              focusBorderColor="white"
              _placeholder={{ color: theme.colors.darkerGray }}
              isDisabled={isLoginInProgress}
              onChange={(e) => {
                if (emailError) setEmailError(false);
                setEmail(e.target.value);
              }}
              placeholder={
                username.length > 0 ? "Already logged in" : "Email address"
              }
              value={email}
              isInvalid={emailError}
              errorBorderColor="red.300"
            />

            {emailError && <span className="error">Enter a valid email</span>}

            <Button
              bg={theme.colors.white}
              color={theme.colors.black}
              borderRadius="2px"
              letterSpacing="1px"
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
              LOGIN
            </Button>
          </div>
        </Stack>
      </Box>
    </Flex>
  );
}

export default LoginPage;
