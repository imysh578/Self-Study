package main

import "fmt"

type Data struct {
	value int
	data  [200]int
}

func ChangeData(arg Data) {
	/*
		func's arg : r-value(right-value)
		=> every values are copied and works only in the func
		=> actual values of arg aren't changed!
	*/
	arg.value = 999
	arg.data[100] = 999
}

func ChangeRealData(arg *Data) {
	(*arg).value = 999 //	== arg.value = 999
	arg.data[100] = 999
}

func main() {
	var data Data

	ChangeData(data)
	fmt.Printf("value = %d\n", data.value)    // 0
	fmt.Printf("data = %d\n", data.data[100]) // 0

	ChangeRealData(&data)
	fmt.Printf("value = %d\n", data.value)    // 999
	fmt.Printf("data = %d\n", data.data[100]) // 999
}
