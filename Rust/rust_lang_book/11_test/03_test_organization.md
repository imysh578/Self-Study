# Test Organization
Two main categories of tests in Rust community
- **Unit tests**: small and more focused, testing one module in isolation at a time, and test private interfaces
- **Integration tests**: entirely external to your library and use your code in the same way any other external code would, using only the public interface and potentially exercising multiple modules per test

## Unit tests
The convention is to create a module named `tests` in each file to contain the test functions and to annotate the module with `cfg(test)`.

### The Tests Module and `#[cfg(test)]`
- **`cfg`**: stands for *configuration*, and tells Rust that the following item should only be included given a certain configuration option
- **`#[cfg(test)]`**: tells Rust to compile and run the test code only when running `cargo test`, not when running `cargo build`

Example code:
```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
```
- In this case, configuration option is `test`

### Testing Private Functions
```rust
pub fn add_two(a: i32) -> i32 {
    internal_adder(a, 2)
}

fn internal_adder(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        assert_eq!(4, internal_adder(2, 2));
    }
}
```
- `fn internal_adder`: is not `pub` function, and can be tested!

## Integration Tests
To create integration tests, you first need a tests directory.
### The tests Directory
We create a tests directory at the top level of our project directory, next to src.
Then we can make as many test files as we want, and Cargo will compile each of the files as an individual crate.
```
adder
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── tests
    └── integration_test.rs
```

```rust
// integration_test.rs
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

We can still run a particular integration test function by specifying the test function’s name as an argument to `cargo test`.
- **`cargo test --test`**: To run all the tests in a particular integration test file, use the `--test` argument of cargo test followed by the name of the file.

### Submodules in Integration Tests
- Each file in the tests directory is compiled as its own separate crate
- However, this means files in the *tests* directory don’t share the same behavior as files in *src* do.

For example, *tests/common.rs*:
```rust
pub fn setup() {
    // setup code specific to your library's tests would go here
}
```

```shell
cargo test 
    Finished test [unoptimized + debuginfo] target(s) in 0.00s
     Running unittests src/lib.rs (target/debug/deps/adder-d0b5831847bf2ea7)

running 1 test
test tests::it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running tests/common.rs (target/debug/deps/common-f67eefc70b29d180)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running tests/integration_test.rs (target/debug/deps/integration_test-92aefea4feb54615)

running 1 test
test it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

To avoid having common appear in the test output, instead of creating tests/common.rs, we’ll create tests/common/mod.rs. 
For example, *tests/common/lib.rs*:
```
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── tests
    ├── common
    │   └── mod.rs
    └── integration_test.rs
```

*tests/integration_test.rs*:
```rust
use adder;

mod common;

#[test]
fn it_adds_two() {
    common::setup();
    assert_eq!(4, adder::add_two(2));
}
```

### Integration Tests for Binary Crates
If our project is a binary crate that only contains a *src/main.rs* file and doesn’t have a *src/lib.rs* file, we can’t create integration tests in the tests directory and bring functions defined in the *src/main.rs* file into scope with a `use` statement.
