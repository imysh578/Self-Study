pragma solidity ^0.4.26;

contract FunctionModifier {
  address owner = msg.sender;
  address[] users;
  mapping (address => bool) frozenUser; 
  
  modifier onlyOwner {           
    require(msg.sender == owner);
    _;
  }

  modifier isActive (address _account) {
    require(!frozenUser[_account]);
    _;
  }

  function addUser (address _userAddress) public onlyOwner returns(address[])  {  // 제어자 적용 위치 확인
    users.push(_userAddress);
    return users;
  }
  
  function refund (address _addr) onlyOwner isActive(_addr) {  // 한번에 여러 제어자를 가질 수 있다.
    // ...
  }
}