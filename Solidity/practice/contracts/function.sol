pragma solidity ^0.4.26;

contract Function {
  int stateVariable;

  // Input parameters declaration
  function process1(int _x, int _y, int _z, bool _flag) {
    // body
  }

  // anonymous parameter
  function process2(int _x, int, int, bool _flag) {
    if(_flag) stateVariable = _x;
  }

  // Output parameters declaration 
  function calculate1(int _x, int _y, int _z, bool _flag) 
    returns (int _alpha, int _beta, int _gamma) {
      _alpha = _x + _y;
      _beta = _y + _z;
      if (_flag)
        _gamma = _alpha /_beta;
      else
        _gamma = _z;
  }

  // using return
  function calculate2(int _x, int _y, int _z, bool _flag) 
    returns (int, int, int){
      int _alpha = _x + _y;
      int _beta = _x + _z;
      if (_flag)
        return (_alpha, _beta, _alpha/_beta);
      else
        return (_alpha, _beta, _z);
  }
}

// Function access 
contract SimpleCoin {
  function transfer(address _to, uint _amount) public {}              // public : 내부, 외부 보두 접근 가능
  function checkLimit(uint _amount) private returns(bool) {}          // private : 이 컨트랙트 내에서만 접근 가능
  function validateAccount(address avcount) internal returns(bool) {} // internal : 이 컨트랙트 + 상속받은 컨트랙트에서만 접근 가능
  function freezeAccount(address target, bool freeze) external {}     // external : 외부에서만 접근 가능
}

// Internal function invocation
contract TaxCalculator {
  function calculateAlpha(int _x, int _y, int _z)
    public returns (int _alpha) {
    _alpha = _x + calculateGamma(_y, _z);	// 같은 컨트랙트 내부의 다른 함수 작동
  }
  function calculateGamma(int _y, int _z)
    internal returns (int _gamma) {			// internal : 이 컨트랙트 + 상속받은 컨트랙트에서만 접근 가능
    _gamma = _y *3 +7*_z;
  }
}

// External function invocation
contract GammaCalculator {
  function calculateGamma(int _y, int _z)
    external returns (int _gamma) {
    _gamma = _y *3 +7*_z;
  }
}
contract TaxCalculator2 {
  GammaCalculator gammaCalculator;
  
  function TaxCalculator(address _gammaCalculatorAddress) {
    gammaCalculator = GammaCalculator(_gammaCalculatorAddress);
  }
}