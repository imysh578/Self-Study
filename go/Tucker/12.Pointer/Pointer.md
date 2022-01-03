## Pointer
### What is Pointer?
- the type to have memory address as a value

### How to use?
- Declaration
```go
var name *type
```
`*type` : having that stated type of address as a value.

```go
var a int
var p *int
p = &a      // put a's memory address into pointer p

*p = 20
```
- struct pointer initialization
```go
var data Data
var p *Data = &data // returns var data's address
```

```go
var p *Data = &Data{} // creates Data struct and returns its address
```


### Characteristics
- Several pointer variables can point to one variable
- Default value : nil
- It has only address value => 8bytes, good memory efficiency
> pointer's memory size isn't changed, even though the value is changed


### Instance
: The substance of the data allocated to the memory.
```go
var p1 *Data = &Data{}
var p2 *Data = p1
var p3 *Data = p1
// There is only one instance which is pointed by 3 pointer(p1, p2, p3)
```

```go
var data1 Data         // create new instance
var data2 Data = data1 // create other instance and copy data1 into it
var data3 Data = data1 // create another instance and copy data1 into it
// There are 3 instances
```

- Object Life Cycle
- When destroyed?
```go
func TestFunc() {
  u := &User{}  // create new instance
  u.Age = 30
  fmt.Println(u)
} 
// All local variables are destroyed
// Also instances by Garbage Collector if instances are not used anymore
```


### new()
: initialization with default value
```go
p1 := &Data{}       // initialization using & with default value
var p2 = new(Data)  // initialization using new() with default value
```

### Heap memory
