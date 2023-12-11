import { OwnedGame } from "@/types/types";
import { ParticleNetwork } from "@particle-network/auth";
import { UserInfo } from "@particle-network/auth/lib/types/types";
import { ethers } from "ethers";
import { create } from "zustand";

type Store = {
  loggedIn: boolean;
  loginType: string;
  username: string;
  evm_wallet_address: string;
  solana_wallet_address: string;
  user_info: UserInfo | null;
  userProfilePic: string;
  ownedGames: OwnedGame[];
  particle: ParticleNetwork | null;
  ethersProvider: ethers.providers.Web3Provider | null;
  ethersSigner: ethers.Signer | null;
  setLogin: (
    status: boolean,
    loginType: string,
    username: string,
    evm_wallet_address: string,
    solana_wallet_address: string,
    user_info: UserInfo | null,
    particle: ParticleNetwork | null,
    ethersProvider: ethers.providers.Web3Provider | null,
    ethersSigner: ethers.Signer | null
  ) => void;
  setOwnedGames: (ownedGames: OwnedGame[]) => void;
};

export const userStore = create<Store>((set) => ({
  loggedIn: false,
  loginType: "",
  username: "",
  evm_wallet_address: "",
  solana_wallet_address: "",
  userProfilePic:
    "https://gold-increasing-bonobo-965.mypinata.cloud/ipfs/QmWq2gkfWJuyQJb5jad3u34jdrS7XMD4fNFYbWE1pec4ff?_gl=1*19d17fu*_ga*MjA3NjQ1NTYyNC4xNjk0NTMzODE1*_ga_5RMPXG14TE*MTY5NTEzNzA1OS40LjAuMTY5NTEzNzA1OS42MC4wLjA.",
  ownedGames: [],
  user_info: null,
  particle: null,
  ethersProvider: null,
  ethersSigner: null,
  setLogin: (
    status,
    loginType,
    username,
    evm_wallet_address,
    solana_wallet_address,
    user_info,
    particle,
    ethersProvider,
    ethersSigner
  ) =>
    set({
      loggedIn: status,
      loginType: loginType,
      username: username,
      evm_wallet_address: evm_wallet_address,
      solana_wallet_address: solana_wallet_address,
      user_info: user_info,
      particle: particle,
      ethersProvider: ethersProvider,
      ethersSigner: ethersSigner,
    }),
  setOwnedGames: (ownedGames) =>
    set({
      ownedGames: ownedGames,
    }),
}));

export default userStore;
