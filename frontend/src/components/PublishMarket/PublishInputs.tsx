import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {  FaMinus, FaPlus } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";

export default function PublishInputs({
  file,
  publish,
  generateThumbnail,
  setPrice,
  handleFileChange,
  handleInput,
  generating,
  values,
}: {
  file: File | null ;
  publish: () => void;
  generateThumbnail: any;
  setPrice: (e: number) => void;
  handleFileChange: any;
  handleInput: any;
  generating: boolean;
  values: any;
}) {
  const router = useRouter();

  return (
    <>
      <Stack
        justifyContent={"space-between"}
        direction={["column", "column", "row"]}
        mt={8}
        spacing={4}
      >
        <Box w={["100%", "100%", "50%"]}>
          <Tabs p={0} variant={"unstyled"} colorScheme="purple">
            <TabList>
              <Tab> New File</Tab>
              <Tab>Existing File</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#D968D0"
              borderRadius="1px"
            />

            <TabPanels pt={4} pb={8} w="100%">
              <TabPanel m={0} position={"relative"} w="100%">
                <Box position={"relative"} w="100%">
                  <Box
                    borderRadius={"8px"}
                    m={0}
                    border={"2px solid #3d3d3d"}
                    h="60px"
                    left={0}
                    position={"absolute"}
                    w="100%"
                    bg="transparent"
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    px={4}
                  >
                    <HStack>
                      <Text>{file ? file.name : "Choose File"}</Text>
                    </HStack>
                  </Box>
                  <Box
                    zIndex={1}
                    mt={-2}
                    ml={3}
                    bg="#1f2022"
                    px={2}
                    top={0}
                    position={"absolute"}
                    fontSize={"xs"}
                  >
                    File
                  </Box>
                </Box>

                <Input
                  opacity={0}
                  w="100%"
                  h="57px"
                  type="file"
                  onChange={handleFileChange}
                />
              </TabPanel>
              <TabPanel>
                <Box position={"relative"} w="100%">
                  <Input
                    //   readOnly={true}
                    isDisabled={true}
                    borderRadius={"8px"}
                    border={"1px solid #3d3d3d"}
                    h="60px"
                    focusBorderColor="#3d3d3d"
                    placeholder="Coming soon"
                  />
                  <Box
                    zIndex={1}
                    mt={-2}
                    ml={3}
                    bg="#1f2022"
                    px={2}
                    top={0}
                    position={"absolute"}
                    fontSize={"xs"}
                  >
                    IPFS CID
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <VStack w="100%" px={4}>
            <Box position={"relative"} w="100%">
              <Input
                mb={8}
                borderRadius={"8px"}
                border={"1px solid #3d3d3d"}
                h="60px"
                name="nftTitle"
                focusBorderColor="#D968D0"
                value={values.nftTitle}
                onChange={handleInput}
              />
              <Box
                zIndex={1}
                mt={-2}
                ml={3}
                bg="#1f2022"
                px={2}
                top={0}
                position={"absolute"}
                fontSize={"xs"}
              >
                Title
              </Box>
            </Box>

            <Box position={"relative"} w="100%">
              <Textarea
                zIndex={0}
                borderRadius={"8px"}
                border={"0.5px solid #3d3d3d"}
                h="60px"
                name="description"
                focusBorderColor="#3d3d3d"
                value={values.description}
                onChange={handleInput}
              />
              <Box
                zIndex={1}
                mt={-2}
                ml={3}
                bg="#1f2022"
                px={2}
                top={0}
                position={"absolute"}
                fontSize={"xs"}
              >
                Description
              </Box>
            </Box>

            <HStack mt={8} w="100%" justifyContent={"flex-start"}>
              <FormControl>
                <Box position={"relative"} w="100%">
                  <Box
                    zIndex={1}
                    mt={-2}
                    ml={3}
                    bg="#1f2022"
                    px={2}
                    top={0}
                    position={"absolute"}
                    fontSize={"xs"}
                  >
                    Category
                  </Box>
                  <Select
                    w="100%"
                    borderRadius={"8px"}
                    border={"1px solid #3d3d3d"}
                    h="60px"
                    name="category"
                    value={values.category}
                    placeholder="Choose"
                    onChange={handleInput}
                    color={"white"}
                  >
                    <option value="food">food</option>
                    <option value="health">health</option>
                  </Select>
                </Box>
              </FormControl>

              <FormControl>
                <Box position={"relative"} w="100%">
                  <Box
                    zIndex={1}
                    mt={-2}
                    ml={3}
                    bg="#1f2022"
                    px={2}
                    top={0}
                    position={"absolute"}
                    fontSize={"xs"}
                  >
                    Price ($)
                  </Box>
                  <NumberInput
                    w="100%"
                    borderRadius={"8px"}
                    border={"1px solid #3d3d3d"}
                    h="60px"
                    defaultValue={0}
                    min={0}
                    onChange={(valueString) =>
                      setPrice(parseFloat(valueString))
                    }
                    color={"white"}
                  >
                    <NumberInputField h="60px" />
                    <NumberInputStepper h="100%">
                      <NumberIncrementStepper h="100%">
                        <FaPlus color="white" />
                      </NumberIncrementStepper>
                      <NumberDecrementStepper h="100%">
                        <FaMinus color="white" />
                      </NumberDecrementStepper>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </FormControl>
            </HStack>
            <Text mt={2} fontSize={"xs"} textAlign={"left"} fontWeight={"bold"}>
              {values.ethPrice} ETH
            </Text>
          </VStack>
        </Box>

        <Box w={["100%", "100%", "50%"]} px={[0, 0, 12]}>
          <Box
            h="300px"
            w="100%"
            bg={values.coverImage ? "transparent" : "#3d3d3d"}
            position={"relative"}
          >
            {values.coverImage && (
              <Box h="100%" w="100%" as="img" src={values.coverImage} />
            )}
            <Center h="100%">
              <Flex flexDir="column" align="center">
                <Box opacity={values.coverImage ? 0 : 1}>
                  <Text> Thumbnail</Text>
                  <Button
                    leftIcon={<MdPhotoLibrary />}
                    mt={2}
                    onClick={() => {}}
                  >
                    Upload
                  </Button>
                </Box>
              </Flex>
            </Center>
          </Box>

          <HStack>
            <InputGroup h="60px">
              <Input
                borderRadius={"8px"}
                border={"0.5px solid #3d3d3d"}
                h="100%"
                value={values.prompt}
                name="prompt"
                focusBorderColor="#3d3d3d"
                placeholder="Enter prompt"
                onChange={handleInput}
                readOnly={generating}
              />

              <InputRightAddon
                h="100%"
                border={"1px solid #1f2022"}
                cursor={generating ? "progress" : "pointer"}
                borderRightRadius={"8px"}
                bg="#12293d"
                color="#348fe6"
                onClick={!generating ? generateThumbnail : () => {}}
              >
                {generating ? <Spinner /> : "Generate Image"}
              </InputRightAddon>
            </InputGroup>
          </HStack>

          <Box>
            <Box>
              <Checkbox
                mt={[8, 8, 12]}
                isChecked={values.termsChecked}
                fontSize={"xs"}
                onChange={handleInput}
              >
                I have read and agreed with zeroAI's terms and conditions
              </Checkbox>
            </Box>
            <Button
              px={8}
              w="100%"
              mt={4}
              h="60px"
              bgGradient="linear(to-r, #D968D0, #EB4634)"
              colorScheme="purple"
              onClick={publish}
              fontSize={"xl"}
            >
              Deploy
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
