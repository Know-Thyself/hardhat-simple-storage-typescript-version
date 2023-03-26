//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleStorage {
	uint256 favoriteNumber;
	mapping(string => uint256) public nameToFavoriteNumber;
	People[] public people;

	function addPerson(string memory _name, uint256 _favoriteNumber) public {
		people.push(People(_favoriteNumber, _name));
		nameToFavoriteNumber[_name] = _favoriteNumber;
	}

	struct People {
		uint256 favoriteNumber;
		string name;
	}

	function store(uint256 _favoriteNumber) public virtual {
		favoriteNumber = _favoriteNumber;
	}

	function retrieve() public view returns (uint256) {
		return favoriteNumber;
	}

	function add() public pure returns (uint256) {
		return (1 + 1);
	}
}
