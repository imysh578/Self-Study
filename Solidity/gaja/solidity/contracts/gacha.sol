// SPDX-License-Identifier: Seokhun Yoon
pragma solidity >=0.7.0 <0.9.0;

import "./owner.sol";

contract Gacha is Owner {
  struct Item {
    uint8 id;
    bool picked;
  }

  struct User {
    Item itemOwned;
    uint8 attempts;
  }

  mapping (address => User) public users;

  Item[] itemList;
  uint getItemFee = 0.01 ether;
  uint randNonce = 0;
  uint attemptsLimit = 5;
  uint bonusAttemps = 1;
  uint winningProbability = 50;

  constructor() {
    for (uint8 i = 0; i < 10; i++) {
      itemList.push(Item(i, false));
    }
  }

  function getRandomNum (uint _range) internal returns (uint){
    randNonce++;
    uint randomNum = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce)))%_range;
    return randomNum;
  }

  modifier checkAttempts {
    uint userAttempts = users[msg.sender].attempts;
    require(userAttempts < attemptsLimit + bonusAttemps, "You used every chance to get item.");
    _;
  }

  function getRandomItem () external payable checkAttempts returns (Item memory){
    User storage user = users[msg.sender]; 
    require(msg.value == getItemFee, "You should pay correct amount of Eth. Check the value you sent.");
    uint randomProbability = getRandomNum(100);
    if (randomProbability > 50) {
      uint randomItemNum = getRandomNum(10);
      user.attempts++;
      user.itemOwned = itemList[randomItemNum];
      return user.itemOwned;
    }
  }

  function setGetItemFee(uint _newGameFee) external isOwner {
    getItemFee = _newGameFee * (1 ether);
  }

  function setAttemptsLimit (uint _newAttemptsLimit) external isOwner {
    attemptsLimit = _newAttemptsLimit;
  }
}