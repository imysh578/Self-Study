package main

import "fmt"

func main() {
	var a int = 500
	var p *int = &a

	fmt.Printf("P's value(a's address) : %p\n", p)
	fmt.Printf("P's reverse reference value : %d\n", *p)

	*p = 100 // a = 100
	fmt.Printf("a's value : %d\n", a)
}
