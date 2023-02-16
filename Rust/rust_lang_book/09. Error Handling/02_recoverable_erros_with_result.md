# Recoverable Errors with Result

- There are not serious errors to stop the program: e.g., When opening a file that doesn't exist, create the file.

`Result` enum:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

Let's call a function that returns a `Result` value because the function could fail.

```rust
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");
    print!("{:#?}", greeting_file_result);
}
```

- `File:open`
  - The return type of it is a Result<T,E>
  - `T`: the type of the success value, std::fs::File, which is a file handle
  - `E`: the error value is std::io::Error

If the file exists:

```shell
Ok(
    File {
        fd: 3,
        path: "/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/09. Error Handling/playground/hello.txt",
        read: true,
        write: false,
    },
)
```

If file doesn't exist or we doesn't have permission to access the file:

```shell
Err(
    Os {
        code: 2,
        kind: NotFound,
        message: "No such file or directory",
    },
)
```

Using `match` expression to handle the error:

```rust
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };

    print!("{:#?}", greeting_file);
}
```

If the file exists:

```shell
File {
    fd: 3,
    path: "/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/09. Error Handling/playground/hello.txt",
    read: true,
    write: false,
}
```

If the file doesn't exists:

```shell
thread 'main' panicked at 'Problem opening the file: Os { code: 2, kind: NotFound, message: "No such file or directory" }', src/main.rs:8:23
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

## Matching on Different Errors

Let's create a new file if the file that we tried to open doesn't exist.
Add an inner `match` expression:

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file_result = File::open("hello.txt").unwrap_or_else;

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error);
            }
        },
    };

    print!("{:#?}", greeting_file);
}
```

- `File::create(filename)`: create a file with the given file name.

If the file exists:

```rust
File {
    fd: 3,
    path: "/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/09. Error Handling/playground/hello.txt",
    read: true,
    write: false,
}
```

If the file doesn't exists:

```rust
File {
    fd: 3,
    path: "/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/09. Error Handling/playground/hello.txt",
    read: false,
    write: true,
}
```

- Inside of `Err` from `File::open`: `io::Error` which is a struct provided by the standard library.
- `error.kind()`: `io:Error` has a method `kind` to get `io::ErrorKind` value.
- `io::ErrorKind`: the enum provided by the standard library

### Alternatives to Using `match` with `Result<T, E>`

- The closures(`| |`) are used with many of the methods defined on `Result<T, E>`

Using closures and the `unwrap_or_else` method:

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}
```

## Shortcuts for Panic on Error: `unwrap` and `expect`

`Result<T, E>` type has many helper methods like `unwrap` and `expect`

### `unwrap`

The `unwrap` method is a shortcut method implemented just like the match expression.
If the `Result` value is

- `Ok`: returns Ok value
- `Err`: call the `panic!` macro

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap();
}
```

If the file exists:

```rust
File {
    fd: 3,
    path: "/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/09. Error Handling/playground/hello.txt",
    read: true,
    write: false,
}
```

If the file doesn't exists:

```rust
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: Os { code: 2, kind: NotFound, message: "No such file or directory" }', src/main.rs:4:49
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

### `expect`

The `expect` method lets us choose the `panic!` error messages.

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt")
        .expect("hello.txt should be included in this project");
}
```

If the file doesn't exists:

```rust
thread 'main' panicked at 'hello.txt should be included in this project: Os { code: 2, kind: NotFound, message: "No such file or directory" }', src/main.rs:5:10
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

- `expect` might be better to debug than `unwrap`.

## Propagating Errors

**_Propagating errors_**: allowing the errors to be handled by the higher-level code that called your function, rather than handling them directly in your function.

Example code

- a function that reads username from a file
- If the file doesn't exist or can't be read, this function will return those errors that called the function

```rust
fn main() {
    use std::fs::File;
    use std::io::{self, Read};

    fn read_username_from_file() -> Result<String, io::Error> {
        /* Open the file, "hello.txt" */
        let username_file_result = File::open("hello.txt");

        let mut username_file = match username_file_result {
            Ok(file) => file,
            Err(e) => return Err(e),
        };


        /* Read username from the file */
        let mut username = String::new();

        match username_file.read_to_string(&mut username) {
            Ok(_) => Ok(username),
            Err(e) => Err(e),
        }
    }
}
```

### A Shortcut for Propagating Errors: the ? Operator

Using `?` Operator:

```rust
fn main() {
    use std::fs::File;
    use std::io::{self, Read};

    fn read_username_from_file() -> Result<String, io::Error> {
        let mut username_file = File::open("hello.txt")?;
        let mut username = String::new();
        username_file.read_to_string(&mut username)?;
        Ok(username)
    }
}
```

The `?`
- placed after a `Result` value:
- handle the `Result` value like `match` expression
- using `from` function: converts any error value into the error type

> `from` function
> - defined in the `From` trait in the standard library
> - used to convert values from one type into another


> `?` operator vs `match` expression
> - `?` provides more concise and readable way to handle simple error cases
> - `match` is more flexible and allows for more complex error handling logic


We can shorten this code:
```rust
fn main() {
    use std::fs::File;
    use std::io::{self, Read};

    fn read_username_from_file() -> Result<String, io::Error> {
        let mut username = String::new();

        File::open("hello.txt")?.read_to_string(&mut username)?;

        Ok(username)
    }
}
```

We can make it even shorter using `fs::read_to_string`:
```rust
fn main() {
    use std::fs;
    use std::io;

    fn read_username_from_file() -> Result<String, io::Error> {
        fs::read_to_string("hello.text")
    }
}
```


### Where The `?` Operator Can Be used
- `Result`, `Option`, `FromResidual`

If using `?` in `main` function:
```rust
use std::fs::File;
fn main() {
    let greeting_file = File::open("hello.txt")?;
}
// Compile error!
```

- This `main` function has the return type of `()`, not `Result`

- `?` with `Option<T>`:
    If the value of `Option` is..
    - `None`: returns `None`
    - `Some`: returns the value inside the `Some`

Example code for `Option`:
```rust
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last()
}
```

- We can't use `?` on a `Option` and `Result` at the same time.

Change the return type of `main` function:
```rust
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?;

    Ok(())
}
```
- `Box<dyn Error>`: any kind of error

- An executable written in Rust returns an integer when it exits.
- A `main` function returns a `Result<(), E>` will exit with 
    - a value of 0 if `main` returns `Ok(())` 
    - a nonzero value if it returns an `Err`

- The `main` function may return any types that implement the `std::process::Termination` trait, which contains a function report that returns an `ExitCode`.