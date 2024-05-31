import { useEffect, useState } from "react";
import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";

import MarketplaceHeader from "./MarketPlaceHeader";
import Overview from "./Overview";
import { BiStore } from "react-icons/bi";
import Results from "./Results";
import { categories } from "./categories";

export default function Marketplace() {
  const { index, nftData, setNftData, loadingMarket } = useGlobalContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [searching, setSearching] = useState(false);
  const [filtered, setFiltered] = useState<any | null>(null);

  const resetFilter = () => {
    setFiltered(null);
    setSearching(true);
  };

  useEffect(() => {
    function filterNFTs() {
      const value = categories[tabIndex - 1].title;

      const filter = nftData.filter(
        (nft: any) =>
          nft.metadata?.category.toLowerCase() === value.toLowerCase()
      );

      console.log("new value", filter);
      if (filter) {
        setFiltered(filter);
      }
      setSearching(false);
    }

    if (nftData && nftData.length > 0 && tabIndex && searching) {
      filterNFTs();
    }
  }, [tabIndex, searching, nftData]);

  return (
    <>
      <MarketplaceHeader
        tabIndex={tabIndex}
        reset={resetFilter}
        setTabIndex={setTabIndex}
      />
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
            onClick={() => {
              setFiltered(null);
              setSearching(false);
              setTabIndex(0);
            }}
          >
            Return
          </Button>

          <Box mt={8}>
            {searching && (
              <Center>
                <Spinner />
              </Center>
            )}

            {filtered && (
              <>
                {filtered.length > 0 ? (
                  filtered.map((nft: any, i: number) => (
                    <Results key={i} nft={nft} />
                  ))
                ) : (
                  <Box>
                    <Center>
                      <Text fontSize="xs">
                        Be the fist to publish in this category
                      </Text>
                    </Center>
                  </Box>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
}

// /creators
// /views

// /views/[id]
