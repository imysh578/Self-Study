package main

import (
	"fmt"
	"unsafe"
)

func main() {
	// variable declaration : var name type
	var a int = 10              // integer
	var msg string = "variable" // string => using ""

	a = 20
	msg = "Good morning"
	fmt.Println(msg, a)

	/*
		** number types **
		unsigned integer : uint8, uint16, uint64
		integer : int8, int16, int32, int64
		float : float32, float64
		complex : complex64, complex128

		** boolean **
		true, false

		** string **
		string

		** not defined memory address **
		nil
	*/

	var testType int // chang types and check size
	fmt.Println(unsafe.Sizeof(testType))

	/*
		** aliasing types **
		byte : uint8
		rune : uint32
		int : int32 or int64(depends on OS, win32 -> 32 bits, win64 -> 64 bits)
		uint : uint32 or uint64
	*/

	// if not declarate type, it follows the values' type
	var b = 10
	var c = "hi"

	fmt.Printf("%T\n", b)
	fmt.Printf("%T\n", c)
}
