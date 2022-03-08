pragma solidity >=0.5.0 <0.6.0;

import "./zombiehelper.sol";

contract ZombieAttack is ZombieHelper {

  uint randNonce = 0;
  uint attackVictoryProbability = 70;

  // 난수 생성 함수
  function randMod(uint _modulus) internal returns(uint) {
    randNonce = randNonce.add(1);
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }

  function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
    Zombie storage myZombie = zombies[_zombieId];
    Zombie storage enemyZombie = zombies[_targetId];
    uint rand = randMod(100);
    if (rand <= attackVictoryProbability) {						        // 이겼을 때
      myZombie.winCount = myZombie.winCount.add(1);				    // 내 좀비 승리 수 +1
      myZombie.level = myZombie.level.add(1);					        // 내 좀비 레벨 +1
      enemyZombie.lossCount = enemyZombie.lossCount.add(1);		// 상대 좀비 패배 수  +1
      feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
    } else {													                        // 졌을 때
      myZombie.lossCount = myZombie.lossCount.add(1);			    // 내 좀비 패배 수 +1 
      enemyZombie.winCount = enemyZombie.winCount.add(1);		  // 적 좀비 승리 수 +1
    }
    _triggerCooldown(myZombie);
  }
}
