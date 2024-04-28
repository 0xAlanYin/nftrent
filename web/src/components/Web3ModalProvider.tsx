import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from "wagmi";
import { projectId, wagmiConfig } from '@/config/provider'

createWeb3Modal({ wagmiConfig, projectId, themeMode: 'light', enableAnalytics: true, enableOnramp: true });

export default function App({ children }: any) {
  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
    </WagmiProvider>
  );
}
