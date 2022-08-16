#include <stdio.h> // standard io
// #include <math.h> // math 라이브러리 불러오기
// #include "/lib/damon.h" // 다른 라이브러리 파일 참조할땐 "" 안에 경로 적어주면 됨

/**
 * 상수 선언 : #define 상수명 값;
 * 자주 사용하는 값을 상수로 선언하면 코드 수정시 매우 편리함
 */
#define CONST1 3;

/**
 * printf / scanf : 출력
 * fprintf / fscanf : 파일 읽어서 출력 
 */

/**
 * Function declaration
 * 컴파일러는 위에서부터 아래로 읽기 때문에
 * 함수를 사용하려면 먼저 함수를 선언해주어야 한다.
 */
void printHelloWorld();
void show_variables();

int main(int argc, char* argv[]) {
  // printHelloWorld();
  show_variables();
  return 0;
}

void printHelloWorld() {
  printf("Hello World!\n");
}

void show_variables() {
  /**
   * [ 숫자 타입 ] 
   * 자연수, 정수 
   * int, long, long long
   * 
   * 소수
   * float, double
   * 사람이 정의한 소수는 10진법으로 나타냄 
   * --> 컴퓨터가 소수 인식하도록 2진법 바꾸면서 오차가 발생
   * --> 용도에 따라 오차를 어느정도 허용할 건지 정함
   * 
   * [ 문자 타입 ]
   * char : 문자 하나, 작은 따옴표('')로 값 지정
   * char[] : 문자 여러개
   */
  int a;
  long b;
  long long c;
  char d;
  double e;
  float f;
  char g[10] = "asdf";

  a = CONST1;
  b = 3;
  c = 3;
  d = 'a';
  e = 0.1;
  f = 0.1;


  /**
   * [ printf("여기") 안에 변수 값을 넣는 방법 ]
   * printf("%d", 변수); --> %d 자리에 변수 값을 넣어라
   * 
   * %d: int
   * %ld: long
   * %lld: long long
   * %f: float
   * %lf: double
   * 더 다양한 format은 구글링 고고 : https://reakwon.tistory.com/169
   */

  // 사이즈 확인 : sizeof(변수명)
  printf("size of a is %lu\n", sizeof(a)); // 4
  printf("size of b is %lu\n", sizeof(b)); // 8
  printf("size of c is %lu\n", sizeof(c)); // 8
  printf("size of d is %lu\n", sizeof(d)); // 1
  printf("size of e is %lu\n", sizeof(e)); // 8
  printf("size of f is %lu\n", sizeof(f)); // 4

  // 값 확인
  printf("value of a is %d\n", a); // 3

  printf("value of b is as d %d\n", b); // 3 --> %d에 long을 넣어서 warning 발생
  printf("value of b is as ld %ld\n", b); // 3

  printf("value of c is %lld\n", c); // 3
  
  printf("value of d is %c\n", d); // a
  printf("value of d is %d\n", d); // 97

  printf("value of e is %lf\n", e); // 0.100000
  printf("value of f is %f\n", f); // 0.100000
}