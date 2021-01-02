// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract testERC20 is ERC20 {
    constructor() public ERC20("testERC20", "tst") {
        _mint(address(msg.sender), 200000 ether);
    }
}
