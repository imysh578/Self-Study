package main

import "fmt"

func addNum(slice []int) {
	slice = append(slice, 4)
	// Problem: It doesn't affect to outside of function
}

// 1. Using pointer to resolve
func addNum1(slice *[]int) {
	*slice = append(*slice, 5)
}

// 2. Using return value to resolve
// => data is coped several times
func addNum2(slice []int) []int {
	slice = append(slice, 6)
	return slice
}

// Recommend method 2
// Slice is already the type of pointer, so that it has only 24 bytes
// => hardly affect performance

func main() {
	slice := []int{1, 2, 3}
	addNum(slice)
	fmt.Println(slice)

	addNum1(&slice)
	fmt.Println(slice)

	slice = addNum2(slice)
	fmt.Println(slice)
}
