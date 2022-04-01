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
	for i := N; i > 0; i-- {
		fmt.Fprintln(writer, i)
	}
}
