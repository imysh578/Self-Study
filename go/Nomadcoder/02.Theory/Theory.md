# 1. main package
`main.go` is not optional if you want to create a project and compile it.
This file is going to be compiled and we can use it.
main is the entry point, so the complier is going to complie main first.

But its name doesn't have to be `main.go` if you want to build libraries for sharing or open source.


## Hello World!
```go
package main

import "fmt"

func main() {
	fmt.Println("Hello World!")
}
```

# 2. packages and imports
## fmt
This is a package for fromatting.
