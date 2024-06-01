import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiStore } from "react-icons/bi";

export default function ViewHeader() {
  const router = useRouter();

  return (
    <>
      <Flex gap={10}>
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
            router.push("/");
          }}
        >
          Return
        </Button>
      </Flex>

      <Box mt={8}>About this document</Box>
    </>
  );
}
