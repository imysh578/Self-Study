# Controlling How Tests Are Run
- `cargo run`: compiles the code and runs the resulting binary
- `cargo test`: compiles the code in test mode and runs the resulting test binary

## Running Tests in Parallel or Consecutively
When you run multiple tests, by default they run in parallel using threads.
It means that they finish faster but it can be a problem if the tests depend on each other.

- **`--test-threads` + the number of threads**: set the number of test threads
For example: 
```shell
$ cargo test -- --test-threads=1
```
- set the number of test threads to 1 = not to use any parallelism

## Showing Function Output
By default, `println!` output doesn't display when running `cargo test`.
- `--show-ouput`: show the output of successful tests (e.g., `cargo test -- --show-output`)

## Running a Subset of Tests by Name
You can run test of a particular area.
Example code:
```rust
pub fn add_two(a: i32) -> i32 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_two_and_two() {
        assert_eq!(4, add_two(2));
    }

    #[test]
    fn add_three_and_two() {
        assert_eq!(5, add_two(3));
    }

    #[test]
    fn one_hundred() {
        assert_eq!(102, add_two(100));
    }
}
```
- `cargo test`: running all tests
- `cargo test one_hundred`: running one test, `one_hundred` function
- `cargo test add`: running multiple tests which contain `add`

## Ignoring Some Tests Unless Specifically Requested
- **`ignore`**: running tests except ignored tests
- **`cargo test -- --ignored`**: running only ignored tests
- **`cargo test -- --include-ignored`**: running all tests include ignored tests

```rust
#[test]
fn it_works() {
    assert_eq!(2 + 2, 4);
}

#[test]
#[ignore]
fn expensive_test() {
    // code that takes an hour to run
}
```