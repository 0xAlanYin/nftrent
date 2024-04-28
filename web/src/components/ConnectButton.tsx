import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from '@/config'

import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

// export default function ConnectButton() {
//   const handleConnectWallet = async () => {
//     const result = await connect(config, { connector: injected() })
//   }

//   return (
//     <div>
//       <button onClick={handleConnectWallet}>Connect wallet</button>
//     </div>
//   );
// }


export default function ConnectButton() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button className='btn btn-primary' key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}
