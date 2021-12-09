package main

import "fmt"

func main() {
	str1 := "Hello"
	str2 := "월드"

	str3 := str1 + str2
	fmt.Println(str3)

	str1 += " " + str2
	fmt.Println(str1)
}
