# To `panic!` or Not to `panic!`

When writing Rust code, it's important to decide whether to use `panic!` or `Result` when you encounter an error situation. 
- `panic!` is used when there's no way to recover from the error. 
- Returning a `Result` value gives the calling code more options.
    - to either recover 
    - or consider an `Err` as unrecoverable and call `panic!` itself.

In most cases, it's best to return a `Result` when defining a function that might fail because it gives the calling code more control.
However, in situations like examples, prototype code, and tests, it's appropriate to use `panic!` because these scenarios are meant to demonstrate how a specific function works, rather than how to handle errors.


Overall, it's important to weigh the tradeoffs between using `panic!` and `Result` in different situations, and make the choice that best fits your use case.

## Examples, Prototype Code, and Tests
### Examples
- Examples are used to show how a certain concept works, but they may not always include error handling code to keep them simple.
- When you start building real applications, you'll need to think about how to handle errors in a more robust way.
- For example, using a method like `unwrap` is like putting a temporary placeholder in your code for error handling. It's not the final solution, but it's a way to make progress while you figure out how to handle errors in a more permanent and appropriate way.

### Prototype Code
- Prototype code is used when you're still figuring out how you want your program to work.
- In this stage, using methods like `unwrap` and `expect` can be helpful because they make it clear where you'll need to add error handling code later.

### Tests
- Tests are used to check that your code works as expected.
- If a method fails during a test, the whole test should fail so you know there's a problem.
- In this case, using `unwrap` or `expect` is the right thing to do because it will trigger a panic and mark the test as a failure.


Overall, it's important to use different tools at different stages of your development process to make your code clearer and more robust.

## Cases in Which You Have More Information Than the Compiler
In some cases, the compiler can’t tell that failure is impossible, but you as a human can.

For example, it would be appropriate to call `unwrap` or `expect` when you might have some additional logic that ensures that a `Result` will always have an `Ok` value, even though the compiler can't guarantee it.
- In this case, you'll still have `Result` value that you need to handle: whatever operation you're calling still has the possibility of failing in general, even though it's locally impossible in your particular situation.
- if it is ensured that you'll never have an `Err` variant, it is acceptable to call `unwrap`, and even better to comment the reason why you'll never have an `Err` variant in the `expect` text.
```rust
    use std::net::IpAddr;

    let home: IpAddr = "127.0.0.1"
        .parse()
        .expect("Hardcoded IP address should be valid");
```
- You can replace `expect` to `unwrap`, but `unwrap` doesn't give you any information.

The result if not to use `expect`:
```shell
error[E0308]: mismatched types
 --> src/main.rs:4:24
  |
4 |       let home: IpAddr = "127.0.0.1"
  |  _______________------___^
  | |               |
  | |               expected due to this
5 | |         .parse();
  | |________________^ expected enum `IpAddr`, found enum `Result`
  |
  = note: expected enum `IpAddr`
             found enum `Result<_, _>`

For more information about this error, try `rustc --explain E0308`.
error: could not compile `playground` due to previous error
```

Overall, it's important to carefully consider the situation and use your judgment to decide whether to use `unwrap` or `expect` in cases where you have more information than the compiler does.


## Guidelines for Error Handling
- If your code ends up in a bad state because of invalid values, contradictory values, or missing values, and it's unexpected and could put a user at risk, then it's appropriate to use `panic!`.
- If someone calls your code and passes in values that don't make sense, it's best to return an error if you can. However, if continuing could be insecure or harmful, calling `panic!` and alerting the user to the bug in their code might be the best choice.
- On the other hand, if failure is expected, it's more appropriate to return a `Result` than to call `panic!`.
- When your code performs an operation that could put a user at risk if it’s called using invalid values, your code should verify the values are valid first and panic if the values aren’t valid. (Mostly for safety reasons)
    - Functions often have contracts: their behavior is only guaranteed if the inputs meet particular requirements.
    - Contracts for a function, especially when a violation will cause a panic, should be explained in the API documentation for the function.

- Fortunately, Rust's type system can do many of the checks for you, so you don't have to do lots of error checks in all of your functions. 
    - For example, if you have a type rather than an Option, your program expects to have something rather than nothing. 

## Creating Custom Types for Validation
In Rust, it's a good idea to use the type system to ensure you have a valid value.
- For example, when creating a custom type for validation, you can use the type system to make sure that your values are within a certain range.


Guessing game(Chapter 2):
```rust
    loop {
        // --snip--

        let guess: i32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        if guess < 1 || guess > 100 {
            println!("The secret number will be between 1 and 100.");
            continue;
        }

        match guess.cmp(&secret_number) {
            // --snip--
        }
    }
```
- After the `if` expression, we can proceed with the comparisons between guess and the secret number knowing that guess is between 1 and 100.
- However, this is not an ideal solution: if it was absolutely critical that the program only operated on values between 1 and 100, and it had many functions with this requirement, having a check like this in every function would be tedious (and might impact performance).

Instead, define a `Guess` type that will only create an instance of `Guess` if the `new` function receives a value between 1 and 100.
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

    pub fn value(&self) -> i32 {
        self.value
    }
}
```
- The code in the body of the `new` function tests value to make sure it’s between 1 and 100.
- A `value` method that borrows self, doesn’t have any other parameters, and returns an `i32`.