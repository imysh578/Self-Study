## For
### How to use?
- Declaration
```go
for first; condition; after {
  ...
}
```

- examples
```go
...
for i := 0; i < 10; i++ {
  fmt.Println(i)
}
...
```
```go
...
i := 0
for ; i < 10; i++ {
  fmt.Println(i)
}
...
```
```go
...
i := 0
for ; i < 10;  {
  fmt.Println(i)
  i++
}
...
```
```go
...
i := 0
for i < 10  {
  fmt.Println(i)
  i++
}
...
```

### while
Golang doesn't have `while`.
`for` replaces `while`

- examples
```go
for true {
  ...
}
```
```go
for {
  ...
}
```

### continue / break
1. continue
skip code after `continue`, and go to `for`'s after treatment.

2. break
escape from `for`


```go
for i := 0; i < 10; i++ {
  if i == 3 {
    continue
  }
  if i == 6 {
    break
  }
  fmt.Println("6 *", i, "=", 6*i)
}
```


### Overlapped `for`
- examples
```go
for i := 0; i < 3; i++ {
  for j := 0; j < 5; j++ {
    fmt.Print("*")
  }
  fmt.Println()
}
```

### Escape overlapped `for`
1. flag
2. label
