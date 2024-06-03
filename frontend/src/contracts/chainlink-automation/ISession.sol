// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface ISession {
    function activeRequests() external view returns (bytes32[] memory);
    function setAutomationCronContract(address _upkeepContract) external;
    function updateRequest(bytes memory _request, bytes32 hash) external;
    function sendRequestCBOR() external;
    function startSession(bytes32 hash, string memory cid) external;
    function getIPNS(
        bytes32 hash
    ) external view returns (string memory balanceResult);
}
