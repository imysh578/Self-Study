package main

import "fmt"

func main() {
	slice1 := []int{1, 2, 3, 4, 5}

	/* Method 1 */
	slice2 := make([]int, len(slice1))
	for i, v := range slice1 {
		slice2[i] = v
	}

	/* Method 2 */
	slice3 := append([]int{}, slice1...)
	// slice... : all elements in slice

	/* Method 3 */
	slice4 := make([]int, len(slice1))
	copy(slice2, slice1)

	slice1[1] = 100

	fmt.Println("slice1", slice1)
	fmt.Println("slice2", slice2)
	fmt.Println("slice3", slice3)
	fmt.Println("slice4", slice4)
}
