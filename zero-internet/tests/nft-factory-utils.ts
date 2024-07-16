import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { NFTDeployed } from "../generated/NFTFactory/NFTFactory"

export function createNFTDeployedEvent(
  nftAddress: Address,
  owner: Address
): NFTDeployed {
  let nftDeployedEvent = changetype<NFTDeployed>(newMockEvent())

  nftDeployedEvent.parameters = new Array()

  nftDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftDeployedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return nftDeployedEvent
}
