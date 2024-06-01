import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
  Divider,
  useMediaQuery,
  Step,
  HStack,
  Center,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  Tooltip,
  StepStatus,
  StepTitle,
  useSteps,
  Select,
  Stack,
  InputRightAddon,
  InputGroup,
  Spinner,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  FaAddressBook,
  FaCopy,
  FaExternalLinkAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { title } from "process";
import { createAIAgent } from "@/utils/agent-creation";

const CreateAgentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isCollapsed } = useGlobalContext();
  const [showToolTip, setShowToolTip] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const { wallets } = useWallets();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [selected, setSelected] = useState(0);
  const [ensName, setEnsName] = useState<any | string | null>("");
  const [ensSubName, setSubName] = useState<any | string | null>("");
  const [name, setName] = useState("");
  const [descripiton, setDescripiton] = useState("");
  const [agent, setAgent] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { activeStep, setActiveStep, isCompleteStep } = useSteps({
    index: 0,
  });
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType !== "privy"
  );

  useEffect(() => {
    const ensLookup = async () => {
      if (!wallets) {
        return;
      }
      try {
        const publicClient = createPublicClient({
          chain: mainnet,
          transport: http(),
        });
        if (!publicClient) {
          return;
        }
        const _ensName = await publicClient.getEnsName({
          address: embeddedWallet?.address! as `0x${string}`,
        });
        setEnsName(_ensName);
      } catch (e) {
        console.error(e);
      }
    };
    ensLookup();
  }, [wallets, embeddedWallet]);

  const steps = [
    { title: "Choose from Template" },
    { title: "Creat Index" },
    { title: "Go to Marketplace" },
  ];

  const templates = [
    { title: "Pirate OOze", description: "bicomist Info", icon: "/pirate.svg" },
    { title: "Alien", description: "Date & Time", icon: "/alien.svg" },
    { title: "Wizard", description: "Select Rooms", icon: "/wizard.svg" },
  ];

  const handleSubmit = async () => {
    if (activeStep === 1) {
      if (name.length < 2) {
        setNameError("Name must be at least 2 characters long");
        return;
      } else {
        setNameError(null);
      }
      setActiveStep(activeStep + 1);
      setLoading(true);
      const metadata = {
        name,
        template: "",
        ensSubName: "",
        creator: embeddedWallet?.address,
        descripiton,
        model: "gpt-3",
        chain: "Sepolia",
      };
      const provider = await embeddedWallet?.getEthereumProvider();
      const result = await createAIAgent(
        metadata,
        embeddedWallet?.address!,
        provider
      );
      setAgent(agent);
      setLoading(false);
      setSuccess(true);
      isCompleteStep(2);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Box px={32}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setActiveStep(0);
          setLoading(false);
          setSuccess(false);
          onClose();
        }}
        size={"full"}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay bg={"blackAlpha.900"} />
        <ModalContent
          mt={4}
          mb={8}
          bg="#1f2022"
          color="white"
          h="calc(100%= `10vh`)"
          position={"fixed"}
          top={0}
          borderRadius={"30px"}
          w={["100%", "80%"]}
        >
          {!isMobile && (
            <>
              <ModalHeader
                display={"flex"}
                alignItems={"center"}
                py={8}
                maxW="67%"
                w="100%"
                justifyContent={"space-between"}
                letterSpacing={"1.25px"}
                fontSize={"lg"}
              >
                <Stepper index={activeStep} colorScheme="purple">
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>

                      <Box>
                        <StepTitle>{step.title}</StepTitle>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </ModalHeader>
              <Divider />
            </>
          )}

          <ModalCloseButton />

          <ModalBody>
            {activeStep === 1 && (
              <>
                <Stack
                  w="100%"
                  alignItems={"flex-start"}
                  direction={["column", "row"]}
                  justifyContent={"space-between"}
                  spacing={8}
                >
                  <Box w="100%">
                    <FormControl mt={4} id="name" isInvalid={!!nameError}>
                      <Box position={"relative"} w="100%">
                        <Input
                          w="100%"
                          borderRadius={"8px"}
                          border={"0.5px solid #3d3d3d"}
                          focusBorderColor="#3d3d3d"
                          h="60px"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                        />
                        {nameError && (
                          <Text color="red.200" mt={2} fontSize="xs">
                            {nameError}
                          </Text>
                        )}
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
                          AI Agent
                        </Box>
                      </Box>
                    </FormControl>

                    <FormControl id="descripiton" mt={12}>
                      <Box position={"relative"} w="100%">
                        <Input
                          border={"0.5px solid #3d3d3d"}
                          focusBorderColor="#3d3d3d"
                          placeholder=""
                          w="100%"
                          borderRadius={"8px"}
                          h="60px"
                          value={descripiton}
                          onChange={(e) => setDescripiton(e.target.value)}
                        />
                        <Text fontSize="xs" textAlign="right" color={"gray"}>
                          Optional
                        </Text>

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
                          Short description
                        </Box>
                      </Box>
                    </FormControl>

                    <FormControl id="model" mt={12}>
                      <Box position={"relative"} w="100%">
                        <Select
                          border={"0.5px solid #3d3d3d"}
                          focusBorderColor="#3d3d3d"
                          placeholder=""
                          w="100%"
                          borderRadius={"8px"}
                          h="60px"
                        >
                          <option value="gpt-3">GPT-3</option>
                        </Select>

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
                          Model
                        </Box>
                      </Box>
                    </FormControl>
                  </Box>

                  <Box w="100%">
                    <FormControl mt={4} id="ens">
                      <Box position={"relative"} w="100%">
                        <InputGroup h="60px">
                          <Input
                            w="100%"
                            borderRadius={"8px"}
                            border={"0.5px solid #3d3d3d"}
                            focusBorderColor="#3d3d3d"
                            h="60px"
                            type="text"
                            value={ensSubName}
                            onChange={(e) => setSubName(e.target.value)}
                            placeholder="Enter wrapped sub-name"
                          />

                          <InputRightAddon
                            border={"1px solid #1f2022"}
                            cursor={"pointer"}
                            fontWeight={"bold"}
                            letterSpacing={"1.5px"}
                            borderRightRadius={"8px"}
                            h="60px"
                            bg="gray.700"
                          >
                            {ensName ? ensName : "not found"}
                          </InputRightAddon>
                        </InputGroup>
                        <Flex
                          mt={2}
                          align={"center"}
                          justifyContent={"flex-end"}
                          cursor={"pointer"}
                        >
                          <Text
                            mr={2}
                            fontSize="xs"
                            textAlign="right"
                            color={"pink"}
                          >
                            Register{" "}
                          </Text>

                          <FaExternalLinkAlt color={"pink"} />
                        </Flex>

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
                          ENS Subdomain
                        </Box>
                      </Box>
                    </FormControl>

                    <FormControl mt={12} id="chain">
                      <Box position={"relative"} w="100%">
                        <Input
                          readOnly
                          value={"sepolia"}
                          w="100%"
                          borderRadius={"8px"}
                          border={"0.5px solid #3d3d3d"}
                          focusBorderColor="#3d3d3d"
                          h="60px"
                          type="text"
                          placeholder="Choose a name"
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
                          Base chain
                        </Box>
                      </Box>
                    </FormControl>
                  </Box>
                </Stack>
              </>
            )}

            {!activeStep && (
              <>
                <HStack mt={8} spacing={8} w="100%">
                  {templates.map((item, i) => (
                    <Tooltip
                      opacity={selected === i ? 1 : 0}
                      key={i}
                      isOpen={selected === i && showToolTip}
                      label="Coming soon"
                    >
                      <Box
                        border={i === 0 ? "0.5px solid #db65c1" : "none"}
                        opacity={i === 0 ? 1 : 0.6}
                        py={4}
                        h="300px"
                        bg="#181818"
                        color={"white"}
                        borderRadius={"18px"}
                        w="100%"
                        maxW="270px"
                        cursor="pointer"
                        position={"relative"}
                        display={"flex"}
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        onClick={() => {
                          if (i > 0) {
                            setShowToolTip(true);
                            setSelected(i);
                            setTimeout(() => {
                              setShowToolTip(false);
                            }, 1000);
                          }
                        }}
                      >
                        <Box
                          as="img"
                          src={item.icon}
                          rounded={"full"}
                          w="150px"
                          h="150px"
                        />

                        <Text my={8}>{item.title}</Text>
                      </Box>
                    </Tooltip>
                  ))}
                </HStack>
                <Box />
              </>
            )}

            {activeStep > 1 && (
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                minH="60vh"
              >
                {loading && (
                  <Center>
                    <Spinner size={"xl"} />
                  </Center>
                )}

                {!loading && (
                  <>
                    <VStack>
                      <Box textAlign={"center"} maxW={"500px"}>
                        <Heading mt={4}>
                          Congratulations, {name} is Live on Zero!
                        </Heading>

                        <Box mt={8} position={"relative"} w="100%">
                          <InputGroup h="60px">
                            <Input
                              w="100%"
                              borderRadius={"8px"}
                              border={"0.5px solid #3d3d3d"}
                              focusBorderColor="#3d3d3d"
                              bg="#181818"
                              type="text"
                              placeholder={agent ? agent.agentAddress : ""}
                              readOnly={true}
                            />

                            <InputRightAddon
                              border={"1px solid #1f2022"}
                              cursor={"pointer"}
                              fontWeight={"light"}
                              letterSpacing={"1.5px"}
                              borderRightRadius={"8px"}
                              bg="gray.700"
                            >
                              <FaCopy color={"white"} />
                            </InputRightAddon>
                          </InputGroup>
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
                            Adrress
                          </Box>
                        </Box>

                        <Box mt={8} position={"relative"} w="100%">
                          <InputGroup h="60px">
                            <Input
                              w="100%"
                              borderRadius={"8px"}
                              border={"0.5px solid #db65c1"}
                              focusBorderColor="#3d3d3d"
                              bg="#181818"
                              type="text"
                              placeholder={agent ? agent.indexName : ""}
                              readOnly={true}
                            />

                            <InputRightAddon
                              border={"1px solid #1f2022"}
                              cursor={"pointer"}
                              fontWeight={"light"}
                              letterSpacing={"1.5px"}
                              borderRightRadius={"8px"}
                              bg="gray.700"
                            >
                              <FaExternalLinkAlt color={"white"} />
                            </InputRightAddon>
                          </InputGroup>
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
                            Index ID
                          </Box>
                        </Box>

                        <Box mt={4} position={"relative"} w="100%">
                          <InputGroup h="60px">
                            <Input
                              w="100%"
                              borderRadius={"8px"}
                              border={"0.5px solid #3d3d3d"}
                              focusBorderColor="#3d3d3d"
                              bg="#181818"
                              type="text"
                              placeholder="Phone Number"
                              readOnly={true}
                            />

                            <InputRightAddon
                              border={"1px solid #1f2022"}
                              cursor={"pointer"}
                              fontWeight={"light"}
                              letterSpacing={"1.5px"}
                              borderRightRadius={"8px"}
                              bg="gray.700"
                            >
                              <FaAddressBook color={"white"} />
                            </InputRightAddon>
                          </InputGroup>
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
                            SMS Number
                          </Box>
                        </Box>
                      </Box>

                      <Button
                        mt={12}
                        _hover={{
                          bgGradient: "linear(to-r, #D968D0, #EB4634)",
                          color: "white",
                          border: "none",
                        }}
                        sx={{
                          bgGradient: "linear(to-r, #D968D0, #EB4634)",
                          color: "white",
                          border: "none",
                        }}
                        _active={{
                          bgGradient: "linear(to-r, #D968D0, #EB4634)",
                          color: "white",
                          border: "none",
                        }}
                        h="60px"
                        fontSize={"xl"}
                        borderRadius={"25px"}
                        colorScheme="purple"
                      >
                        Start Shopping for Knoweldge
                      </Button>
                    </VStack>
                  </>
                )}
              </Box>
            )}
          </ModalBody>

          <ModalFooter pb={24}>
            {!loading &&
              (success ? (
                <></>
              ) : (
                <Button
                  //   isDisabled
                  _hover={{
                    bgGradient: "linear(to-r, #D968D0, #EB4634)",
                    color: "white",
                    border: "none",
                  }}
                  sx={{
                    bgGradient: "linear(to-r, #D968D0, #EB4634)",
                    color: "white",
                    border: "none",
                  }}
                  _active={{
                    bgGradient: "linear(to-r, #D968D0, #EB4634)",
                    color: "white",
                    border: "none",
                  }}
                  w="220px"
                  h="60px"
                  colorScheme="purple"
                  mr={3}
                  onClick={handleSubmit}
                >
                  Continue
                </Button>
              ))}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateAgentModal;
