import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import Layout from "@/layout";
import { FaRobot } from "react-icons/fa";
import { MdDescription, MdFolder, MdPublic } from "react-icons/md";
import { shortenAddress } from "@/utils/helpers";

export default function AgentsCard({
  title,
  description,
  address,
  files,
}: {
  title: string;
  description: string;
  address: string;
  files: number;
}) {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        bg="#181818"
        borderRadius={"5px"}
        w={["100%", "100%", "250px"]}
        h="260px"
        alignItems={"space-between"}
      >
        <Box>
          <Center mt={5}>
            <Avatar size="2xl" />
          </Center>
          <Box mt={2} fontSize={"xs"} fontWeight={"semibold"}>
            <Text textAlign={"center"}>{title}</Text>
            <Text textAlign={"center"} color={"#7a7a7a"}>
              {description}
            </Text>
          </Box>
        </Box>

        <Box>
          <Divider py={3} />
          <HStack
            py={2}
            justifyContent={"space-between"}
            alignItems={"center"}
            color={"#7a7a7a"}
            px={3}
          >
            <Flex>
              {" "}
              <MdFolder />
              <Text fontSize={"xs"} fontWeight={"bold"}>
                {files}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"xs"}>{shortenAddress(address)}</Text>
            </Flex>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
