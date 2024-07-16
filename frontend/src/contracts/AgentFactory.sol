// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./AgentTemplate.sol";

contract AgentFactory is Ownable(msg.sender) {
    address public agentTemplate;
    uint256 public agentCounter;

    struct AgentInfo {
        address agentAddress;
        address templateAddress;
        string cid;
    }

    mapping(address => AgentInfo[]) public agentsByCreator;

    event AgentCreated(
        address indexed creator,
        address agentAddress,
        address templateAddress,
        string cid
    );

    constructor(address _agentTemplate) {
        require(_agentTemplate != address(0), "Invalid template address");
        agentTemplate = _agentTemplate;
    }

    function setAgentTemplate(address _agentTemplate) external onlyOwner {
        require(_agentTemplate != address(0), "Invalid template address");
        agentTemplate = _agentTemplate;
    }

    function createAgent(string memory cid) external returns (address) {
        address clone = Clones.clone(agentTemplate);
        agentsByCreator[msg.sender].push(
            AgentInfo({
                agentAddress: clone,
                templateAddress: agentTemplate,
                cid: cid
            })
        );
        agentCounter++;

        emit AgentCreated(msg.sender, clone, agentTemplate, cid);

        return clone;
    }

    function getAgentsByCreator(address creator)
        external
        view
        returns (AgentInfo[] memory)
    {
        return agentsByCreator[creator];
    }
}
