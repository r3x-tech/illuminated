import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { SolanaContext } from "@/contexts/SolanaContext";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaContext>
      <WalletModalProvider>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ChakraProvider>
      </WalletModalProvider>
    </SolanaContext>
  );
}
