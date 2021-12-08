package main

import "fmt"

func main() {
	temp := 18

	if temp > 28 {
		fmt.Println("Air Conditioner ON")
	} else if temp <= 3 {
		fmt.Println("Heater ON")
	} else if temp <= 18 {
		fmt.Println("Better to put on thick jacket")
	} else {
		fmt.Println("Good weather to go out")
	}

	var age = 22

	if age >= 10 && age <= 15 {
		fmt.Println("Young")
	} else if age > 30 || age < 20 {
		fmt.Println("Non-20s")
	} else {
		fmt.Println("Best age")
	}
}
