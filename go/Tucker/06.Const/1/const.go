package main

import "fmt"

func main() {
	const pi1 float64 = 3.1415926535
	var pi2 float64 = 3.1415926535

	// pi1 = 3 // error occurred! Cannot change const value
	pi2 = 3

	fmt.Printf("PI : %f\n", pi1)
	fmt.Printf("PI : %f\n", pi2)

}
