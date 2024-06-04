import { useEffect, useState } from "react";
import { Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/GlobalContext";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import {
  callReadContract,
  extractTextFromFile,
  fetchContent,
} from "@/utils/helpers";
import { encodeFunctionData, getAddress, toHex } from "viem";
import AddToKnowledgeBaseModal from "../Modals/AddToKnowledgeBaseModal";
import { addDocument, queryDocument } from "@/utils/agent-creation";
import { useWallets } from "@privy-io/react-auth";
import NFT from "@/contracts/abi/NFT.json";
import { getAuthSig, getlitNodeClient } from "@/utils/marketplace";
import { sepolia } from "viem/chains";
import PreviewDocumentModal from "../Modals/PreviewModal";
import DocumentCard from "./DocumentCard";
import ConsumeCard from "./ConsumeCard";
import ViewHeader from "./ViewHeader";


const nftAbi = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    type: "function",
  },
];

export default function ViewData() {
  const { index, nftData } = useGlobalContext();
  const { wallets } = useWallets();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPreviewOpen,
    onOpen: onOpenPreview,
    onClose: onClosePreview,
  } = useDisclosure();
  const [nft, setNft] = useState<any | null>(null);
  const router = useRouter();
  const [searching, setSearching] = useState(true);
  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  // const [isPermitted, setIsPermitted] = useState(false);
  const [checkingPermission, setCheckingPermission] = useState(true);
  const toast = useToast();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType !== "privy"
  );
  const [content, setContent] = useState<any | string | null>(null);

  const { id } = router.query;

  useEffect(() => {
    function filter() {
      const filter = nftData.filter((nft: any) => nft.id === id);
      if (filter && filter.length > 0) {
        // console.log("nfttt", filter);
        setNft(filter[0]);
      }
      setSearching(false);
    }

    if (
      id &&
      id.length > 0 &&
      nftData &&
      nftData.length > 0 &&
      searching &&
      !nft
    ) {
      filter();
    }
  }, [id, nftData, searching, nft]);

  useEffect(() => {
    const checkBalance = async () => {
      const resp = await callReadContract(nft.nftAddress, "balanceOf", nftAbi, [
        embeddedWallet?.address,
      ]);
      if (Number(resp) > 0) {
        setCheckingPermission(false);
        setHasNFT(true);
      } else {
        setHasNFT(false);
        setCheckingPermission(false);
      }
    };
    if (nft && checkingPermission) {
      checkBalance();
    }
  }, [checkingPermission, nft]);

  const handleConsume = async () => {
    if (!embeddedWallet?.address) {
      console.log("no wallet connected");
      return;
    }
    const provider = await embeddedWallet?.getEthereumProvider();
    // const updateCatalog = await queryDocument(embeddedWallet?.address!);
    const upload = await addDocument(
      provider,
      embeddedWallet?.address,
      content,
      router.asPath
    );
    onClose();
    toast({
      status: "success",
      position: "top",
      title: "Document upserted into Index",
    });
  };

  const mintDocument = async () => {
    const provider = await embeddedWallet?.getEthereumProvider();
    if (provider && nft.mintPrice && embeddedWallet?.address) {
      setLoading(true);
      try {
        const callData = encodeFunctionData({
          abi: NFT.abi,
          functionName: "buyNFT"
        });
        const transaction = {
          to: getAddress(nft.nftAddress),
          from: getAddress(embeddedWallet.address),
          data: callData,
          value: toHex(nft.mintPrice),
        };
        const transactionHash = await provider.request({
          method: "eth_sendTransaction",
          params: [transaction],
        });

        setLoading(false);
        router.reload();
        return;
      } catch (e) {
        setLoading(false);
        console.log(e);
        toast({
          title: "Econterred Error",
          position: "top",
          status: "error",
        });
      }
    }
    setHasNFT(true);
  };

  const viewDocument = async () => {
    const document = nft.metadata.document;
    const provider = await embeddedWallet?.getEthersProvider();

    if (!provider || !embeddedWallet?.address) {
      console.log("no provider available", provider);
      return;
    }

    try {
      setUnlocking(true);
      const litNodeClient = await getlitNodeClient();
      const nonce = await litNodeClient.getLatestBlockhash();

      console.log("Signing encryption");
      const authSig = await getAuthSig(
        await embeddedWallet?.getEthersProvider(),
        embeddedWallet.address,
        sepolia.id.toString(),
        nonce
      );

      console.log("fetching encrypted JSON");
      const recoveredJSON = await fetchContent(document);

      console.log("decrypting with LitProtocol");
      const decryptedFile = await LitJsSdk.decryptFromJson({
        authSig: authSig,
        litNodeClient: litNodeClient,
        parsedJsonData: recoveredJSON,
      });

      console.log("viewing decrypted content");
      if (decryptedFile) {
        const fileBlob = new Blob([decryptedFile]);
        const file = new File([fileBlob], "decrypted.docx");

        const reader = new FileReader();
        reader.onload = async () => {
          const content = reader.result as ArrayBuffer;
          const textContent = await extractTextFromFile(content);
          console.log(textContent);
          // setFileContent(textContent);
          setContent(textContent);
          onOpenPreview();
          setUnlocking(false);
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (e) {
      console.log("error trying to view document", e);
      setUnlocking(false);
    }
  };

  return (
    <>
      <ViewHeader checking={checkingPermission} />

      {nft && (
        <>
          <Stack
            mt={4}
            spacing={4}
            direction={["column-reverse", "row-reverse"]}
          >
            <ConsumeCard
              onOpen={onOpen}
              hasNFT={hasNFT}
              isDisabled={!content}
            />

            <DocumentCard
              nft={nft}
              loading={loading}
              mintDocument={mintDocument}
              viewDocument={viewDocument}
              checkMint={checkingPermission}
              showMint={!hasNFT}
              unlocking={unlocking}
            />
          </Stack>

          <AddToKnowledgeBaseModal
            isOpen={isOpen}
            onClose={onClose}
            isDisabled={!content}
            onSumbit={handleConsume}
          />
        </>
      )}

      <PreviewDocumentModal
        isOpen={isPreviewOpen}
        onClose={onClosePreview}
        content={content}
      />
    </>
  );
}
