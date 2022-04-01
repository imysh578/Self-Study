package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)

	defer writer.Flush()

	var N int

	fmt.Fscanln(reader, &N)
	for i := 0; i < N; i++ {
		var a, b int
		fmt.Fscanln(reader, &a, &b)
		fmt.Fprintln(writer, a+b)
	}
}
