import { Box, useMediaQuery } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function Layout({ children }: { children: ReactNode | any }) {
  const { isCollapsed } = useGlobalContext();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Box position={"relative"} w="100%" bg="#121212">
        <NavBar />

        <SideBar />

        <Box
          right={0}
          position={"absolute"}
          pt={isMobile ? "80px" : "100px"}
          w={` ${
            isMobile ? "100%" : `calc(100% - ${isCollapsed ? "70px" : "250px"})`
          }`}
        >
          <Box px={[4, 4, 12]} bg="#121212">
            <Box py={8}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
