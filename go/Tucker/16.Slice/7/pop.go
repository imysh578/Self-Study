package main

import "fmt"

func main() {
	slice := []int{1, 2, 3, 4, 5, 6}
	idx := 2
	/* method 1 */
	for i := idx + 1; i < len(slice); i++ {
		slice[i-1] = slice[i]
	}
	slice = slice[:len(slice)-1]
	fmt.Println("slice", slice)

	/* method 2 */
	slice = append(slice[:idx], slice[idx+1:]...)

	fmt.Println("slice", slice)
}
