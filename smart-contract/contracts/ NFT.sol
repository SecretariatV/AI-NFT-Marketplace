// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PayableNFT.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

contract NFTFactory {
    event NFTDeployed(
        address indexed nftAddress,
        address indexed owner,
        string indexed cid
    );

    function deployNFT(
        string memory cid,
        address owner,
        uint256 _mintPrice,
        bytes32 _nounce
    ) public {
        bytes memory bytecode = abi.encodePacked(
            type(PayableNFT).creationCode,
            abi.encode(_mintPrice, owner, cid)
        );

        // Deploy the contract using Create2
        address newNFTAddress = Create2.deploy(0, _nounce, bytecode);
        emit NFTDeployed(address(newNFTAddress), owner, cid);
    }

     function computeAddress(
        uint256 _mintPrice,
        address owner,
        string memory cid,
        bytes32 _nounce
    ) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(PayableNFT).creationCode,
            abi.encode(_mintPrice, owner, cid)
        );

        return Create2.computeAddress(_nounce, keccak256(bytecode));
    }

  
}
