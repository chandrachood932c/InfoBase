// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./AccessControlLists.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MeetSci is AccessControlLists {
    receive() external payable {}

    fallback() external payable {}

    using Counters for Counters.Counter;

    Counters.Counter private _profileIdCounter;
    Counters.Counter private _researchIdCounter;

    function getCurrentProfileId() public view returns (uint256) {
        return _profileIdCounter.current();
    }

    function getCurrentResearcherId() public view returns (uint256) {
        return _researchIdCounter.current();
    }

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
        _profileIdCounter.increment();
        _researchIdCounter.increment();
    }

    struct Profile {
        uint256 id;
        address researcher;
        string name;
        string symbol;
        string department;
        address tokenAddress;
        uint256 tokenSupply;
        uint256 totalVotes;
    }
    Profile[] public profiles;

    struct ResearchPaper {
        uint256 id;
        address researcher;
        uint256 profileId;
        string title;
        string desc;
        string department;
        string fileURI;
        uint256 totalVotes;
        string coverImage;
    }
    ResearchPaper[] public researchPapers;

    mapping(address => Profile) public researcherByAddress;

    mapping(uint256 => Profile) public researcher; // ID to Profile
    mapping(uint256 => ResearchPaper) public researcherPaper; // ID to research paper

    // ProfileID ---> Research Paper
    mapping(address => ResearchPaper[]) public profileResearchPapers; // all papers published

    // ProfileID ---> accountAddresses
    mapping(address => address[]) public subscriber;
    mapping(address => Profile[]) public subscribedTo;

    // Sign-up as Researcher
    function addProfile(
        address _researcher,
        string memory _name,
        string memory _symbol,
        string memory _department,
        address _tokenAddress,
        uint256 _totalSupply
    ) public {
        uint256 _id = _profileIdCounter.current();

        Profile memory profile = Profile(
            _id,
            _researcher,
            _name,
            _symbol,
            _department,
            _tokenAddress,
            _totalSupply,
            0
        );
        profiles.push(profile);

        researcher[_id] = profile;
        researcherByAddress[_researcher] = profile;

        _profileIdCounter.increment();
    }

    // Add work
    function addWorkToId(
        uint256 _profileId,
        address _researcher,
        string memory _title,
        string memory _desc,
        string memory _department,
        string memory _fileURI,
        string memory _coverImage
    ) public returns (bool) {
        uint256 _id = _researchIdCounter.current();

        ResearchPaper memory paper = ResearchPaper(
            _id,
            _researcher,
            _profileId,
            _title,
            _desc,
            _department,
            _fileURI,
            0,
            _coverImage
        );
        researchPapers.push(paper);

        researcherPaper[_id] = paper;
        profileResearchPapers[_researcher].push(paper);

        _researchIdCounter.increment();

        return true;
    }

    // Voting
    function voteToResearchId(uint256 _researchPaperId) public returns (bool) {
        researcherPaper[_researchPaperId].totalVotes++;
        researcher[researcherPaper[_researchPaperId].profileId].totalVotes++;

        return true;
    }

    // Voting
    function voteToProfileId(uint256 _researcherId) public returns (bool) {
        researcher[_researcherId].totalVotes++;

        return true;
    }

    // Join as subscriber
    function subscribe(
        address _account,
        address _researcher
    ) public returns (bool) {
        subscriber[_researcher].push(_account);
        subscribedTo[_account].push(researcherByAddress[_researcher]);

        grantAccess(msg.sender, _researcher);

        return true;
    }

    function getExploreProfiles() public view returns (Profile[] memory) {
        uint totalItemCount = profiles.length;
        uint currentIndex = 0;

        Profile[] memory items = new Profile[](totalItemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            items[currentIndex] = researcher[i + 1];

            currentIndex++;
        }

        return items;
    }

    function getAllPapers() public view returns (ResearchPaper[] memory) {
        uint totalItemCount = researchPapers.length;
        uint currentIndex = 0;

        ResearchPaper[] memory items = new ResearchPaper[](totalItemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            items[currentIndex] = researcherPaper[i + 1];

            currentIndex++;
        }

        return items;
    }

    function getPaperById(
        uint256 _id
    ) public view returns (ResearchPaper memory) {
        return researcherPaper[_id];
    }

    function getAllSubscribers(
        address _researcher
    ) public view returns (address[] memory) {
        return subscriber[_researcher];
    }

    function getTokenAddress(
        address _researcher
    ) public view returns (address) {
        return researcherByAddress[_researcher].tokenAddress;
    }

    function getResearcherProfile(
        address _researcher
    ) public view returns (Profile memory) {
        return researcherByAddress[_researcher];
    }

    function getResearcherProfileById(
        uint256 _researcherId
    ) public view returns (Profile memory) {
        return researcher[_researcherId];
    }

    function getProfilePapersByAddress(
        address _researcher
    ) public view returns (ResearchPaper[] memory) {
        return profileResearchPapers[_researcher];
    }

    function getProfilesSubscribed(
        address _schlor
    ) public view returns (Profile[] memory) {
        return subscribedTo[_schlor];
    }
}
