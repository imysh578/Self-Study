### const
- declare
const name type = value  
- characteristics
  - const doesn't have own memory address

- example
```
const PI float64 = 3.141592
```

### iota
- declare
```
const (
  name1 type = iota
  name2 type = iota
  name3 type = iota
  ...
)
```
```
const (
  name1 type = iota
  name2
  name3
  ...
)
```
- example
```
cosnt (
  Red   int = iota // 0
  Green int = iota // 1
  Blue  int = iota // 2
)
```
```
const (
  Color1 int = iota + 1 // 1
  Color2                // 1
  Color3                // 1
)
```
```
const (
  BitFlag1 uint = 1 << iota // 1 << 0 = 1
  BitFlag2                  // 1 << 1 = 2
  BitFlag3                  // 1 << 2 = 4
  BitFlag4                  // 1 << 3 = 8
)
```

### const without type
- declare
const name = value  
** The type will be defined when it will be used


