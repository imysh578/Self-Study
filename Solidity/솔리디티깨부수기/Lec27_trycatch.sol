// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
  try/catch 특징
  1. assert/revert/require 에러 핸들링
    try/catch문 안에서 assert/revert/require를 통해 에러가 나면 catch로 넘어가지 않고, 개발자가 의도한 에러로 판단하여 정상적으로 프로그램을 종료한다.
    try/catch문 밖에서 assert/revert/require를 통해 에러가 나면 catch로 넘어가서 에러를 핸들할 수 있다.
  2. 3가지 catch
    catch Error(string memory reason) { ... } : revert 나 require를 통해 생성된 에러
    catch Panic(uint errorCode) { ... } : assert를 통해 생성된 에러 (예: 0으로 나누면 errorcode로 0x12를 리턴)
    catch(bytesmemoryLowLevelData) { ... } : 로우 레벨 에러
  3. 어디서 사용하는가?
    (1) 외부 스마트 컨트랙트 함수를 호출할 때 : 다른 스마트 컨트랙트를 인스턴스화 한 뒤, 인스턴스로 함수 호출할 때 사용
    (2) 외부 스마트 컨트랙트를 생성할 때 : 다른 스마트 컨트랙트를 인스턴스화 생성할 때 사용함
    (3) 스마트 컨트랙트 내에서 함수를 부를 때 : this를 통해 try/catch를 사용함
 */

// 여기서는 (1)의 경우만 확인

contract math {
  function division(uint256 _num1, uint256 _num2) public pure returns (uint256) {
    // 나누기 함수
    require(_num1<10, "num1 should not be more than 10");
    return _num1/_num2;
  }
}

contract runner {
  event catchErr(string _name, string _err);
  event catchPanic(string _name, uint256 _err);
  event catchLowLevelErr(string _name, bytes _err);
  
  // 외부 컨트랙트 math를 인스턴스화 하기
  math public mathInstance = new math();
  

  function playTryCatch(uint256 _num1, uint256 _num2) public returns(uint256, bool) {
    try mathInstance.division(_num1, _num2) returns(uint256 value) {
      return(value, true);

    } catch Error(string memory _err) {
      emit catchErr("revert/require", _err);
      return(0,false);

    } catch Panic(uint256 _errorCode) {
      emit catchPanic("assertError/Panic", _errorCode);
      return (0, false);

    } catch (bytes memory _errorCode) {
      emit catchLowLevelErr("LowLevelError", _errorCode);
      return (0, false);
    }
  }
}