// import type { AppProps } from "next/app";
// import Layout from "@/components/layout";
// import { ToastContainer } from "react-toastify";
// import "@/styles/globals.css";
// import "react-toastify/dist/ReactToastify.css";

// import { WagmiProvider } from 'wagmi' 
// import { config } from '../config' 

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <WagmiProvider config={config}> 
//     <Layout>
//       <ToastContainer />
//       <Component {...pageProps} />
//     </Layout>
//     </WagmiProvider>
//   );
// }

import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// 1. Import modules
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../config'

// 2. Set up a React Query client.
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
