import {
  NFTCreated as NFTCreatedEvent,
  NFTRegesitered as NFTRegesiteredEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  DeployNFTCall
} from "../generated/NftMarket/NftMarket"
import {
  NFTCreated,
  NFTRegesitered,
  OwnershipTransferred,
  TokenInfo
} from "../generated/schema"
import { S2NFT } from '../generated/templates'


export function handleNFTCreated(event: NFTCreatedEvent): void {
  let entity = new NFTCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftCA = event.params.nftCA

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  // create datasource
  S2NFT.create(event.params.nftCA)
}

export function handleNFTRegesitered(event: NFTRegesiteredEvent): void {
  let entity = new NFTRegesitered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftCA = event.params.nftCA

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// export function handleDeployNFT(call: DeployNFTCall): void {
//   let entity = new NFTCreated(
//     call.transaction.hash.concatI32(call.transaction.index.toI32())
//   )
//   entity.nftCA = call.outputs.value0
//   entity.tokenURL = call.inputs.baseURI
//   entity.name = call.inputs.name

//   entity.blockNumber = call.block.number
//   entity.blockTimestamp = call.block.timestamp
//   entity.transactionHash = call.transaction.hash
//   entity.save()

//   S2NFT.create(call.outputs.value0)
// }