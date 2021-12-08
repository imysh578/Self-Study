package main

import "fmt"

func main() {
	var t [5]float64 = [5]float64{24.0, 25.9, 28.8, 23.3, 24.2}

	for i := 0; i < len(t); i++ {
		fmt.Println(t[i])
	}

	// i, v := range array {}
	// i: index
	// v: value
	// v == t[i]
	for i, v := range t {
		fmt.Println(i, v)
	}

	// if don't want to use index, use _
	for _, v := range t {
		fmt.Println(v)
	}
}
