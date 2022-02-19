pragma solidity >=0.5.0 <0.6.0;

import "./zombiefeeding.sol";

contract ZombieHelper is ZombieFeeding {
  // 좀비가 지정된 레벨보다 높거나 같은지 확인
  modifier aboveLevel(uint _level, uint _zombieId) {
    require(zombies[_zombieId].level >= _level);
    _;
  }

  // 레벨 2이상이면 좀비 이름 변경 가능
  function changeName(uint _zombieId, string calldata _newName) external aboveLevel(2, _zombieId) {
    require(zombieToOwner[_zombieId] == msg.sender);  // 현재 사용자가 좀비 소유자인지 확인
    zombies[_zombieId].name = _newName;
  }

  // 레벨 20이상이면 좀비 DNA 변경 가능
  function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) {
    require(zombieToOwner[_zombieId] == msg.sender);  // 현재 사용자가 좀비 소유자인지 확인
    zombies[_zombieId].dna = _newDna;
  }

  // 소유자가 가진 모든 좀비들 불러오기 함수
  function getZombiesByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](ownerZombieCount[_owner]);  // memory를 이용해서 검색한 결과를 담을 배열 생성 
    uint counter = 0;   // for문에서 사용할 result 배열의 index
    for (uint i = 0; i < zombies.length; i++) {
      if(zombieToOwner[i] == _owner) {  // zombie의 소유자가 _owner와 같다면
        result[counter] = i;            // result에 해당 좀비 id를 추가
        counter++;                      // result 배열의 인덱스 증가
      }
    }
    return result;
  }
}
