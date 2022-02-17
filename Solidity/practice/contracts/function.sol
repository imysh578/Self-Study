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
  GammaCalculator gammaCalculator;    // gammaCalculator가 GammaCalculator 컨트랙트를 참조한다고 선언
  
  function TaxCalculator(address _gammaCalculatorAddress) {
    gammaCalculator = GammaCalculator(_gammaCalculatorAddress); // gammaCalculator는 _gammaCalculatorAddress에 배포된 인스턴스를 가리킴
  }

  function calculateAlpha(int _x, int _y, int _z)
    public returns (int _alpha) {
      _alpha = _x + gammaCalculator.calculateGamma(_y, _z);
    }
}

contract TaxCalculator3 {
  function calculateAlpha(int _x, int _y, int _z) public returns (int _alpha) {
    _alpha = _x + this.calculateGamma(_y, _z); // this 를 통해 calculateGamma 함수를 호출 => external 함수를 호출한 것처럼 동작 : 트랜잭션 메시지 생성 + 블록체인에 저장됨
  }

  function calculateGamma(int _y, int _z) public returns (int _gamma) {  // this로 호출되려면 public으로 선언되어야 함
    _gamma = _y * 3 + 7 * _z; 
  }
}

contract TaxCalculator4 {
  function calculateAlpha(int _x, int _y, int _z) public returns (int _alpha) {
    _alpha = _x + this.calculateGamma({_z: _z, _y: _y}); // 매개변수 순서를 지정해서 전달할 때는 매개변수 이름을 지정해야 한다.
  }

  function calculateGamma(int _y, int _z) public returns (int _gamma) {
    _gamma = _y * 3 + 7 * _z;
  }
}

// Payable function
contract StockPriceOracle {
  uint quoteFee = 500;  // getStockPrice() 함수 호출 시 필요한 이더의 양(Wei 단위)
  mapping (string => uint) private stockPrice;

  //...

  function getStockPrice(string _stockTicker) payable returns (uint _stockPrice) {
    if (msg.value == quoteFee) {              // 전송된 이더 수량이 quoteFee와 같은지 비교
      _stockPrice = stockPrice[_stockTicker]; 
    } else {
      revert();                               // 만약 다르다면 트랜잭션을 이전 상태로 복원한다.
    }
  }

  function getStockPrice2(string _stockTicker) payable returns (uint _stockPrice) {
    address stockPriceOracleAddress = 0x10abb5EfEcdC09581f8b7cb95791FE2936790b4E;
    uint256 quoteFee = 500;
    string memory stockTicker = "MSFT";

    if (!stockPriceOracleAddress.call.value(quoteFee)   // call()을 사용해서 외부 함수를 호출하는 동안 이더를 전송 
      (bytes4(keccak256("getStockPrice()")),
      _stockTicker)) 
      revert();   // call() 실패 시 이전 상태로 복원
  }
}

// fallback function
contract A1 {
  function () payable {}
}
contract A2 {
  function () payable {
    revert();
  }
}

// getter function
contract SimpleCoin2 {
  mapping (address => uint256) public coinBalance;
  address myAccountAddress = msg.sender;

  uint256 myBalance = this.coinBalance(myAccountAddress); // coinBalance는 mapping 타입의 상태 변수인데 함수처럼 사용됨 => getter함수!
}

// Delete 
contract DeleteExample {
  function deleteExample () public pure {
    int32[5] memory fixedSlots = [int32(5), 9, 1, 4, 3];
    delete fixedSlots;	// [int32(0), 0, 0, 0, 0];
  }
}

contract VarExample {
  function varExample () public pure {
    var array1 = [int(5), 9];
  }
}

contract MultipleVariables {
  function multipleVariables (uint _x) public pure returns (uint _a, uint _b, bool _ok) {
    _a = _x * 2;
    _b = _x ** 3;

    _ok = (_a*_b) < 10000;

  }
}