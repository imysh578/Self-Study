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

	fmt.Fscanln(reader, &N)

	var init int
	fmt.Fscan(reader, &init)
	var min, max int = init, init

	for i := 1; i < N; i++ {
		var input int
		fmt.Fscan(reader, &input)

		if input < min {
			min = input
		}

		if input > max {
			max = input
		}
	}

	fmt.Fprintln(writer, min, max)

}
