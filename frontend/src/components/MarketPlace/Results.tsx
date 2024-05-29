import { useState } from "react";
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

export default function Results() {
  return (
    <>
      <Box
        mt={14}
        display={"grid"}
        gridTemplateColumns={[
          "repeat(1fr, 1",
          "repeat(1fr, 1",
          "repeat(1fr, 3",
        ]}
      >
        <Box
          pb={4}
          h="400px"
          bg="#181818"
          color={"white"}
          borderRadius={"18px"}
          w={["100%", "100%", "35%"]}
          justifyContent={"space-between"}
          cursor={"pointer"}
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
                  <FaPenFancy />
                </span>
                <Text> Augustus Ceaser</Text>
              </Flex>
            </Box>
            <Text mt={4} px={4} fontSize={"xl"}>
              Nigerian Cuisine{" "}
            </Text>
            <Text px={4} fontSize={"sm"} color={"gray"}>
              Local historical soups and rice menus from...
            </Text>
          </Box>

          <HStack px={4} justifyContent={"space-between"}>
            <Text letterSpacing={"1.25px"} fontSize={"xl"}>
              0.01ETH
            </Text>
            <Button
              h="50px"
              w="130px"
              color="white"
              sx={{
                bgGradient: "linear(to-r, #D968D0, #EB4634)",
              }}
            >
              Buy
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
