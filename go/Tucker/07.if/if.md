### How to use if
- Declaration
```go
if condition {
  ...
} else if condition {
  ...
} else {
  ...
}
```

```go
if initializer; condition {
  ...
}
```

- example
```go
if filename, success := UploadFile(); success {
  fmt.Println("Upload success", filename)
} else {
  fmt.Println("Failed to upload")
}
```

### Short circuit
false && `any` : always false
true || `any` : always true
