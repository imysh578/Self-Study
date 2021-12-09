package main

import "fmt"

func main() {
	var p *string

	var a string = "Pointer!"
	p = &a

	if p != nil { // == if p has proper memory address as a value
		fmt.Printf("p has proper address, %p, %s", p, *p)
	} else {
		fmt.Println(p)
	}
}
