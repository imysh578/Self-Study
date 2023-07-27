# Programming a Guessing Game
This chapter introduces a few common Rust concepts by showing how to use them in a real program.

We will learn about...
- let
- match
- methods
- associated functions
- external crates
- ...

How a guessing game works
- The program will generate a random integer between 1 and 100.
- It will then prompt the player to enter a guess.
- After a guess is entered, the program will indicate whether the guess is too low or too high.
- If the guess is correct, the game will print a congratulatory message and exit.


## 0. Setting Up a New Project
Creates the guessing game project:
```shell
$ cargo new guessing_game
$ cd guessing_game
```

Look at the *Cargo.toml* file:
```shell
$ cat Cargo.toml

[package]
name = "guessing_game"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

Look at the *src/main.rs* file:
```shell
$ cat src/main.rs

fn main() {
    println!("Hello, world!");
}
```

Let's complie and run:
```shell
$ cargo run

   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.57s
     Running `target/debug/guessing_game`
Hello, world!
```
- `cargo run`: The run command comes in handy when you need to rapidly iterate on a project.

We will be writing all the code in *src/main.rs* file.


## 1. Processing a Guess
Enter the code into *src/main.rs* file.
Filename: *src/main.rs*
```rust
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
```

### Anatomy of this code
```rust
use std::io;
```
- `use`: a statement to use library
- `std::io`: io(input/output) library from std(standard library)


```rust
fn main() {
  ...
}
```
- `fn`: a syntax to declare a new function
- `( )`: parameters of the function
- `{ }`: the body of the function

```rust
  println!("Guess the number!");
  println!("Please input your guess");
```
- `println`: print a string and new line
- `!`: macro

### Storing Values with Variables
```rust
  let mut guess = String::new();
```
- `let`: a statement to create a variable
- `mut`: mutable
- `String::new`: a function that returns a new instance of a String

```rust
// other exapmles
let apples = 5; // immutable
let mut bananas = 5; // mutable
```


### Receiving User Input
```rust
  io::stdin()
    .read_line(&mut guess)
```
- `io::stdin()`: call the sidin function form io module, which will allow us to handle the user input
- `.read_line`: take user input and append that into a string(without overwriting)
- `&mut guess`: store the user input into the mutable variable
- `&`: indicats that it is a reference(References are *immutable* by default)

### Handling Potential Failure with Result
```rust
    .expect("Failed to read line");
```
- `read_line`: puts whatever the user enters into the string we pass to it, but it also returns a **Result** value.

> What is Result value?
Result is an enumeration(enum), which is a type taht can be in one of multiple possible states. Each possible state is called a *variant*. The purpose of these **Result** types is to encode error-handling function.
Result's variants: `Ok`, `Err`

- `expect`: If the instance of Result is an `Err` value, `expect` will cause the program to crash and display the message.


If you don't call `expect`, the program will compile, but you'll get a warning:
```shell
$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
warning: unused `Result` that must be used
  --> src/main.rs:10:5
   |
10 |     io::stdin().read_line(&mut guess);
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = note: `#[warn(unused_must_use)]` on by default
   = note: this `Result` may be an `Err` variant, which should be handled

warning: `guessing_game` (bin "guessing_game") generated 1 warning
    Finished dev [unoptimized + debuginfo] target(s) in 0.59s
```
> The right way to suppress the warning is to actually write error-handling code, but in our case we just want to crash this program when a problem occurs, so we can use `expect`.

### Printing Value with println! Placeholders
```rust
    println!("You guessed: {guess}");
```
- `{guess}`: print a value of a variable


```rust
// other examples
let x = 5;
let y = 10;

println!("x = {x} and y + 2 = {}", y + 2);
```
- This code would print `x = 5 and y = 12`.

### Testing the First Part
```shell
$ cargo run
   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.53s
     Running `target/debug/guessing_game`
Guess the number!
Please input your guess.
77
You guessed: 77
```

## 2. Generation a Secret Number
Rust doesn't yet include random number functionality in its standard library. However, the Rust team does provide a `rand crate` with said functionality.

### Using a Crate to Get More Functionality
- **crate**: a collection of Rust source code files
- **binary crate**: The project we've been building is a ***binary crate***, which is an executable.
- **libary crate**: The `rand` crate is a library crate, which contains code that is intended to be used in other programs and can't be executable on its own.

To use rand crate, need to modify the *Cargo.toml* file.
```shell
[dependencies]
rand = "0.8.5"
```
- `[dependencies]`: which external crates this project depends on and which versions of those crates we require

> Semantic versioning
*MAJOR.MINOR.PATCH*
`0.8.5` = `^0.8.5` = equals to or bigger than 0.8.5 but below 0.9.0

Now, without changing any of the code, build the project again.
```shell
$ cargo build   
    Updating crates.io index
  Downloaded ppv-lite86 v0.2.17
  Downloaded rand_core v0.6.4
  Downloaded rand v0.8.5
  Downloaded cfg-if v1.0.0
  Downloaded rand_chacha v0.3.1
  Downloaded libc v0.2.138
  Downloaded getrandom v0.2.8
  Downloaded 7 crates (794.8 KB) in 0.87s
   Compiling libc v0.2.138
   Compiling cfg-if v1.0.0
   Compiling ppv-lite86 v0.2.17
   Compiling getrandom v0.2.8
   Compiling rand_core v0.6.4
   Compiling rand_chacha v0.3.1
   Compiling rand v0.8.5
   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 1m 13s
