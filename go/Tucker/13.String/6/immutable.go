package main

import (
	"fmt"
)

func main() {
	var str string = "Hello World"
	var slice []byte = []byte(str)

	slice[2] = 'A'
	fmt.Println(str)           // Hello World
	fmt.Printf("%s \n", slice) // HeAlo World

}
