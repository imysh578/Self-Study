package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

/*
// structure of StringHeader
type StringHeader struct {
	Data uintptr
	Len  int
}
*/

func main() {
	str1 := "Hello 월드"
	str2 := str1

	// unsafe.Pointer(&var) : transform into raw pointer
	// *reflect.StringHeader : pointing at actual strings
	stringHeader1 := (*reflect.StringHeader)(unsafe.Pointer(&str1))
	stringHeader2 := (*reflect.StringHeader)(unsafe.Pointer(&str2))

	fmt.Printf("type: %T, value: %v\n", unsafe.Pointer(&str1), unsafe.Pointer(&str1))
	fmt.Printf("type: %T, value: %v\n", &str1, &str1)
	fmt.Println()
	fmt.Println(stringHeader1)
	fmt.Println(stringHeader2)

}
