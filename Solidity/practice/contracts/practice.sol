pragma solidity ^0.4.26;

contract Practice {
  uint[] storageData = [10];

  mapping (uint => uint) public GetStorage;

  function initStorage() public {
    storageData[0] = 10;
    GetStorage[0] = storageData[0];
  }

  function addStorage() public {
    uint[] storage temp = storageData;
    temp[0] += 10;
    GetStorage[0] = storageData[0];
  }
}