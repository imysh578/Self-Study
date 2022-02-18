pragma solidity >=0.5.0 <0.6.0; // compiler 0.5.x

import "./ownable.sol";

contract ZombieFactory is Ownable { // ZombieFactory가 Ownable를 상속함 
  
  event NewZombie(uint zombieId, string name, uint dna); // 새로운 좀비가 생성됐을 때의 이벤트 정의

  uint dnaDigits = 16;  // DNA는 16자리 수
  uint dnaModulus = 10 ** dnaDigits;  // 16자리 수보다 많은 경우, 16자리 수보다 큰 수는 제외할 때 사용

  // Zombie : name, dna 값을 가짐
  struct Zombie {
    string name;
    uint dna;
  }
  
  // zombies : Zombie로 이루어진 배열
  Zombie[] public zombies;

  // zombie id => user's address : zombie를 소유한 사용자 매핑
  mapping (uint => address) public zombieToOwner;
  // user's address => number of owned zombies : 사용자가 소유한 좀비 수 매핑
  mapping (address => uint) ownerZombieCount;

  // 좀비의 name과 dna를 이용해서 좀비 생성하는 함수
  function _createZombie(string memory _name, uint _dna) internal {
    uint id = zombies.push(Zombie(_name, _dna)) - 1;
    zombieToOwner[id] = msg.sender;   // 생성된 좀비와 현재 사용자를 매핑함
    ownerZombieCount[msg.sender]++;   // 현재 사용자의 좀비 보유 수를 1 증가 시킴
    emit NewZombie(id, _name, _dna);  // 새로운 좀비가 생성됐다는 이벤트 발생
  }
  
  // 좀비의 이름으로 랜덤한 dna 발생하는 함수
  function _generateRandomDna(string memory _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str))); // keccak256으로 유사 난수를 발생시켜 dna 값으로 사용
    return rand % dnaModulus;    // 랜덤 DNA가 16자리가 되도록 dnaModulus를 나눈 나머지를 반환
  }

  // 랜덤한 새로운 좀비 생성하는 함수
  function createRandomZombie(string memory _name) public {
    require(ownerZombieCount[msg.sender] == 0);   // 좀비를 보유하지 않은 사람만 랜덤 좀비 생성할 수 있음
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;            // 맨마지막 두자리는 species를 의미함, 일반 좀비는 00 
    _createZombie(_name, randDna);
  } 
} 