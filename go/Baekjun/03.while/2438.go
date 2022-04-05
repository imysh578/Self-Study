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

	var N int
	var star string

	fmt.Fscanln(reader, &N)

	for i := 1; i <= N; i++ {
		star += "*"
		fmt.Fprintln(writer, star)
	}

}
