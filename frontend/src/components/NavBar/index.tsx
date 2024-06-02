import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdAttachMoney, MdChevronLeft } from "react-icons/md";

import { useGlobalContext } from "@/contexts/GlobalContext";
import { usePrivy } from "@privy-io/react-auth";
import ErrorDialog from "../Modals/errorDialog";

export default function NavBar() {
  const router = useRouter();
  const { ready, authenticated, connectWallet, login, logout } = usePrivy();
  const { isCollapsed, setIsCollapsed, index } = useGlobalContext();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const closeError = () => setIsError(false);

  function logoutWarning() {
    setIsError(true);
    setErrorTitle("Are you leaving?");
    setErrorMessage("You are about to log out");
  }

  return (
    <>
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

          <Flex align={"center"} gap={5}>
            {index === 1 && (
              <Button
                color={"#c5ff49"}
                border={"1.25px solid #c5ff49"}
                bgClip={"linear(to-r, #c5ff49, #04b670)"}
                bg="transparent"
                _hover={{
                  bgGradient: "linear(to-r, #c5ff49, #04b670)",
                  color: "white",
                  border: "none",
                }}
                h="50px"
                colorScheme="purple"
                leftIcon={<MdAttachMoney />}
                onClick={authenticated ? () => router.push("/publish") : login}
              >
                Start Selling
              </Button>
            )}
            <Button
              display={!isCollapsed && isMobile ? "none" : "block"}
              color={"white"}
              bg="#212529"
              _hover={{
                bg: "#212529",
                color: "white",
              }}
              _active={{
                bg: "#212529",
                color: "white",
              }}
              h="50px"
              isDisabled={!ready}
              onClick={
                authenticated
                  ? logoutWarning
                  : async () => {
                      login();
                      // connectWallet;
                    }
              }
              // onClick={connectWallet}
            >
              {authenticated ? "Disconnect" : "  Connect Wallet"}
            </Button>
          </Flex>
        </HStack>
      </Box>

      <ErrorDialog
        isOpen={isError}
        onClose={closeError}
        title={errorTitle}
        message={errorMessage}
      />
    </>
  );
}
