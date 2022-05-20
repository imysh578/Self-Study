// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
  try/catch
  
  3. 어디서 사용하는가?
    (1) 외부 스마트 컨트랙트 함수를 호출할 때 : 다른 스마트 컨트랙트를 인스턴스화 한 뒤, 인스턴스로 함수 호출할 때 사용
    (2) 외부 스마트 컨트랙트를 생성할 때 : 다른 스마트 컨트랙트를 인스턴스화 생성할 때 사용함
    (3) 스마트 컨트랙트 내에서 함수를 부를 때 : this를 통해 try/catch를 사용함
 */

// 여기서는 (2), (3)의 경우 확인

// (2) 외부 스마트 컨트랙트를 생성할 때
contract character {
  string private name;
  uint256 private power;

  constructor (string memory _name, uint256 _power) {
    // revert("error"); // 여기서 일부러 에러를 내본다
    name = _name;
    power = _power;
  }
}

contract runner {
  event catchOnly(string _name, string _err);
  
  function playTryCatch(string memory _name, uint256 _power) public returns(bool successOrFail) {
    try new character(_name, _power) { // try/catch에서 catch 컨트랙트를 직접 인스턴스화
      revert("errors in the try/catch block");
      return(true);
      
    } catch {
      emit catchOnly("catch", "Errors");
      return (false);
    }
  }
}

// (3) 스마트 컨트랙트 내에서 함수를 부를 때
contract runner2 {
  event catchOnly(string _name, string _err);
  
  function simple() public returns(uint256) {
    return 4;
  }

  function playTryCatch(string memory _name, uint256 _power) public returns(uint256, bool) {
    try this.simple() returns(uint256 _value) { // this를 통해 내부 함수 불러옴
      return(_value, true);
    } catch {
      emit catchOnly("catch", "Errors");
      return (0, false);
    }
  }
}