import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
} from "../generated/templates/S2NFT/S2NFT"
import { Approval, ApprovalForAll, Transfer } from "../generated/schema"

import {
  NFTCreated,
  TokenInfo
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let nftCreated = NFTCreated.load(event.address)
  if (nftCreated == null) {
    return
  }

  let tokenInfo = new TokenInfo(
    event.params.tokenId.toHexString(),
  )
  tokenInfo.ca = event.address
  tokenInfo.tokenId = event.params.tokenId
  tokenInfo.tokenURL = nftCreated.tokenURL
  tokenInfo.name = nftCreated.name
  tokenInfo.owner = event.params.to
  tokenInfo.blockNumber = event.block.number
  tokenInfo.blockTimestamp = event.block.timestamp
  tokenInfo.transactionHash = event.transaction.hash
  tokenInfo.save()
}
