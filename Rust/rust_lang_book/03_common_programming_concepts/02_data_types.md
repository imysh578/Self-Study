# Data Types

- Every value in Rust is of a certain data type.
- Rust is **_statically language_**, which means that it must know the types of all variables at compile time.
- The compiler can usually infer what tpye we want to use based on the value and how we use it.
- In cases when many types are possible, we must add a type annotataion.

```rust
let guesses: u32 = "42".parse().expect("Not a number!");
```

## 1. Scalar Types

- A **scalar type** represents a single value.
- 4 primary scalar types
  - integers
  - floating-point numbers
  - booleans
  - characters

### 1-1. Integer types

#### Integer types

| Length  | Signed | Unsigned |
| :-----: | :----: | :------: |
|  8-bit  |   i8   |    u8    |
| 16-bit  |  i16   |   u16    |
| 32-bit  |  i32   |   u32    |
| 64-bit  |  i64   |   u64    |
| 128-bit |  i128  |   u128   |
|  arch   | isize  |  usize   |

- `i`: signed integer
- `u`: unsigned integer
- `isize`, `usize`: depend on the architecture of the computer which is the program is running on. (e.g., 64-bit, 32-bit)

#### Number Literals

| Number literals |   Example   |
| :-------------: | :---------: |
|     Decimal     |   98_222    |
|       Hex       |    0xff     |
|      Octal      |    0o77     |
|     Binary      | 0b1111_0000 |
| Byte (u8 only)  |    b'A'     |

#### Overflow

- When compiling in...
  - **debug mode**
    - Rust includes checks for integer overflow that cause **_panic_** at runtime.
    - `u8`: 256 -> panic
  - **release mode**
    - Rust does _not_ include checks for integer overflow that cause panics.
    - `u8`: 256 -> 0
- To explicitly handle the possibility of overflow,
  - Wrap in all modes with the `wrapping_*` methods, such as `wrapping_add`.
  - Return the `None` value if there is overflow with the `checked_*` methods.
  - Return the value and a boolean indicating whether there was overflow with the `overflowing_*` methods.
  - Saturate at the value’s minimum or maximum values with the `saturating_*` methods.

### 1-2. Floating-Point Types

- two primitive types for floating-point numbers: `f32`, `f64`
- All floating-point types are _signed_.
- The default type is `f64` (same speed as `f32`, but more precision)
- according to the **_IEEE-754_** standard.
  - `f32`: single-precision float
  - `f64`: double-precision float

Filename: **src/main.rs**

```rust
fn main() {
  let x = 2.0; // f64
  let y: f32 = 3.0 // f32
}
```

### 1-3 Numeric Operations

Filename: **src/main.rs**

```rust
fn main() {
    // addition
    let sum = 5 + 10;

    // subtraction
    let difference = 95.5 - 4.3;

    // multiplication
    let product = 4 * 30;

    // division
    let quotient = 56.7 / 32.2;
    let truncated = -5 / 3; // Results in -1

    // remainder
    let remainder = 43 % 5;
}
```

### 1-4 The Boolean Type

- bool
  - `true`, `false`
- size: 1 byte

Filename: **src/main.rs**

```rust
fn main() {
    let t = true;

    let f: bool = false; // with explicit type annotation
}
```

### 1-5 The Character Type

- `char`

  - with single quotes(`''`)
  - size: 4 bytes
  - Unicode scalar value (more than ASCII)

- `string` with double quotes(`""`)

Filename: **src/main.rs**

```rust
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
}
```

## 2. Compound Types

- multiple values into one type
- `tuple`, `array`

### 2-1. The Tuple Type

- a number of values with variety of types into one compound type
- fixed length: onece declared, cannot change the size of it
- `()`: list of values inside parentheses

Filename: **src/main.rs**

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

> NOTE: **unit**
tuple without any values, written `()`.
Unit represents an empty value or an empty return type.

### 2-2. The Array Type

- a collection of multiple values
- every element of an array have the same type
- fixed length

Filename: **src/main.rs**

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

- array is useful when..
  - we want to our data allocated on the stack rather than the heap
  - we want to ensure we always have a fixed number of elements

> NOTE
> A **vector** is a similar collection type provided by the standard library that is allowed to grow and shrink in size

- Useful for the collection that will not need to change

```rust
fn main() {
  let months = ["January", "February", "March", "April", "May", "June", "July" "August", "September", "October", "November", "December"];
}
```

- array type annotation

```rust
fn main() {
  let a: [i32; 5] = [1, 2, 3, 4, 5];
}
```

- initialize an array with same value for each element

```rust
let a = [3; 5]; // let a = [3, 3, 3, 3, 3];
```

#### Invalid array element access
- an example of Rust’s memory safety principles in action

Filename: **src/main.rs**
```rust
use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!("The value of the element at index {index} is: {element}");
}
```
```shell
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/invalid_array_element_access`
Please enter an array index.
10
thread 'main' panicked at 'index out of bounds: the len is 5 but the index is 10', src/main.rs:14:19
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```