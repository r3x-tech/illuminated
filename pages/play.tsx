import { Navbar } from "@/components/Navbar";
import { MysteryListItem } from "@/components/mystery/MysteryListItem";
import userStore from "@/stores/userStore";
import theme from "@/styles/theme";
import { Box, Flex, Grid, Stack, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import { Mystery } from "@/types/types";
import { mysteries } from "@/stores/sampleMysteries";

function PlayPage() {
  const { loggedIn } = userStore();
  const router = useRouter();

  return (
    <>
      {loggedIn ? (
        <Box minHeight="100vh">
          <Navbar />
          <Flex
            h="92vh"
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
              p={4}
              bg="gray.800"
            >
              <Stack
                direction="column"
                w="full"
                maxW="lg"
                spacing={4} // Replace spaceY with spacing
                bg="blue.800"
                rounded="2xl"
                maxH="75vh"
                overflowY="auto"
              >
                {/* Top Navigation */}
                <Flex w="full" justifyContent="between" p={4} color="white">
                  <Button variant="outline" size="lg" iconSpacing={0}>
                    <AiOutlineMenu />
                  </Button>
                  <Box w={12} h={12} position="relative">
                    <Image
                      src="/your-logo-path.png"
                      alt="Logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                  <Button variant="outline" size="lg" iconSpacing={0}>
                    <AiOutlineStar />
                  </Button>
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
