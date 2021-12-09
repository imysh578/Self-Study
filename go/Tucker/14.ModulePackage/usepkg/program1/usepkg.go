package main

import (
	"usepkg/custompkg"
	"usepkg/exinit"
)

func main() {
	custompkg.PrintCustom()
	exinit.PrintD()
	/*
		** output **
		f1() d: 4
		f2() d: 5
		exinit.init function 6
		d: 6
	*/
}
