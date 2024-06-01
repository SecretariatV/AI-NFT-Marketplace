import { Box, HStack, Tooltip, Text } from "@chakra-ui/react";
import { templates } from "@/utils/const";
import { useState } from "react";

export default function CreateAgentTemplate() {
  const [selected, setSelected] = useState(0);
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <>
      <HStack mt={8} spacing={8} w="100%">
        {templates.map((item, i) => (
          <Tooltip
            opacity={selected === i ? 1 : 0}
            key={i}
            isOpen={selected === i && showToolTip}
            label="Coming soon"
          >
            <Box
              border={i === 0 ? "0.5px solid #db65c1" : "none"}
              opacity={i === 0 ? 1 : 0.6}
              py={4}
              h="300px"
              bg="#181818"
              color={"white"}
              borderRadius={"18px"}
              w="100%"
              maxW="270px"
              cursor="pointer"
              position={"relative"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              onClick={() => {
                if (i > 0) {
                  setShowToolTip(true);
                  setSelected(i);
                  setTimeout(() => {
                    setShowToolTip(false);
                  }, 1000);
                }
              }}
            >
              <Box
                as="img"
                src={item.icon}
                rounded={"full"}
                w="150px"
                h="150px"
              />

              <Text my={8}>{item.title}</Text>
            </Box>
          </Tooltip>
        ))}
      </HStack>
      <Box />
    </>
  );
}
