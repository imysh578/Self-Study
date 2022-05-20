// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
  0.8.0 포함 x
  0.8.1~
  assert: 오직 내부적 에러 테스트 용도, 불변성 체크 용도
          assert가 에러를 발생시키면, Panic(uint256) 이라는 에러 타입의 에러 발생
 */
contract lec26 {
  function assertNow() public pure {
    // assertNow errored: VM error: revert
    // 21232 gas => 가스 환불됨
    assert(false);
  }

  function revertNow() public pure {
    // 21344 gas
    revert("Error!");
  }

  function requireNow() public pure {
    // 21338 gas 
    require(false, "Error!");
  }

  function onlyAdult(uint256 _age) public pure returns(string memory) {
    // 21616 gas
    if(_age<19) { // 조건이 true일 때 에러 발생
      revert("You are child");
    } 
    return "You are adult";
  }

  function onlyAdult2(uint256 _age) public pure returns(string memory) {
    // 21569 gas
    require(_age>19, "You are child"); // 조건이 false일 때 에러 발생
    return "You are adult";
  }
}