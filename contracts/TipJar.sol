//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TipJar {
    address _owner;
    uint256 public balance;

    constructor() {
        _owner = msg.sender;
    }

    function withdraw() public payable{
        require(msg.sender == _owner, 'Unauthorized');
         payable(msg.sender).transfer(balance);
    }

    receive() external payable {
        require(msg.value > 0, "Invalid amount");
        balance += msg.value;
    } 
    
}
