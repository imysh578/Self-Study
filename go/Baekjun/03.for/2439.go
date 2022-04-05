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

	var N int
	var star string

	fmt.Fscanln(r, &N)

	for i := 1; i <= N; i++ {
		var space string = ""
		for j := i + 1; j <= N; j++ {
			space += " "
		}
		star += "*"
		fmt.Fprintln(w, space+star)
	}
}
