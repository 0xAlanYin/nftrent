// 任务描述：使用 Viem 解析 以太坊USDC的 Trasnfer 日志

import { log } from 'console'
import { forEach } from 'lodash'
import { createPublicClient, http, encodeAbiParameters, parseAbiParameters, parseAbiItem, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'


// Initialize a Client with your desired Chain
const publicClient = createPublicClient({
    chain: mainnet,
    // use from https://app.infura.io/key/71715bb9451f47b4baba399889b8daff/active-endpoints
    transport: http("https://mainnet.infura.io/v3/71715bb9451f47b4baba399889b8daff")
})

async function pullAndParseLog() {
    const endBlockNumber = await publicClient.getBlockNumber()
    const filter = await publicClient.createEventFilter({
         // USDC 合约地址
         address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
        fromBlock: BigInt(endBlockNumber) - BigInt(100),
        // 获取链上最近100个区块链内的 USDC Transfer记录
        toBlock: BigInt(endBlockNumber),
    })
    const logs = await publicClient.getFilterLogs({ filter })

    logs.forEach((log) => {
        const value: any = log.args.value
        let amount = formatUnits(value, 6)
        console.log(`从:${log.args.from}, 转账给:${log.args.to}, ${amount} USDC,交易ID：${log.transactionHash}`)
    })
}

pullAndParseLog()