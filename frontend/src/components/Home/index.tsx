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
import { FaRobot } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import AgentsCard from "./AgentsCard";
import Headers from "@/components/Headers";
import CreateAgentCard from "./CreateAgentCard";

export default function HomeView() {
  const mockAgentsData = [
    {
      title: "Chef-Adah.zero.eth",
      description: "Favourite Meal Planner",
      address: "0xf2750684eB187fF9f82e2F980f6233707eF5768C",
      files: 1003,
    },
  ];

  return (
    <>
      <Box pt={4} pb={8} px={8} minH="270px" bg="#1f2022" borderRadius={"18px"}>
        <Headers
          icon={<MdPublic size={"lg"} />}
          title="Templates"
          bg="#1e1f23"
        />
        <CreateAgentCard />
      </Box>

      <Box mt={8}>
        <Headers
          icon={<FaRobot size={"lg"} />}
          title="My Agents"
          bg="transparent"
        />

        {/* display cards of AI Agents */}
        <Box
          display="flex"
          w="100%"
          alignItems={["center", "center", "flex-start"]}
          p={4}
        >
          {mockAgentsData.map((agent, i) => (
            <AgentsCard
              key={i}
              title={agent.title}
              description={agent.description}
              address={agent.address}
              files={agent.files}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
