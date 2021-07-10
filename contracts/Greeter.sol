//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./TipJar.sol";

contract Greeter {
    // This Greeter receives a tip and saves it into the Tip Jar
    string public greeting;
    TipJar public tipJar;

    constructor(TipJar _tipjar) {
        tipJar = _tipjar;
    }
    
    function greet() public view returns (string memory) {
        return greeting;
    }


    function setGreeting(string memory _greeting) public payable {
        require(msg.value > 0, "Please tip the Greeter");
        (bool success, ) = payable(tipJar).call{ value: msg.value }("");
        require(success, "Tip failed to add to TipJar");
        greeting = _greeting;
        console.log("Changed greeting from '%s' to '%s'", greeting, _greeting);
    }
}