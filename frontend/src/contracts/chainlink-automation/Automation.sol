// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ISession.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract Automation is AutomationCompatibleInterface {
    uint256 private constant interval = 60;
    ISession private constant consumer =
        ISession(address(0x2d9b4491C694d5835E0e302A19cb34c6Db962C48));
    uint256 public lastTimeStamp;

    constructor() {
        lastTimeStamp = block.timestamp;
    }

    // Checks if a session needs to be created
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        bytes32[] memory keys = consumer.getActiveRequests();
        bool hasActiveRequests = keys.length > 0;
        upkeepNeeded =
            (block.timestamp - lastTimeStamp) > interval &&
            hasActiveRequests;
    }

    // Perform IPNS session updating
    function performUpkeep(bytes calldata /* performData */) external override {
        bytes32[] memory keys = consumer.getActiveRequests();
        bool hasActiveRequests = keys.length > 0;

        if ((block.timestamp - lastTimeStamp) > interval && hasActiveRequests) {
            consumer.sendRequestCBOR();
            lastTimeStamp = block.timestamp;
        }
    }
}
