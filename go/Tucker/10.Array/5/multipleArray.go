package main

import (
	"fmt"
	"unsafe"
)

func main() {
	a := [2][5]int{
		{1, 2, 3, 4, 5},
		{6, 7, 8, 9, 10}, // if } is not in the line, must write , at the end
	}

	for _, arr := range a {
		for _, v := range arr {
			fmt.Print(v, " ")
		}
		fmt.Println()
	}

	b := [2][3]int{
		{0, 1, 2},
		{3, 4, 5}}

	for i, row := range b {
		for j := range row {
			fmt.Printf("[%d%d] = %d ", i, j, b[i][j])
		}
		fmt.Println()
	}

	fmt.Println(unsafe.Sizeof(a)) // [2][5]int => 2 * 5 * 8 = 80
	fmt.Println(unsafe.Sizeof(b)) // [2][3]int => 2 * 3 * 8 = 48
}
