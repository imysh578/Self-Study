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

	var T int

	fmt.Fscanln(r, &T)
	for i := 1; i <= T; i++ {
		var a, b int
		fmt.Fscanln(r, &a, &b)
		fmt.Fprintf(w, "Case #%d: %d\n", i, a+b)
	}
}
