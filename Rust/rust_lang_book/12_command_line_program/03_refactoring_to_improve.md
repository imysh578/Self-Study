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

Filename: *src/main.rs*
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


## Creating a Constructor for `Config`
Let's change `parse_config` from a plain function to a function named `new` that is associated with the `Config` struct.


Filename: *src/main.rs*
```rust
fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args);

    // --snip--
}

// --snip--

impl Config {
    fn new(args: &[String]) -> Config {
        let query = args[1].clone();
        let file_path = args[2].clone();

        Config { query, file_path }
    }
}
```

## Fixing the Error Handling
Try running the program without any arguments; it will look like this:
```shell
$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished dev [unoptimized + debuginfo] target(s) in 0.0s
     Running `target/debug/minigrep`
thread 'main' panicked at 'index out of bounds: the len is 1 but the index is 1', src/main.rs:27:21
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```
- This error message is for programmers, not for end users.

### Improving the Error Message
Filename: *src/main.rs*
```rust
    // --snip--
    fn new(args: &[String]) -> Config {
        if args.len() < 3 {
            panic!("not enough arguments");
        }
        // --snip--
```

## Returning a `Result` Instead of Calling `panic!`
Change function name from `new` to `build`. (many programmers expect `new` functions to never fail)
The `build` function returns `Result` type and `Err` variant displays a more practical error for our users without the surrounding text about `thread 'main'` and `RUST_BACKTRACE` that a call to `panic!` causes.

Filename: *src/main.rs*
```rust
impl Config {
    fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        Ok(Config { query, file_path })
    }
}
```

## Calling `Config::build` and Handling Errors
```rust
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
```
- `unwrap_or_else()`: allows us to define some custom, non-`panic!` error handling. 
- `process::exit()`: stop the program immediately an return the number that was passed as the exit status code.

## Extracting Logic from `main`
Filename: *src/main.rs*
```rust
fn main() {
    // --snip--

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    run(config);
}

fn run(config: Config) {
    let contents = fs::read_to_string(config.file_path)
        .expect("Should have been able to read the file");

    println!("With text:\n{contents}");
}

// --snip--
```

## Returning Errors from the run Function
Instead of allowing the program to panic by calling `expect`, the `run` function will return a `Result<T, E>` when something goes wrong.
Filename: *src/main.rs*
```rust 
use std::error::Error;

// --snip--

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.file_path)?;

    println!("With text:\n{contents}");

    Ok(())
}
```

## Handling Errors Returned from `run` in `main`
- Because run returns `()` in the success case, we only care about detecting an error, so we don’t need `unwrap_or_else` to return the unwrapped value, which would only be `()`.
- We use **`if let`** rather than `unwrap_or_else` to check whether `run` returns an `Err` value and call `process::exit(1)` if it does.
```rust
fn main() {
    // --snip--

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    if let Err(e) = run(config) {
        println!("Application error: {e}");
        process::exit(1);
    }
}
```

## Splitting Code into a Library Crate
(1) Let’s move all the code that isn’t the main function from src/main.rs to src/lib.rs:
- The `run` function definition
- The relevant `use` statements
- The definition of `Config`
- The `Config::build` function definition

Filename: *src/lib.rs*
```rust
use std::error::Error;
use std::fs;

pub struct Config {
    pub query: String,
    pub file_path: String,
}

impl Config {
    pub fn build(args: &[String]) -> Result<Config, &'static str> {
        // --snip--
    }
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    // --snip--
}
```

(2) Now we need to bring the code we moved to *src/lib.rs* into the scope of the binary crate in *src/main.rs*.
- `use minigrep::Config`
Filename: *src/main.rs*
```rust
use std::env;
use std::process;

use minigrep::Config;

fn main() {
    // --snip--
    if let Err(e) = minigrep::run(config) {
        // --snip--
    }
}
```