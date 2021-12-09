package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func NewUser(name string, age int) *User {
	var u = User{name, age}
	return &u
	// returns local instances' address??
	// Dangling error occurred in C++
	// Because Local instances are stored in stack in C++
	// => &u cannot exist outside of this function

	// Escape Analisis in Go lang : decided where to store(stack or heap)
	// This can allow to use Local instances outside of the function
}

func Tester() int {
	a := 123
	return a
}

func main() {
	userPointer := NewUser("John", 23)

	fmt.Println(userPointer)

	tester := Tester()
	fmt.Println(tester)
}
