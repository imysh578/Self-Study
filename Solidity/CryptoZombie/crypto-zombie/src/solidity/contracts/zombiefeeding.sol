pragma solidity >=0.5.0 <0.6.0;

import "./zombiefactory.sol";

contract KittyInterface {
  function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
  );
}

// ZombieFeeding이 ZombieFactory를 상속함
contract ZombieFeeding is ZombieFactory {
  address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
  KittyInterface kittyContract = KittyInterface(ckAddress);

  function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) public {
    require(msg.sender == zombieToOwner[_zombieId]);  // 소유한 좀비만 feeding 가능하게 함
    Zombie storage myZombie = zombies[_zombieId];     // 내 좀비를 zombies 배열에서 가져옴(storage 사용!)
    _targetDna = _targetDna % dnaModulus;             // target DNA를 16자리 수로 만듦
    uint newDna = (myZombie.dna + _targetDna) / 2;    // 물려서 변한 좀비의 DNA 계산
    if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
      newDna = newDna - newDna % 100 + 99;            // 만약 _species가 "kitty" 라면 DNA의 맨 뒷자리를 99로 변환
    }
    _createZombie("NoName", newDna);                  // 임시로 "NoName"이라는 이름을 가진 좀비 생성
  }

  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_zombieId, kittyDna, "kitty");
  }
}