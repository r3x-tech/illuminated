import { WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { FC, ReactNode, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

export const SolanaContext: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = process.env.NEXT_PUBLIC_RPC_URL;

  const wallets = useMemo(() => [], []);

  const onError = useCallback((error: WalletError) => {
    console.error("Wallet error: " + error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint as string}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <ReactUIWalletModalProviderDynamic>
          {children}
        </ReactUIWalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};
