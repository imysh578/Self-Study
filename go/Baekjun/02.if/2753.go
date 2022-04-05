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

	fmt.Fscan(reader, &a)

	if (a%4 == 0 && a%100 != 0) || a%400 == 0 {
		fmt.Fprint(writer, 1)
	} else {
		fmt.Fprint(writer, 0)
	}
}
