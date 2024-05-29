import { Box } from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import Layout from "@/layout";

export default function Home() {
  const { index } = useGlobalContext();

  return (
    <Layout>
      {index === 0 && (
        <>
          <Box py={4} px={8} minH="270px" bg="#1f2022" borderRadius={"18px"}>
            Home View
          </Box>
        </>
      )}
      {index === 1 && (
        <Box py={4} px={8} minH="270px" bg="#1f2022" borderRadius={"18px"}>
          Marketplace View
        </Box>
      )}
    </Layout>
  );
}
