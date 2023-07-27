# Functions
- `main`: entry point of programs
- `fn`: declare new fucntions

> NOTE
RUst code uses ***snake case*** as the conventional style for function and variable names

Filename: **src/main.rs**
```rust
fn main() {
    println!("Hello, world!");

    another_function();
}

fn another_function() {
    println!("Another function.");
}
```
- No matter where to declare functions. (defined somewhere in a scope)

## 1. Parameters
> NOTE: parameters vs. arguments
parameters: special variables of a function
arguments: the concrete values for parameters
- In function signatures, MUST declare the type of each parameter.


Filename: **src/main.rs**
```rust
fn main() {
    another_function(5);
}

fn another_function(x: i32) {
    println!("The value of x is: {x}");
}
```

- multiple parameters
Filename: **src/main.rs**
```rust
fn main() {
    print_labeled_measurement(5, 'h');
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}
```

## 2. Statements and Expressions
- **Statements**: instructions that perform some action and do not return a value
- **Expressions**: evaluate to a resultant value, can be part of statements

Example:
```rust
let y = 6; // `let y = 6` is a statement. 6 is an expression.

let x = (let y = 6); // Error!! A statement doesn't have return value.
```

Filename: **src/main.rs**
```rust
fn main() {
    let y = {
        let x = 3;
        x + 1 // no semicolon at the end
    };

    println!("The value of y is: {y}");
}

// Result in: The value of y is: 4
```
- Expressions do not include ending semicolons.

## 3. Functions with Return Values
- declare return type using arrow (`->`)
- return by using..
  - `return` keyword
  - the last expression implicitly

Filename: **src/main.rs**
```rust
fn main() {
    let x = plus_one(5);

    println!("The value of x is: {x}");
}

fn plus_one(x: i32) -> i32 {
    x + 1
}
```