import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { PrivyProvider } from "@privy-io/react-auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        loginMethods: ["google", "email"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "http://localhost:3000/vercel.svg",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          noPromptOnSignature: false,
        },
        // walletConnectCloudProjectId: ""
        
      }}
    >
      <ChakraProvider>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ChakraProvider>
    </PrivyProvider>
  );
}
