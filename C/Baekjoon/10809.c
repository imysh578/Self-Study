// #include <stdio.h>
// #include <string.h>

// int main() {
//   char input[100];

//   scanf("%s", &input);
//   char alphabetArr[] = "abcdefghijklmnopqrstuvwxyz";
//   for(int i=0; i< strlen(alphabetArr); i++) {
//     int result = -1;
//     for(int j=0; j < strlen(input); j++) {
//       if(input[j] == alphabetArr[i]) {
//         result = j;
//         break;
//       }
//     }
//     printf("%d ", result);
//   }
//   return 0;
// }


#include <stdio.h>
#include <string.h>
#define NUM 26

int main() {
  char S[100];
  scanf("%s", &S);

  for(int i='a'; i < (int)'a' + NUM; i++) {
    int result = -1;
    for(int j=0; j < strlen(S); j++) {
      if(S[j] == i) {
        result = j;
        break;
      }
    }
    printf("%d ", result);
  }
}