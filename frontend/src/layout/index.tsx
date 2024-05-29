import {
  Box,
  Button,
  Text,
  HStack,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { MdChevronLeft, MdHomeFilled } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { useGlobalContext } from "@/contexts/GlobalContext";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function Layout({ children }: { children: ReactNode | any }) {
  const { isCollapsed } = useGlobalContext();

  return (
    <>
      <Box position={"relative"} w="100%" bg="#121212">
        <NavBar />

        <SideBar />

        <Box
          right={0}
          position={"absolute"}
          pt="100px"
          w={`calc(100% - ${isCollapsed ? "70px" : "250px"})`}
        >
          <Box px={12}>
            <Box py={8}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
