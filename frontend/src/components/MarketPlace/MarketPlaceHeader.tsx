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
import { FaFilter } from "react-icons/fa";
import { categories } from "./categories";

export default function MarketplaceHeader({
  tabIndex,
  setTabIndex,
}: {
  tabIndex: number;
  setTabIndex: any;
}) {
  return (
    <>
      <Box
        textAlign={"center"}
        fontSize={["md", "md", "2xl"]}
        fontWeight={"semibold"}
        letterSpacing={"1.25px"}
      >
        Build your AI Agent with Specialized Datasets
      </Box>

      <Box w="100%" px={[0, 0, 8]} py={12}>
        <Stack
          spacing={[4, 4, 0]}
          //   justifyContent={"flex-start"}
          direction={["column-reverse", "column-reverse", "row"]}
          alignItems={["flex-end", "flex-end", "center"]}
        >
          <Flex
            gap={5}
            w={["100%", "100%", "80%"]}
            overflowY={"hidden"}
            overflowX={"auto"}
            css={{
              "::-webkit-scrollbar": {
                height: "8px",
              },
              "::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "red",
              },
              "scrollbar-width": "thin",
              "scrollbar-color": "#888 transparent",
            }}
          >
            {categories.map((category, i) => (
              <Box
                key={i}
                borderRadius={"8px"}
                px={8}
                py={2}
                color={tabIndex === i + 1 ? "#D968D0" : "white"}
                border={`0.8px solid ${
                  tabIndex === i + 1 ? "#D968D0" : "#1e1f23"
                }`}
                display="flex"
                alignItems="center"
                mb={4}
                cursor={"pointer"}
                onClick={() => setTabIndex(i + 1)}
              >
                <Avatar
                  icon={category.icon}
                  rounded={"full"}
                  w="30px"
                  bg={"transparent"}
                  color={tabIndex === i + 1 ? "#D968D0" : "#7c8693"}
                  mr={2}
                />
                <Text fontWeight={"bold"} fontSize={"xs"}>
                  {category.title}
                </Text>
              </Box>
            ))}
          </Flex>
          <Box
            borderRadius={"8px"}
            px={8}
            py={2}
            ml={4}
            mt={-4}
            bg="#1e1f23"
            border="0.8px solid #1e1f23"
          >
            <Flex align={"center"}>
              <Avatar
                icon={<FaFilter />}
                rounded={"full"}
                w="30px"
                bg={"transparent"}
                color={"#7c8693"}
              />
              <Text fontWeight={"bold"} fontSize={"xs"}>
                Filters
              </Text>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
