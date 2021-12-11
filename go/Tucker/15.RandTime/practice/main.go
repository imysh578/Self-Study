package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"time"
)

// NewReader() : 값을 읽어옴
// os.Stdin : 표준입력
var stdin = bufio.NewReader(os.Stdin)

func InputIntValue() (int, error) {
	var n int
	_, err := fmt.Scanln(&n) // 포인터를 넣어야 값을 채울 수 있다.
	if err != nil {          // 에러가 있으면
		stdin.ReadString('\n') // 표준 입력을 개행 문자(\n)가 나올때까지 지워라
	}
	return n, err
}

func RandNum(rangeNum int) int {
	rand.Seed(time.Now().UnixNano())
	r := rand.Intn(rangeNum)
	return r
}

func GuessNum(rangeNum int) {
	r := RandNum(rangeNum)
	fmt.Printf("Guess Number! Range : 0~%d\n", rangeNum-1)
	cnt := 1
	for {
		fmt.Print("Input Number: ")
		n, err := InputIntValue()
		if err != nil {
			fmt.Println("Only Number is valid")
		} else {
			if n > r {
				fmt.Println("Try smaller!")
			} else if n < r {
				fmt.Println("Try bigger")
			} else {
				fmt.Println("You got it! Total tries :", cnt)
				break
			}
			cnt++
		}
	}
}

func main() {
	GuessNum(100)
}
