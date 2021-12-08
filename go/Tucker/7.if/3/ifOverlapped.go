package main

import "fmt"

func HasRichFriend() bool {
	return true
}

func GetFriendsCount() int {
	return 3
}

func main() {
	price := 35000
	if price >= 50000 {
		if HasRichFriend() {
			fmt.Println("Friend paid for it")
		} else {
			fmt.Println("Let's split the bill.")
		}
	} else if price >= 30000 {
		if GetFriendsCount() > 3 {
			fmt.Println("Go to rest room when billing time")
		} else {
			fmt.Println("Let's split the bill.")
		}
	}
}
