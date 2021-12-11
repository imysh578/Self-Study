## Slice
### What is Slice?
- Slice is the -dynamic array type- in Go lang
- Slice is the pointer type pointing at the dynamic array
- Static  : compile time or build time( ex. const, array)
- Dynamic : Runtime (ex. var, slice)
- similar to `vector` in c++, `array list` in Java

### Declaration
```
var slice []int
```
```
slice := []int {}
```

### Initialization
```
var slice1 = []int{1,2,3}
var slice2 = []int{1, 2:2, 4:3} // [1 0 2 0 3]
```


- Warning
> using `...` => length cannot be changed => array
```
var array = [...]int{1, 2, 3}
var slice = []int{1,2,3}
```

- Make()
```
var slice = make([]int,3, 5) // [0 0 0], Len: 3, Cap: 5
```

### Add Element
> append()
- Empty space : Cap - Len 
- Empty space > length of append : returns exisiting slice
- Empty space < length of append : returns new slice 
- Warning!
  1. Make sure to check it returns from existing slice ro new slice, otherwise several slices shares same data
```
// Empty space > length of append : returns exisiting slice
slice1 := make([]int, 3, 5)     // Cap - Len = 5 - 3 = 2
slice2 := append(slice1, 1, 2)  
slice1[1] = 100
fmt.Println(slice1) // [0 100 0]
fmt.Println(slice2) // [0 100 0 1 2]

// Empty space < length of append : returns new slice 
var slice3 = []int{1, 2, 3}
slice4 := append(slice3, 4)
slice3[1] = 100
fmt.Println(slice3) // [ 100 3]
fmt.Println(slice4) // [1 2 3 4]
```


### Structure
```
type SliceHeader struct {
  Data uintptr  // pointing at array
  Len int       // Length of data in array
  Cap int       // Length of capable array(Max Length)
}
```

### Slicing
- `Slicing` is pointing at part of array
- Result of `Slicing` : `slice`
- It is returned from the existing array not likely Python. 
- How to use?
```
array[startIndex:endIndex]
```
```
arr := [7]int{1,2,3,4,5,6,7}  // [1 2 3 4 5 6 7]
slice1 := arr[:]              // [1 2 3 4 5 6 7]
slice2 := arr[1:5]            // [2 3 4 5]
slice3 := arr[:5]             // [1 2 3 4 5]
slice4 := arr[3:]             // [4 5 6 7]

```


- When slicing slice, it depends on index of array, not slice
```
array := [15]int{1: 1, 2: 2, 14: 100}
slice1 := array[1:10]

slice2 := slice1[2:14]
fmt.Println(slice1)
fmt.Println(slice2)
```

- Cap size Silicing
```
slice[startIndex:endIndex:maxIndex]
```
```
slice1 := []int{1, 2, 3, 4, 5}
slice2 := slice1[1:3:4] // [2, 3], Len: 2, Cap: 4
```