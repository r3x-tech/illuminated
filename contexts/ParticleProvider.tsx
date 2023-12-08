import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider as ParticleNetworkProvider } from "@particle-network/provider";
import { SolanaWallet } from "@particle-network/solana-wallet";
import { Ethereum } from "@particle-network/chains";
import { ethers } from "ethers";

// Define the context type
interface ParticleContextType {
  particle: ParticleNetwork | null;
  ethersProvider: ethers.providers.Web3Provider | null;
  ethersSigner: ethers.Signer | null;
}

const ParticleContext = createContext<ParticleContextType | null>(null);

export const useParticle = () => useContext(ParticleContext);

// Define the type for the props
interface ParticleContextProviderProps {
  children: ReactNode;
}

export const ParticleProvider = ({
  children,
}: ParticleContextProviderProps) => {
  const [particle, setParticle] = useState<ParticleNetwork | null>(null);
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [ethersSigner, setEthersSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const particle = new ParticleNetwork({
      projectId: "xx",
      clientKey: "xx",
      appId: "xx",
      chainName: Ethereum.name, //optional: current chain name, default Ethereum.
      chainId: Ethereum.id, //optional: current chain id, default 1.
      wallet: {
        //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
        displayWalletEntry: true, //show wallet entry when connect particle.
        defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
        uiMode: "dark", //optional: light or dark, if not set, the default is the same as web auth.
        supportChains: [{ id: 80001, name: "Polygon" }], // optional: web wallet support chains.
        customStyle: {}, //optional: custom wallet style
      },
      securityAccount: {
        //optional: particle security account config
        //prompt set payment password. 0: None, 1: Once(default), 2: Always
        promptSettingWhenSign: 1,
        //prompt set master password. 0: None(default), 1: Once, 2: Always
        promptMasterPasswordSettingWhenLogin: 1,
      },
    });
    const particleProvider = new ParticleNetworkProvider(particle.auth);
    const solanaWallet = new SolanaWallet(particle.auth);
    const ethersProvider = new ethers.providers.Web3Provider(
      particleProvider,
      "any"
    );
    const ethersSigner = ethersProvider.getSigner();

    setParticle(particle);
    setEthersProvider(ethersProvider);
    setEthersSigner(ethersSigner);
  }, []);

  return (
    <ParticleContext.Provider
      value={{ particle, ethersProvider, ethersSigner }}
    >
      {children}
    </ParticleContext.Provider>
  );
};
