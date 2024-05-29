import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Flex,
} from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import Headers from "@/components/Headers";
import { BiStore } from "react-icons/bi";
import { FaSearch, FaUser } from "react-icons/fa";
import { useRouter } from "next/router";

export default function CreatorsView() {
  const { index } = useGlobalContext();
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

        <InputGroup size="sm" maxW="500px">
          <InputLeftAddon
            border={"1px solid #1f2022"}
            borderLeftRadius={"8px"}
            h="50px"
            bg="#181818"
          >
            <FaSearch />
          </InputLeftAddon>
          <Input
            focusBorderColor="#1f2022"
            border={"1px solid #1f2022"}
            _hover={{
              border: "1px solid #1f2022",
            }}
            h="50px"
            placeholder="0x..."
          />
          <InputRightAddon
            border={"1px solid #1f2022"}
            cursor={"pointer"}
            bg="transparent"
            borderRightRadius={"8px"}
            h="50px"
          >
            Search
          </InputRightAddon>
        </InputGroup>

        {/* <Button
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
        </Button> */}
      </Flex>

      <Box>
        <Box mt={12}>
          <Headers
            icon={<FaUser size={"20px"} />}
            bg="transparent"
            title="Augustus Ceaser"
          />
        </Box>

        <Box
          // py={4} px={8}
          minH="270px"
          bg="#1f2022"
          color={"lightgreen"}
          borderRadius={"18px"}
        >
          {/* yellow */}
        </Box>
      </Box>
    </>
  );
}
