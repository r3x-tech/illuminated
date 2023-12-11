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
import { transparentize } from "@chakra-ui/theme-tools";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const { username, loggedIn } = userStore();
  const context = useParticle();
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
    let userInfo = null;

    if (!particle!.auth.isLogin()) {
      userInfo = await particle!.auth.login({
        // when set social login auth type, will open thirdparty auth page directly.
        preferredAuthType: "phone",
        supportAuthTypes: "phone,google",
        // when set email/phone account and preferredAuthType is email or phone,
        // Particle Auth will enter directly input verification code page.
        // when set JWT value and preferredAuthType is jwt, Particle Auth will auto login.
      });
    } else {
      userInfo = particle!.auth.getUserInfo();
    }

    if (!userInfo) {
      console.error("No user info");
      toast.error("Login failed");
      return;
    }

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

    let evmWalletAddress = "";
    let solanaWalletAddress = "";

    // Iterate through the wallets to find EVM and Solana wallets
    userInfo.wallets.forEach((wallet) => {
      if (wallet.chain_name === "evm_chain") {
        evmWalletAddress = wallet.public_address;
      } else if (wallet.chain_name === "solana") {
        solanaWalletAddress = wallet.public_address;
      }
    });

    if (userInfo.phone) {
      console.log("user info phone: ", userInfo);

      userStore.setState({
        loggedIn: true,
        loginType: "PHONE",
        username: userInfo.phone,
        evm_wallet_address: evmWalletAddress,
        solana_wallet_address: solanaWalletAddress,
        user_info: userInfo,
        particle: particle,
        ethersProvider: ethersProvider,
        ethersSigner: ethersSigner,
      });
    } else if (email && email != "") {
      console.log("user info email: ", userInfo);
      userStore.setState({
        loggedIn: true,
        loginType: "EMAIL",
        username: email,
        evm_wallet_address: evmWalletAddress,
        solana_wallet_address: solanaWalletAddress,
        user_info: userInfo,
        particle: particle,
        ethersProvider: ethersProvider,
        ethersSigner: ethersSigner,
      });
    } else {
      console.error("No phone or email information available");
      toast.error("Login failed");
      return;
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      bgImage="url('/detectivehouse.png')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Flex
        direction="column"
        alignItems="center"
        fontFamily="Montserrat"
        p="1rem"
        minWidth="22rem"
        bg="transparent"
      >
        <Flex justifyContent="center" mt="-10rem" mb="1rem">
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
          justifyContent="center"
        >
          {!isLoginInProgress ? (
            <Stack spacing={5} w="100%">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w="100%"
              >
                <Button
                  onClick={() => handleLogin()}
                  w="20rem"
                  bg="transparent"
                  py="0.5rem"
                  h="2.25rem"
                  px="2rem"
                  cursor="pointer"
                  borderColor={theme.colors.green}
                  borderWidth="2px"
                  borderRadius="1px"
                  color={theme.colors.green}
                  fontSize="0.75rem"
                  letterSpacing="1px"
                  fontWeight="600"
                  _hover={{
                    color: theme.colors.green,
                    borderColor: theme.colors.green,
                    bg: transparentize(theme.colors.white, 0.05),
                  }}
                >
                  LOGIN
                </Button>
                <Flex w="100%" justifyContent="center" mt="1.5rem">
                  <Text
                    fontWeight="400"
                    fontSize="0.7rem"
                    color={theme.colors.white}
                    py="0"
                  >
                    DON'T HAVE AN ACCOUNT?{" "}
                  </Text>
                  <Text
                    fontWeight="800"
                    fontSize="0.7rem"
                    color={theme.colors.red}
                    pl="2"
                    textDecoration="underline"
                    onClick={() =>
                      window.open("https://reload.r3x.tech/", "_blank")
                    }
                    cursor="pointer"
                  >
                    SIGN UP{" "}
                  </Text>
                </Flex>
              </Flex>

              {/* <WalletMultiButton /> */}
            </Stack>
          ) : (
            <Flex
              w="100%"
              flexDirection="column"
              align="center"
              justifyContent="center"
              color={theme.colors.green}
              mb="3rem"
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
