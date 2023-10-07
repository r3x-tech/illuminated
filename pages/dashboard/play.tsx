import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Box, Button, Grid, Text } from "@chakra-ui/react";

function PlayPage() {
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
          <Text fontSize="2xl">LIBERTÉ</Text>
          <Button>PLAY</Button>
          {/* Add other components based on the image reference */}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

export default PlayPage;
