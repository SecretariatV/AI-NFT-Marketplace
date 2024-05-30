import { gql } from '@apollo/client';

export const GET_NFT_DEPLOYED = gql`
  query GetNFTDeployed($first: Int) {
    nftdeployeds(first: $first) {
      id
      nftAddress
      owner
      blockNumber
    }
  }
`;
