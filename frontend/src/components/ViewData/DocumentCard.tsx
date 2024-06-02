import { Box, Button, Flex, Text, VStack, Divider } from "@chakra-ui/react";

import { convertTimestampToDate } from "@/utils/helpers";
import { formatEther } from "viem";
import { FaExternalLinkAlt, FaLockOpen } from "react-icons/fa";

export default function DocumentCard({
  nft,
  loading,
  mintDocument,
  viewDocument,
  checkMint,
  showMint,
  // hasNFT
}: {
  nft: any;
  loading: boolean;
  mintDocument: () => void;
  viewDocument: () => void;
  checkMint: boolean;
  showMint: boolean;
  // hasNFT: boolean;
}) {
  return (
    <>
      {" "}
      <Box
        py={4}
        px={8}
        minH="370px"
        bg="#1f2022"
        color={"white"}
        borderRadius={"18px"}
        w="100%"
      >
        <VStack align={"space-between"}>
          <Box>
            <Flex mt={3} align={"flex-start"} justifyContent={"space-between"}>
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
                Published on {convertTimestampToDate(nft.metadata.publishedAt)}
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
            {!checkMint && (
              <Button
                display={!showMint ? "none" : "inherit"}
                h="50px"
                fontSize={"lg"}
                bg="white"
                fontWeight={"bold"}
                colorScheme="pink"
                variant={"outline"}
                w="100%"
                maxW={"400px"}
                onClick={mintDocument}
                isLoading={loading}
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
            )}

            <Button
              mt={4}
              h="50px"
              fontSize={"lg"}
              fontWeight={"bold"}
              colorScheme="pink"
              variant={"outline"}
              w="100%"
              maxW={"400px"}
              rightIcon={<FaExternalLinkAlt />}
              onClick={viewDocument}
              isLoading={loading}
              isDisabled={showMint}
            >
              View Document
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
