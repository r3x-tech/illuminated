import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import userStore from "@/stores/userStore";
import { Box, Text, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function CreatePage() {
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
        bg="black"
        color="white"
        fontFamily="Montserrat"
        justifyContent="center"
      >
        <Grid>
          <Text>Create Page</Text>
          {/* Add other components based on the image reference */}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

export default CreatePage;
