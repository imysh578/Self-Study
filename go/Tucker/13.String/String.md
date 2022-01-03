## String
### What is string?
: group of character(single text)

### How to use
```go
// using ""
s1 := "aaaa\nbbbb\ncccc"

// using `` : allowed to use enter
s2 := `aaa
bbb
ccc`
```

### UTF-8
- 1:1 comparity with ASCII code
- first byte : size of code
- size of UTF-8 : 1~4 bytes
- Frequently used characters (like English, Numbers) : 1 byte
- Other characters : 2~3 bytes
- 20:80 profiling => 20% of code affects 80% of performance

### len()
- Returns length of bytes
```go
str := "Hello 월드"
for i := 0; i < len(str); i++ {
  fmt.Printf("Type : %T, Value : %d, String: %c\n", str[i], str[i], str[i])
}
// Cannot express Korean(3 bytes) with 1 byte => using rune to resolve this problem
```

### rune
: rune is a type of aliasing for int32
```go
str := "Hello 월드"
arr := []rune(str)

for i := 0; i < len(arr); i++ {
  fmt.Printf("Type : %T, Value : %d, String: %c\n", arr[i], arr[i], arr[i])
}
```

### range
```go
str := "Hello 월드"
for _, v := range str {
  fmt.Printf("Type : %T, Value : %d, String: %c\n", v, v, v)
}

```

### Operation for strings
- `+` : add strings, put it into new string
- `-`, `*` : not allowed to strings!

- `==`, `!=`
- `<`, `>`, `<=`, `>=` 
> compare based on ASCII code
> compare first char. If first char are same, compare second char, ...

### Structure of String
```go
type StringHeader struct {
  Data uintptr
  Len  int
}
```
- String has pointer and length of data
- The length of string is dynamic value

### Immutability
- String is Immutable
```go
var str string = "Hellow World"
str = "Good morning" // valid to change whole string
str[2] = 'a'         // invalid to change part of string
```

- examples
```go
package main

import (
	"fmt"
	"strings"
)

// using adding strings
func ToUpper1(str string) string {
	var rst string
	for _, c := range str {
		// copy whole string every time => Bad for memory efficiency!
		if c >= 'a' && c <= 'z' {
			rst += string('A' + (c - 'a'))
		} else {
			rst += string(c)
		}
	}
	return rst
}

// using builder
func ToUpper2(str string) string {
	var builder strings.Builder // create new rune for string
	fmt.Println()
	for _, c := range str {
		if c >= 'a' && c <= 'z' {
			builder.WriteRune('A' + (c - 'a'))
		} else {
			builder.WriteRune(c)
		}
	}
	return builder.String()
}

func main() {
	var str string = "Hello World"
	fmt.Println(strings.ToUpper(str)) // using `strings`` library
	fmt.Println(ToUpper1(str))
	fmt.Println(ToUpper2(str))

}
```
