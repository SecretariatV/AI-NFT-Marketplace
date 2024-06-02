import { useEffect, useState } from "react";
import { Box, Button, HStack, Text, Flex } from "@chakra-ui/react";
import { FaPenFancy } from "react-icons/fa";
import { shortenAddress } from "@/utils/helpers";
import { useRouter } from "next/router";
import { formatEther } from "viem";

export default function Results({ nft }: { nft: any }) {
  const router = useRouter();

  const [image, setImage] = useState<any | null>(null);

  useEffect(() => {
    async function fetchImage() {
      const hash = nft.metadata.thumbnail;
      const response = await fetch(
        `https://gateway.lighthouse.storage/ipfs/${hash}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const data = response.text();
      setImage(await data);
    }
    if (nft.metadata.thumbnail.length > 2 && !image) {
      fetchImage();
    }
  }, [nft.metadata.thumbnail, image]);
  return (
    <>
      <Box mt={14} w="100%" maxW="400px">
        <Box
          pb={4}
          h="400px"
          bg="#181818"
          color={"white"}
          borderRadius={"18px"}
          w="100%"
          maxW="400px"
          justifyContent={"space-between"}
          cursor={"pointer"}
          onClick={() => router.push(`/views/${nft.id}`)}
        >
          <Box h="85%">
            <Box
              border={"2px solid #181818"}
              borderTopRadius={"18px"}
              borderBottomRadius={"30px"}
              w="100%"
              h="70%"
              // backgroundColor="#121212"
              display={"flex"}
              flexDir={"column"}
              justifyContent={"flex-end"}
              pb={4}
              px={3}
              background={image ? `url('${image}')` : "#121212"}
              backgroundSize={"cover"}
              color={"gray"}
            >
              <Flex align={"center"}>
                {" "}
                <span
                  style={{
                    marginRight: "4px",
                  }}
                >
                  <FaPenFancy />
                </span>
                <Text ml={2}>{shortenAddress(nft.metadata.author)}</Text>
              </Flex>
            </Box>
            <Text mt={4} px={4} fontSize={"xl"}>
              {nft.metadata.title}
            </Text>
            <Text px={4} fontSize={"sm"} color={"gray"}>
              {nft.metadata.description}
            </Text>
          </Box>

          <HStack px={4} justifyContent={"space-between"}>
            <Text letterSpacing={"1.25px"} fontSize={"xl"}>
              {!formatEther(nft.mintPrice.toString)
                ? "Free"
                : `${formatEther(nft.mintPrice)} ETH`}
            </Text>
            <Button
              h="50px"
              w="130px"
              color="white"
              colorScheme="purple"
              sx={{
                bgGradient: "linear(to-r, #D968D0, #EB4634)",
              }}
              onClick={() => router.push(`/views/${nft.id}`)}
            >
              Add
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
