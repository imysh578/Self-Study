pragma solidity ^0.4.26;

contract SimpleCoin {
  mapping (address => uint) public coinBalance;

  event Transfer(address indexed from, address indexed to, uint256 amount);

  constructor(uint _initialSupply) public {
    coinBalance[msg.sender] = _initialSupply;
  }

  function transfer(address _to, uint256 _amount) public {
    require(coinBalance[msg.sender] >= _amount);
    require(coinBalance[_to] + _amount >= coinBalance[_to]);  // Overflow 방지
    coinBalance[msg.sender] -= _amount;
    coinBalance[_to] += _amount;
    emit Transfer(msg.sender, _to, _amount);
  }
}