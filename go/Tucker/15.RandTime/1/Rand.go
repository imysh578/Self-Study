package main

import (
	"fmt"
	"math/rand"
	"time"
)

func getRandNum() int {
	t := time.Now()
	rand.Seed(t.UnixNano())
	var randNum int = rand.Intn(1)
	return randNum
}

func getUserInput() int {
	var input int
	fmt.Scan()
	return input
}

func main() {
	x := getRandNum()

	fmt.Println(x)
}
