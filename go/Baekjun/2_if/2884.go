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

	var H, M int

	fmt.Fscanln(reader, &H, &M)
	if M >= 45 {
		fmt.Fprintln(writer, H, M-45)
	} else {
		if H > 0 {
			fmt.Fprintln(writer, H-1, M+15)
		} else {
			fmt.Fprintln(writer, H+23, M+15)
		}
	}
}
