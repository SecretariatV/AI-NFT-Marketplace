import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useRouter } from "next/router";

export default function PreviewCard({ nft }: { nft: any }) {
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
    <Box position={"relative"}>
      <Box
        zIndex={2}
        pb={4}
        h="235px"
        bg="#181818"
        color={"white"}
        borderRadius={"18px"}
        w="100%"
        maxW="220px"
        justifyContent={"space-between"}
        cursor={"pointer"}
        onClick={() => router.push(`/views/${nft.id}`)}
        backgroundImage={`url(${image})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          h="100%"
          position={"relative"}
          mx={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
        >
          {image && (
            <Box
              zIndex={0}
              position={"absolute"}
              top={0}
              h="100%"
              opacity={0.9}
              color={"white"}
              borderRadius={"18px"}
              w="100%"
              maxW="220px"
              src={image}
              as="img"
              transition="height 0.3s ease"
              _hover={{ h: "65%" }}
            />
          )}

          <Box
            borderBottomRadius={"30px"}
            w="100%"
            mb={-4}
            bottom={0}
            h="45%"
            bg="transparent"
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-start"}
            pt={1}
            pb={4}
            px={3}
            color={"gray"}
            alignItems={"flex-end"}
            position={"absolute"}
          />

          <Text mt={2} px={4} fontSize={"sm"} noOfLines={1}>
            {nft.metadata.title}
          </Text>

          <Text mt={2} px={4} fontSize={"xs"} color={"gray"} noOfLines={2}>
            {nft.metadata.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
