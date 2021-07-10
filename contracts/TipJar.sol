//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TipJar {
    uint256 public balance;

    function withdraw() public payable{
         payable(msg.sender).transfer(balance);
    }

    receive() external payable {
        require(msg.value > 0, "Invalid amount");
        balance += msg.value;
    } 
    
}
