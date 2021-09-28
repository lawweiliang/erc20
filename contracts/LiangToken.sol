// SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiangToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    //Burn supply amount
    function burnToken(uint256 _amount) public onlyOwner {
        _burn(msg.sender, _amount);
    }
}
