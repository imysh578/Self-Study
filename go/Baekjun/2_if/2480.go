package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var reader *bufio.Reader = bufio.NewReader(os.Stdin)
	var writer *bufio.Writer = bufio.NewWriter(os.Stdout)

	defer writer.Flush()

	var a, b, c int
	fmt.Fscanln(reader, &a, &b, &c)

	var reward int

	if a == b && a == c { // a == b == c
		reward = 10000 + a*1000
	} else if a == b { // a == b != c
		reward = 1000 + a*100
	} else if a == c { // a == c != b
		reward = 1000 + a*100
	} else if b == c { // a != b == c
		reward = 1000 + b*100
	} else { // a != b != c
		reward = getMax(a, b, c) * 100
	}

	fmt.Fprintln(writer, reward)
}

func getMax(a, b, c int) int {
	var max int
	if a > b && a > c { // a > b, c
		max = a
	} else if b > c { // b > a, c
		max = b
	} else {
		max = c
	}
	return max
}
