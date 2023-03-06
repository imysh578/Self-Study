# Refactoring to Improve Modularity and Error Handling
Four Problems to fix
- `main` function performs two tasks: parsing arguments and reading files
- Many variables are defined in the `main` function. It's best to group the configuration variables into one structure to make their purpose clear.
- The error message only print `"Should have been able to read the file"`. But Reading a file can fail in a number of ways. (e.g., missing, no permission to open, ...)
- If the user runs our program without specifying enough arguments, they’ll get an `index out of bounds` error. It would be best if all the error-handling code were in one place to maintain.

## Separation of Concern for Binary Projects
Process:
- Split your program into a `main.rs` and a `lib.rs` and move your program’s logic to `lib.rs`.
- As long as your command line parsing logic is small, it can remain in `main.rs`.
- When the command line parsing logic starts getting complicated, extract it from `main.rs` and move it to `lib.rs`.

The responsibilities of `main` function:
- Calling the command line parsing logic with the argument values
- Setting up any other configuration
- Calling a `run` function in `lib.rs`
- Handling the error if `run` returns an error

This pattern is about separating concerns:
- `main.rs`: runs the program
- `libs.rs`: handles all the logic of the task at hand

## Extracting the Argument Parser
Filename: *src/main.rs*
```rust
use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    let (query, file_path) = parse_config(&args);

    // --snip--
}

fn parse_config(args: &[String]) -> (&str, &str) {
    let query = &args[1];
    let file_path = &args[2];

    (query, file_path)
}
```
- `parse_config()`: holds the logic that determines which argument goes in which variable and passes the values back to `main`.

## Grouping Configuration Values
`parse_config()` returns a tuple. Let's make it easier using `struct`.

```rust
fn main() {
    let args: Vec<String> = env::args().collect();

    let config = parse_config(&args);

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    let contents = fs::read_to_string(config.file_path)
        .expect("Should have been able to read the file");

    // --snip--
}

struct Config {
    query: String,
    file_path: String,
}

fn parse_config(args: &[String]) -> Config {
    let query = args[1].clone();
    let file_path = args[2].clone();

    Config { query, file_path }
}
```
- `clone()`: a way we could manage the String data; the easiest, though somewhat inefficient
    -> giving up a little performance to gain simplicity is a worthwhile *trade-off*


