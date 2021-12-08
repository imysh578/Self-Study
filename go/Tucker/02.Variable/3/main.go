package main

import "fmt"

func main() {
	// when calculating, every variables has to be same types
	// must change types before calculating

	a := 3 // int == 64 bits == int64
	var b float64 = 2.6

	var c int = int(b) // int(b) == int(2.6) == 2
	d := float64(a) * b

	var e int64 = 7
	f := a * int(e)

	fmt.Println(a, b, c, d, e, f)

}
