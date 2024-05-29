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
} from "@chakra-ui/react";
import { FaChevronLeft, FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdAttachMoney, MdPhotoLibrary } from "react-icons/md";
import ErrorDialog from "@/components/Modals/errorDialog";
import { extractTextFromFile } from "@/utils/helpers";
import lighthouse from "@lighthouse-web3/sdk";
import * as LitJsSdk from "@lit-protocol/lit-node-client";

const PublishPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const [nftTitle, setNftTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const closeError = () => setIsError(false);

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

  const handleSubmit = async () => {
    console.log("Submit:", {
      file,
      nftTitle,
      description,
      price,
      coverImage,
      termsChecked,
    });
    // Add encryption, minting, and smart contract interaction here
    //upload file content to lighthouse
    const content = localStorage.getItem("savedDocument");
    if (!content) {
      console.log("please reupload  document");
      return;
    }
    const response = await lighthouse.uploadText(
      content as string,
      process.env.LIGHTHOUSE_API_KEY as string
    );
    console.log(response);
    const documentID = response.data.Hash;

    //encrypt this document ID on lit protocol

    // Create our litNodeClient
    const litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: "cayenne",
    });

    await litNodeClient.connect();

    await litNodeClient.connect();
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: "ethereum",
      nonce: LitJsSdk.LitNodeClient.getExpiration(),
    });

    //lit access condition
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: "0x50e2dac5e78B5905CB09495547452cEE64426db2",
        },
      },
      { operator: "or" },
      {
        contractAddress: "0xA80617371A5f511Bf4c1dDf822E6040acaa63e71",
        standardContractType: "ERC721",
        chain: "sepolia",
        method: "balanceOf",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: ">",
          value: "0",
        },
      },
    ];

    //now use this to build the metadata object
    const metadata = {
      document: documentID,
      title: nftTitle,
      description,
    };
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
            <Box h="300px" w="100%" bg="#3d3d3d">
              <Center h="100%">
                <Flex flexDir="column" align="center">
                  <Text> Thumbnail</Text>
                  <Button
                    leftIcon={<MdPhotoLibrary />}
                    mt={2}
                    onClick={() => {}}
                  >
                    Upload
                  </Button>
                </Flex>
              </Center>
            </Box>

            <HStack>
              <InputGroup h="60px">
                <Input
                  borderRadius={"8px"}
                  border={"0.5px solid #3d3d3d"}
                  h="100%"
                  focusBorderColor="#3d3d3d"
                  placeholder="Enter prompt"
                />

                <InputRightAddon
                  h="100%"
                  border={"1px solid #1f2022"}
                  cursor={"pointer"}
                  //   bg="transparent"
                  borderRightRadius={"8px"}
                  bg="#12293d"
                  color="#348fe6"
                >
                  Generate Image
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
                onClick={handleSubmit}
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

export default PublishPage;
