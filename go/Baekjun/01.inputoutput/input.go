package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var reader *bufio.Reader = bufio.NewReader(os.Stdin)
	var writer *bufio.Writer = bufio.NewWriter(os.Stdout)

	defer writer.Flush()

	var a, b int

	fmt.Fscanln(reader, &a, &b)
	fmt.Fprintln(writer, a+b)

}

// func main() {
// 	scanner := bufio.NewScanner(os.Stdin)
// 	if scanner.Scan() {
// 		read := scanner.Text()
// 		inputs := strings.Fields(read)
// 		fmt.Println(inputs[0] + inputs[1])
// 	}
// }

// func main() {
// 	scanner := bufio.NewScanner(os.Stdin)
// 	for scanner.Scan() {
// 		fmt.Println(scanner.Text()) // Println will add back the final '\n'
// 	}
// 	if err := scanner.Err(); err != nil {
// 		fmt.Fprintln(os.Stderr, "reading standard input:", err)
// 	}
// }
