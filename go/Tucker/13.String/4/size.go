package main

import (
	"fmt"
	"unsafe"
)

func main() {
	var str1 string = "Hello"
	var str2 string

	fmt.Printf("str1 size : %d\n", unsafe.Sizeof(str1))
	fmt.Printf("str2 size : %d\n", unsafe.Sizeof(str2))
	// string = Data(8 bytes) + Len(8 bytes) => 16 bytes

	str2 = str1

	fmt.Println(str2)
}
