// #include <stdio.h>
// #include <stdlib.h>

// int main () {
//   int N, X;
//   scanf("%d %d", &N, &X);
  
//   int *result = (int*)malloc(sizeof(int) * N);
//   int index = 0;

//   for(int i=0; i < N; i++) {
//     int input;
//     scanf("%d", &input);
//     if(input < X) result[index++] = input;
//   }

//   for(int j=0; j < index; j++) {
//     printf("%d ", result[j]);
//   }

//   free(result);
//   return 0;
// }


#include <stdio.h>

int main () {
  int N, X;
  scanf("%d %d", &N, &X);

  for(int i=0; i < N; i++) {
    int input;
    scanf("%d", &input);
    if(input < X) printf("%d ", input);
  }

  return 0;
}