### How to use if
- Declaration
```
if condition {
  ...
} else if condition {
  ...
} else {
  ...
}
```

```
if initializer; condition {
  ...
}
```

- example
```
if filename, success := UploadFile(); success {
  fmt.Println("Upload success", filename)
} else {
  fmt.Println("Failed to upload")
}
```

### Short circuit
false && `any` : always false
true || `any` : always true