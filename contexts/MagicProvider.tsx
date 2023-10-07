import { Magic as MagicBase } from "magic-sdk";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SolanaExtension } from "@magic-ext/solana";
import { OAuthExtension } from "@magic-ext/oauth";
import { AuthExtension } from "@magic-ext/auth";
import { Connection } from "@solana/web3.js";

export type Magic = MagicBase<
  AuthExtension & OAuthExtension[] & SolanaExtension[]
>;

type MagicContextType = {
  magic: Magic | null;
  connection: Connection | null;
};

const MagicContext = createContext<MagicContextType>({
  magic: null,
  connection: null,
});

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);

  const rpcURL = process.env.NEXT_PUBLIC_RPC_URL
    ? process.env.NEXT_PUBLIC_RPC_URL
    : "https://solana-mainnet.g.alchemy.com/v2/9nCoa06gjvDwYyTdV5ruBp2Qe4_wZnaO";

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
      const pk = process.env.NEXT_PUBLIC_MAGIC_API_KEY;
      console.log("magic pk: ", pk);
      const magic = new MagicBase(pk, {
        extensions: [
          new AuthExtension(),
          new OAuthExtension(),
          new SolanaExtension({
            rpcUrl: rpcURL,
          }),
        ],
      });
      const connection = new Connection(rpcURL);
      setMagic(magic);
      setConnection(connection);
    }
  }, [rpcURL]);

  const value = useMemo(() => {
    return {
      magic,
      connection,
    };
  }, [magic, connection]);

  return (
    <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
  );
};

export const useMagic = () => useContext(MagicContext);

export default MagicProvider;
