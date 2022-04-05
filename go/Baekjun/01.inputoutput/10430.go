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
	fmt.Fprintln(writer, (a+b)%c)
	fmt.Fprintln(writer, (a%c+b%c)%c)
	fmt.Fprintln(writer, (a*b)%c)
	fmt.Fprintln(writer, (a%c*b%c)%c)
}
