package main

import "fmt"

var g int = 10

func main() {
	var m int = 20
	{
		var s int = 50
		fmt.Println(m, s, g)
	}

	// variable can be used in boundary where it's contained
}
