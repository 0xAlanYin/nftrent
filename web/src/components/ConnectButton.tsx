import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

export default function ConnectButton() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button className='btn btn-primary' key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}
