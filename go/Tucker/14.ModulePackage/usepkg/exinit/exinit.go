package exinit

import (
	"fmt"
)

var (
	a = c + b
	b = f1()
	c = f2()
	d = 3
)

func init() {
	d++
	fmt.Println("exinit.init function", d)
}

func f1() int {
	d++
	fmt.Println("f1() d:", d)
	return d
}
func f2() int {
	d++
	fmt.Println("f2() d:", d)
	return d
}

func PrintD() {
	fmt.Println("d:", d)
}
