package main

import "fmt"

func main() {
	/* Initialization */
	// var slice []int // length of slice is 0
	slice := []int{1, 2, 3}
	slice1 := make([]int, 3, 5) // using make()
	if len(slice) == 0 {
		fmt.Println("slice is empty", slice)
	}
	slice[1] = 10
	fmt.Println(slice)
	fmt.Println(slice1)

	/* append() */
	slice2 := append(slice, 4) // returns new slice
	fmt.Println(slice)         // Orinal slice isn't changed
	fmt.Println(slice2)
}
