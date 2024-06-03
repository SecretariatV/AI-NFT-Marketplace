// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

contract Session is FunctionsClient, ConfirmedOwner {
    address public upkeepContract;
    uint64 private subscriptionId;
    uint32 private gasLimit;
    bytes32 private donID;

    struct Request {
        bytes request;
        uint64 subscriptionId;
        uint32 gasLimit;
        bytes32 donID;
    }

    struct Response {
        bytes32 requestId;
        bytes response;
        bytes err;
    }

    struct SessionData {
        bytes32 hash;
        uint256 startTime;
        string ipnsRecord; //IPNS address
    }

    bytes32[] public activeRequests;

    mapping(bytes32 => Request) public requests;
    mapping(bytes32 => bytes32) public requestsIDs;
    mapping(bytes32 => Response) public responses;

    mapping(bytes32 => SessionData) public sessionData;

    error NotAllowedCaller(
        address caller,
        address owner,
        address automationRegistry
    );

    //we can always listen to  the request ID and retrieve responses off-chain
    event SessionRequested(bytes32 indexed requestId, bytes32 indexed hash);
    event ResponseReceived(
        bytes32 indexed requestId,
        bytes response,
        bytes err
    );

    constructor(address router)
        FunctionsClient(router)
        ConfirmedOwner(msg.sender)
    {
        subscriptionId = 4233;
        gasLimit = 300000;
        donID = "fun-avalanche-fuji-1";
    }

    function setAutomationCronContract(address _upkeepContract)
        external
        onlyOwner
    {
        require(_upkeepContract != address(0), "Invalid contract address");
        upkeepContract = _upkeepContract;
    }

    //manual trigger
    function updateRequest(bytes memory _request, bytes32 hash) external {
        requests[hash] = Request({
            request: _request,
            subscriptionId: subscriptionId,
            gasLimit: gasLimit,
            donID: donID
        });
        addActiveRequest(hash);
    }

    function sendRequestCBOR() external {
        for (uint256 i = 0; i < activeRequests.length; i++) {
            bytes32 requestHash = activeRequests[i];
            Request storage req = requests[requestHash];
            bytes32 s_lastRequestId = _sendRequest(
                req.request,
                req.subscriptionId,
                req.gasLimit,
                req.donID
            );
            requestsIDs[requestHash] = s_lastRequestId;
            emit SessionRequested(s_lastRequestId, requestHash);
        }
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        responses[requestId] = Response({
            requestId: requestId,
            response: response,
            err: err
        });

        //update the session data with the response
        emit ResponseReceived(requestId, response, err);
    }

    function addActiveRequest(bytes32 hash) internal {
        activeRequests.push(hash);
    }

    function removeActiveRequest(bytes32 hash) internal {
        for (uint256 i = 0; i < activeRequests.length; i++) {
            if (activeRequests[i] == hash) {
                activeRequests[i] = activeRequests[activeRequests.length - 1];
                activeRequests.pop();
                break;
            }
        }
    }

    function startSession(bytes32 hash, string memory cid) external onlyOwner {
        if (isValidSession(hash)) {
            sessionData[hash] = SessionData({
                hash: bytes32(0),
                startTime: 0,
                ipnsRecord: cid
            });
        }

        //init a session
        sessionData[hash] = SessionData({
            hash: hash,
            startTime: block.timestamp,
            ipnsRecord: cid
        });

        //init ipns request
        addActiveRequest(hash);
    }

    function getIPNS(bytes32 hash)
        external
        view
        returns (string memory balanceResult)
    {
        bytes32 id = requestsIDs[hash];
        bytes memory response = responses[id].response;

        return string(response);
    }

    function isValidSession(bytes32 hash) internal view returns (bool) {
        SessionData memory session = sessionData[hash];
        return session.hash != bytes32(0);
    }
}
