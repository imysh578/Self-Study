## For
### How to use?
- Declaration
```
for first; condition; after {
  ...
}
```

- examples
```
...
for i := 0; i < 10; i++ {
  fmt.Println(i)
}
...
```
```
...
i := 0
for ; i < 10; i++ {
  fmt.Println(i)
}
...
```
```
...
i := 0
for ; i < 10;  {
  fmt.Println(i)
  i++
}
...
```
```
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
```
for true {
  ...
}
```
```
for {
  ...
}
```

### continue / break
1. continue
skip code after `continue`, and go to `for`'s after treatment.

2. break
escape from `for`


```
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
```
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
