import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { avalancheFuji, baseSepolia} from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/userContext";
import Layout from "../components/Layout";
import { defineChain } from "viem";

const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_PROYECT_ID ?? "",
  chains: [
    baseSepolia,
    avalancheFuji,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [baseSepolia]
      : []),
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <ChakraProvider theme={theme}>
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
              <Toaster />
            </Layout>
          </UserProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
