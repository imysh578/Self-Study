package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var reader = bufio.NewReader(os.Stdin)
	var writer = bufio.NewWriter(os.Stdout)

	defer writer.Flush()

	var A, B, C int

	fmt.Fscanln(reader, &A, &B)
	fmt.Fscanln(reader, &C)

	var hourC int = C / 60
	var minC int = C % 60

	var answerH, answerM int

	answerH = A + hourC
	answerM = B + minC

	// 분 계산
	if B+minC >= 60 {
		answerH += 1
		answerM -= 60
	}

	// 시간 계산
	if A+hourC > 23 {
		answerH -= 24
	}

	fmt.Fprintln(writer, answerH, answerM)
}
