package main

import "fmt"

const Pig int = 0
const Cow int = 1
const Chicken int = 2

func PrintAnimal(animal int) {
	if animal == Pig {
		fmt.Println("꿀꿀")
	} else if animal == Chicken {
		fmt.Println("꼬끼오")
	} else if animal == Cow {
		fmt.Println("음메")
	} else {
		fmt.Println("???")
	}
}

func main() {
	PrintAnimal(Pig)
	PrintAnimal(1)
	PrintAnimal(5)
}
