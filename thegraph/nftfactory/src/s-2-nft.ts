import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
  S2NFT
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

  saveTokenInfo(event)
}

export function saveTokenInfo(event: TransferEvent): void {
  let s2NFT = S2NFT.bind(event.address);
  let id = event.address.toHexString() + '-' + event.params.tokenId.toHexString();

  let tokenInfo = TokenInfo.load(id);
  // 检查是否存在，存在则更新，不存在则新增
  if (tokenInfo == null) {
    tokenInfo = new TokenInfo(id);
    // 以下字段只在新增时创建，后续无需更新
    tokenInfo.ca = event.address
    tokenInfo.tokenId = event.params.tokenId
    tokenInfo.tokenURL = s2NFT.tokenURI(event.params.tokenId)
    tokenInfo.name = s2NFT.name()
  }
  tokenInfo.owner = event.params.to
  tokenInfo.blockNumber = event.block.number
  tokenInfo.blockTimestamp = event.block.timestamp
  tokenInfo.transactionHash = event.transaction.hash

  // save
  tokenInfo.save()
}
