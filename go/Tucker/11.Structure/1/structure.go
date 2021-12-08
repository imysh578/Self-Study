package main

import "fmt"

type House struct {
	Address  string
	Size     int
	Price    float64
	Category string
}

func main() {
	var house House
	house.Address = "Seoul"
	house.Size = 30
	house.Price = 12.5
	house.Category = "Flat"

	fmt.Printf("%v\n", house)
	fmt.Printf("Address: %s, Size: %d, Price: %v, Category: %s\n",
		house.Address, house.Size, house.Price, house.Category)

}
