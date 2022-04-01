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

	var a int

	fmt.Fscanln(reader, &a)
	if 100 >= a && a >= 90 {
		fmt.Fprintln(writer, "A")
	} else if a >= 80 {
		fmt.Fprintln(writer, "B")
	} else if a >= 70 {
		fmt.Fprintln(writer, "C")
	} else if a >= 60 {
		fmt.Fprintln(writer, "D")
	} else {
		fmt.Fprintln(writer, "F")
	}
	fmt.Fprintln(writer)
}
