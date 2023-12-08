// // hooks/useEthersProvider.ts
// import { ethers } from "ethers";
// import create from "zustand";
// import { ParticleProvider } from "../context"; // Update the import path as needed

// interface ProviderState {
//   ethersProvider: ethers.providers.Web3Provider | null;
// }

// const useProviderStore = create<ProviderState>(() => ({
//   ethersProvider: null
// }));

// export const useEthersProvider = () => {
//   const { ethersProvider, setEthersProvider } = useProviderStore();

//   const initializeProvider = async (particle: any) => { // Replace 'any' with the correct type for 'particle'
//     if (!ethersProvider) {
//       const particleProvider = new ParticleProvider(particle.auth);
//       const newProvider = new ethers.providers.Web3Provider(particleProvider, "any");
//       setEthersProvider(newProvider);
//     }
//     return ethersProvider;
//   };

//   return { ethersProvider, initializeProvider };
// };
