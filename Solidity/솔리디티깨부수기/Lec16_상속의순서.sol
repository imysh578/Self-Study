// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father {
  event FatherName(string name);
  function who() public virtual {
    emit FatherName("Father");
  }
}

contract Mother {
  event MotherName(string name);
  function who() public virtual {
    emit MotherName("Mother");
  }
}

contract Son is Father, Mother { // Mother를 나중에 상속함
  // who()는 Father, Mother에 모두 있다. 
  // 이렇게 하면 어떤 Contract의 함수를 불러올까?
  // 이름이 동일하면, 가장 나중에 불러온 컨트랙트의 함수를 불러온다.(여기선 Mother)
  function who() public override(Father, Mother) {
    super.who();
  }
  
}