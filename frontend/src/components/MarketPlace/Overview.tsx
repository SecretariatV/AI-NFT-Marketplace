import { Box, Text, Flex, Stack, HStack } from "@chakra-ui/react";
import { FaPlay, FaUser } from "react-icons/fa";
import Headers from "@/components/Headers";
import { MdTrendingUp } from "react-icons/md";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/GlobalContext";
import PreviewCard from "./PreviewCard";

export default function Overview() {
  const { index, nftData, loadingMarket, setNftData } = useGlobalContext();
  const router = useRouter();

  return (
    <>
      <Box
        py={4}
        px={8}
        minH="270px"
        bg="#1f2022"
        color={"lightgreen"}
        borderRadius={"18px"}
      >
        {!loadingMarket && nftData && nftData.length > 0 && (
          <>
            <Headers
              icon={<MdTrendingUp size={"lg"} />}
              title="Recently created"
              bg="#1e1f23"
            />

            <HStack w="100%" spacing={5}>
              {nftData
                .filter((item: any) => item.cid.length > 0)
                .map((nft: any, i: number) => (
                  <PreviewCard key={i} nft={nft} />
                ))}
            </HStack>
          </>
        )}
      </Box>

      <Stack mt={4} spacing={4} direction={["column", "row", "row"]}>
        <Box
          py={4}
          px={8}
          minH="370px"
          bg="#1f2022"
          color={"white"}
          borderRadius={"18px"}
          w={["100%", "100%", "55%"]}
          onClick={() => router.push("/creators")}
          cursor="pointer"
        >
          <Headers
            icon={<FaUser size={"lg"} />}
            title="Creators"
            bg="#1e1f23"
          />
        </Box>

        <Box
          py={4}
          px={8}
          minH="370px"
          bg="#1f2022"
          color={"white"}
          borderRadius={"18px"}
          w="100%"
        >
          <Flex align={"center"} justifyContent={"space-between"}>
            <Headers
              icon={<FaPlay size={"lg"} />}
              title="Recently Viewed"
              bg="#1e1f23"
            />

            <Text
              ml={1}
              fontSize={"sm"}
              color={"#7c8693"}
              fontWeight={"bold"}
              letterSpacing={"1.25px"}
              as="button"
              _hover={{
                color: "#d968d0",
              }}
              onClick={() => router.push("views")}
            >
              Show All
            </Text>
          </Flex>
        </Box>
      </Stack>
    </>
  );
}
