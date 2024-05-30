import { gql } from "@apollo/client";

export const GET_NFT_DEPLOYED = gql`
  query GetNFTDeployed($first: Int) {
    nftdeployeds(first: $first, orderBy: blockNumber, orderDirection: desc) {
      id
      nftAddress
      owner
      blockNumber
    }
  }
`;
