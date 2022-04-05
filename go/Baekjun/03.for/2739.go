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

	var input int

	fmt.Fscanln(reader, &input)

	for i := 1; i <= 9; i++ {
		fmt.Fprintln(writer, input, "*", i, "=", input*i)
	}
}
