import React, { useEffect, useState } from "react";
import {
  Button,
  VStack,
  Input,
  Tab,
  TabList,
  Tabs,
  Flex,
  TabPanels,
  TabPanel,
  Text,
  HStack,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  InputLeftElement,
  InputGroup,
  Slide,
  Box,
  Stack,
  TabIndicator,
  Textarea,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Center,
  InputRightElement,
  InputRightAddon,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWallets, usePrivy } from "@privy-io/react-auth";
import { FaChevronLeft, FaPlus, FaMinus } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import {
  computeCreate2Address,
  extractTextFromFile,
  fetchContent,
} from "@/utils/helpers";
import { useGlobalContext } from "@/contexts/GlobalContext";
import ErrorDialog from "@/components/Modals/errorDialog";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethConnect } from "@lit-protocol/auth-browser";
import {
  deployNFTContract,
  encryptFileWithLitProtocol,
  generateImage,
  getAuthSig,
  getlitNodeClient,
  updateNFTCID,
  uploadEncryptedFile,
  uploadMetadata,
} from "@/utils/marketplace";
import { sepolia } from "viem/chains";

const PublishPage = () => {
  const router = useRouter();
  const { wallets } = useWallets();
  const { smartAccountClient } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const [nftTitle, setNftTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [coverImage, setCoverImage] = useState<any | null>(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const closeError = () => setIsError(false);
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType !== "privy"
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (
        (file && file.type === "application/msword") ||
        (file &&
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      ) {
        setFile(file);
        localStorage.removeItem("savedDocument");
        const reader = new FileReader();
        reader.onload = async () => {
          const content = reader.result as ArrayBuffer;
          const textContent = await extractTextFromFile(content);
          setFileContent(textContent);
        };
        reader.readAsArrayBuffer(file);
      } else {
        setIsError(true);
        setErrorTitle("Unsupported File Format");
        setErrorMessage(
          "Currently, we only accept documents in .doc or .docx format."
        );
      }
    }
  };

  useEffect(() => {
    if (fileContent) {
      localStorage.setItem("savedDocument", JSON.stringify(fileContent));
    }
  }, [fileContent]);

  //   const handleCoverImageChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     if (event.target.files) {
  //       setCoverImage(event.target.files[0]);
  //     }
  //   };

  const publish = async () => {
    if (!file) {
      console.log("please upload a valid document");
      return;
    }

    const smartAccount = await smartAccountClient();
    const ownerAddress = embeddedWallet?.address!;
    const provider = await embeddedWallet?.getEthereumProvider();
    const litNodeClient = await getlitNodeClient();
    const nonce = await litNodeClient.getLatestBlockhash();

    console.log(ownerAddress);
    const predictedNFTAddress = await computeCreate2Address(
      ownerAddress,
      "0.0001",
      nonce
    );

    const deployResponse = await deployNFTContract(
      ownerAddress,
      nonce,
      provider
    );

    if (!deployResponse) {
      console.log("Could not deploy NFT contract");
      return;
    }

    const authSig = await getAuthSig(
      await embeddedWallet?.getEthersProvider(),
      ownerAddress,
      sepolia.id.toString(),
      nonce
    );

    const encryptedJSON = await encryptFileWithLitProtocol(
      authSig,
      ownerAddress,
      predictedNFTAddress,
      litNodeClient,
      file
    );

    const metadata = await uploadEncryptedFile(encryptedJSON, ownerAddress, {
      nftTitle,
      description,
      category,
      coverImage
    });

    const metaDataCID = await uploadMetadata(metadata);

    console.log("metaData CID", metaDataCID);

    const updateResponse = await updateNFTCID(
      predictedNFTAddress,
      metaDataCID,
      ownerAddress,
      provider
    );
    console.log(updateResponse);
  };

  const generateThumbnail = async () => {
    setGenerating(true);
    const _prompt = `$${prompt} 
    
    please use context to generate a thumbnail of n NFT representing the ${
      category || ""
    } document, ${nftTitle}, ${description}

    don't add texts to image
    `;
    const image = await generateImage(_prompt);
    if (image) {
      setGenerating(false);
      setCoverImage(image);
    }
  };

  return (
    <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
      <Box
        px={5}
        py={[1, 1, 8]}
        color="white"
        mt="4"
        bg="#1f2022"
        rounded="md"
        shadow="md"
      >
        <HStack alignItems={"center"} spacing={5}>
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
            leftIcon={<FaChevronLeft />}
            h="50px"
            colorScheme="gray"
            onClick={() => {
              router.back();
            }}
          >
            Return
          </Button>
          <Text
            fontSize={["xl", "xl", "4xl"]}
            fontWeight={"light"}
            letterSpacing={"1.25px"}
          >
            Publish to Marketplace
          </Text>
        </HStack>

        <Stack
          justifyContent={"space-between"}
          direction={["column", "column", "row"]}
          mt={8}
          spacing={4}
        >
          <Box w={["100%", "100%", "50%"]}>
            <Tabs p={0} variant={"unstyled"} colorScheme="purple">
              <TabList>
                <Tab> New File</Tab>
                <Tab>Existing File</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="#D968D0"
                borderRadius="1px"
              />

              <TabPanels pt={4} pb={8} w="100%">
                <TabPanel m={0} position={"relative"} w="100%">
                  <Box position={"relative"} w="100%">
                    <Box
                      borderRadius={"8px"}
                      m={0}
                      border={"2px solid #3d3d3d"}
                      h="60px"
                      left={0}
                      position={"absolute"}
                      w="100%"
                      bg="transparent"
                      display={"flex"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      px={4}
                    >
                      <HStack>
                        <Text>{file ? file.name : "Choose File"}</Text>
                      </HStack>
                    </Box>
                    <Box
                      zIndex={1}
                      mt={-2}
                      ml={3}
                      bg="#1f2022"
                      px={2}
                      top={0}
                      position={"absolute"}
                      fontSize={"xs"}
                    >
                      File
                    </Box>
                  </Box>

                  <Input
                    opacity={0}
                    w="100%"
                    h="57px"
                    type="file"
                    onChange={handleFileChange}
                  />
                </TabPanel>
                <TabPanel>
                  <Box position={"relative"} w="100%">
                    <Input
                      //   readOnly={true}
                      isDisabled={true}
                      borderRadius={"8px"}
                      border={"1px solid #3d3d3d"}
                      h="60px"
                      focusBorderColor="#3d3d3d"
                      placeholder="Coming soon"
                    />
                    <Box
                      zIndex={1}
                      mt={-2}
                      ml={3}
                      bg="#1f2022"
                      px={2}
                      top={0}
                      position={"absolute"}
                      fontSize={"xs"}
                    >
                      IPFS CID
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <VStack w="100%" px={4}>
              <Box position={"relative"} w="100%">
                <Input
                  mb={8}
                  borderRadius={"8px"}
                  border={"1px solid #3d3d3d"}
                  h="60px"
                  focusBorderColor="#D968D0"
                  value={nftTitle}
                  onChange={(e) => setNftTitle(e.target.value)}
                />
                <Box
                  zIndex={1}
                  mt={-2}
                  ml={3}
                  bg="#1f2022"
                  px={2}
                  top={0}
                  position={"absolute"}
                  fontSize={"xs"}
                >
                  Title
                </Box>
              </Box>

              <Box position={"relative"} w="100%">
                <Textarea
                  zIndex={0}
                  borderRadius={"8px"}
                  border={"0.5px solid #3d3d3d"}
                  h="60px"
                  focusBorderColor="#3d3d3d"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Box
                  zIndex={1}
                  mt={-2}
                  ml={3}
                  bg="#1f2022"
                  px={2}
                  top={0}
                  position={"absolute"}
                  fontSize={"xs"}
                >
                  Description
                </Box>
              </Box>

              <HStack mt={8} w="100%" justifyContent={"flex-start"}>
                <FormControl>
                  <Box position={"relative"} w="100%">
                    <Box
                      zIndex={1}
                      mt={-2}
                      ml={3}
                      bg="#1f2022"
                      px={2}
                      top={0}
                      position={"absolute"}
                      fontSize={"xs"}
                    >
                      Category
                    </Box>
                    <Select
                      w="100%"
                      borderRadius={"8px"}
                      border={"1px solid #3d3d3d"}
                      h="60px"
                      value={category}
                      placeholder="Choose"
                      onChange={(e) => setCategory(e.target.value)}
                      color={"white"}
                    >
                      <option value="food">food</option>
                      <option value="health">health</option>
                    </Select>
                  </Box>
                </FormControl>

                <FormControl>
                  <Box position={"relative"} w="100%">
                    <Box
                      zIndex={1}
                      mt={-2}
                      ml={3}
                      bg="#1f2022"
                      px={2}
                      top={0}
                      position={"absolute"}
                      fontSize={"xs"}
                    >
                      Price ($)
                    </Box>
                    <NumberInput
                      w="100%"
                      borderRadius={"8px"}
                      border={"1px solid #3d3d3d"}
                      h="60px"
                      defaultValue={0}
                      min={0}
                      onChange={(valueString) =>
                        setPrice(parseFloat(valueString))
                      }
                      color={"white"}
                    >
                      <NumberInputField h="60px" />
                      <NumberInputStepper h="100%">
                        <NumberIncrementStepper h="100%">
                          <FaPlus color="white" />
                        </NumberIncrementStepper>
                        <NumberDecrementStepper h="100%">
                          <FaMinus color="white" />
                        </NumberDecrementStepper>
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </FormControl>
              </HStack>
              <Text
                mt={2}
                fontSize={"xs"}
                textAlign={"left"}
                fontWeight={"bold"}
              >
                0 ETH
              </Text>
            </VStack>
          </Box>

          <Box w={["100%", "100%", "50%"]} px={[0, 0, 12]}>
            <Box
              h="300px"
              w="100%"
              bg={coverImage ? "transparent" : "#3d3d3d"}
              position={"relative"}
            >
              {coverImage && (
                <Box h="100%" w="100%" as="img" src={coverImage} />
              )}
              <Center h="100%">
                <Flex flexDir="column" align="center">
                  <Box opacity={coverImage ? 0 : 1}>
                    <Text> Thumbnail</Text>
                    <Button
                      leftIcon={<MdPhotoLibrary />}
                      mt={2}
                      onClick={() => {}}
                    >
                      Upload
                    </Button>
                  </Box>
                </Flex>
              </Center>
            </Box>

            <HStack>
              <InputGroup h="60px">
                <Input
                  borderRadius={"8px"}
                  border={"0.5px solid #3d3d3d"}
                  h="100%"
                  value={prompt}
                  focusBorderColor="#3d3d3d"
                  placeholder="Enter prompt"
                  onChange={(e) => setPrompt(e.target.value)}
                  readOnly={generating}
                />

                <InputRightAddon
                  h="100%"
                  border={"1px solid #1f2022"}
                  cursor={generating ? "progress" : "pointer"}
                  borderRightRadius={"8px"}
                  bg="#12293d"
                  color="#348fe6"
                  onClick={!generating ? generateThumbnail : () => {}}
                >
                  {generating ? <Spinner /> : "Generate Image"}
                </InputRightAddon>
              </InputGroup>
            </HStack>

            <Box>
              <Box>
                <Checkbox
                  mt={[8, 8, 12]}
                  isChecked={termsChecked}
                  fontSize={"xs"}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                >
                  I have read and agreed with zeroAI's terms and conditions
                </Checkbox>
              </Box>
              <Button
                px={8}
                w="100%"
                mt={4}
                h="60px"
                bgGradient="linear(to-r, #D968D0, #EB4634)"
                colorScheme="purple"
                onClick={publish}
                fontSize={"xl"}
              >
                Mint
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>

      <ErrorDialog
        isOpen={isError}
        onClose={closeError}
        title={errorTitle}
        message={errorMessage}
      />
    </Slide>
  );
};

// 0x9ca110dd64C94613e10B1ba62B4594FD8165c96a

export default PublishPage;
