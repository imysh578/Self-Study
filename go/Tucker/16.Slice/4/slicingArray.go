package main

import "fmt"

func main() {
	array := [7]int{1, 2, 3, 4, 5, 6, 7}
	slice := array[1:5]

	fmt.Println("array:", array)
	fmt.Println("slice:", slice, len(slice), cap(slice))
	fmt.Println()

	array[1] = 100 // it affects slice too
	fmt.Println("After change second element", array)
	fmt.Println("array:", array)
	fmt.Println("slice:", slice, len(slice), cap(slice))
	fmt.Println()

	slice = append(slice, 500) // it affects array too becuase slice is returned from existing array
	fmt.Print("After append slice")
	fmt.Println("array:", array)
	fmt.Println("slice:", slice, len(slice), cap(slice))

}
