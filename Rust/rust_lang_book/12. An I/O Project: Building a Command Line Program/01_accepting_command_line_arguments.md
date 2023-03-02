# Accepting Command Line Arguments
We are going to make the command line search tool(e.g, grep; **g**lobally search a **r**egular **e**xpression and **p**rint)

There are existing libraries that can help with writing a program, but we are going to implement this capability ourselves.


```shell
$ cargo new minigrep
$ cd minigrep
```

**minigrep**
- accept its two command line arguments: the file path and a string to search for
- run the code with `cargo run -- searchstring example-filename.txt`

## Reading the Argument Values
- `std::env::args`: to read the values of command line arguments we pass to it

Let's allow the program to read any command line arguments passed to it and then collect the values into a vector:
Filename: *src/main.rs*
```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(args);
}
```

```shell
cargo run -- A B C
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/minigrep A B C`
[src/main.rs:5] args = [
    "target/debug/minigrep",
    "A",
    "B",
    "C",
]
```
- `args[0]`: the name of our binary

| The `args` function and invalid Unicode
Note that `std::env::args` will panic if any argument contains invalid Unicode.
So, we can use `std::env::args_os` instead to accept arguments containing invalid Unicode.
`args_os` returns an iterator that produces `OsString` values which differ per platform and are more complex to work with than `String` values.

## Saving the Argument Values in Variables
Let's save the two arguments in variables:
Filename: *src/main.rs*
```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    let query = &args[1];
    let file_path = &args[2];

    println!("Searching for {}", query);
    println!("In file {}", file_path);
}
```

