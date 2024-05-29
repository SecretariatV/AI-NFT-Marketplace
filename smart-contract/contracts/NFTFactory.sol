// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFT.sol";

contract NFTFactory {
    event NFTCreated(address nftAddress);
    mapping(address => address[]) public ownerToContracts;

    function deployNFT(uint256 _mintPrice, bytes32 _salt) public {
        PayableNFT newNFT = new PayableNFT{salt: _salt}(_mintPrice);
        emit NFTCreated(address(newNFT));
    }

    function computeAddress(
        uint256 _mintPrice,
        bytes32 _salt
    ) public view returns (address) {
        bytes memory bytecode = type(PayableNFT).creationCode;
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(abi.encodePacked(bytecode, _mintPrice))
            )
        );
        return address(uint160(uint256(hash)));
    }
}
