import Image from "next/image";
import { Button, Flex, Stack, Text, Spinner, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { FaDiscord, FaTwitter } from "react-icons/fa";
import theme from "@/styles/theme";
import userStore from "@/stores/userStore";
import toast from "react-hot-toast";
import Web3 from "web3";
import { ParticleNetwork } from "@particle-network/auth";
import { useRouter } from "next/router";
import { useParticle } from "@/contexts/ParticleContextProvider";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const { username, loggedIn } = userStore();
  const context = useParticle();
  let userInfo = null;
  if (!context) {
    // Handle the case where context is not available
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        h="100vh"
        w="100vw"
        bg={theme.colors.background}
      >
        <Flex
          w="100%"
          flexDirection="column"
          align="center"
          justifyContent="center"
          color={theme.colors.red}
          my="4.58rem"
        >
          <Spinner size="sm" />
          <Text mt={3} fontSize="0.75rem" fontWeight="500">
            Loading...
          </Text>
        </Flex>
      </Flex>
    );
  }
  const { particle, ethersProvider, ethersSigner } = context;

  // Correct the parameters for the login function

  useEffect(() => {
    if (loggedIn) {
      // refetchOwnedGames();
      router.push("/play");
    }
  }, [loggedIn, router]);

  const handleLogin = async () => {
    setLoginInProgress(true);

    if (!particle!.auth.isLogin()) {
      userInfo = await particle!.auth.login({
        // when set social login auth type, will open thirdparty auth page directly.
        preferredAuthType: "phone",
        // when set email/phone account and preferredAuthType is email or phone,
        // Particle Auth will enter directly input verification code page.
        // when set JWT value and preferredAuthType is jwt, Particle Auth will auto login.
      });

      let email =
        userInfo.apple_email ||
        userInfo.discord_email ||
        userInfo.facebook_email ||
        userInfo.github_email ||
        userInfo.google_email ||
        userInfo.linkedin_email ||
        userInfo.microsoft_email ||
        userInfo.twitch_email ||
        userInfo.twitter_email ||
        "";

      if (userInfo.phone) {
        userStore.setState({
          loggedIn: true,
          loginType: "PHONE",
          username: userInfo.phone,
          wallet_address: userInfo.wallets[0].public_address,
          user_info: userInfo,
          particle: particle,
          ethersProvider: ethersProvider,
          ethersSigner: ethersSigner,
        });
      } else if (email) {
        userStore.setState({
          loggedIn: true,
          loginType: "EMAIL",
          username: email, // Use the email address as username
          wallet_address: userInfo.wallets[0].public_address,
          user_info: userInfo,
          particle: particle,
          ethersProvider: ethersProvider,
          ethersSigner: ethersSigner,
        });
      } else {
        console.log("No phone or email information available");
        toast.error("Login failed");
      }
    } else {
      userInfo = particle!.auth.getUserInfo();
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
        <Flex justifyContent="center" mb="0rem">
          <Image
            src="/ilmlogocenter.svg"
            alt="Illuminated Logo"
            width={500}
            height={250}
          />
        </Flex>
        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center" // Center the content vertically in the Flex container

          // borderColor={theme.colors.white}
          // border="2px solid white"
          // borderRadius="2px"
        >
          {!isLoginInProgress ? (
            <Stack spacing={5} w="100%">
              {/* <Flex
                flexDirection="row"
                w="100%"
                mt="0rem"
                justifyContent="start"
              >
                <Text
                  fontWeight="600"
                  fontSize="0.75rem"
                  color={theme.colors.red}
                  py="0"
                >
                  LOGIN
                </Text>
              </Flex> */}
              <Flex justifyContent="center" alignItems="center" w="100%">
                <Button
                  onClick={() => handleLogin()}
                  w="20rem"
                  bg={theme.colors.background}
                  py="0.5rem"
                  h="2.25rem"
                  px="2rem"
                  cursor="pointer"
                  borderColor={theme.colors.green}
                  borderWidth="2px"
                  borderRadius="2px"
                  color={theme.colors.green}
                  fontSize="0.75rem"
                  letterSpacing="1px"
                  fontWeight="600"
                  _hover={{
                    color: theme.colors.green,
                    borderColor: theme.colors.green,
                    bg: theme.colors.gray,
                  }}
                >
                  LOGIN
                </Button>
              </Flex>

              <Flex flexDirection="column" mb="1rem"></Flex>
              <Flex w="100%" justifyContent="center">
                <Text
                  fontWeight="600"
                  fontSize="0.75rem"
                  color={theme.colors.red}
                  py="0"
                >
                  DON'T HAVE AN ACCOUNT?{" "}
                </Text>
                <Text
                  fontWeight="800"
                  fontSize="0.75rem"
                  color={theme.colors.red}
                  pl="5"
                  onClick={() => {}}
                >
                  SIGN UP{" "}
                </Text>
              </Flex>

              {/* <WalletMultiButton /> */}
            </Stack>
          ) : (
            <Flex
              w="100%"
              flexDirection="column"
              align="center"
              justifyContent="center"
              color={theme.colors.red}
              my="4.58rem"
            >
              <Spinner size="sm" />
              <Text mt={3} fontSize="0.75rem" fontWeight="500">
                LOGGING IN
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
