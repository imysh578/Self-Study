# How to Write Tests
The bodies of test functions typically perform these three actions:
1. Set up any needed data or state.
2. Run the code you want to test.
3. Assert the results are what you expect.

## The Anatomy of a Test Function
A test in Rust is a function annotated with the `test` attribute.
- Attributes: metadata about pieces of Rust code (e.g., `derive`)

To change a function into test function, add **`#[test]`** on the line before `fn`.
- running tests with the **`cargo test`** command, Rust builds a test runner binary that runs the annotated functions and report whether each test function passes or fails.

Whenever we make a new library project with Cargo, a test module with a test function in it is automatically generated for us. 

Let's create a new library project called `adder`:
```shell
$ cargo new adder --lib
     Created library `adder` project
$ cd adder
```

The contents of the *src/lib.rs* file in the `adder` library should look like:
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
```
- `#[test]` annotation
    - this attribute indicates this is test function, so the test runner knows to treat this function as a test.
    - We can have non-test functions in the `tests` module, so we always need to indicate which functions are tests.

- `assert_eq!` macro
    - In this example code uses this macro to assert the `result`, which contains the result of adding 2 and 2 equals 4.

Let's run all tests in the project:
```shell
$ cargo test
   Compiling adder v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/11. Writing Automated Test/adder)
    Finished test [unoptimized + debuginfo] target(s) in 0.46s
     Running unittests src/lib.rs (target/debug/deps/adder-d0b5831847bf2ea7)

running 1 test
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```
- **test result** has
    - *passed*
    - *failed*
    - *ignored*: It's possible ot mark a test as ignored
    - *measured*: benchmark test that measure performance
    - *filtered out*: We can pass an argument to the `cargo test` command to run only tests whose name matches a string

- **`Doc-tests`**
    - the results of any documentation tests

Let's Customize the code and run test:
- `it_works` -> `exploration`
```rust
#[cfg(test)]
mod tests {
    #[test]
    fn exploration() {
        assert_eq!(2 + 2, 4);
    }
}
```
```shell
$ cargo test
   Compiling adder v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/11. Writing Automated Test/adder)
    Finished test [unoptimized + debuginfo] target(s) in 0.17s
     Running unittests src/lib.rs (target/debug/deps/adder-d0b5831847bf2ea7)

running 1 test
test tests::exploration ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests
```

Add `another` function that call `panic!`:
```rust
#[cfg(test)]
mod tests {
    #[test]
    fn exploration() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    fn another() {
        panic!("Make this test fail");
    }
}
```
```shell
cargo test
   Compiling adder v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/11. Writing Automated Test/adder)
    Finished test [unoptimized + debuginfo] target(s) in 0.13s
     Running unittests src/lib.rs (target/debug/deps/adder-d0b5831847bf2ea7)

running 2 tests
test tests::exploration ... ok
test tests::another ... FAILED

failures:

---- tests::another stdout ----
thread 'tests::another' panicked at 'Make this test fail', src/lib.rs:10:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::another

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass `--lib`
```
- the line `test tests::another` shows `FAILED` because of the **`panic!`**
- The summary line displays at the end: overall, the test result is `FAILED`

## Checking Results with the `assert!` Macro
**`assert!` macro**
- provided by the standard library
- is useful when you want to ensure that some condition in a test evaluates to `true`

`assert!(value in Boolean type)`
- If the value is `true`, nothing happens and test passes
- If the value is `false`, the `assert!` macro calls `panic!` to cause the test to fail.

Example code:
```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(larger.can_hold(&smaller));
    }
}
```
- **`use super::*;`**
    - `super` = outer module
    - Anything we define in the outer module is available to this `tests` module.


Let's add another test:
```rust
    #[test]
    fn smaller_cannot_hold_larger() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(!smaller.can_hold(&larger));
    }
```

## Testing Equality with the `assert_eq!` and `assert_ne!` Macros
Test for equality: 
1. `assert!(A == B)`, `assert!(A != B)`
2. `assert_eq!(A, B)`, `assert_ne!(A, B)`
    - more convenient and easier to see why teh test failed.
    - When the assertions fail, these macros print their arguments using debug formatting, which means the values being compared must implement the `PartialEq` and `Debug` traits. (`#[derive(PartialEq, Debug)]` annotation)


