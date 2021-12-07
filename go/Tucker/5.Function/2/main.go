package main

import "fmt"

// recursive function
func printNo(n int) {
	if n == 0 { // escape condition
		return
	}
	fmt.Println(n)
	printNo(n - 1)          // recursive call
	fmt.Println("After", n) // output after recursive call
}

func main() {
	printNo(3)
}
