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
import { MdTrendingUp } from "react-icons/md";
import {
  FaHamburger,
  FaFilter,
  FaHeartbeat,
  FaDumbbell,
  FaPlane,
  FaBitcoin,
  FaGlobe,
  FaUser,
  FaPlay,
} from "react-icons/fa";
import { useGlobalContext } from "@/contexts/GlobalContext";
import Headers from "@/components/Headers";
import MarketplaceHeader from "./MarketPlaceHeader";
import Overview from "./Overview";
import { BiStore } from "react-icons/bi";
import Results from "./Results";

export default function Marketplace() {
  const { index } = useGlobalContext();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <MarketplaceHeader tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {!tabIndex && <><Overview /></>}

      {tabIndex && (
        <>
          <Button
            bg="#181818"
            _hover={{
              bg: "#181818",
              color: "white",
            }}
            _focus={{
              bg: "#181818",
              color: "white",
            }}
            color="white"
            leftIcon={<BiStore />}
            h="50px"
            colorScheme="gray"
            onClick={() => setTabIndex(0)}
          >
            Return
          </Button>

          <Box mt={8}>
            <Results />
          </Box>
        </>
      )}
    </>
  );
}

// /creators
// /views

// /views/[id]
