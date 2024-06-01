import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  BiconomySmartAccountV2,
  createSmartAccountClient,
  LightSigner,
} from "@biconomy/account";
import { sepolia } from "viem/chains";
import { useQuery } from "@apollo/client";
import client from "@/utils/apollo-client";
import { GET_NFT_DEPLOYED } from "@/utils/queries";
import {
  callReadContract,
  fetchContent,
  getDetailsFromNFTContract,
} from "@/utils/helpers";
import { useDisclosure } from "@chakra-ui/react";
import AgentFactory from "@/utils/AgentFactory.json";

interface GlobalContextType {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  index: number;
  setIndex: (index: number) => void;
  nftData: null | any[] | any;
  setNftData: (index: null | any[] | any) => void;
  loadingMarket: boolean;
  smartAccountClient: () => Promise<BiconomySmartAccountV2 | undefined>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [nftData, setNftData] = useState<null | any[] | any>(null);
  const [agents, setAgents] = useState<null | any[] | any>(null);
  const { ready, authenticated, login } = usePrivy();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType !== "privy"
  );

  const {
    loading: loadingMarket,
    error,
    data,
  } = useQuery(GET_NFT_DEPLOYED, {
    variables: { first: 5 },
    client,
  });

  useEffect(() => {
    const fetchNFTDetails = async () => {
      let metadata: any;
      const detailedData = await Promise.all(
        data.nftdeployeds.map(async (nft: any) => {
          const details = await getDetailsFromNFTContract(
            (nft as any).nftAddress
          );
          if (!details) {
            return null;
          }
          if (details.cid) {
            metadata = await fetchContent(details.cid as string);
            return { ...nft, ...details, metadata };
          } else {
            return { ...nft, ...details };
          }
        })
      );
      if (detailedData && detailedData.length > 4) {
        // console.log("details data", detailedData);
        // setNftData(detailedData);
        setNftData(detailedData.filter((item) => item !== null));
      }
    };

    if (data && !nftData) {
      fetchNFTDetails();
    }

    if (nftData) {
      console.log("nft data", nftData);
    }
  }, [data, nftData]);

  useEffect(() => {
    const fetchAgents = async () => {
      let metadata: any;
      const factoryContract = process.env
        .NEXT_PUBLIC_AGENTFACTORY_ADDRESS as `0x${string}`;
      const agentInfo = await callReadContract(
        factoryContract,
        "getAgentsByCreator",
        AgentFactory.abi,
        [embeddedWallet?.address as `0x${string}`]
      );

      if (agentInfo) {
        setAgents(agentInfo);
      }
    };

    if (embeddedWallet && !agents) {
      fetchAgents();
    }

    if (agents) {
      console.log("agents data", agents);
    }
  }, [embeddedWallet, agents]);

  async function smartAccountClient() {
    if (!authenticated) {
      console.error("not authenticated");
      return;
    }
    const provider = await walletClient();
    return await createSmartAccountClient({
      signer: provider?.getSigner() as LightSigner,
      chainId: sepolia.id,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${sepolia.id}/${
        process.env.NEXT_PUBLIC_BUNDLER_ID as string
      }`,
      biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_KEY,
      rpcUrl: "https://rpc.sepolia.org",
    });
  }

  async function walletClient() {
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType !== "privy"
    );

    if (!embeddedWallet) {
      console.log("no embedded wallet wound");
      return;
    }
    await embeddedWallet.switchChain(sepolia.id);
    const provider = await embeddedWallet.getEthersProvider();
    return provider;
  }

  return (
    <GlobalContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        index,
        setIndex,
        nftData,
        loadingMarket,
        setNftData,
        smartAccountClient,
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
