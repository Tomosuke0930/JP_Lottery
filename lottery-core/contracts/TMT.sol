// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TomoToken is ERC20 {
  constructor() ERC20("TomoToken", "TMT") {
    _mint(msg.sender, 100000000 * 10**decimals());
  }
}
