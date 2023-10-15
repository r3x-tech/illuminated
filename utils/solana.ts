// import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
// import { createNft } from "@metaplex-foundation/mpl-token-metadata";

// export const createTest = async () => {
//   const collectionMint = generateSigner(umi);
//   const response = await createNft(umi, {
//     mint: collectionMint,
//     name: "My Collection",
//     uri: "https://example.com/my-collection.json",
//     sellerFeeBasisPoints: percentAmount(0), // 5.5%
//     isCollection: true,
//   }).sendAndConfirm(umi);
//   console.log(response);
// };

export const createFromMetadata = async () => {
  const myHeaders: Headers = new Headers();
  myHeaders.append("x-api-key", `${process.env.NEXT_PUBLIC_S_KEY}`);
  myHeaders.append("Content-Type", "application/json");

  const raw: string = JSON.stringify({
    network: "devnet",
    metadata_uri:
      "https://gateway.pinata.cloud/ipfs/QmdXMFdDsLHDzHKuP9yyeDKzVUHXsTPhLmwiqotEDAsRAb",
    max_supply: 1,
    collection_address: "AmeH6zUfie2gkFrT7ZZJcimsCCMhtk8PtTKD3Yxitvs5",
    receiver: "3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf",
    fee_payer: "2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc",
    service_charge: {
      receiver: "BFefyp7jNF5Xq2A4JDLLFFGpxLq5oPEFKBAQ46KJHW2R",
      token: "1C3n35poNbm2di6W8YTKjG2BmhaFxmTtbScy1ox2xvY",
      amount: 0.01,
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.shyft.to/sol/v1/nft/create_from_metadata", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const uploadCollectionMetadata = async (metadata: []) => {
  // const collectionNFTMetadata = {
  //     name: `${metadata[0]!.collectionName}`,
  //     symbol: `${metadata[0]!.symbol}`,
  //     description: `${metadata[0]!.description}`,
  //     image: `${imageUri}`,
  //     attributes: [
  //       {
  //         trait_type: "Location",
  //         value: `${rackLocation}`,
  //       },
  //       {
  //         trait_type: "Radius",
  //         value: `${rackRadius}`,
  //       },
  //       {
  //         trait_type: "Creator Link",
  //         value: `${creatorLink}`,
  //       },
  //     ],
  //     properties: {
  //       files: [
  //         {
  //           type: "image/jpg",
  //           uri: `${imageUri}`,
  //         },
  //       ],
  //     },
  //   };

  const response = await fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ metadata }),
    redirect: "follow",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Failed to create collection NFT. Error: ${errorMessage}`);
  }

  return await response.json();
};

export const createCollectionNFT = async (metadata: []) => {
  const response = await fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ metadata }),
    redirect: "follow",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Failed to create collection NFT. Error: ${errorMessage}`);
  }

  return await response.json();
};

export const createCompressedNFT = async (module: []) => {
  const response = await fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ module }),
    redirect: "follow",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Failed to create module. Error: ${errorMessage}`);
  }

  return await response.json();
};
