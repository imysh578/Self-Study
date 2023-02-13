# Error Handling
## Categories
- recoverable error
  - We most likely want to report the problem to users and retry the operation
  - e.g., file not found error
- unrecoverable error
  - symptoms of bugs, so we want to immediately stop the program
  - e.g., trying to access a location beyond the end of an array

Rust doesn't have exceptions.
Instead, Rust has...
- `Result<T, E>`: for recoverable errors 
- `panic!` macro: it stops execution when the program encounters an unrecoverable error.