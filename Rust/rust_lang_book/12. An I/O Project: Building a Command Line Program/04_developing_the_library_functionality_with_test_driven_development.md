# Developing the Library's Functionality with Test-Driven Development
searching logic to the minigrep program using the test-driven development (TDD) process with the following steps:
1. Write a test that fails and run it to make sure it fails for the reason you expect.
2. Write or modify just enough code to make the new test pass.
3. Refactor the code you just added or changed and make sure the tests continue to pass.
4. Repeat from step 1!


## Add `search` function
We’ll test drive the implementation of the functionality that will actually do the searching for the query string in the file contents and produce a list of lines that match the query. We’ll add this functionality in a function called search.

Filename: *src/lib.rs*
```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    vec![]
}
```
- lifetime `'a`: the returned vector should contain string slices that reference slices of the argument `contents` rather than the argument `query`.

## Writing a Failing Test
- Remove the `println!` statements from *src/lib.rs* and *src/main.rs*
- Add a `tests` module with a test function in *src/lib.rs*

Filename: *src/lib.rs*
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }
}
```

If we run this test with `cargo test`, it fails as we expected because we always return an empty vector.

## Writing Code to Pass the Test
To fix that and implement `search`, our program needs to follow these steps:
- Iterate through each line of the contents.
- Check whether the line contains our query string.
- If it does, add it to the list of values we’re returning.
- If it doesn’t, do nothing.
- Return the list of results that match.

### Iterating Through Lines with the `lines` Method
- **`lines()`**: returns an iterator.

Filename: *src/lib.rs*
```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    for line in contents.lines() {
        // do something with line
    }
}
```

### Searching Each Line for the Query
- **`contains()`**: check whether the current line contains the query string.

Filename: *src/lib.rs*
```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    for line in contents.lines() {
        if line.contains(query) {
            // do something with line
        }
    }
}
```

### Storing Matching Lines
- **`results`**: a mutable vector to store matching lines.
- **`push()`**: stores a `line` in the vector

Filename: *src/lib.rs*
```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    results
}
``

