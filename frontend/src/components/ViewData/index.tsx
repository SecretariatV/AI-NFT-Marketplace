import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  VStack,
  Divider,
  Center,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { BiStore } from "react-icons/bi";
import { callWriteContract, convertTimestampToDate } from "@/utils/helpers";
import { encodeFunctionData, formatEther, getAddress, parseEther } from "viem";
import { FaExternalLinkAlt, FaLock, FaLockOpen, FaRobot } from "react-icons/fa";
import AddToKnowledgeBaseModal from "../Modals/AddToKnowledgeBaseModal";
import { addDocument, queryDocument } from "@/utils/agent-creation";
import { useWallets } from "@privy-io/react-auth";
import NFT from "@/utils/NFT.json";

export default function ViewData() {
  const { index, nftData, smartAccountClient } = useGlobalContext();
  const { wallets } = useWallets();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nft, setNft] = useState<any | null>(null);
  const router = useRouter();
  const [searching, setSearching] = useState(true);
  const [hasNFT, setHasNFT] = useState(false);
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType !== "privy"
  );

  const { id } = router.query;

  useEffect(() => {
    function filter() {
      const filter = nftData.filter((nft: any) => nft.id === id);

      if (filter && filter.length > 0) {
        console.log("nfttt", filter);
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

  const handleConsume = async () => {
    const provider = await embeddedWallet?.getEthereumProvider();
    const updateCatalog = await queryDocument(embeddedWallet?.address!);
  };

  const mintDocument = async () => {

    // alert("yess")
    // return
    

    const ownerAddress = embeddedWallet?.address!;
    const provider = await embeddedWallet?.getEthereumProvider();
    const nftAddress = nft.nftAddress;

    if (!provider) {
      console.log("error mate, invalid provider");
      return;
    }

    const callData = encodeFunctionData({
      abi: NFT.abi,
      functionName: "mintNFT",
    });
    const transaction = {
      to: getAddress(nftAddress),
      from: ownerAddress,
      // data: callData,
      value: nft.mintPrice,
    };
    const transactionHash = await provider.request({
      method: "eth_sendTransaction",
      params: [transaction],
    });

    setHasNFT(true);
  };

  // const handleDecrypt = async () => {
  //   const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
  //     litNetwork: "cayenne",
  //   });
  //   await litNodeClient.connect();

  //   const provider = await embeddedWallet?.getEthersProvider();

  //   const authSig = await ethConnect.signAndSaveAuthMessage({
  //     web3: provider!,
  //     account: embeddedWallet?.address!,
  //     chainId: 1,
  //     expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  //     resources: [],
  //     nonce: await litNodeClient.getLatestBlockhash(),
  //   });

  //   //let us decrypt
  //   const recoveredJSON = await fetchContent(
  //     "QmNmkw4xTMTTqxSfLo9CbNDMQswJpdsYQsnpqYccFbAo2J"
  //   );
  //   console.log(recoveredJSON);

  //   const decryptedFile = await LitJsSdk.decryptFromJson({
  //     authSig: authSig,
  //     litNodeClient: litNodeClient,
  //     parsedJsonData: recoveredJSON,
  //   });

  //   console.log(decryptedFile);
  //   if (decryptedFile) {
  //     const fileBlob = new Blob([decryptedFile]);
  //     const file = new File([fileBlob], "decrypted.docx");

  //     const reader = new FileReader();
  //     reader.onload = async () => {
  //       const content = reader.result as ArrayBuffer;
  //       const textContent = await extractTextFromFile(content);
  //       console.log(textContent);
  //       setFileContent(textContent);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  //   return;
  // };

  return (
    <>
      <Flex gap={10}>
        <Button
          bg="#181818"
          _hover={{
            bg: "#181818",
            color: "white",
          }}
          _focus={{
            bg: "#181818",
            color: "white",
          }}
          color="white"
          leftIcon={<BiStore />}
          h="50px"
          colorScheme="gray"
          onClick={() => {
            router.push("/");
          }}
        >
          Return
        </Button>
      </Flex>
      <Box>
        <Box mt={8}>About to display result for this document</Box>

        <Stack mt={4} spacing={4} direction={["column-reverse", "row-reverse"]}>
          <Box
            py={4}
            h="370px"
            bg="#1f2022"
            color={"white"}
            borderRadius={"18px"}
            w={["100%", "100%", "55%"]}
            cursor="pointer"
            position={"relative"}
          >
            <Center px={8}>
              <Avatar
                icon={<FaRobot size={"lg"} />}
                h="100px"
                rounded={"full"}
                border={"2px solid white"}
                w="100px"
                color={"white"}
                bg="whiteAlpha.500"
              />
            </Center>

            <Box
              display={"flex"}
              alignItems={"center"}
              h="100%"
              position={"absolute"}
              justifyContent={"center"}
              w="100%"
              top={0}
              bottom={0}
              px={3}
            >
              <Button
                sx={{
                  bgGradient: "linear(to-r, #D968D0, #EB4634)",
                  color: "white",
                }}
                _hover={{
                  bgGradient: "linear(to-r, #D968D0, #EB4634)",
                  color: "white",
                }}
                _active={{
                  bgGradient: "linear(to-r, #D968D0, #EB4634)",
                  color: "white",
                }}
                borderRadius={"25px"}
                maxW="300px"
                w="100%"
                h="50px"
                px={[3, 3, 4]}
                // isDisabled={true}
                onClick={onOpen}
              >
                CONSUME
              </Button>
            </Box>
          </Box>

          <Box
            py={4}
            px={8}
            minH="370px"
            bg="#1f2022"
            color={"white"}
            borderRadius={"18px"}
            w="100%"
          >
            {nft && (
              <>
                <VStack align={"space-between"}>
                  <Box>
                    <Flex
                      mt={3}
                      align={"flex-start"}
                      justifyContent={"space-between"}
                    >
                      <Text
                        textAlign={"left"}
                        fontSize={"xl"}
                        color={"white"}
                        fontWeight={"bold"}
                        letterSpacing={"1.25px"}
                        as="button"
                      >
                        {nft.metadata.title}
                      </Text>
                    </Flex>

                    <Box mt={4} mr={"40%"}>
                      <Divider />

                      <Text mt={2} fontSize={"xs"}>
                        Published on{" "}
                        {convertTimestampToDate(nft.metadata.publishedAt)}
                      </Text>
                    </Box>

                    <Text
                      mt={8}
                      textAlign={"left"}
                      fontSize={"md"}
                      color={"whiteAlpha.800"}
                      fontWeight={"light"}
                      letterSpacing={"1.25px"}
                      as="button"
                    >
                      {nft.metadata.description}
                    </Text>
                  </Box>

                  <Box mt={8}>
                    <Button
                      h="50px"
                      fontSize={"lg"}
                      bg="white"
                      fontWeight={"bold"}
                      colorScheme="pink"
                      variant={"outline"}
                      w="100%"
                      maxW={"400px"}
                      onClick={mintDocument}
                      leftIcon={<FaLockOpen />}
                      rightIcon={
                        <>
                          <Box w="fit-content" px={1}>
                            {!formatEther(nft.mintPrice.toString)
                              ? "Free"
                              : `${formatEther(nft.mintPrice)} ETH`}
                          </Box>
                        </>
                      }
                    >
                      Unlock Document
                    </Button>

                    <Button
                      mt={4}
                      isDisabled={true}
                      h="50px"
                      fontSize={"lg"}
                      fontWeight={"bold"}
                      colorScheme="pink"
                      variant={"outline"}
                      w="100%"
                      maxW={"400px"}
                      rightIcon={<FaExternalLinkAlt />}
                    >
                      View Document
                    </Button>
                  </Box>
                </VStack>
              </>
            )}
          </Box>
        </Stack>
      </Box>

      <AddToKnowledgeBaseModal
        isOpen={isOpen}
        onClose={onClose}
        onSumbit={handleConsume}
      />
    </>
  );
}
