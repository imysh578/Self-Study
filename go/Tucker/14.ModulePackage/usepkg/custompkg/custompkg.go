package custompkg // package name == folder name

import (
	"fmt"
	"usepkg/exinit"
)

func PrintCustom() {
	fmt.Println("This is custom package, 1 !")
	exinit.PrintD()
}

func printCustom2() {
	fmt.Println("This is custom package, 2!")
}

type Student struct {
	Name string
	Age  int
}

var Num int = 2

const PI = 3.14
