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
***Propagating errors***: allowing the errors to be handled by the higher-level code that called your function, rather than handling them directly in your function.

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
The `?` Operator:
- if the `Result` is
  - `Ok`: 
  - `Err`: 