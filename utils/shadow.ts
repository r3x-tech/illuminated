// import bs58 from "bs58";
// import nacl from "tweetnacl";
// import crypto from "crypto";

// // Type definitions
// type FileData = {
//   fileName: string;
//   data: Blob;
//   contentType: string;
// };

// type KeyPair = {
//   secretKey: Uint8Array;
//   publicKey: Uint8Array;
// };

// const SHDW_DRIVE_ENDPOINT = "YOUR_ENDPOINT_HERE"; // Replace with your endpoint

// async function uploadFilesToShadowDrive(
//   files: FileData[],
//   storageAccount: string,
//   keypair: KeyPair
// ): Promise<Response> {
//   const allFileNames: string[] = files.map((file) => file.fileName);
//   const hashSum = crypto.createHash("sha256");
//   const hashedFileNames = hashSum.update(allFileNames.toString());
//   const fileNamesHashed = hashSum.digest("hex");

//   const msg = `Shadow Drive Signed Message:\nStorage Account: ${storageAccount}\nUpload files with hash: ${fileNamesHashed}`;

//   const fd = new FormData();
//   for (let j = 0; j < files.length; j++) {
//     const blob = new Blob([files[j].data], { type: files[j].contentType });
//     fd.append("file", blob, files[j].fileName);
//   }

//   const encodedMessage = new TextEncoder().encode(msg);
//   const signedMessage = nacl.sign.detached(encodedMessage, keypair.secretKey);
//   const signature = bs58.encode(signedMessage);

//   fd.append("message", signature);
//   fd.append("signer", keypair.publicKey.toString());
//   fd.append("storage_account", storageAccount.toString());
//   fd.append("fileNames", allFileNames.toString());

//   const request = await fetch(`${SHDW_DRIVE_ENDPOINT}/upload`, {
//     method: "POST",
//     body: fd,
//   });

//   return request;
// }
