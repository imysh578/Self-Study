package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	stdin := bufio.NewReader(os.Stdin)
	for {
		fmt.Print("Input Number : ")
		var number int
		_, err := fmt.Scanln(&number)
		if err != nil {
			fmt.Println("Only Number allowed")

			// Clear keyboard buffer
			stdin.ReadString('\n')
			continue
		}
		fmt.Printf("Input Number is %d\n", number)
		if number%2 == 0 {
			break
		}
	}
	fmt.Println("Bye~")
}
