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

	var x, y int

	fmt.Fscanln(reader, &x)
	fmt.Fscanln(reader, &y)

	if x > 0 && y > 0 {
		fmt.Fprintln(writer, 1)
	} else if x < 0 && y > 0 {
		fmt.Fprintln(writer, 2)
	} else if x < 0 && y < 0 {
		fmt.Fprintln(writer, 3)
	} else if x > 0 && y < 0 {
		fmt.Fprintln(writer, 4)
	}
}
