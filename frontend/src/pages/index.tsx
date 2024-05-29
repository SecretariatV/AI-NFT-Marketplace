import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import Layout from "@/layout";
import HomeView from "@/components/Home";
import Headers from "@/components/Headers";
import { MdTrendingUp } from "react-icons/md";

export default function Home() {
  const { index } = useGlobalContext();

  const mockAgentsData = [
    {
      title: "Chef-Adah.zero.eth",
      descripition: "Favourite Meal Planner",
      address: "0xf2750684eB187fF9f82e2F980f6233707eF5768C",
      files: 1003,
    },
  ];

  return (
    <Layout>
      {index === 0 && <HomeView />}
      {index === 1 && (
        <>
          <Box py={4} px={8} minH="270px" bg="#1f2022" borderRadius={"18px"}>
            <Headers
              icon={<MdTrendingUp size={"lg"} />}
              title="Trending"
              bg="#1e1f23"
            />
          </Box>
        </>
      )}
    </Layout>
  );
}
