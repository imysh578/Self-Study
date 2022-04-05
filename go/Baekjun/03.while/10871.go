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

	var N, X int
	var input int

	fmt.Fscanln(r, &N, &X)

	for i := 0; i < N; i++ {
		fmt.Fscan(r, &input)
		if input < X {
			fmt.Fprint(w, input, " ")
		}
	}
}
