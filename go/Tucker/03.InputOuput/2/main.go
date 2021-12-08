package main

import "fmt"

func main() {
	var a = 123
	var b = 456
	var c = 123456789

	fmt.Printf("%5d, %5d\n", a, b)    // %5d: 5spaces, right side, empty space
	fmt.Printf("%05d, %05d\n", a, b)  // %05d: 5spaces, right side, 0 for empty space
	fmt.Printf("%-5d, %-05d\n", a, b) // %-5d: 5spaces, left side, empty space

	fmt.Printf("%5d, %5d\n", c, c)
	fmt.Printf("%05d, %05d\n", c, c)
	fmt.Printf("%-5d, %-05d\n", c, c)
}
