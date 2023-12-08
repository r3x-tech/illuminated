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

export const ParticleContextProvider = ({
  children,
}: ParticleContextProviderProps) => {
  const [particle, setParticle] = useState<ParticleNetwork | null>(null);
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [ethersSigner, setEthersSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const particle = new ParticleNetwork({
      projectId: "4e07e4f4-42e9-4d90-8119-1fb10acf85b4",
      clientKey: "ckLbj6pn1lXicr3E0cBowzOBuJ16a49Ltmp9n3tB",
      appId: "45ec9f2f-7634-49aa-8d6b-0f1d9799868c",
      chainName: "polygon", //optional: current chain name, default Ethereum.
      chainId: 80001, //optional: current chain id, default 1.
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
        promptSettingWhenSign: 2,
        //prompt set master password. 0: None(default), 1: Once, 2: Always
        promptMasterPasswordSettingWhenLogin: 1,
      },
    });

    // let provider = Object.create(particleProvider);
    //     const ParticleWallet = document.getElementById("ParticleWallet");
    //     const MetaMaskWallet = document.getElementById("MetaMaskWallet");
    //     ParticleWallet.onclick = async () => {
    //       provider = Object.create(particleProvider);
    //       ethersProvider = new ethers.providers.Web3Provider(provider, "any");
    //     };
    //     MetaMaskWallet.onclick = async () => {
    //       if (window.ethereum) {
    //         provider = Object.create(window.ethereum);
    //       }
    //       ethersProvider = new ethers.providers.Web3Provider(provider, "any");
    //     };
    //     const accounts = await provider.request({
    //       method: "eth_requestAccounts",
    //     });
    const particleProvider = new ParticleNetworkProvider(particle.auth);
    if (typeof window !== "undefined") {
      window.ethereum = particleProvider;
    }

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
