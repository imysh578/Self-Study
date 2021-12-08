package main

import "fmt"

const PI = 3.14              // without type
const FloatPI float64 = 3.14 // float64 type

func main() {
	var a int = PI * 100 // no error occurred
	// var b int = FloatPI * 200 // type error occurred

	fmt.Println(a)
	// fmt.Println(b)
	fmt.Println(&a)
}
