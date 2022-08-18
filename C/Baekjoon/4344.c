#include <stdio.h>

int main() {
  int cases;
  scanf("%d", &cases);

  for(int i=0; i < cases; i++) {
    int N;
    scanf("%d", &N);

    int scoreArr[N];

    int sum = 0;
    for(int j=0; j<N; j++) {
      int score;
      scanf("%d", &score);
      scoreArr[j] = score;
      sum+=score;
    }

    double avg = sum/N;

    int overAvgNum = 0;
    for(int k=0; k<N; k++) {
      if(scoreArr[k]-avg > 0) {
        overAvgNum++;
      }
    }

    double result = (double)overAvgNum/(double)N * 100;
    printf("%.3f%%\n", result);
  }

  return 0;
}