// SPDX-License-Identifier: Seokhun Yoon
pragma solidity >=0.7.0 <0.9.0;

contract Owner {
  address private owner;
  
  event OwnerSet(address indexed oldOwner, address indexed newOwner); // 소유자가 바뀔 때마다 이벤트 발생

  constructor() {
    owner = msg.sender; // 배포자를 현재 컨트랙트의 소유자로 설정
    emit OwnerSet(address(0), owner); // 소유자 설정 이벤트 발생
  }

  // 소유자인지 확인하는 제어함수
  modifier isOwner() {
    require(msg.sender == owner, "Only owner can use it.");
    _;
  }

  // 소유자 변경 함수
  function changeOwner(address _newOwner) public isOwner {
    emit OwnerSet(owner, _newOwner);
    owner = _newOwner;
  }

  // 현재 소유자 확인
  function getOwner() public view returns (address) {
    return owner;
  }
}
