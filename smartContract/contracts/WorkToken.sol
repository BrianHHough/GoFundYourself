//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

//import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

struct ProjectCreator { 
    uint256 totalJobCost;
    uint256 jobTimeLimit;
    uint256[] jobsIssued;//?
    string tokenURI;
    uint16 jobs;
    uint16 jobsMinted;
    uint16 jobsCompleted;
}

contract WorkToken is Ownable, ERC721URIStorage, KeeperCompatibleInterface{
    using SafeERC20 for IERC20;

    uint256 public startTotalJobCost;
    uint16 public jobLimit;
    uint256 public tokenCounter;
    IERC20 public stableCoin;
    enum tokenStatus{unFulfilled, fulfilled, expired, flagged}

    mapping(uint256 => tokenStatus) public tokenIdToStatus;
    mapping(uint256 => address) public tokenIdToProjectCreator;
    mapping(uint256 => uint256) public tokenIdToExpiryTime;

    mapping(address => ProjectCreator) public projectCreators;

    event MintNFT(string tokenURI);
    event ProjectCreatorCreateProject(string tokenURI);
    event FinishProject(uint256 jobIndex);

    constructor() ERC721("WorkToken","WRK"){
        tokenCounter = 0;
        startTotalJobCost = 55;
        jobLimit = 50;
    }
    modifier tokenOwner(uint256 jobIndex) {
      require(msg.sender == ownerOf(jobIndex));
      _;
   }

    function setTokenAddresses(address _stableCoinAddress) external onlyOwner{
        stableCoin = IERC20(_stableCoinAddress);
    }

    function getProjectCreator(address projectCreatorAddress) public view returns (ProjectCreator memory) {
        return projectCreators[projectCreatorAddress];
    }

    function getProjectURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function getProjectStatus(uint256 tokenId) public view returns (tokenStatus) {
        return tokenIdToStatus[tokenId];
    }
    
    function mintNFT(address projectCreatorAddress) public {
        require(projectCreators[projectCreatorAddress].jobsMinted <= projectCreators[projectCreatorAddress].jobs);
        tokenIdToStatus[tokenCounter] = tokenStatus(0);
        tokenIdToProjectCreator[tokenCounter] = projectCreatorAddress;
        tokenIdToExpiryTime[tokenCounter] = block.timestamp + projectCreators[projectCreatorAddress].jobTimeLimit;

        projectCreators[projectCreatorAddress].jobsIssued.push(tokenCounter);
        projectCreators[projectCreatorAddress].jobsMinted++;

        uint256 jobCost = 10 ** 18 * projectCreators[projectCreatorAddress].totalJobCost / projectCreators[projectCreatorAddress].jobs;

        stableCoin.safeTransferFrom(msg.sender, projectCreatorAddress, jobCost);

        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, projectCreators[projectCreatorAddress].tokenURI);
        
        emit MintNFT(tokenURI(tokenCounter));
        tokenCounter++;
    }

    function newProjectCreator(uint16 jobs, uint256 jobTimeLimit, string memory tokenURI) public {
        require(projectCreators[msg.sender].totalJobCost == 0);//make sure ProjectCreator does not exest
        projectCreators[msg.sender].totalJobCost = startTotalJobCost;
        projectCreatorChangeJob(jobs, jobTimeLimit, tokenURI);
    }

    function projectCreatorChangeJob(uint16 jobs, uint256 jobTimeLimit, string memory tokenURI) public {
        require(jobs <= jobLimit && jobs > 0);
        require(projectCreators[msg.sender].totalJobCost != 0);//make sure ProjectCreator exests
        projectCreators[msg.sender].jobs = jobs;
        projectCreators[msg.sender].jobTimeLimit = jobTimeLimit;
        projectCreators[msg.sender].tokenURI = tokenURI;
        projectCreators[msg.sender].jobsCompleted = 0;
        projectCreators[msg.sender].jobsMinted = 0;
        emit ProjectCreatorCreateProject(tokenURI);
    }


    function completeJob(uint256 jobIndex) public tokenOwner(jobIndex) { 
        address projectCreatorAddress = tokenIdToProjectCreator[jobIndex];

        //check if URIs match
        require(keccak256(abi.encodePacked(projectCreators[projectCreatorAddress].tokenURI)) == keccak256(abi.encodePacked(tokenURI(jobIndex))));
        projectCreators[projectCreatorAddress].jobsCompleted++;
        tokenIdToStatus[jobIndex] = tokenStatus(1);
        emit FinishProject(uint256 jobIndex);
    }

    function badJob(uint256 jobIndex) public tokenOwner(jobIndex) { 
        tokenIdToStatus[jobIndex] = tokenStatus(3);
    }
    
    function upgradeProjectCreator() public {
        require(projectCreators[msg.sender].jobsCompleted == projectCreators[msg.sender].jobs);
        projectCreators[msg.sender].totalJobCost = projectCreators[msg.sender].totalJobCost * 5;
        projectCreators[msg.sender].jobsCompleted = 0;
        
    }



    function checkUpkeep(bytes calldata /*checkData*/) external view override returns (bool upkeepNeeded, bytes memory performData) { //has bug
        for (uint256 i=0; i<tokenCounter; i++) {
            if(tokenIdToStatus[i] == tokenStatus(0) && tokenIdToExpiryTime[i] > block.timestamp){
                upkeepNeeded = true;
                performData = abi.encodePacked(i);
            } 
        }
        upkeepNeeded = false;
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 i = sliceUint(performData, 0);
        if(tokenIdToStatus[i] == tokenStatus(0) && tokenIdToExpiryTime[i] > block.timestamp){
            tokenIdToStatus[i] = tokenStatus(2);
            projectCreators[tokenIdToProjectCreator[i]].jobsCompleted++;
        }
    }

    function sliceUint(bytes memory bs, uint start) internal pure returns (uint){
        require(bs.length >= start + 32, "slicing out of range");
        uint x;
        assembly {
            x := mload(add(bs, add(0x20, start)))
        }
        return x;
    }
}
