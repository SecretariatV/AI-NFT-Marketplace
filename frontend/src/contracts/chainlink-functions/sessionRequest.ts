
import {
  SecretsManager,
  simulateScript,
  buildRequestCBOR,
  ReturnType,
  decodeResult,
  //@ts-ignore
  Location,
  CodeLanguage,
} from "@chainlink/functions-toolkit";
import sessionContractABi from "../abi/session.json";
import viem from "viem";
import chains from "viem/chains";
import accounts from "viem/accounts";
import { ethers } from "ethers";
import { source } from "./source";


const routerAddress = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
const donId = "fun-ethereum-sepolia-1";
const gatewayUrls = [
  " https://01.functions-gateway.testnet.chain.link/",
  "https://02.functions-gateway.testnet.chain.link/",
];
const explorerUrl = "https://sepolia.etherscan.io/";
const sessionContract = "0xCB953F59095fcFFa6EF6D2Cefded6C5Bc32a7831";

export const updateRequest = async (
  phone: string,
  agent: `0x${string}`,
  _cid?: string
) => {
  const cid = _cid || "QmTCWHEMNXniTxKYq6wjZQM22uoPuvaWVuxVDN7JpmPrHm";
  const concatenated = viem.encodePacked(["string", "address"], [phone, agent]);
  const sessionHash = viem.keccak256(concatenated);

  const secrets = { apiKey: process.env.LIGHTHOUSE_API_KEY as string };
  const slotIdNumber = 0;
  const expirationTimeMinutes = 150;
  const privateKey = `0x${process.env.PRIVATE_KEY}`;
  if (!privateKey)
    throw new Error(
      "private key not provided - check your environment variables"
    );
  const rpcUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL;
  if (!rpcUrl)
    throw new Error(`rpcUrl not provided  - check your environment variables`);

  const account = accounts.privateKeyToAccount(privateKey as `0x${string}`);

  const client = await viem.createWalletClient({
    account,
    chain: chains.sepolia,
    transport: viem.http(rpcUrl),
  });

  console.log("\nMake request...");

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  // First encrypt secrets and upload the encrypted secrets to the DON
  const secretsManager = new SecretsManager({
    signer: signer,
    functionsRouterAddress: routerAddress,
    donId: donId,
  });
  await secretsManager.initialize();

  // Encrypt secrets and upload to DON
  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);

  console.log(
    `Upload encrypted secret to gateways ${gatewayUrls}. slotId ${slotIdNumber}. Expiration in minutes: ${expirationTimeMinutes}`
  );

  // Upload secrets
  const uploadResult = await secretsManager.uploadEncryptedSecretsToDON({
    encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
    gatewayUrls: gatewayUrls,
    slotId: slotIdNumber,
    minutesUntilExpiration: expirationTimeMinutes,
  });

  if (!uploadResult.success)
    throw new Error(`Encrypted secrets not uploaded to ${gatewayUrls}`);

  console.log(
    `\n✅ Secrets uploaded properly to gateways ${gatewayUrls}! Gateways response: `,
    uploadResult
  );

  const donHostedSecretsVersion = parseInt(uploadResult.version.toString());
  const donHostedEncryptedSecretsReference =
    secretsManager.buildDONHostedEncryptedSecretsReference({
      slotId: slotIdNumber,
      version: donHostedSecretsVersion,
    });

  // Encode request
  const functionsRequestBytesHexString = buildRequestCBOR({
    //@ts-ignore
    codeLocation: Location.Inline,
    codeLanguage: CodeLanguage.JavaScript,
    //@ts-ignore
    secretsLocation: Location.DONHosted,
    source: source,
    encryptedSecretsReference: donHostedEncryptedSecretsReference,
    args: [],
    bytesArgs: [],
  });

  //send request to session contract

  const resp = await client.writeContract({
    address: sessionContract,
    abi: sessionContractABi,
    functionName: "startSession",
    account,
    args: [functionsRequestBytesHexString, sessionHash, cid],
  });

  // Log transaction details
  console.log(
    `\n✅ Start new session request sent successfully  ${resp} - Check the explorer ${explorerUrl}/tx/${resp}`
  );
};
