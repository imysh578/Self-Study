#include <stdio.h>

int sum_to_ten();
int double_for();

int main() {
  sum_to_ten();
  double_for();
  return 0;
}

int sum_to_ten() {
  int result = 0;

  // for(int index; 조건; index++)
  for(int index=1; index <= 10; index++) {
    result += index;
  }

  printf("result is %d\n", result);
  return result;
}

int double_for() {
  int result = 0;

  for(int i=1; i<=10; i++) {
    for(int j=1; j<=10; j++) {
      result += j;
    }
  }

  printf("result is %d\n", result);
  return result;
}