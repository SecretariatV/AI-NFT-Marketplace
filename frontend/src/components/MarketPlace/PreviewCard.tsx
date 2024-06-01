import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Text,
  Divider,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { FaPenFancy } from "react-icons/fa";
import { useRouter } from "next/router";
import { shortenAddress } from "@/utils/helpers";

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

  console.log(nft);

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
        <Box h="85%" position={"relative"} mx={1}>
          {image && (
            <Box
              zIndex={0}
              position={"absolute"}
              top={0}
              h="70%"
              opacity={0.9}
              color={"white"}
              borderRadius={"18px"}
              w="100%"
              maxW="220px"
              src={image}
              as="img"
            />
          )}

          <Box
            borderTopRadius={"18px"}
            borderBottomRadius={"30px"}
            w="100%"
            h="70%"
            // bg="rgba(24, 24, 24, 0.3)"
            bg="linear-gradient(135deg, rgba(24, 24, 24, 0.3), rgba(74, 74, 74,0.3))"
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            pb={4}
            px={3}
            color={"gray"}
            position={"relative"}
          >
            <Flex align={"center"}>
              {" "}
              <span
                style={{
                  marginRight: "4px",
                }}
              >
                <FaPenFancy color={"white"} size={"9px"} />
              </span>
              <Text fontSize={"xs"} color={"white"}>
                {" "}
                {shortenAddress(nft.metadata.author || "")}
              </Text>
            </Flex>
          </Box>

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
