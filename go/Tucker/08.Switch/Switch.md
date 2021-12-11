## Switch

### How to use
- Declaration
```
switch variable {
case value1:
  ...
case value2:
  ...
default:
  ...
}
```
```
switch initializer; variable {
case value1:
  ...
case value2:
  ...
default:
  ...
}
```


- example
```
a := 3

switch a {
case 1:
  fmt.Println("a==1")
case 2:
  fmt.Println("a==2")
case 3:
  fmt.Println("a==3")
default:
  fmt.Println("a!=1,2,3")
}
```
```
...
switch age := getMyAge(); age {
case 10:
  fmt.Println("Teenage")
case 33:
  fmt.Println("Pair 3")
default:
  fmt.Println("My age is ", age)
}
...
```

### When to use?
- focus on value : switch
- focus on condition : if

### break / fallthrough
- Golang doesn't need `break` in switch
- `break` is default.
- What if want to continue to next case? Use fallthrough
```
...
switch a {
case 1:
  fmt.Println("a==1")
  fallthrough
case 2:
  fmt.Println("a==2")
case 3:
  fmt.Println("a==3")
default:
  fmt.Println("a!=1,2,3")
}
...
```