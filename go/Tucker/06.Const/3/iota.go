package main

import "fmt"

const (
	MasterRoom uint8 = 1 << iota // 0000 0001
	LivingRoom                   // 0000 0010
	BathRoom                     // 0000 0100
	SmallRoom                    // 0000 1000
)

func SetLight(rooms, room uint8) uint8 {
	return rooms | room
}

func ResetLight(rooms, room uint8) uint8 {
	return rooms &^ room
}

func IsLightOn(rooms, room uint8) bool {
	return rooms&room == room
}

func TurnLights(rooms uint8) {
	if IsLightOn(rooms, MasterRoom) {
		fmt.Println("Turn light on in MasterRoom")
	}
	if IsLightOn(rooms, LivingRoom) {
		fmt.Println("Turn light on in LivingRoom")
	}
	if IsLightOn(rooms, BathRoom) {
		fmt.Println("Turn light on in BathRoom")
	}
	if IsLightOn(rooms, SmallRoom) {
		fmt.Println("Turn light on in SmallRoom")
	}
}

func main() {
	// rooms = 0000 0000
	var rooms uint8 = 0
	rooms = SetLight(rooms, MasterRoom)
	rooms = SetLight(rooms, BathRoom)
	rooms = SetLight(rooms, SmallRoom)

	rooms = ResetLight(rooms, SmallRoom)

	TurnLights(rooms)

}
