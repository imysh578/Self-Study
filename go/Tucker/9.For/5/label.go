package main

import "fmt"

func main() {
	// label : easy to set escape point
	// it might occur stack error => not recommend
	c := 1
	d := 1
OuterFor: // label
	for ; c <= 9; c++ {
		for d = 1; d <= 9; d++ {
			if c*d == 45 {
				break OuterFor
			}
		}
	}
	fmt.Printf("%d * %d = %d", c, d, c*d)
}
