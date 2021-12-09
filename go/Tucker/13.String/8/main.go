package main

import (
	"fmt"
	"strings"
)

// using adding strings
func ToUpper1(str string) string {
	var rst string
	for _, c := range str {
		// create instance and copy whole string every time => Bad for memory efficiency!
		if c >= 'a' && c <= 'z' {
			rst += string('A' + (c - 'a'))
		} else {
			rst += string(c)
		}
	}
	return rst
}

// using builder
func ToUpper2(str string) string {
	var builder strings.Builder // create a buffer(rune) for string
	for _, c := range str {
		// create only one instance and add bytes
		if c >= 'a' && c <= 'z' {
			builder.WriteRune('A' + (c - 'a'))
		} else {
			builder.WriteRune(c)
		}
	}
	return builder.String()
}

func main() {
	var str string = "Hello World"
	fmt.Println(strings.ToUpper(str)) // using `strings`` library
	fmt.Println(ToUpper1(str))
	fmt.Println(ToUpper2(str))
}
