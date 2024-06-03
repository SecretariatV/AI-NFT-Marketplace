// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PayableNFT.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

contract NFTFactory {
    event NFTDeployed(address indexed nftAddress, address indexed owner);

    function deployNFT(
        address owner,
        uint256 _mintPrice,
        bytes32 _nounce
    ) public {
        bytes memory bytecode = abi.encodePacked(
            type(PayableNFT).creationCode,
            abi.encode(_mintPrice, owner)
        );

        // Deploy the contract using Create2
        address newNFTAddress = Create2.deploy(0, _nounce, bytecode);
        emit NFTDeployed(address(newNFTAddress), owner);
    }

    function computeAddress(
        uint256 _mintPrice,
        address owner,
        bytes32 _nounce
    ) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(PayableNFT).creationCode,
            abi.encode(_mintPrice, owner)
        );

        return Create2.computeAddress(_nounce, keccak256(bytecode));
    }
}
