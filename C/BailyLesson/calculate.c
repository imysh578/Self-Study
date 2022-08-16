#include <stdio.h>

void basic_variables();

int main() {
  basic_variables();
  return 0;
}

void basic_variables() {
  int a = 1000;
  int b;
  b = a+1;
  a = a+1;
  a++; // 후 1 증가
  ++a; // 선 1 증가
  a += 1; // a = a + 1
  a += a; // a = a + a

  a = a * 2;
  a = a / 2; // 나누기의 몫 (소수점은 버린다고 보면 됨)
  a = a % 2; // 나누기의 나머지
}