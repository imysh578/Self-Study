// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/**
  0.4.22 ~ 0.7.x
  assert: gas를 다 소비한 후, 특정한 조건에 부합하지 않으면(false) 에러를 발생시킨다.
  revert: 조건없이 에러를 발생시키고, gas를 환불 시켜준다.
  require: 특정한 조건에 부합하지 않으면(false) 에러를 발생시키고, gas를 환불 시켜준다.
 */
contract lec25 {
  function assertNow() public pure {
    // 3000000 gas => gas limit만큼 다 소비함
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