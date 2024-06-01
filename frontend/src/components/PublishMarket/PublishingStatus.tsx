import { useGlobalContext } from "@/contexts/GlobalContext";
import {
  Text,
  Button,
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  VStack,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import { FaCopy, FaExternalLinkAlt, FaAddressBook } from "react-icons/fa";

export default function PublishingStatus({
  isLoading,
  isSuccess,
  name,
  nftAddress,
  progress,
  close,
}: {
  isLoading: boolean;
  isSuccess: boolean;
  name: string;
  nftAddress: string | null;
  progress: string;
  close?: any;
}) {
  const { setIndex } = useGlobalContext();
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    nftAddress ? nftAddress : ""
  );

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        minH="60vh"
      >
        {isLoading && (
          <Center>
            <Spinner size={"xl"} />
          </Center>
        )}

        {isLoading && progress && (
          <Center mt={4}>
            <Text
              fontSize="xl"
              fontWeight={"semibold"}
              letterSpacing={"1.25px"}
            >
              {progress}
            </Text>
          </Center>
        )}

        {!isLoading && isSuccess && (
          <>
            <VStack>
              <Box textAlign={"center"} maxW={"500px"}>
                <Heading mt={4}>
                  Yay! 🎉, {name} is Live on Zero Marketplace!
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
                      placeholder={nftAddress ? nftAddress : ""}
                      readOnly={true}
                    />
                    <Tooltip
                      bg="white"
                      color={"green.500"}
                      isOpen={hasCopied}
                      label={"✓ copied"}
                    >
                      <InputRightAddon
                        border={"1px solid #1f2022"}
                        cursor={"pointer"}
                        fontWeight={"light"}
                        letterSpacing={"1.5px"}
                        borderRightRadius={"8px"}
                        bg="gray.700"
                        onClick={onCopy}
                      >
                        <FaCopy color={"white"} />
                      </InputRightAddon>
                    </Tooltip>
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
                    NFT Address
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
                onClick={close}
              >
                Return to Marketplace
              </Button>
            </VStack>
          </>
        )}
      </Box>
    </>
  );
}
