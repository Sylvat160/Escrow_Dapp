// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import './EscrowFactoryInterface.sol';

contract Escrow {

	EscrowFactoryInterface public escrowFactory;
    
	address public arbiter;
	address public beneficiary;
	address public owner;

	constructor(address _factory) {
		owner = msg.sender;
		escrowFactory = EscrowFactoryInterface(_factory);
		escrowFactory.addEscrow(address(this), owner);
	}

	// function addToFactory(address _escrow) external onlyOwner {
	// }

	modifier onlyOwner() {
		require(msg.sender == owner, 'You\'re not the owner');
		_;
	}

	function initEscrow(address _arbiter, address _beneficiary) external payable onlyOwner {
		require(msg.value >= 0.01 ether, 'Must be greater or equal to 0.01 eth');
		beneficiary = _beneficiary;
		arbiter = _arbiter;
	}

	event Approved(address, address, uint);

	function approved() external {

		require(msg.sender == arbiter, 'You must be the arbiter');

		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value : balance}("");
		require(sent, 'Failed to send eth to beneficiary');
		emit Approved(arbiter, beneficiary, balance);

	}



}