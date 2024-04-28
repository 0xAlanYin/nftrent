import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// 1. Import modules
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import Web3Provider from '@/components/Web3ModalProvider';

// 2. Set up a React Query client.
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
  </Web3Provider>
  );
}
