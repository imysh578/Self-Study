package main

import "fmt"

const L int = 5

func main() {
	// x := 5
	// a := [x]int{1, 2, 3, 4, 5} // error! Length of array must be constant type
	// fmt.Println(a)
	b := [L]int{1, 2, 3, 4, 5}
	fmt.Println(b)

	var c [10]int
	fmt.Println(c)
}
