//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SToken is ERC20, AccessControl {
    using SafeMath for uint256;

    bytes32 public constant MINTER_ROLE = bytes32("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = bytes32("BURNER_ROLE");

    uint256 private _cap = 1e26;

    uint256 public constant MARKETPLACE_INDEX = 0;
    uint256 public constant S_TEAM_INDEX = 1;
    uint256 public constant PUBLIC_SALE_INDEX = 2;
    uint256 public constant MARKETING_INDEX = 3;
    uint256 public constant SEED_INVESTOR_INDEX = 4;
    uint256 public constant COMMUNITY_INDEX = 5;

    // 100M TOTAL SUPPLY
    uint256[7] private POOLS_AMOUNT = [
        30000000 * (10**18), // MARKETPLACE REWARD.
        25000000 * (10**18), // TEAM.
        13000000 * (10**18), // PUBLIC SALE.
        10000000 * (10**18), // MARKETING AND CREATORS.
        7000000 * (10**18), // SEED INVESTORS.
        5000000 * (10**18), // COMMUNITY AIRDROP.
        10000000 * (10**18) // LIQUIDITY MINING.
    ];

    mapping(uint256 => bool) public mintedPools;

    constructor(
        address MARKETPLACE,
        address S_TEAM,
        address PUBLIC_SALE,
        address MARKETING_CREATORS,
        address SEED_INVESTORS,
        address COMMUNITY
    ) ERC20("S TOKEN", "STK") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _mint(MARKETPLACE, POOLS_AMOUNT[MARKETPLACE_INDEX]);
        mintedPools[MARKETPLACE_INDEX] = true;

        _mint(S_TEAM, POOLS_AMOUNT[S_TEAM_INDEX]);
        mintedPools[S_TEAM_INDEX] = true;

        _mint(PUBLIC_SALE, POOLS_AMOUNT[PUBLIC_SALE_INDEX]);
        mintedPools[PUBLIC_SALE_INDEX] = true;

        _mint(MARKETING_CREATORS, POOLS_AMOUNT[MARKETING_INDEX]);
        mintedPools[MARKETING_INDEX] = true;

        _mint(SEED_INVESTORS, POOLS_AMOUNT[SEED_INVESTOR_INDEX]);
        mintedPools[SEED_INVESTOR_INDEX] = true;

        _mint(COMMUNITY, POOLS_AMOUNT[COMMUNITY_INDEX]);
        mintedPools[COMMUNITY_INDEX] = true;
    }

    function mint(address _to, uint256 _amount) public onlyRole(MINTER_ROLE) {
        require(
            totalSupply().add(_amount) <= cap(),
            "SToken::Exceeds max cap!"
        );
        _mint(_to, _amount);
    }

    function burn(address _account, uint256 _amount)
        public
        onlyRole(BURNER_ROLE)
    {
        _burn(_account, _amount);
    }

    function cap() public view virtual returns (uint256) {
        return _cap;
    }

    function grantMinter(address _minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, _minter);
    }

    function grantBurner(address _burner) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(BURNER_ROLE, _burner);
    }
}
