import { Box, Button, Center, Avatar } from "@chakra-ui/react";

import { FaRobot } from "react-icons/fa";

export default function ConsumeCard({ onOpen }: { onOpen: () => void }) {
  return (
    <>
      <Box
        py={4}
        h="370px"
        bg="#1f2022"
        color={"white"}
        borderRadius={"18px"}
        w={["100%", "100%", "55%"]}
        cursor="pointer"
        position={"relative"}
      >
        <Center px={8}>
          <Avatar
            icon={<FaRobot size={"lg"} />}
            h="100px"
            rounded={"full"}
            border={"2px solid white"}
            w="100px"
            color={"white"}
            bg="whiteAlpha.500"
          />
        </Center>

        <Box
          display={"flex"}
          alignItems={"center"}
          h="100%"
          position={"absolute"}
          justifyContent={"center"}
          w="100%"
          top={0}
          bottom={0}
          px={3}
        >
          <Button
            sx={{
              bgGradient: "linear(to-r, #D968D0, #EB4634)",
              color: "white",
            }}
            _hover={{
              bgGradient: "linear(to-r, #D968D0, #EB4634)",
              color: "white",
            }}
            _active={{
              bgGradient: "linear(to-r, #D968D0, #EB4634)",
              color: "white",
            }}
            borderRadius={"25px"}
            maxW="300px"
            w="100%"
            h="50px"
            px={[3, 3, 4]}
            // isDisabled={true}
            onClick={onOpen}
          >
            CONSUME
          </Button>
        </Box>
      </Box>
    </>
  );
}
