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
  KittyInterface kittyContract; 

  // 좀비 소유자 확인
  modifier onlyOwnerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    _;
  }

  // cryptoKitty 컨트랙트 주소가 바뀔 수도 있기 때문에 이를 임의로 바꿀 수 있는 함수를 만듦
  function setKittyContractAddress(address _address) external onlyOwner {
    kittyContract = KittyInterface(_address);
  }

  // 좀비 공격 이후 쿨타임 다시 설정
  function _triggerCooldown(Zombie storage _zombie) internal {
    _zombie.readyTime = uint32(now + cooldownTime);
  }

  // 쿨타임이 다 지났으면 true, 아니면 false 반환
  function _isReady(Zombie storage _zombie) internal view returns(bool){
    return (_zombie.readyTime <= now);
  }

  function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) internal onlyOwnerOf(_zombieId) {  // ownerOf를 통해 좀비 소유자 확인
    Zombie storage myZombie = zombies[_zombieId];     // 내 좀비를 zombies 배열에서 가져옴(storage 사용!)
    _targetDna = _targetDna % dnaModulus;             // target DNA를 16자리 수로 만듦
    uint newDna = (myZombie.dna + _targetDna) / 2;    // 물려서 변한 좀비의 DNA 계산
    require(_isReady(myZombie));
    if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
      newDna = newDna - newDna % 100 + 99;            // 만약 _species가 "kitty" 라면 DNA의 맨 뒷자리를 99로 변환
    }
    _createZombie("NoName", newDna);                  // 임시로 "NoName"이라는 이름을 가진 좀비 생성
    _triggerCooldown(myZombie);
  }

  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_zombieId, kittyDna, "kitty");
  }
}