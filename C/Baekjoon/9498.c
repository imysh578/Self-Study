#include <stdio.h>

int main() {
  int score;
  char grade='F';
  char gradeArr[5] = {'A', 'B', 'C', 'D', 'F'};
  scanf("%d", &score);
  
  int index = (100 - score) / 10;
  printf("%c\n", gradeArr[index]);
  
  if(score >= 90) grade = 'A';
  else if(score >= 80) grade = 'B';
  else if(score >= 70) grade = 'C';
  else if(score >= 60) grade = 'D';

  printf("%c\n", grade);
  return 0;
}