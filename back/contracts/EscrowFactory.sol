// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract EscrowFactory {

    struct Escrows {
        address escrow;
        address owner;
        uint256 id;
    }

    uint256 escrowsId = 0;

    Escrows[] public escrows;

    function addEscrow(address _escrow, address _owner) external {
        escrows.push(Escrows(_escrow, _owner, escrowsId));
        escrowsId++;
    }

    function getEscrowById(uint256 _id) external view returns (Escrows memory) {
        return escrows[_id];
    }
}