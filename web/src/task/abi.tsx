import { createPublicClient, http, encodeAbiParameters, parseAbiParameters, decodeAbiParameters } from 'viem'
import { mainnet } from 'viem/chains'

// Initialize a Client with your desired Chain
const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
})

async function test() {
    const blockNumber = await publicClient.getBlockNumber()
    console.log("blockNumber:", blockNumber)
}
test();

// test encodeAbiParameters
const encodedData1 = encodeAbiParameters(
    [
        { name: 'x', type: 'string' },
        { name: 'y', type: 'uint' },
        { name: 'z', type: 'bool' }
    ],
    ['alan', BigInt(20), true]
)
console.log("encodedData1:", encodedData1)

// test parseAbiParameters
const encodeData2 = encodeAbiParameters(
    parseAbiParameters('string x, uint y, bool z'),
    ['alan', BigInt(20), true]
)
console.log("encodedData2:", encodeData2)


// test parseAbiParameters
// const abi = [
//     "addUser(string,uint,bool)",
//     {
//         name: 'staticStruct',
//         inputs: [
//           {
//             components: [
//               {
//                 name: 'x',
//                 type: 'uint256',
//               },
//               {
//                 name: 'y',
//                 type: 'bool',
//               },
//               {
//                 name: 'z',
//                 type: 'address',
//               },
//             ],
//             name: 'foo',
//             type: 'tuple',
//           },
//         ],
//       }
// ]
// const encodeData3 = encodeAbiParameters(
//     abi[0],
//     ['alan', BigInt(20), true]
// )
// console.log("encodeData3:", encodeData3)

const values1 = decodeAbiParameters(
    [
        { name: 'x', type: 'string' },
        { name: 'y', type: 'uint' },
        { name: 'z', type: 'bool' }
    ],
    '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000',
)
// ['wagmi', 420n, true]
console.log("values1:", values1)


const values2 = decodeAbiParameters(
    parseAbiParameters('string x, uint y, bool z'),
    '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'
)
console.log("values2:", values2)


async function test222() {
    const blockNum = await publicClient.getBlockNumber()
    console.log("blockNum:", blockNum);

    publicClient.watchBlockNumber(blockNumber) => {
        console.log("blockNumber:", blockNumber);
    }
}