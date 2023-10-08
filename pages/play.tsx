import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import { Box, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function PlayPage() {
  const router = useRouter();
  const { loggedIn, solana_wallet_address } = userStore();

  useEffect(() => {
    if (!loggedIn || solana_wallet_address.trim() == "") {
      router.push("/");
    }
  }, [loggedIn, router, solana_wallet_address]);

  return (
    <Box minHeight="100vh" bg="black" color="white" fontFamily="Montserrat">
      <Navbar />
      <Box
        h="85vh"
        w="100vw"
        bg={theme.colors.background}
        color={theme.colors.lightBlue}
        fontFamily="Montserrat"
        justifyContent="center"
      >
        <Grid>
          <Text>Play Page</Text>

          {/* Add other components based on the image reference */}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

export default PlayPage;
