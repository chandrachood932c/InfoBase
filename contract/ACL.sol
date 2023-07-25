// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract AccessControlLists {
    mapping(address => mapping(address => bool)) private accessControlList;

    function grantAccess(address _user, address _researcher) public {
        accessControlList[_researcher][_user] = true;
    }

    function revokeAccess(address _user, address _researcher) public {
        accessControlList[_researcher][_user] = false;
    }

    function hasAccess(
        address _user,
        address _researcher
    ) public view returns (bool) {
        return accessControlList[_researcher][_user];
    }
}
