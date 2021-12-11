## Structure
### What is Structure?
- the type to combine several fields


### How to use?
- Declaration
```
type name struct {
  fieldName1 type
  fieldName2 type
  fieldName3 type
  ...
}
```

- Examples
```
type Student struct{
  Name  string
  Class int
  No    int
  Score float 64
}

...

var a student
```

### Initialization
```
var house House = House {"Seoul", 28, 9.8, "Apt"}
```
```
var house House = House {
  "Seoul", 
  28, 
  9.8, 
  "Apt",
}
```
```
var house House = House {Address: "Seoul", Size 28}
```

### Structure that contains other structure
```
type User struct {
	Name string
	ID   string
	Age  int
}

type VIPUser struct {
	UserInfo User  // other structure
	VIPLevel int
	Price    int
}
```

### Embedded Structure
```
type User struct {
	Name string
	ID   string
	Age  int
}

type VIPUser struct {
	User          // embedded structure
	VIPLevel int
	Price    int
}
```

### Copy
```
type Student struct {
  Age   int
  No    int
  Score float64
}

var student1 Student = Student {3, 20, 100}
var student2 Student

student2 = student1 // copy student1 to student2
```

### Size
```
type User struct {
  Age   int       // 8 bytes
  Score float64   // 8 bytes
}
// total : 16 bytes
```
```
type User struct {
	Age   int32   // 4 bytes
	Score float64 // 8 bytes
}
// total : 16 bytes => ???
// Memory Alignment : depends on Register size! => 8 bytes each on win64, 4bytes each on win32
```


### Why Structure?
Low Coupling, High Cohesion
- Combine related code blocks to increase `cohesion` and `reusability`.
- `Structure` increases cohesion and reusability by grouping `related data`.
- `Array` increases cohesion by grouping data of the `same type`.

Go doens't have `class`, but `structure`
Sturcture is the basis for OOP(Object-Oriented Programming)