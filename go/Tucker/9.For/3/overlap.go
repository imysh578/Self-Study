package main

import "fmt"

func main() {
	for i := 0; i < 5; i++ {
		for j := 0; j < i+1; j++ {
			fmt.Print("*")
		}
		fmt.Println()
	}
	fmt.Println()

	for i := 4; i >= 0; i-- {
		for j := 0; j < i+1; j++ {
			fmt.Print("*")
		}
		fmt.Println()
	}
	fmt.Println()

	for i := 0; i < 9; i++ {
		if i%2 == 1 {
			for k := 0; k < (8-i)/2; k++ {
				fmt.Print(" ")
			}
			for j := 0; j < i; j++ {
				fmt.Print("*")
			}
			fmt.Println()
		}
	}
	fmt.Println()

	for i := 0; i < 7; i++ {
		if i%2 == 1 {
			for k := 0; k < (5-i)/2; k++ {
				fmt.Print(" ")
			}
			for j := 0; j < i; j++ {
				fmt.Print("*")
			}
			fmt.Println()
		}
	}
	for i := 3; i >= 0; i-- {
		if i%2 == 1 {
			for k := 0; k < (5-i)/2; k++ {
				fmt.Print(" ")
			}
			for j := 0; j < i; j++ {
				fmt.Print("*")
			}
			fmt.Println()
		}
	}
	fmt.Println()
}
