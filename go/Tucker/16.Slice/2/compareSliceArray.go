package main

import (
	"fmt"
	"unsafe"
)

func changeArray(array2 [5]int) {
	array2[2] = 200
}
func changeSlice(slice2 []int) {
	slice2[2] = 200
}

func main() {
	array := [5]int{1, 2, 3, 4, 5}
	slice := []int{1, 2, 3, 4, 5}

	changeArray(array)
	changeSlice(slice)

	fmt.Printf("array size: %d\n", unsafe.Sizeof(array))
	fmt.Printf("slice size: %d\n", unsafe.Sizeof(slice))

	fmt.Println(array) // [1 2 3 4 5]
	fmt.Println(slice) // [1 2 200 4 5]

	slice1 := make([]int, 3, 5) // Cap - Len = 5 - 3 = 2
	slice2 := append(slice1, 1, 2)
	slice1[1] = 100

	fmt.Println(slice1) // [0 0 0]
	fmt.Println(slice2) // [0 0 0 1 2]

	var slice3 = []int{1, 2, 3}
	slice4 := append(slice3, 4)
	slice3[1] = 100
	fmt.Println(slice3) // [1,2,3]
	fmt.Println(slice4) // [1,2,3,4]
}
