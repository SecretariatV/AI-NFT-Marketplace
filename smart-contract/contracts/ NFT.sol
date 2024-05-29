// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PayableNFT is ERC721URIStorage, Ownable {
    uint256 public mintPrice;
    uint256 public tokenCounter;
    string public constant tokenURI = "ipfs://Your_CID_Here";

    constructor(uint256 _mintPrice) ERC721("PayableNFT", "PNFT") {
        mintPrice = _mintPrice;
        tokenCounter = 0;
    }

    function mintNFT() public payable {
        require(msg.value == mintPrice, "Please submit the exact minting price");
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        tokenCounter++;
    }

    function setMintPrice(uint256 _newMintPrice) public onlyOwner {
        mintPrice = _newMintPrice;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}