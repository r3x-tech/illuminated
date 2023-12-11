import { useEffect, useState } from "react";
import { ethers } from "ethers";
import myContractAbi from "../contracts/abi.json";
import userStore from "@/stores/userStore";

// Extend the Window type to include ethereum
// declare global {
//     interface Window {
//       ethereum: any;
//     }
//   }

// const QUICKNODE_HTTP_ENDPOINT =
//   "https://dimensional-orbital-theorem.matic-testnet.quiknode.pro/e7bb0adb8832096adfa7dd828ac8e4299faa3f23/";
// const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_HTTP_ENDPOINT);

const contractAddress = "0x7673353ef7b4711410fc4db2f3ac42ee099b8b6f";

const HelloWorld = () => {
  const [message, setMessage] = useState("");
  const {
    loggedIn,
    loginType,
    username,
    evm_wallet_address,
    user_info,
    particle,
    ethersProvider,
    ethersSigner,
  } = userStore();

  useEffect(() => {
    const fetchMessage = async () => {
      if (typeof window.ethereum !== "undefined" && ethersProvider) {
        // const provider = new ethers.JsonRpcProvider(window.ethereum);

        const contractInstance = new ethers.Contract(
          contractAddress,
          myContractAbi,
          ethersProvider
        );
        try {
          const data = await contractInstance.sayHello();
          console.log("data from contract:", data);
          setMessage(data);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchMessage();
  }, []);

  return <div>{message || "Loading..."}</div>;
};

export default HelloWorld;
