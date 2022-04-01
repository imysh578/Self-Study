// 백준 10869번 문제 (사칙연산)
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var reader *bufio.Reader = bufio.NewReader(os.Stdin)
	var writer *bufio.Writer = bufio.NewWriter(os.Stdout)

	// defer: 이를 호출한 함수의 리턴 직전에 실행한다.
	// Flush: 모든 데이터가 writer에 보내졌음을 의미 (꼭 써줘야한다!)
	defer writer.Flush()

	var a, b int

	fmt.Fscanln(reader, &a, &b) // 한 줄 입력, 띄어쓰기로 구분 ex) 1 2 => a=1, b=2
	fmt.Fprintln(writer, a+b)
	fmt.Fprintln(writer, a-b)
	fmt.Fprintln(writer, a*b)
	fmt.Fprintln(writer, a/b)
	fmt.Fprintln(writer, a%b)
}
