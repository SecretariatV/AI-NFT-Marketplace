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

  return (
    <>
      <Box
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
      >
        <Box h="85%">
          <Box
            border={"2px solid #181818"}
            borderTopRadius={"18px"}
            borderBottomRadius={"30px"}
            w="100%"
            h="70%"
            bg="#121212"
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            pb={4}
            px={3}
            color={"gray"}
          >
            <Flex align={"center"}>
              {" "}
              <span
                style={{
                  marginRight: "4px",
                }}
              >
                <FaPenFancy size={"9px"} />
              </span>
              <Text fontSize={"xs"}>
                {" "}
                {shortenAddress(nft.metadata.author || "")}
              </Text>
            </Flex>
          </Box>
          <Text mt={2} px={4} fontSize={"sm"} noOfLines={1}>
            {nft.metadata.title}
          </Text>
          <Text mt={2} px={4} fontSize={"xs"} color={"gray"}>
            {nft.metadata.description}
          </Text>
        </Box>
      </Box>
    </>
  );
}
