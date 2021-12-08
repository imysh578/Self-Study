package main

import (
	"fmt"
	"unsafe"
)

type User struct {
	Age   int32   // 4 bytes
	Score float64 // 8 bytes
	// Memory alignment ==> total : 16 bytes
}

func main() {
	user := User{23, 77.1}

	fmt.Println(unsafe.Sizeof(user.Age))
	fmt.Println(unsafe.Sizeof(user.Score))
	fmt.Println(unsafe.Sizeof(user))
}
