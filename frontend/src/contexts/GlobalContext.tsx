import React, { createContext, useContext, useState, ReactNode } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  BiconomySmartAccountV2,
  createSmartAccountClient,
  LightSigner,
} from "@biconomy/account";
import { sepolia } from "viem/chains";

interface GlobalContextType {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  index: number;
  setIndex: (index: number) => void;
  smartAccountClient: () => Promise<BiconomySmartAccountV2 | undefined>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();

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
        smartAccountClient,
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
