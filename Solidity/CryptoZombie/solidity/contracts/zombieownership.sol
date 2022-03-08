pragma solidity >=0.5.0 <0.6.0;

import "./zombieattack.sol";
import "./erc721.sol";
import "./safemath.sol";

contract ZombieOwnership is ZombieAttack, ERC721 {
  using SafeMath for uint256;

  mapping (uint => address) zombieApprovals;  // 좀비 아이디 => 허가할 주소

  function balanceOf(address _owner) external view returns (uint256) {
    return ownerZombieCount[_owner];
  }

  function ownerOf(uint256 _tokenId) external view returns (address) {
    return zombieToOwner[_tokenId];
  }

  // transferFrom 내부 전송 로직을 담은 private 함수
  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerZombieCount[_to] = ownerZombieCount[_to].add(1);              // 전달 받은 사람의 좀비수 +1
    ownerZombieCount[_from] = ownerZombieCount[_from].sub(1);          // 보내는 사람의 좀비수 -1
    zombieToOwner[_tokenId] = _to;        // 전송된 좀비의 소유자 변경
    emit Transfer(_from, _to, _tokenId);  // 전송 이벤트 발생
  }

  // _from에서 _to로 좀비를 전송하는 함수
  function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    // 전송할 좀비의 소유자 인지 또는 소유자가 허가한 주소인지 확인
    require (zombieToOwner[_tokenId] == msg.sender || zombieApprovals[_tokenId] == msg.sender);
    _transfer(_from, _to, _tokenId);
  }
  
  // _approved 에게 소유한 좀비의 전송을 허가하는 함수
  function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
    zombieApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }
}