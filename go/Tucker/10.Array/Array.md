## Array
### What is Array?
- group of data with same type
- One of the Data structures

### How to use
- Declaration
```go
var name [length]type
```

- examples
```go
var t [5]float64
```
```go
var nums [5]int
```
```go
days := [3]string{"mon", "tue", "wed"}
```
```go
var temps [5]float64 = [5]float64{24.3, 31.4}
```
```go
var s = [5]int{1: 10, 3: 30} // s[1] = 10, s[3] = 30
```
```go
x := [...]int{10, 30, 50} // ... : length is defined by values' number => static
y := []int{10, 30, 50} // length can be changed. => dynamic
```

### Memory of Array
- The memory of Array is continuous
- `address of element` = `start address of array` + (`index` * `size of type`)
=> fastest data structure in Random access


### Multiple Array
```go
[len1][len2]type
[len1][len2][len3]type
[len1][len2][len3][len4]type
...
```

