// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgentTemplate {
    struct Index {
        uint256 version;
        uint256 count;
        string name;
        mapping(string => string) uriToId;
        mapping(string => string) idToUri;
    }

    Index private index;
    bool private indexExists;

    // Function to create a new index catalog
    function createIndex(string memory indexName) external {
        require(!indexExists, "Index already exists");
        index.name = indexName;
        index.version = 1;
        indexExists = true;
    }

    // Function to add a new document CID to the index
    function addDocument(string memory uri, string memory documentCID)
        external
    {
        require(indexExists, "Index does not exist");
        index.count++;
        index.uriToId[uri] = documentCID;
        index.idToUri[documentCID] = uri;
    }

    // Function to retrieve document CID by URI
    function getURIByDocumentCID(string memory cid)
        public
        view
        returns (string memory)
    {
        require(indexExists, "Index does not exist");
        return index.idToUri[cid];
    }

    // Function to retrieve  URI by document CID
    function getDocumentCIDByURI(string memory uri)
        public
        view
        returns (string memory)
    {
        require(indexExists, "Index does not exist");
        return index.uriToId[uri];
    }

    // Function to retrieve the index name, version, and count
    function getIndexInfo()
        public
        view
        returns (
            string memory name,
            uint256 version,
            uint256 count
        )
    {
        require(indexExists, "Index does not exist");
        return (index.name, index.version, index.count);
    }
}
