#include <stdio.h>
#include <stdbool.h>

int if_test();
bool isValid();

int main() {
  if_test();
  return 0;
}

int if_test() {
  int result = 0;
  if(result > 10) {

  } else if (result == 10) {

  } else {

  }

  while(isValid()) {
    if(result < 0) {
      break;
    }
  }

  return result;
}

bool isValid () {
  bool result;

  return result;
}