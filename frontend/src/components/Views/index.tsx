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
import Results from "../MarketPlace/Results";
import { MdPublic } from "react-icons/md";

export default function MyViews() {
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
      </Flex>
      <Box>
        <Box mt={12}>
          <Headers
            icon={<MdPublic size={"20px"} />}
            bg="transparent"
            title="My Views"
          />
        </Box>

        <Box mt={8}>
          <Results />
        </Box>
      </Box>
    </>
  );
}
