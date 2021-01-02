// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract testMarket {
    address public nft;
    address public erc20;
    address public owner;
    uint256 public tokenId;
    uint256 public price;
    address public tokenOwner;

    constructor(
        address _nft,
        address _erc20,
        uint256 _tokenId,
        uint256 _price,
        address _tokenOwner
    ) public {
        nft = _nft;
        erc20 = _erc20;
        owner = msg.sender;
        tokenId = _tokenId;
        price = _price;
        tokenOwner = _tokenOwner;
    }

    function isApprovedNFT(address _account)
        public
        view
        returns (bool isApproved)
    {
        return IERC1155(nft).isApprovedForAll(_account, address(this));
    }

    function isAllowedERC20(address _account, uint256 _amount)
        public
        view
        returns (bool isallowed)
    {
        uint256 allowance = IERC20(erc20).allowance(_account, address(this));
        isallowed = allowance >= _amount;
        return isallowed;
    }

    function buyNFT(uint256 _tokenId, uint256 _amount) public {
        require(price > 0, "NFT not for sale");
        require(isApprovedNFT(tokenOwner), "NFT not allowed to sell");
        require(isAllowedERC20(msg.sender, _amount), "Amount not approved");
        price = 0;

        IERC20(erc20).transferFrom(msg.sender, owner, _amount);
        IERC1155(nft).safeTransferFrom(tokenOwner, msg.sender, _tokenId, 1, "");
        tokenOwner = msg.sender;
    }
}
