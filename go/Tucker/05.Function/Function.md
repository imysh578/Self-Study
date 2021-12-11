## Function  
### structure  
-keyword function_name(param_name param_type) return type {}  

** Example **  
```
func Add(a int, b int) int {  
  return a+b  
}
```

- function's arguments are r-values(right-values) => copy data

### Recursive Function

** Example **  
```
func printNo(n int) {  
	if n == 0 { // escape condition  
		return  
	}  
	fmt.Println(n)  
	printNo(n - 1)          // recursive call  
	fmt.Println("After", n) // output after recursive call  
}  
```
Characteristics  
Go language uses flexible size stack.  
