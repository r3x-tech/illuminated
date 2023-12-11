// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract MysteryGame is ERC721, Ownable, Pausable, ReentrancyGuard {
    using EnumerableSet for EnumerableSet.AddressSet;

    struct Puzzle {
        string name;
        string solutionReqs;
        bool isSolved;
    }

    struct Mystery {
        string name;
        string description;
        string keyphrase;
        uint256 reward;
        Puzzle[] puzzles;
        EnumerableSet.AddressSet solvers;
        bool isCompleted;
    }

    uint256 private nextMysteryId = 0;
    mapping(uint256 => Mystery) private mysteries;

    // Event declarations
    event MysteryCreated(uint256 indexed mysteryId, string name);
    event PuzzleSolved(uint256 indexed mysteryId, uint256 indexed puzzleIndex, address solver);
    event MysteryCompleted(uint256 indexed mysteryId);
    event RewardDistributed(uint256 indexed mysteryId, address indexed solver, uint256 reward);

    constructor() ERC721("MysteryGame", "MYST") {}

    function createMystery(string memory name, string memory description, string memory keyphrase, uint256 reward, Puzzle[] memory puzzles) public onlyOwner whenNotPaused {
        uint256 mysteryId = nextMysteryId++;
        Mystery storage newMystery = mysteries[mysteryId];
        newMystery.name = name;
        newMystery.description = description;
        newMystery.keyphrase = keyphrase;
        newMystery.reward = reward;
        for (uint i = 0; i < puzzles.length; i++) {
            newMystery.puzzles.push(puzzles[i]);
        }
        _mint(msg.sender, mysteryId); // Minting the Mystery NFT to the contract owner or another address as needed
        emit MysteryCreated(mysteryId, name);
    }

    function verifyAndSolvePuzzle(uint256 mysteryId, uint256 puzzleIndex, string memory solution) public nonReentrant whenNotPaused {
        Mystery storage mystery = mysteries[mysteryId];
        require(puzzleIndex < mystery.puzzles.length, "Invalid puzzle index");
        require(!mystery.puzzles[puzzleIndex].isSolved, "Puzzle already solved");

        // Add logic to verify the solution
        // This might involve external calls or complex logic

        mystery.puzzles[puzzleIndex].isSolved = true;
        mystery.solvers.add(msg.sender); // Recording the solver

        // Check if all puzzles in the mystery are solved
        if (checkAllPuzzlesSolved(mysteryId)) {
            mystery.isCompleted = true;
            distributeRewards(mysteryId);
            emit MysteryCompleted(mysteryId);
        }

        emit PuzzleSolved(mysteryId, puzzleIndex, msg.sender);
    }

    function checkAllPuzzlesSolved(uint256 mysteryId) internal view returns (bool) {
        Mystery storage mystery = mysteries[mysteryId];
        for (uint i = 0; i < mystery.puzzles.length; i++) {
            if (!mystery.puzzles[i].isSolved) {
                return false;
            }
        }
        return true;
    }

    function distributeRewards(uint256 mysteryId) internal {
        Mystery storage mystery = mysteries[mysteryId];
        uint256 rewardPerSolver = mystery.reward / mystery.solvers.length();
        for (uint i = 0; i < mystery.solvers.length(); i++) {
            // Distribute rewards here
            // Example: ERC20Token.transfer(mystery.solvers.at(i), rewardPerSolver);
            emit RewardDistributed(mysteryId, mystery.solvers.at(i), rewardPerSolver);
        }
    }

    function listMysteries(uint256 start, uint256 limit) public view returns (Mystery[] memory) {
    require(start < nextMysteryId, "Start index out of bounds");

    uint256 end = start + limit;
    if (end > nextMysteryId) {
        end = nextMysteryId;
    }

    Mystery[] memory paginatedMysteries = new Mystery[](end - start);
    for (uint256 i = start; i < end; i++) {
        paginatedMysteries[i - start] = mysteries[i];
    }
    return paginatedMysteries;
    }


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Additional helper functions as needed
}
