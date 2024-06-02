import {
  Avatar,
  Box,
  Button,
  Center,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { useGlobalContext } from "@/contexts/GlobalContext";

export default function CreateAgentCard() {
  const { isCollapsed, isOpen, onOpen, onClose } = useGlobalContext();

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Box position={"relative"}>
      <Box
        borderRadius={"15px"}
        position={"absolute"}
        bg="white"
        w="100%"
        h="100%"
        opacity={0.8}
        // mx={4}
      />
      <Box
        bgGradient="linear(to-r, rgba(217, 104, 208,0.2), rgba(235, 70, 52,0.2))"
        borderRadius={"15px"}
        py={12}
        // mx={4}
        position={"relative"}
      >
        {!isMobile && (
          <Box
            h={[0, "120px", "120px", "100%"]}
            display={"flex"}
            position={"absolute"}
            alignItems={"center"}
            bottom={0}
            mt={"20px"}
            top={0}
            right={0}
            mr={[0, 0, "20px"]}
            as="img"
            src="/banner.png"
          />
        )}

        <Box
          h="80px"
          display={"flex"}
          position={"absolute"}
          alignItems={"center"}
          top={0}
          left={8}
        >
          {/* <Avatar
            opacity={0.6}
            icon={<FaRobot />}
            h="50px"
            rounded={"full"}
            border={"2px solid #1f2022"}
            w="50px"
            color={"#1f2022"}
            bg="whitesmoke"
          /> */}
          <Box mb={12}>
            <FaRobot color="#db65c1" fontSize={"70px"} />
          </Box>

          {/* <Text
            ml="3"
            opacity={0.7}
            fontSize={"3xl"}
            fontWeight={"light"}
            letterSpacing={"1.25px"}
            color={"#1f2022"}
          >
            ZeroAI
          </Text> */}
        </Box>

        <Box px={[4, 4, 8]} textAlign="left" w="100%" mt={4}>
          <Text fontSize={"xl"} fontWeight={"semibold"} color={"#333"}>
            Clone and fine tune your AI agent
          </Text>
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
      </Box>
    </Box>
  );
}
