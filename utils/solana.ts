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