```

- When we include an external dependency, Cargo fetches the latest version of everything that dependency needs from the registry, which is a copy of data from [Crates.io](https://crates.io/).
- After updating the registry, Cargo checks the `[dependencies]` section and downloads any crates listed that aren't already downloaded.

### Ensuring Reproducible Builds with the *Cargo.lock* File
- Cargo will use only the versions of the dependencies we specified until we indicate otherwise.
- Rust creates the *Cargo.lock* file the first time we run `cargo build`, so it prevents from breaking our code because of the dependencies' version change.


### Updating a Crate to Get a New Version
- `cargo update`: it will ignore the *Cargo.lock* file and figure out the latest versions that fit your specifications in `Cargo.toml`

- If rand version 0.8.6 is released, 
```shell
$ cargo update
    Updating crates.io index
    Updating rand v0.8.5 -> v0.8.6
```
- If rand version 0.9.x series is released, we need to update *Cargo.toml* file. Then, run `cargo build` to update the registry of crates.
```shell
[dependencies]
rand = "0.9.0"
```

### Generating a Random Number
Filename: *src/main.rs*
```rust
use std::io;
use rand::Rng; // Add this line

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100); // Add this line

    println!("The secret number is: {secret_number}"); // Add this line

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
```
- `rand::Rng`: Random Number Generator; An automatically-implemented extension trait on RngCore providing high-level generic methods for sampling values and other convenience methods. 
- `rand::tread_rng()`: Retrieve the lazily-initialized thread-local random number generator, seeded by the system
- `gen_range(1..=100)`: between 1 and 100

> NOTE
**cargo doc --open**: create document about all dependencies locally and open it in our browser.

Let's run this code several times to check random number.
```shell
$ cargo run       
   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.39s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 13
Please input your guess.
20
You guessed: 20

$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 91
Please input your guess.
11
You guessed: 11
```

## 3. Comparing the Guess to the Secret Number
Filename: *src/main.rs*
```rust
use rand::Rng;
use std::cmp::Ordering; // Add this line
use std::io;

fn main() {
    // --snip--

    println!("You guessed: {guess}");

    // Add below codes
    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}
```

- `std::cmp::Ordering`: an enum that has the variants `Less`, `Greater`, and `Equal`
- `cmp`: compares two values; `value1.cmp(&value2)` (`3.cmp(&1)` == Greater)
- `match`: it can be used to run code conditionally.

Let's run this code. But...
```shell
$ cargo run
   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
error[E0308]: mismatched types
  --> src/main.rs:22:21
   |
22 |     match guess.cmp(&secret_number) {
   |                 --- ^^^^^^^^^^^^^^ expected struct `String`, found integer
   |                 |
   |                 arguments to this function are incorrect
   |
   = note: expected reference `&String`
              found reference `&{integer}`
note: associated function defined here

For more information about this error, try `rustc --explain E0308`.
error: could not compile `guessing_game` due to previous error
```

It is becuase we declare the `guess` variable as string.
Let's convert it into an unsigned integer.

Filename: *src/main.rs*
```rust
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");

    println!("Please input your guess.");

    // --snip--

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    let guess: u32 = guess.trim().parse().expect("Please type a number!"); // Add this line

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}
```
- Rust allows to shadow the previous value of `guess` with a new one.
- `trim()` on a String: eliminates any whitespace at the beginning and end
> NOTE
**read_line**: The user must press enter to input data. It looks like this: `5\n`. The ***trim*** method eliminates `\n` or `\r\n`.

- `parse()` on strings: converts a string to another type. It returns a `Result` type, much as the `read_line` method does.


Let's run the program again:
```shell
$ cargo run
   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.46s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 31
Please input your guess.
31
You win!
You guessed: 31
```

## 4. Allowing Multiple Guesses with Looping
Filename: src/main.rs
```rust
    // --snip--

    println!("The secret number is: {secret_number}");

    loop {
        println!("Please input your guess.");

        // --snip--

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => println!("You win!"),
        }
    }
}
```

- `loop`: creates an infinite loop.

Let's run this codes:
```shell
$ cargo run
   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.16s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 10
Please input your guess.
1
You guessed: 1
Too small!
Please input your guess.
21
You guessed: 21
Too big!
Please input your guess.
10
You guessed: 10
You win!
Please input your guess.
quit
thread 'main' panicked at 'Please type a number!: ParseIntError { kind: InvalidDigit }', src/main.rs:21:47
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

## 5. Quitting After a Correct Guess
Filename: src/main.rs
```rust
        // --snip--

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
```

Run this codes: 
```shell
$ cargo run
   Compiling guessing_game v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/02. Programming a Guessing Game/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.16s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 97
Please input your guess.
33
You guessed: 33
Too small!
Please input your guess.
99
You guessed: 99
Too big!
Please input your guess.
97
You guessed: 97
You win!
```

## 6. Handling Invalid Input
To further refine the game’s behavior, rather than crashing the program when the user inputs a non-number, let’s make the game ignore a non-number so the user can continue guessing.

Filename: src/main.rs
```rust
        // --snip--

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        // --snip--
```

Let's try it:
```shell
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 40
Please input your guess.
foo
Please input your guess.
40
You guessed: 40
You win!
```

## 7. Final Code
Let's delete the printing secret number.

Filename: src/main.rs
```rust 
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
```