Example code:
```rust
pub fn add_two(a: i32) -> i32 {
    a + 3
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds_two() {
        assert_eq!(4, add_two(2));
    }
}
```
```shell
test tests::it_adds_two ... FAILED

failures:

---- tests::it_adds_two stdout ----
thread 'tests::it_adds_two' panicked at 'assertion failed: `(left == right)`
  left: `4`,
 right: `5`', src/lib.rs:11:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

- the order in which we specify the value we expect and the value the code produces doesn’t matter.


The `assert_ne!` macro is most useful for cases when we’re not sure what a value will be, but we know what the value definitely shouldn’t be


## Adding Custom Failure Messages 
You can also add a custom message(using `format!`) to be printed with the failure message as optional arguments to the `assert!`, `assert_eq!`, and `assert_ne!` macros.

Example code:
```rust
pub fn greeting(name: &str) -> String {
    String::from("Hello!")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
            result.contains("Carol"),
            "Greeting did not contain name, value was `{}`",
            result
        );
    }
}
```
```shell
test tests::greeting_contains_name ... FAILED

failures:

---- tests::greeting_contains_name stdout ----
thread 'tests::greeting_contains_name' panicked at 'Greeting did not contain name, value was `Hello!`', src/lib.rs:12:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

## Checking for Panics with `should_panic`
In addition to checking return values, it’s important to check that our code handles error conditions as we expect. 
`should_panic`:
- pass if the code inside the function panics
- fail if the code inside the function doesn't panic

Example code:
```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {}.", value);
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn greater_than_100() {
        Guess::new(50);
    }
}
```
- `#[should_panic]` attribute after the `#[test]`

```shell
test tests::greater_than_100 - should panic ... FAILED

failures:

---- tests::greater_than_100 stdout ----
note: test did not panic as expected
```
- We don’t get a very helpful message in this case, but when we look at the test function, we see that it’s annotated with `#[should_panic]`. 


Tests that use `should_panic` can be imprecise.(This would pass even if the test panics for a different reason)
To make `should_panic` tests more precise, we can add an optional **`expected`** parameter to the `should_panic`.
The test harness will make sure that the failure message contains the provided text.

Example code:
```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!(
                "Guess value must be greater than or equal to 1, got {}.",
                value
            );
        } else if value > 100 {
            panic!(
                "Guess value must be less than or equal to 200, got {}.",
                value
            );
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "less than or equal to 100")] // `expected`
    fn greater_than_100() {
        Guess::new(200);
    }
}
```

```shell
test tests::greater_than_100 - should panic ... FAILED

failures:

---- tests::greater_than_100 stdout ----
thread 'tests::greater_than_100' panicked at 'Guess value must be less than or equal to 200, got 200.', src/lib.rs:13:13
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
note: panic did not contain expected string
      panic message: `"Guess value must be less than or equal to 200, got 200."`,
 expected substring: `"less than or equal to 100"`
```
- `expected=substring`: check if the error message contains substring.

## Using `Result<T, E>` in Tests
It is possible to return an `Err` instead of panicking.
```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
}
```
Writing tests so they return a `Result<T, E>` enables you to use the *question mark operator* in the body of tests.

You can’t use the `#[should_panic]` annotation on tests that use `Result<T, E>`
- the test framework will not be able to distinguish between a test that fails because it *returns an `Err` value* and a test that fails because it *panics*.
- functions using `#[should_panic]` must return `()`

To assert that an operation returns an `Err` variant, don’t use the question mark operator on the `Result<T, E>` value. Instead, use `assert!(value.is_err())`.
```rust
fn divide(x: i32, y: i32) -> Result<i32, &'static str> {
    if y == 0 {
        return Err("division by zero");
    }
    Ok(x / y)
}

#[test]
fn test_divide() {
    assert_eq!(divide(4, 2), Ok(2));
    assert!(divide(4, 0).is_err());
}
```