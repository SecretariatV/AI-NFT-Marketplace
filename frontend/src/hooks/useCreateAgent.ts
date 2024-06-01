import { useState, useEffect } from "react";
import { useSteps, useToast } from "@chakra-ui/react";
import { createAIAgent } from "@/utils/agent-creation";
import { useWallets } from "@privy-io/react-auth";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const useCreateAgent = () => {
  const { wallets } = useWallets();
  const { activeStep, setActiveStep, isCompleteStep } = useSteps({ index: 0 });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [agent, setAgent] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [ensName, setEnsName] = useState<any | string | null>("");
  const [ensSubName, setSubName] = useState<any | string | null>("");
  const [progress, setProgress] = useState<string>("");
  const toast = useToast();

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType !== "privy"
  );
  const reset = () => {
    setLoading(false);
    setSuccess(false);
    setProgress("");
  };

  // useEffect(() => {
  //   const ensLookup = async () => {
  //     if (!wallets) {
  //       return;
  //     }
  //     try {
  //       const publicClient = createPublicClient({
  //         chain: mainnet,
  //         transport: http(),
  //       });
  //       if (!publicClient) {
  //         return;
  //       }
  //       const _ensName = await publicClient.getEnsName({
  //         address: embeddedWallet?.address! as `0x${string}`,
  //       });
  //       setEnsName(_ensName);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   ensLookup();
  // }, [wallets, embeddedWallet]);

  const handleSubmit = async () => {
    if (activeStep === 1) {
      if (name.length < 2) {
        setNameError("Name must be at least 2 characters long");
        return;
      } else {
        setNameError(null);
      }
      setActiveStep(activeStep + 1);
      setLoading(true);
      const metadata = {
        name,
        template: "",
        ensSubName: "",
        creator: embeddedWallet?.address,
        description,
        model: "gpt-3",
        chain: "Sepolia",
      };
      const provider = await embeddedWallet?.getEthereumProvider();

      // console.log("my provider", embeddedWallet?.address);

      // return;

      try {
        const result = await createAIAgent(
          metadata,
          embeddedWallet?.address!,
          provider,
          (progressMessage) => setProgress(progressMessage)
        );

        if (result) {
          setAgent(result.agent);
          setLoading(false);
          setSuccess(true);
          isCompleteStep(2);
        }
      } catch (e: any) {
        // return;
        // toast({
        //   status: "error",
        //   position: "top",
        //   duration: 50000,
        //   isClosable: true,
        //   size: "large",
        //   title: "Error",
        //   description: e.message || progress || "Encoutered error",
        // });
        // setActiveStep(0);
        // reset();
      }
    } else {
      if (activeStep === 2) {
        reset();
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    agent,
    loading,
    success,
    nameError,
    ensName,
    ensSubName,
    setSubName,
    activeStep,
    setActiveStep,
    handleSubmit,
    reset,
    progress,
  };
};
