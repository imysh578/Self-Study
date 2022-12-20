# Variables and Mutability
- By default, variables are immnutable

Let's generate a new project.
```shell
cargo new variables
```

Filename: **src/main.rs**
```rust
fn main() {
  let x = 5;
  println!("The value of x is: {x}");
  x = 6;
  println!("The value of x is: {x}");
}
```
```shell
$ cargo run          
   Compiling variables v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/03. Common Programming Concepts/variables)
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:4:5
  |
2 |     let x = 5;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     println!("The value of x is: {x}");
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable

For more information about this error, try `rustc --explain E0384`.
error: could not compile `variables` due to previous error
```

- `mut`: change an immnutable variable to mutable one
```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```
```shell
$ cargo run   
   Compiling variables v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/03. Common Programming Concepts/variables)
    Finished dev [unoptimized + debuginfo] target(s) in 0.66s
     Running `target/debug/variables`
The value of x is: 5
The value of x is: 6
```

## Constants
- constants are not allowed to change
- `const`: a keyword to declare constants
- naming convention: use all uppercase with underscores between words

- ***constants*** vs. ***variables***
  - Cannot use `mut` with constants, but variables
  - The type of constants must be annotated
  - Constants can be declared in any scope, including the global scope
  - Constants may be set only to a constant expression, not the result of a value that could only be computed at runtime

- example
```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

## Shadowing
- If we declare a new variable with the same name as a previous variable, the first variable is ***shadowed*** by the second.
- We can shadow a variable until either it itself is shadowed or the scope ends.
- `let varName = value` 

Filename: **src/main.rs**
```rust
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }
    
    println!("The value of x is: {x}");
}
```

shadowing with different type:
```rust
let spaces = "    "; // string type
let spaces = spaces.len(); // number type
```