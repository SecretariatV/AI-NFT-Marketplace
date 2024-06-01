import { Button } from "@chakra-ui/react";

export default function CreateAgentFooter({
  isLoading,
  isSuccess,
  handleSubmit,
}: {
  isLoading: boolean;
  isSuccess: boolean;
  handleSubmit: () => void;
}) {
  return (
    <>
      {!isLoading &&
        (isSuccess ? (
          <></>
        ) : (
          <Button
            _hover={{
              bgGradient: "linear(to-r, #D968D0, #EB4634)",
              color: "white",
              border: "none",
            }}
            sx={{
              bgGradient: "linear(to-r, #D968D0, #EB4634)",
              color: "white",
              border: "none",
            }}
            _active={{
              bgGradient: "linear(to-r, #D968D0, #EB4634)",
              color: "white",
              border: "none",
            }}
            w="220px"
            h="60px"
            colorScheme="purple"
            mr={3}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        ))}
    </>
  );
}
