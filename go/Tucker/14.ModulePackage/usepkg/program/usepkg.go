package main

import (
	"fmt"
	"usepkg/custompkg"

	"github.com/guptarohit/asciigraph"
	"github.com/tuckersGo/musthaveGo/ch16/expkg"
)

func main() {
	custompkg.PrintCustom()
	expkg.PrintSample()

	data := []float64{1, 5, 8, 6, 10, 2, 8, 7, 3, 4, 5, 1, 2, 5, 2}

	graph := asciigraph.Plot(data)

	fmt.Println(graph)

	s := custompkg.Student{"Tony", 32}
	fmt.Println(custompkg.PI)
	fmt.Println(custompkg.Num)
	fmt.Println(s)
}
