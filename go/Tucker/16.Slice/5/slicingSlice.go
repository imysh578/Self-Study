package main

import "fmt"

func main() {
	array := [15]int{1: 1, 2: 2, 14: 100}
	slice1 := array[1:10]

	slice2 := slice1[2:14]
	fmt.Println(slice1)
	fmt.Println(slice2)
}
