//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract MyContract is Context, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");

    constructor() {
        _setupRole(WITHDRAWER_ROLE, _msgSender());
    }

    function withdraw(
        IERC20 _token,
        address _recipient,
        uint256 _amount
    ) public {
        require(
            hasRole(WITHDRAWER_ROLE, _msgSender()),
            "Sender did not have withdraver role"
        );

        _token.safeTransfer(_recipient, _amount);
    }

    function withdrawContractToken(
        IERC20 _token,
        address _recipient,
        uint256 _amount
    ) public {
        require(
            hasRole(WITHDRAWER_ROLE, _msgSender()),
            "Sender did not have withdraver role"
        );

        _token.approve(address(this), _amount);
        _token.safeTransferFrom(address(this), _recipient, _amount);
    }

    function withdrawUserToken(
        IERC20 _token,
        address _bankInAddress,
        uint256 _amount
    ) public {
        require(
            hasRole(WITHDRAWER_ROLE, _msgSender()),
            "Sender did not have withdraver role"
        );

        _token.safeTransferFrom(_bankInAddress, address(this), _amount);
    }
}
