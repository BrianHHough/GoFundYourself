//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TestERC20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("USDcoin", "USDC") {
        _mint(msg.sender, initialSupply);
    }
}