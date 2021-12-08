package main

import "fmt"

var cnt int = 0

func IncreaseAndReturn() int {
	fmt.Println("IncreaseAndReturn()", cnt)
	cnt++
	return cnt
}

func main() {
	if false && IncreaseAndReturn() < 5 {
		// always false
		fmt.Println("Increased 1")
	}
	if true || IncreaseAndReturn() < 5 {
		// always true
		fmt.Println("Increased 1")
	}
	if true && IncreaseAndReturn() < 5 {
		// depends on IncreaseAndReturn()
		fmt.Println("Increased 1")
	}
	if false || IncreaseAndReturn() < 5 {
		// depends on IncreaseAndReturn()
		fmt.Println("Increased 1")
	}
}
