package main

import "fmt"

func main() {
	// using flag => escape overlapped for at once
	a := 1
	b := 1
	found := false // flag
	for ; a <= 9; a++ {
		for b = 1; b <= 9; b++ {
			if a*b == 45 {
				found = true
				break
			}
		}
		if found {
			break
		}
	}
	fmt.Printf("%d * %d = %d", a, b, a*b)
}
