#include <stdio.h>

int main() {
  int N;
  scanf("%d", &N);
  
  int max= -1000000, min = 1000000;

  for(int i=0; i < N; i++) {
    int inputData;
    scanf("%d", &inputData);
    if(inputData > max) max = inputData;
    if(inputData < min) min = inputData;
  }

  printf("%d %d", min, max);
  
  return 0;
}