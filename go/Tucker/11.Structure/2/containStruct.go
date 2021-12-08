package main

import "fmt"

type User struct {
	Name string
	ID   string
	Age  int
}

type VIPUser struct {
	UserInfo User
	VIPLevel int
	Price    int
}

func main() {
	user := User{"John", "Snow", 23}
	vip := VIPUser{
		User{"Stark", "IronMan", 48},
		3,
		250,
	}

	fmt.Printf("User: %s, ID: %s, Age: %d\n", user.Name, user.ID, user.Age)
	fmt.Printf("VIP user: %s, ID: %s, Age: %d, VIP level: %d, VIP price: $%d\n",
		vip.UserInfo.Name, vip.UserInfo.ID, vip.UserInfo.Age, vip.VIPLevel, vip.Price)

}
