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

	var n, sum int

	fmt.Fscanln(reader, &n)
	for i := 1; i <= n; i++ {
		sum += i
	}
	fmt.Fprintln(writer, sum)
}
