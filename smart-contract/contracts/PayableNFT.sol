// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PayableNFT is ERC721URIStorage, Ownable(msg.sender) {
    uint256 public mintPrice;
    uint256 public tokenCounter;
    address public authorAddress;
    string public cid;

    constructor(uint256 _mintPrice, address _ownerAddress)
        ERC721("ZeroNFT", "ZNFT")
    {
        mintPrice = _mintPrice;
        tokenCounter = 0;
        authorAddress = _ownerAddress;
        transferOwnership(_ownerAddress);
    }

    function mintNFT() public payable {
        require(
            msg.value == mintPrice,
            "Please submit the exact minting price"
        );
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, string(abi.encodePacked("ipfs://", cid)));
        tokenCounter++;
    }

    function setMintPrice(uint256 _newMintPrice) public onlyOwner {
        mintPrice = _newMintPrice;
    }

    function setCID(string memory _cid) public onlyOwner {
        cid = _cid;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
