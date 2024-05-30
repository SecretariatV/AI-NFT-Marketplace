import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";

import MarketplaceHeader from "./MarketPlaceHeader";
import Overview from "./Overview";
import { BiStore } from "react-icons/bi";
import Results from "./Results";


export default function Marketplace() {
  const { index, nftData, setNftData } = useGlobalContext();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <MarketplaceHeader tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {!tabIndex && (
        <>
          <Overview />
        </>
      )}

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
