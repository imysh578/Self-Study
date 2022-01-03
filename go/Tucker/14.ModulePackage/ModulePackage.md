## Module & Package
### Moudle
- `Module` includes `package`s
  
### Package
- The unit to contain code
- The code has to be included in the `package`
  
### Program
- The package that contains start point of execution
- In other words, the `main package` that contains `func main()` 
  
### Process
- A program running on OS

### How to use 
- normal
```go
import(
  "fmt"
  "math/rand"
)
```

- if package names overlap
```go
import (
  "text/template"
  "html/template"
)
```

- aliasing of package
```go
import(
  "text/template"           // 1
  htemplate "html/template" // 2 aliasing of package
)
...

template.New("foo").Parse(`{{define "T"}}Hello`)  // 1
htemplate.New("foo").Parse(`{{define "T"}}Hello`) // 2
```

- if package that is not used, put _ in front of it
> for 
```go
import (
  "fmt"
  _ "strings"
)
```

### Creating Module and using external package
1. Create folder `goproject/usepkg`
2. go mod init goproject/usepkg
3. mkdir custompkg
4. Custompkg.go
5. mkdir program
6. usepkg.go
7. go mod tidy
> install external packages

- To check installed modules
  1. `go env` and check the GOPATH
  2. direct to GOPATH `cd C:\Users\...`
  3. `cd pkg\mod`
  4. Now you can check which modules are installed

### Export to other package
- start with `upper case` : can be used in other packages
```go
var Ratio int

const PI = 3.14

type Student struct {
  Name string
  Age  int
}

func PrintCustom() {
	fmt.Println("This is custom package, 1 !")
}
```  
  
- start with `lower case` : cannot be used in other package
```go
var ratio int

const pi = 3.14

type student struct {
  Name string
  Age  int
}

func printCustom() {
	fmt.Println("This is custom package, 1 !")
}
```

### Initialization
- The variables in the package are initiated at very first time when the package is called
- If there is `init` function in the package that you are going to use, `init` will be executed before other functions are executed in the package
- Package is initialized only once, no matter how many time it is called
