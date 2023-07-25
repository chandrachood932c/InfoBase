// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    uint256 maxSupply;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _maxSupply
    ) ERC20(_tokenName, _tokenSymbol) {
        maxSupply = _maxSupply;
    }

    function mint(address to, uint256 amount) public {
        require(maxSupply > totalSupply(), "All tokens minted");
        _mint(to, amount);
    }
}

contract TokenDeployer {
    Token[] public tokens;

    function createToken(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _maxSupply
    ) public {
        Token newToken = new Token(_tokenName, _tokenSymbol, _maxSupply);
        tokens.push(newToken);
    }

    function getAllTokenAddresses() public view returns (Token[] memory) {
        return tokens;
    }
}
