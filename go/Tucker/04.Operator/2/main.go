package main

import (
	"fmt"
	"math"
)

func equal(a, b float64) bool {
	return math.Nextafter(a, b) == b
}

func main() {
	// int overflow
	var x int8 = 127

	fmt.Printf("%d < %d+1 : %v\n", x, x, x < x+1)
	fmt.Printf("x\t = %4d, %08b\n", x, x)
	fmt.Printf("x+1\t = %4d, %08b\n", x+1, uint8(x+1))

	// float type calculating error(?)
	var a float64 = 0.1
	var b float64 = 0.2
	var c float64 = 0.3

	fmt.Printf("%f + %f == %f : %v\n", a, b, c, a+b == c)
	fmt.Println(a + b) // 0.30000000000000004 : cannot express real number exactly
	// using Nextafter() can solve this

	fmt.Printf("%0.18f == %0.18f : %v\n", c, a+b, equal(a+b, c))
	fmt.Printf("%b == %b \n", c, a+b)
}
