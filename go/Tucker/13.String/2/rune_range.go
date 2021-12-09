package main

import "fmt"

func main() {
	str := "Hello 월드"

	/* problem */
	// cannot express Korean properly
	for i := 0; i < len(str); i++ {
		fmt.Printf("Type : %T, Value : %d, String: %c\n", str[i], str[i], str[i])
	}

	/* method 1 */
	// rune
	arr := []rune(str)

	for i := 0; i < len(arr); i++ {
		fmt.Printf("Type : %T, Value : %d, String: %c\n", arr[i], arr[i], arr[i])
	}

	/* method 2 */
	// range
	for _, v := range str {
		fmt.Printf("Type : %T, Value : %d, String: %c\n", v, v, v)
	}

}
