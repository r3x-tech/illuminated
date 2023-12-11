import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import theme from "@/styles/theme";
import { ParticleContextProvider } from "@/contexts/ParticleContextProvider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ParticleContextProvider>
          <Component {...pageProps} />
        </ParticleContextProvider>{" "}
        <Toaster />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
