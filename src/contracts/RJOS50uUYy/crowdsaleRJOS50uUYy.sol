// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/WhitelistCrowdsale.sol";

contract MTKCrowdsale is
    MintedCrowdsale,
    Ownable ,
    TimedCrowdsale,
    CappedCrowdsale,
    WhitelistCrowdsale
{
    constructor(
        ERC20Mintable _token,
        uint256 _rate,
        address payable _wallet,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _cap
    )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        CappedCrowdsale(_cap)
    {}
}
