package main

import (
	"fmt"
	"unsafe"
)

type User struct {
	A int8 // 1 => 8
	B int  // 8
	C int8 // 1 => 8
	D int  // 8
	E int8 // 1 => 8
	// total 40
}
type User1 struct {
	A int8 // 1
	C int8 // 1
	E int8 // 1
	// 1 + 1 + 1 => 8
	B int // 8
	D int // 8
	// total 24!
}

func main() {
	var user User
	var user1 User1
	fmt.Println(unsafe.Sizeof(user))
	fmt.Println(unsafe.Sizeof(user1))
}
