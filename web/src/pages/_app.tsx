import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { WagmiProvider } from 'wagmi' 
import { config } from '../config' 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}> 
    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
    </WagmiProvider>
  );
}
