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

	for i := 0; i < T; i++ {
		var a, b int
		fmt.Fscanln(r, &a, &b)
		fmt.Fprintln(w, a+b)
	}
}
