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
import { FaRobot } from "react-icons/fa";
import { MdFolder, MdPublic } from "react-icons/md";

export default function Home() {
  const { index } = useGlobalContext();

  return (
    <Layout>
      {index === 0 && (
        <>
          <Box
            pt={4}
            pb={8}
            px={8}
            minH="270px"
            bg="#1f2022"
            borderRadius={"18px"}
          >
            <HStack
              py={3}
              px={2}
              borderRadius={"12px"}
              mb={4}
              cursor={"pointer"}
            >
              <Avatar
                icon={<FaRobot size={"lg"} />}
                rounded={"full"}
                w="30px"
                bg="#1e1f23"
                color={"#7c8693"}
              />
              <Text
                ml={1}
                fontSize={"md"}
                fontWeight={"bold"}
                letterSpacing={"1.25px"}
              >
                My AI Agents
              </Text>
            </HStack>
            <Box>
              <Center>
                <Box textAlign="center">
                  <Center>
                    <FaRobot fontSize={"70px"} />
                  </Center>
                  <Text>Craft and fine tune your agent</Text>
                  <Button mt={4} h="50px" colorScheme="green">
                    Get Started
                  </Button>
                </Box>
              </Center>
            </Box>
          </Box>

          <Box mt={8}>
            <HStack
              py={3}
              px={0}
              borderRadius={"12px"}
              mb={4}
              cursor={"pointer"}
            >
              <Avatar
                icon={<MdPublic size={"lg"} />}
                w="30px"
                bg="transparent"
                color={"#7c8693"}
              />
              <Text
                ml={1}
                fontSize={"md"}
                fontWeight={"bold"}
                letterSpacing={"1.25px"}
              >
                Public Agents
              </Text>
            </HStack>

            {/* display cards of AI Agents */}
            <Box
              display={"flex"}
              flexDir={"column"}
              bg="#181818"
              borderRadius={"5px"}
              w="250px"
              h="260px"
              alignItems={"space-between"}
            >
              <Box>
                <Center mt={5}>
                  <Avatar size="2xl" />
                </Center>
                <Box mt={2} fontSize={"xs"} fontWeight={"semibold"}>
                  <Text textAlign={"center"}>Chef-Adah.zero.eth</Text>
                  <Text textAlign={"center"} color={"#7a7a7a"}>
                    Favourite Meal Planner
                  </Text>
                </Box>
              </Box>

              <Box>
                <Divider py={3} />
                <HStack
                  py={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  color={"#7a7a7a"}
                  px={3}
                >
                  <Flex>
                    {" "}
                    <MdFolder />
                    <Text fontSize={"xs"} fontWeight={"bold"}>
                      1003
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontSize={"xs"}>04ede...71j3</Text>
                  </Flex>
                </HStack>
              </Box>
            </Box>
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
