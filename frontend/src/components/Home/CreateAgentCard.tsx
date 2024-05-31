import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Text,
  Divider,
  Flex,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import AgentsCard from "./AgentsCard";
import Headers from "@/components/Headers";
import CreateAgentModal from "../Modals/CreateAgentModal";
import { useGlobalContext } from "@/contexts/GlobalContext";

export default function CreateAgentCard() {
  const { isCollapsed, isOpen, onOpen, onClose } = useGlobalContext();

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <Box>
        <Center>
          <Box textAlign="center">
            <Center>
              <FaRobot fontSize={"70px"} />
            </Center>
            <Text>Craft and fine tune your agent</Text>
            <Button
              bgGradient="linear(to-r, #D968D0, #EB4634)"
              mt={4}
              h="50px"
              colorScheme="purple"
              onClick={onOpen}
            >
              Get Started
            </Button>
          </Box>
        </Center>
      </Box>
    </>
  );
}
