package main

import "fmt"

func main() {
	var a int16 = 3456   // 3456 (2 bytes) <- 00001101 10000000
	var b int8 = int8(a) // -128 (1bytes) <- 10000000 (3456's first byte is gone)

	fmt.Println(a, b)
}
