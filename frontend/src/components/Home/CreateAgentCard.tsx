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
import { FaRobot } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import AgentsCard from "./AgentsCard";
import Headers from "@/components/Headers";

export default function CreateAgentCard() {
  return (
    <>
      <Box>
        <Center>
          <Box textAlign="center">
            <Center>
              <FaRobot fontSize={"70px"} />
            </Center>
            <Text>Craft and fine tune your agent</Text>
            <Button mt={4} h="50px" colorScheme="green">
              Get Started
            </Button>
          </Box>
        </Center>
      </Box>
    </>
  );
}
