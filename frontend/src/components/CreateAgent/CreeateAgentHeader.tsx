import {
  Box,
  Divider,
  useMediaQuery,
  ModalHeader,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import { steps } from "@/utils/const";

export default function CreateAgentHeader({
  activeStep,
}: {
  activeStep: number;
}) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {!isMobile && (
        <>
          <ModalHeader
            display={"flex"}
            alignItems={"center"}
            py={8}
            maxW="67%"
            w="100%"
            justifyContent={"space-between"}
            letterSpacing={"1.25px"}
            fontSize={"lg"}
          >
            <Stepper index={activeStep} colorScheme="purple">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box>
                    <StepTitle>{step.title}</StepTitle>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </ModalHeader>
          <Divider />
        </>
      )}
    </>
  );
}
