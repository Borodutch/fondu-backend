// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract MTKToken is ERC20Mintable {
    string public constant name = "My token";
    string public constant symbol = "MTK";
    uint8 public constant decimals = 16;
}
