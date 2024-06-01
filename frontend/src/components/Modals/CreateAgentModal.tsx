import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCreateAgent } from "@/hooks/useCreateAgent";
import {
  CreateAgentTemplate,
  CreateAgentStatus,
  CreateAgentFooter,
  CreateAgentInputs,
  CreateAgentHeader,
} from "../CreateAgent/";

const CreateAgentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    name,
    setName,
    description: description,
    setDescription: setDescription,
    ensName,
    ensSubName,
    setSubName,
    activeStep,
    setActiveStep,
    handleSubmit,
    nameError,
    loading,
    success,
    agent,
    reset,
    progress,
  } = useCreateAgent();

  let modalBodyContent;
  switch (activeStep) {
    case 1:
      modalBodyContent = (
        <CreateAgentInputs
          name={name}
          setName={setName}
          nameError={nameError}
          description={description}
          setDescription={setDescription}
          ensSubName={ensSubName}
          setSubName={setSubName}
          ensName={ensName}
        />
      );
      break;
    case 4:
      modalBodyContent = <CreateAgentTemplate />;
      break;
    default:
      modalBodyContent = (
        <CreateAgentStatus
          isLoading={loading}
          isSuccess={success}
          name={name}
          agent={agent}
          progress={progress}
          close={onClose}
        />
      );
      break;
  }

  const handleClose = () => {
    setActiveStep(0);
    reset();
    onClose();
  };

  return (
    <Box px={32}>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size={"full"}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay bg={"blackAlpha.900"} />
        <ModalContent
          mt={4}
          mb={8}
          bg="#1f2022"
          color="white"
          h="calc(100% - 10vh)"
          position={"fixed"}
          top={0}
          borderRadius={"30px"}
          w={["100%", "80%"]}
        >
          <CreateAgentHeader activeStep={activeStep} />

          <ModalCloseButton />

          <ModalBody>{modalBodyContent}</ModalBody>

          <ModalFooter pb={24}>
            <CreateAgentFooter
              isLoading={loading}
              isSuccess={success}
              handleSubmit={handleSubmit}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateAgentModal;
