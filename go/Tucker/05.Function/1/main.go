package main

import "fmt"

func Add(a int, b int) int {
	return a + b
}

// multi return
func Divide(a, b int) (int, bool) {
	// if b == 0 {
	// 	return 0, false
	// } else {
	// }
	return a / b, true
}

func Divide2(a, b int) (result int, success bool) {
	if b == 0 {
		result = 0
		success = false
		return
	}
	result = a / b
	success = true
	return
}

func main() {
	c := Add(3, 4)

	fmt.Println(c)

	d, success := Divide(9, 3)
	fmt.Println(d, success)
	e, success := Divide(9, 0)
	fmt.Println(e, success)

	f, success := Divide(9, 3)
	fmt.Println(f, success)
	g, success := Divide(9, 0)
	fmt.Println(g, success)

}
