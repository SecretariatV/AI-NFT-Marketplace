import { NFTDeployed as NFTDeployedEvent } from "../generated/NFTFactory/NFTFactory"
import { NFTDeployed } from "../generated/schema"

export function handleNFTDeployed(event: NFTDeployedEvent): void {
  let entity = new NFTDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftAddress = event.params.nftAddress
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
