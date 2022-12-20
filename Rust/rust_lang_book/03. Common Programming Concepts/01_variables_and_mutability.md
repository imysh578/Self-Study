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