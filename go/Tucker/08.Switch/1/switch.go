package main

import "fmt"

func main() {
	a := 3

	switch a {
	case 1:
		fmt.Println("a==1")
	case 2:
		fmt.Println("a==2")
	case 3:
		fmt.Println("a==3")
	default:
		fmt.Println("a!=1,2,3")
	}

	day := "thu"

	switch day {
	case "mon", "tue":
		fmt.Println("monday, tuesday")
	case "wed", "thu", "fri":
		fmt.Println("wednesday, thursday, friday")
	}

	temp := 18

	switch true {
	case temp < 10, temp > 30:
		fmt.Println("Don't go out")
	case temp >= 10 && temp < 20:
		fmt.Println("Prepare thick jacket")
	case temp >= 15 && temp < 25:
		fmt.Println("Good to go out")
	default:
		fmt.Println("Warm")
	}
}
