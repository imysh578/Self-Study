package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	w := bufio.NewWriter(os.Stdout)

	defer w.Flush()

	var A, B int

	for {
		_, err := fmt.Fscanln(r, &A, &B)
		if err != nil {
			break
		}
		fmt.Fprintln(w, A+B)
	}
}
