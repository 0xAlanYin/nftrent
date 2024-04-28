import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { config } from '@/config'

export default function ConnectButton() {
  const handleConnectWallet = async () => {
    const result = await connect(config, { connector: injected() })
  }

  return (
    <div>
      <button onClick={handleConnectWallet}>Connect wallet</button>
    </div>
  );
}
