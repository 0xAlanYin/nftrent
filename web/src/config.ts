import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '60f7a70f81488d615ba7f46086b12103'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})



// import { http, createConfig } from 'wagmi'
// import { mainnet, sepolia } from 'wagmi/chains'

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(""),
//     [sepolia.id]: http("https://endpoints.omniatech.io/v1/eth/sepolia/public"),
//   },
// })