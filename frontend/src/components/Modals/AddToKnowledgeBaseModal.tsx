import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
} from "@chakra-ui/react";

const AddToKnowledgeBaseModal = ({
  isOpen,
  onClose,
  onSumbit,
  isDisabled,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSumbit: () => void;
  isDisabled: boolean;
}) => {
  const [agent, setAgent] = useState(
    "0xb16656B579D293Ff3e36fD6BE6c5368120d7625D"
  );
  const handleSubmit = async () => {
    onSumbit();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"blackAlpha.900"} />
        <ModalContent py={4} mt={32} bg="#1f2022" color="white">
          <ModalHeader maxW="67%" letterSpacing={"1.25px"} fontSize={"lg"}>
            Increase your AI Agent's knowledge base
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4} id="address">
              <Box position={"relative"} w="100%">
                <Input
                  w="100%"
                  borderRadius={"8px"}
                  border={"0.5px solid #3d3d3d"}
                  focusBorderColor="#3d3d3d"
                  h="60px"
                  type="text"
                  placeholder="Enter address or ENS name"
                  value={agent}
                  onChange={(e) => setAgent(e.target.value)}
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
                  AI Agent
                </Box>
              </Box>
            </FormControl>

            <FormControl id="context" mt={12}>
              <Box position={"relative"} w="100%">
                <Textarea
                  border={"0.5px solid #3d3d3d"}
                  focusBorderColor="#3d3d3d"
                  placeholder="Add additional context to the document"
                />
                <Text fontSize="xs" textAlign="right" color={"gray"}>
                  optional
                </Text>

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
                  Additional Context
                </Box>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter display={"flex"}>
            <Button
              h="60px"
              w="100%"
              colorScheme="teal"
              mr={3}
              onClick={handleSubmit}
            >
              Add Document
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToKnowledgeBaseModal;
