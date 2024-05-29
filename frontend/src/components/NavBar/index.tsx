import {
  Box,
  Button,
  HStack,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { useGlobalContext } from "@/contexts/GlobalContext";

export default function NavBar() {
  const { isCollapsed, setIsCollapsed } = useGlobalContext();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {/* Nav */}
      <Box
        zIndex={"tooltip"}
        position={"fixed"}
        right={0}
        bg="rgba(18, 18, 18, 0.8)"
        backdropFilter="blur(10px)"
        w={`calc(100% - ${
          isCollapsed ? (isMobile ? "0px" : "70px") : "250px"
        })`}
        borderBottom={"0.3px solid #212529"}
      >
        <HStack
          top={0}
          px={8}
          w="100%"
          justifyContent={"space-between"}
          h="80px"
        >
          <IconButton
            h="50px"
            w="50px"
            fontSize={"3xl"}
            bg="#181818"
            color={"white"}
            colorScheme="black"
            aria-label="toggle-sidebar"
            icon={<MdChevronLeft />}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />

          <Button
            display={!isCollapsed && isMobile ? "none" : "block"}
            color={"white"}
            bg="#212529"
            h="50px"
          >
            Connect Wallet
          </Button>
        </HStack>
      </Box>
    </>
  );
}
