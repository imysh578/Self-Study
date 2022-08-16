#include <stdio.h>

void basic_array();

int main() {
  basic_array();
  return 0;
}

void basic_array() {
  int a[10]; // 길이가 10인 배열 생성 
  int b[] = {1, 2, 3, 4, 5}; // 길이가 5인 배열에 초기화까지 같이 진행
  int c[10] = {0}; // 모든 칸을 0으로!

  // set value
  a[0] = 1;
  a[0] = 2;
  printf("a[0] is %d\n", a[0]);
  printf("a[10] is %d\n", a[10]);
  printf("sizeof(a) is %d\n", sizeof(a));
  printf("sizeof(a[0]) is %d\n", sizeof(a[0]));

  // string
  char str[10] = "test!!!"; // str: "test!!!" + 나머지 공간(3칸)은 null로 채워짐
  printf("str[0] is %c \n", str[0]);
  printf("str[9] is %c \n", str[9]);
  printf("str is %s \n", str); // str is test!!! 
  str[8] = '?';
  printf("str is %s \n", str); // str is test!!! --> ?는 어디갔니? --> 문자열을 읽을 때 null까지만 읽기 때문에 8번째 칸에 ?는 못읽는다 --> 즉 str is test!!![null]? 인 상태
  str[7] = '$';
  printf("str is %s \n", str); // str is test!!!$? --> 7번째 자리에 null 대신 $가 들어가면서 모두 출력됨
}